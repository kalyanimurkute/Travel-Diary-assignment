import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router';

import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Tours from "./views/Tours.jsx";
import AddTour from "./views/AddTours.jsx";
import TourEdit from "./views/TourEdit.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Profile from "./views/Profile.jsx";
import Wishlist from "./views/WishList.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/new' element={<AddTour />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/tours/:id/edit' element={<TourEdit />} />
      <Route path='/wishlist' element={<Wishlist />} />
    </Routes>
  </BrowserRouter>
);