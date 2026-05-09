import { useState, useEffect } from "react";
import { getUserData, logoutUser } from "../utils";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Avtar from "./photo.jsx";
import { Heart } from "lucide-react";

function Navbar() {

  const [userData, setUserData] = useState({});


  const fetchUserData = () => {

    const data = getUserData();

    console.log("Fetch User Data:", data);

    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleLogout = () => {

    logoutUser();

    toast.success("Logout Successful");

    window.location.href = "/login";
  };

  return (

    <div
      className="
        bg-[#B95E82]
        rounded-full
        max-w-5xl
        mx-auto
        px-8
        py-4
        flex
        justify-between
        items-center
        shadow-xl
        mt-6
        border
        border-[#FFC29B]
      "
    >

      <div>

        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <span
            className="
              playpen-sans
              text-2xl
              text-[#FFECC0]
              font-semibold
              hover:text-white
              transition
            "
          >
            Travel Diary
          </span>

        </Link>

      </div>

      <div className="flex items-center gap-5">

        {
          userData?.name ? (

            <div className="flex items-center gap-4">

              <Link
                to="/profile"
                className="
                  flex
                  items-center
                  gap-2
                  text-[#FFECC0]
                  hover:text-white
                  transition
                "
              >

                <Avtar
                  name={userData.name}
                  size="lg"
                />

                <span className="font-medium">

                  Hello, {userData.name}!

                </span>

              </Link>

              

              <Button
                title="Logout"
                variant="tertiary"
                size="medium"
                onClick={handleLogout}
              />

            </div>

          ) : (

            <Link to="/login">

              <Button
                title="Login"
                variant="primary"
                size="medium"
              />

            </Link>

          )
        }

        <Link to="/wishlist">

          <Heart
            className="
              w-7
              h-7
              text-[#FFECC0]
              hover:text-white
              hover:fill-white
              fill-[#FFECC0]
              cursor-pointer
              transition
            "
          />

        </Link>

      </div>

      <Toaster />

    </div>
  );
}

export default Navbar;