import axios from "axios";
import { useEffect, useState } from 'react';
import { setPageTitle } from "./../utils.jsx";
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
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
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, loginUser);

    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message, { id: "loginSuccess" });
      setloginUser({
        email: "",
        password: "",
      });

      const { jwtToken, data } = response.data;
      localStorage.setItem("userJwtToken", jwtToken);
      localStorage.setItem("userData", JSON.stringify(data));

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      toast.error(response.data.message, { id: "loginError" });
    }
  };


  return (
    <div>
      <Navbar />
      <h2 className="text-center mt-10 text-gray-800 text-2xl playpen-sans">Welcome Back, Login to your Account</h2>
      <div className='w-100 mx-auto bg-white p-6 mt-6 rounded-xl shadow-lg'>
        <Input type="email"
          placeholder="Email"
          value={loginUser.email}
          onChange={(e) => {
            setloginUser({ ...loginUser, email: e.target.value })
          }}
        />
        <Input type="password"
          placeholder="password"
          value={loginUser.password}
          onChange={(e) => {
            setloginUser({ ...loginUser, password: e.target.value })
          }}
        />
        <Button
          title="Login"
          size="medium"
          variant="primary"
          onClick={checkUserLogin}
        />

        <Link to="/signup" className="block my-2 text-blue-500">Don't have an account? Register</Link>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default Login