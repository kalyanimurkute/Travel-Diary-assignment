import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/Input";
import { getuserJwtToken } from "../utils";
import { SquarePen, Save, X } from "lucide-react";

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

  // ================= GET USER =================

  const getUser = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${getuserJwtToken()}`,
          },
        }
      );

      if (res.data.success) {

        setUser(res.data.data);

      } else {

        toast.error(res.data.message);
      }

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch profile");

      window.location.href = "/login";
    }
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPDATE USER =================

  const handleUpdate = async () => {

    try {

      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user`,
        user,
        {
          headers: {
            Authorization: `Bearer ${getuserJwtToken()}`,
          },
        }
      );

      if (res.data.success) {

        toast.success("Profile Updated Successfully");

        setUser(res.data.data);

        localStorage.setItem(
          "userData",
          JSON.stringify(res.data.data)
        );

        setIsEditing(false);

      } else {

        toast.error(res.data.message);
      }

    } catch (err) {

      console.log(err);

      toast.error("Failed to update profile");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (

    <div className="min-h-screen bg-[#FFECC0]">

      <Navbar />

      <div
        className="
          max-w-md
          mx-auto
          mt-14
          p-8
          bg-white
          rounded-3xl
          shadow-2xl
          relative
          border-2
          border-[#FFC29B]
        "
      >

        {/* ================= EDIT BUTTON ================= */}

        <div className="absolute top-5 right-5 flex gap-3">

          {isEditing ? (

            <X
              size={24}
              className="
                text-red-500
                cursor-pointer
                hover:text-red-700
              "
              onClick={() => setIsEditing(false)}
            />

          ) : (

            <SquarePen
              size={24}
              className="
                text-[#B95E82]
                cursor-pointer
                hover:text-[#F39F9F]
              "
              onClick={() => setIsEditing(true)}
            />

          )}

        </div>

        {/* ================= PROFILE IMAGE ================= */}

        <div className="flex justify-center mb-6">

          <div
            className="
              w-24
              h-24
              rounded-full
              overflow-hidden
              border-4
              border-[#FFC29B]
              shadow-lg
            "
          >

            {user.profilePhoto ? (

              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-full h-full object-cover"
              />

            ) : (

              <div
                className="
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  bg-[#B95E82]
                  text-white
                  text-4xl
                  font-bold
                  uppercase
                "
              >
                {user.name?.[0] || "U"}
              </div>

            )}

          </div>

        </div>

        {/* ================= TITLE ================= */}

        <h2
          className="
            text-center
            text-3xl
            playpen-sans
            text-[#B95E82]
            mb-8
          "
        >
          My Profile
        </h2>

        {/* ================= FORM ================= */}

        <div className="space-y-4">

          {["name", "email", "mobile", "country", "city"].map((field) => (

            <div key={field}>

              <label
                className="
                  block
                  text-sm
                  mb-1
                  capitalize
                  text-[#B95E82]
                  font-medium
                "
              >
                {field}
              </label>

              {isEditing ? (

                <Input
                  type="text"
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                />

              ) : (

                <div
                  className="
                    px-4
                    py-3
                    bg-[#FFF4E5]
                    rounded-xl
                    border
                    border-[#FFC29B]
                    text-gray-700
                  "
                >
                  {user[field] || "-"}
                </div>

              )}

            </div>

          ))}

          {/* ================= SAVE BUTTON ================= */}

          {isEditing && (

            <div className="flex justify-center mt-6">

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="
                  flex
                  items-center
                  gap-2
                  bg-[#B95E82]
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  hover:bg-[#F39F9F]
                  transition
                  cursor-pointer
                "
              >

                <Save size={18} />

                {loading ? "Saving..." : "Save Changes"}

              </button>

            </div>

          )}

        </div>

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default Profile;