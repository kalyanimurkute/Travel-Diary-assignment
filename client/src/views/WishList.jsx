import { useEffect, useState } from "react";
import axios from "axios";
import { getuserJwtToken } from "../utils";
import TourCard from "../components/TourCard";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function Wishlist() {
  const [tours, setTours] = useState([]);
  const token = getuserJwtToken();

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (id) => {
    setTours(prev => prev.filter(tour => tour._id !== id)); // UI update
    toast.success("Tour removed from wishlist"); // Show message
  };

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h2 className="text-2xl mb-6 playpen-sans text-center">Favorite Tours</h2>

        {tours.length === 0 ? (
          <p className="text-gray-500 text-center">No tours in wishlist</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {tours.map(tour => (
              <TourCard
                key={tour._id}
                {...tour}
                onRemoveFromWishlist={handleRemoveFromWishlist} // ✅ pass callback
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;