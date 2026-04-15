import Tour from "../models/Tour.js";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const getTours = async (req, res) => {
  const tours = await Tour.find({ user: req.user.id }).populate(
    "user",
    "-password"
  );
  return res.json({
    success: true,
    message: "Fetched tours successfully",
    data: tours,
  });
};

const postTour = async (req, res) => {
  const { title, description, cities, startDate, endDate, photos, userId } = req.body;

  const newTour = new Tour({
    title,
    description,
    cities,
    startDate,
    endDate,
    photos,
    user: req.user.id,
  });

  try {
    const savedTour = await newTour.save();

    return res.json({
      success: true,
      message: "tour created successfully",
      data: savedTour,
    });
  }
  catch (error) {
    return res.json({
      success: false,
      message: "tour creation failed",
      error: error.message
    });
  }
};

const putTours = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { id } = req.params;

  const tour = await Tour.findById(id);
  if (!tour) {
    return res.json({
      success: false,
      msg: 'tour not found',
      data: null
    })
  }
  if (tour.user.toString() !== userId) {
    return res.json({
      success: false,
      message: "unauothorized to update this tour",
      data: null
    })
  }
  const { title, description, startDate, endDate, photos, cites } = req.body;
  await Tour.updateOne({ _id: id }, {
    title,
    description,
    startDate,
    endDate,
    photos,
    cites
  });
  const updatedTour = await Tour.findById(id);

  return res.json({
    success: true,
    message: "tour updated succesfully",
    data: updatedTour,
  })

};

const getTourById = async (req, res) => {
  const { id } = req.params;

  const tour = await Tour.findById(id).populate("user", "-password");

  if (!tour) {
    return res.json({
      success: false,
      message: "Tour not found",
      data: null,
    });
  }

  return res.json({
    success: true,
    message: "Fetched tour successfully",
    data: tour,
  });
};

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
    if (tour.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this tour",
      });
    }
    await Tour.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to delete tour",
      error: error.message,
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.wishlist.includes(req.params.id)) {
      user.wishlist.push(req.params.id);
      await user.save();
    }

    return res.json({
      success: true,
      message: "Added to wishlist"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.id
    );

    await user.save();

    return res.json({
      success: true,
      message: "Removed from wishlist"
    });

  } catch (error) {
    return res.status(500).json({
      success: false
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const tours = await Tour.find({
      _id: { $in: user.wishlist }
    });

    res.json({
      success: true,
      data: tours
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { getTours, postTour, putTours, getTourById, deleteTour, addToWishlist, removeFromWishlist, getWishlist };