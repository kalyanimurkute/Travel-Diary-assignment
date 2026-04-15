import axios from "axios";
import { useEffect, useState } from 'react';
import { setPageTitle } from "./../utils.jsx"
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Navbar from '../components/Navbar';

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
    setPageTitle("Signup Tour - TinyTours");
  }, []);

  const createUser = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, newUser);
    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message, { id: "signupSuccess" });
      setnewUser({
        name: "",
        email: "",
        mobile: "",
        city: "",
        country: "",
        password: "",
      });
    }
    else {
      toast.error(response.data.message, { id: "signupError" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <h2 className="text-center text-2xl playpen-sans mt-5">Create Your Account</h2>
      <div className='w-100 mx-auto bg-white p-6 mt-6 rounded-xl shadow-lg'>
        <Input type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => {
            setnewUser({ ...newUser, name: e.target.value })
          }}
        />
        <Input type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => {
            setnewUser({ ...newUser, email: e.target.value })
          }}
        />
        <Input type="text"
          placeholder="Mobile"
          value={newUser.mobile}
          onChange={(e) => {
            setnewUser({ ...newUser, mobile: e.target.value })
          }}
        />
        <Input type="text"
          placeholder="City"
          value={newUser.city}
          onChange={(e) => {
            setnewUser({ ...newUser, city: e.target.value })
          }}
        />
        <Input type="text"
          placeholder="Country"
          value={newUser.country}
          onChange={(e) => {
            setnewUser({ ...newUser, country: e.target.value })
          }}
        />
        <Input type="password"
          placeholder="password"
          value={newUser.password}
          onChange={(e) => {
            setnewUser({ ...newUser, password: e.target.value })
          }}
        />
        <Button
          title="Signup"
          onClick={createUser}
        />
        <Link to="/login" className="block my-2 text-blue-500">Already have an account? Login</Link>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default Signup