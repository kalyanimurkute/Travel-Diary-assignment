import axios from "axios";
import { useEffect, useState } from "react";
import { setPageTitle } from "./../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx";

function Login() {

  useEffect(() => {
    setPageTitle("Login - TinyTours");
  }, []);

  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  });

  const checkUserLogin = async () => {

    if (!loginUser.email || !loginUser.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:8080";

      const response = await axios.post(
        `${BASE_URL}/login`,
        loginUser
      );

      if (response.data.success) {

        toast.success(response.data.message);

        const { jwtToken, data } = response.data;

        localStorage.setItem(
          "userJwtToken",
          jwtToken
        );

        localStorage.setItem(
          "userData",
          JSON.stringify(data)
        );

        setloginUser({
          email: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);

      } else {

        toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error);

      if (error.response) {
        toast.error(
          error.response.data.message ||
          "Invalid email or password"
        );
      }

      else if (error.request) {
        toast.error("Backend server not running");
      }

      else {
        toast.error("Something went wrong");
      }
    }
  };

  return (

    <div className="min-h-screen bg-[#FFECC0]">

      <Navbar />

      <h2 className="text-center mt-10 text-3xl playpen-sans text-[#B95E82]">
        Welcome Back 👋
      </h2>

      <p className="text-center text-gray-600 mt-2">
        Login to continue your travel journey
      </p>

      <div
        className="
          w-[90%]
          md:w-[420px]
          mx-auto
          bg-white
          p-8
          mt-8
          rounded-3xl
          shadow-xl
          border-2
          border-[#FFC29B]
        "
      >

        <Input
          type="email"
          placeholder="Enter Email"
          value={loginUser.email}
          onChange={(e) => {
            setloginUser({
              ...loginUser,
              email: e.target.value,
            });
          }}
        />

        <Input
          type="password"
          placeholder="Enter Password"
          value={loginUser.password}
          onChange={(e) => {
            setloginUser({
              ...loginUser,
              password: e.target.value,
            });
          }}
        />

        <div className="mt-5 flex justify-center">

          <Button
            title="Login"
            size="large"
            variant="primary"
            onClick={checkUserLogin}
          />

        </div>

        <Link
          to="/signup"
          className="
            block
            text-center
            mt-5
            text-[#B95E82]
            hover:underline
            font-medium
          "
        >
          Don&apos;t have an account? Register
        </Link>

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default Login;