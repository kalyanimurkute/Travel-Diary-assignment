import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { getuserJwtToken } from "../utils";
import { SquarePen } from "lucide-react";


function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    profilePhoto: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${getuserJwtToken()}` },
      });
      if (res.data.success) setUser(res.data.data);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error("Failed to fetch user. Please login again.");
      window.location.href = "/login";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        user,
        { headers: { Authorization: `Bearer ${getuserJwtToken()}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setUser(res.data.data);
        setIsEditing(false);
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className=" max-w-md mx-auto mt-14 p-6 bg-white rounded-3xl shadow-lg relative">
        <SquarePen 
          size={24}
          className="absolute top-5 right-5 text-indigo-500 cursor-pointer hover:text-indigo-700"
          onClick={() => setIsEditing(!isEditing)}
          title={isEditing ? "Cancel Edit" : "Edit Profile"}
        />


        <div className="flex justify-center mb-6 relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg relative">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white text-4xl font-bold uppercase">
                {user.name?.[0] || "U"}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {["name", "email", "mobile", "country", "city"].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-500 mb-1 capitalize">{field}</label>
              {isEditing ? (
                <Input
                  type="text"
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-100 rounded-lg">{user[field] || "-"}</div>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleUpdate}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;