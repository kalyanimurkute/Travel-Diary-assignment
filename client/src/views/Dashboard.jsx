import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { getuserJwtToken } from '../utils';
import addNewTour from "./../assets/add-new-tour.png"
import { Link } from 'react-router';
import TourCard from '../components/TourCard';


function Dashboard() {

    const userJWT = getuserJwtToken();

    const [tours, setTours] = useState([]);

const deleteTour = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this tour?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getuserJwtToken()}`,
        }
      }
    );

    if (response.data.success) {
      toast.success("Tour deleted successfully");
      loadTours();
    } else {
      toast.error(response.data.message || "Failed to delete tour");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting tour");
  }
};
    const loadTours = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tours`, {
            headers: {
                Authorization: `Bearer ${userJWT}`,
            }
        });
        if (response.data.success) {
            toast.success(response.data.message);
            setTours(response.data.data);
        } else {
            toast.error("failed to load tours");
        }
    };

    useEffect(() => {
        loadTours();
    }, []);
    return (

        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto mt-8 px-4">
                <h2 className='text-center mb-4  playpen-sans text-2xl'>Document Your Journey</h2>
                <Link to="/tours/new">
                    <img src={addNewTour} alt="add new tour" className='fixed bottom-10 right-10 h-15 cursor-pointer' />
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {tours.map((tourItem, index) => {
                        return <TourCard key={index} {...tourItem} onDelete={deleteTour} />;
                    })}
                </div>
                <Toaster />
            </div>
               
        </div>
    )
}

export default Dashboard