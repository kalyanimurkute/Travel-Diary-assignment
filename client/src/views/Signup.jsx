import axios from "axios";
import { useEffect, useState } from "react";
import { setPageTitle } from "./../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

function Signup() {

  const [newUser, setnewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    password: "",
  });

  useEffect(() => {
    setPageTitle("Signup - TinyTours");
  }, []);

  // ================= CREATE USER =================

  const createUser = async () => {

    // ================= VALIDATION =================

    if (!newUser.name) {
      toast.error("Name is required");
      return;
    }

    if (!newUser.email) {
      toast.error("Email is required");
      return;
    }

    if (!newUser.password) {
      toast.error("Password is required");
      return;
    }

    try {

      const BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:8080";

      const response = await axios.post(
        `${BASE_URL}/signup`,
        newUser
      );

      if (response.data.success) {

        toast.success("Account Created Successfully");

        // RESET FORM

        setnewUser({
          name: "",
          email: "",
          mobile: "",
          city: "",
          country: "",
          password: "",
        });

        // REDIRECT LOGIN

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);

      } else {

        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);

      if (error.response) {

        toast.error(
          error.response.data.message || "Server Error"
        );

      } else if (error.request) {

        toast.error("Backend server not running");

      } else {

        toast.error("Something went wrong");
      }
    }
  };

  return (

    <div className="min-h-screen bg-[#FFECC0]">

      <Navbar />

      {/* ================= TITLE ================= */}

      <div className="pt-8">

        <h2
          className="
            text-center
            text-4xl
            playpen-sans
            text-[#B95E82]
          "
        >
          Create Your Account ✨
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Start saving your beautiful travel memories
        </p>

      </div>

      {/* ================= FORM CARD ================= */}

      <div
        className="
          w-[90%]
          md:w-[430px]
          mx-auto
          bg-white
          p-8
          mt-8
          rounded-3xl
          shadow-2xl
          border-2
          border-[#FFC29B]
        "
      >

        <Input
          type="text"
          placeholder="Enter Name"
          value={newUser.name}
          onChange={(e) => {
            setnewUser({
              ...newUser,
              name: e.target.value,
            });
          }}
        />

        <Input
          type="email"
          placeholder="Enter Email"
          value={newUser.email}
          onChange={(e) => {
            setnewUser({
              ...newUser,
              email: e.target.value,
            });
          }}
        />

        <Input
          type="text"
          placeholder="Enter Mobile"
          value={newUser.mobile}
          onChange={(e) => {
            setnewUser({
              ...newUser,
              mobile: e.target.value,
            });
          }}
        />

        <Input
          type="text"
          placeholder="Enter City"
          value={newUser.city}
          onChange={(e) => {
            setnewUser({
              ...newUser,
              city: e.target.value,
            });
          }}
        />

        <Input
          type="text"
          placeholder="Enter Country"
          value={newUser.country}
          onChange={(e) => {
            setnewUser({
              ...newUser,
              country: e.target.value,
            });
          }}
        />

        <Input
          type="password"
          placeholder="Enter Password"
          value={newUser.password}
          onChange={(e) => {
            setnewUser({
              ...newUser,
              password: e.target.value,
            });
          }}
        />

        {/* ================= BUTTON ================= */}

        <div className="flex justify-center mt-5">

          <Button
            title="Signup"
            size="large"
            variant="primary"
            onClick={createUser}
          />

        </div>

        {/* ================= LOGIN LINK ================= */}

        <Link
          to="/login"
          className="
            block
            mt-5
            text-center
            text-[#B95E82]
            hover:underline
            font-medium
          "
        >
          Already have an account? Login
        </Link>

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default Signup;