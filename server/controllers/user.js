import User from "../models/user.js";

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User fetched successfully",
      data: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateUser =async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, mobile, city, country, profilePhoto } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (mobile) updateFields.phone = mobile;
    if (city) updateFields.city = city;
    if (country) updateFields.country = country;
    if (profilePhoto) updateFields.profilePhoto = profilePhoto;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password"); 
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export { getUser, updateUser };