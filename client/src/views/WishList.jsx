import { useEffect, useState } from "react";
import axios from "axios";
import { getuserJwtToken } from "../utils";
import TourCard from "../components/TourCard";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function Wishlist() {

  const [tours, setTours] = useState([]);

  const token = getuserJwtToken();

  

  const fetchWishlist = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setTours(res.data.data);
      }

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch wishlist");
    }
  };

  useEffect(() => {

    if (token) {
      fetchWishlist();
    }

  }, []);

 

  const handleRemoveFromWishlist = (id) => {

    setTours((prev) =>
      prev.filter((tour) => tour._id !== id)
    );

    toast.success("Removed from wishlist");
  };

  

  const deleteTour = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );

    if (!confirmDelete) return;

    try {

      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        setTours((prev) =>
          prev.filter((tour) => tour._id !== id)
        );

        toast.success("Tour deleted successfully");

      } else {

        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete tour");
    }
  };

  return (

    <div className="min-h-screen bg-[#FFF4E0]">

      <Navbar />

      <div className="max-w-6xl mx-auto p-5">

        <h2 className="text-3xl text-center playpen-sans text-[#B95E82] mb-8">
          Favorite Tours ❤️
        </h2>

        {tours.length === 0 ? (

          <div className="text-center mt-20">

            <p className="text-[#B95E82] text-lg">
              No tours in wishlist
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {tours.map((tour) => (

              <TourCard
                key={tour._id}
                {...tour}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onDelete={deleteTour}
              />

            ))}

          </div>

        )}

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default Wishlist;