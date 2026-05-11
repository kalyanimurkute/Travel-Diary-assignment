import React, {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import axios from "axios";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  getuserJwtToken,
} from "../utils";

import { Link } from "react-router";

import TourCard from "../components/TourCard";

import addNewTour from "../assets/add-tour.jpg";

function Dashboard() {

  const userJWT =
    getuserJwtToken();

  const [tours, setTours] =
    useState([]);

  

  const deleteTour = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this tour?"
      );

    if (!confirmDelete) return;

    try {

      const response =
        await axios.delete(

          `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${getuserJwtToken()}`,
            },
          }
        );

      if (
        response.data.success
      ) {

        toast.success(
          "Tour deleted successfully"
        );

        loadTours();

      } else {

        toast.error(
          response.data.message ||
          "Failed to delete tour"
        );
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Error deleting tour"
      );
    }
  };


  const loadTours = async () => {

    try {

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_BASE_URL}/tours`,

          {
            headers: {
              Authorization:
                `Bearer ${userJWT}`,
            },
          }
        );

      if (
        response.data.success
      ) {

        setTours(
          response.data.data
        );

      } else {

        toast.error(
          "Failed to load tours"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Server error"
      );
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (

    <div
      className="
        min-h-screen

        bg-gradient-to-br
        from-[#FFECC0]
        via-[#fff4da]
        to-[#FFC29B]

        pb-16
      "
    >

      <Navbar />

      

      <div
        className="
          max-w-7xl
          mx-auto

          mt-10
          px-5
        "
      >

      

        <h2
          className="
            text-center

            mb-8

            playpen-sans

            text-4xl

            text-[#B95E82]

            font-bold
          "
        >

          Document Your Journey

        </h2>


        <Link to="/tours/new">

          <div
            className="
              fixed
              bottom-8
              right-8

              z-50

              bg-white

              p-3

              rounded-full

              shadow-2xl

              hover:scale-110

              transition-all
              duration-300
            "
          >

            <img
              src={addNewTour}

              alt="add new tour"

              className="
                h-14
                w-14

                rounded-full
              "
            />

          </div>

        </Link>

        

        {
          tours.length > 0 ? (

            <div
              className="
                grid

                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3

                gap-8
              "
            >

              {tours.map(
                (
                  tourItem,
                  index
                ) => {

                  return (

                    <TourCard
                      key={index}

                      {...tourItem}

                      onDelete={
                        deleteTour
                      }
                    />
                  );
                }
              )}

            </div>

          ) : (

            <div
              className="
                text-center

                mt-20

                bg-white/70

                border
                border-[#FFC29B]

                rounded-3xl

                p-10

                shadow-lg
              "
            >

              <h3
                className="
                  text-2xl

                  text-[#B95E82]

                  font-semibold
                "
              >

                No Tours Found

              </h3>

              <p
                className="
                  text-[#6B4A57]

                  mt-3
                "
              >

                Start adding your
                beautiful travel memories.

              </p>

            </div>
          )
        }

      </div>

      <Toaster
        position="top-center"
      />

    </div>
  );
}

export default Dashboard;