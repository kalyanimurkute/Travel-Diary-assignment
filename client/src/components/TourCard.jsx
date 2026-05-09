import {
  Building2,
  Footprints,
  Goal,
  FilePenLine,
  Trash2,
  Heart,
} from "lucide-react";

import Avtar from "./photo";
import PhotoViewer from "./Viewer";

import { Link } from "react-router";
import { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { getuserJwtToken } from "../utils";

function TourCard({
  _id,
  title,
  description,
  photos,
  user,
  startDate,
  endDate,
  cities,
  onRemoveFromWishlist,
  onDelete,
}) {

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const token = getuserJwtToken();

  // ================= CHECK WISHLIST =================

  useEffect(() => {

    const checkWishlist = async () => {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const exists = res.data.data.some(
          (item) => item._id === _id
        );

        setIsWishlisted(exists);

      } catch (err) {

        console.log(err);
      }
    };

    if (token) {
      checkWishlist();
    }

  }, [_id, token]);

  // ================= TOGGLE WISHLIST =================

  const toggleWishlist = async () => {

    try {

      if (isWishlisted) {

        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/wishlist/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsWishlisted(false);

        toast.success("Removed from wishlist");

        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(_id);
        }

      } else {

        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/wishlist/${_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsWishlisted(true);

        toast.success("Added to wishlist");
      }

    } catch (err) {

      console.log(err);

      toast.error("Failed to update wishlist");
    }
  };

  const { name } = user || {};

  return (

    <div
      className="
        relative

        bg-[#FFECC0]

        border
        border-[#FFC29B]

        rounded-3xl

        shadow-lg
        hover:shadow-2xl

        transition-all
        duration-300

        p-6
        mb-6
      "
    >

      {/* ================= WISHLIST ================= */}

      <Heart
        onClick={toggleWishlist}
        size={28}
        className={`
          absolute
          top-4
          right-4

          cursor-pointer
          transition

          ${
            isWishlisted
              ? "text-[#B95E82] fill-[#B95E82]"
              : "text-[#F39F9F]"
          }
        `}
      />

      {/* ================= TITLE ================= */}

      <h2
        className="
          text-2xl
          playpen-sans
          text-[#B95E82]
          font-semibold
        "
      >
        {title}
      </h2>

      {/* ================= DESCRIPTION ================= */}

      <p
        className="
          text-sm
          text-[#6B4A57]
          mt-2
          leading-6
        "
      >
        {description}
      </p>

      {/* ================= CITIES ================= */}

      <div className="my-4 flex flex-wrap items-center gap-2">

        <Building2 className="text-[#B95E82]" />

        {cities.map((city) => (

          <span
            key={city}
            className="
              text-sm

              bg-[#FFC29B]

              text-[#5A3444]

              px-4
              py-1

              rounded-full

              shadow-sm
            "
          >
            {city}
          </span>

        ))}

      </div>

      {/* ================= DATES ================= */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3

          text-sm
          text-[#5A3444]

          my-4
        "
      >

        <div className="flex items-center gap-2">

          <Footprints className="h-5 w-5 text-[#B95E82]" />

          <span>
            Started:
            {" "}
            {new Date(startDate).toLocaleDateString()}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <Goal className="h-5 w-5 text-[#B95E82]" />

          <span>
            Ended:
            {" "}
            {new Date(endDate).toLocaleDateString()}
          </span>

        </div>

      </div>

      {/* ================= USER ================= */}

      <div className="flex items-center gap-3 mt-4">

        <span className="text-[#5A3444]">
          Posted by:
        </span>

        <strong className="text-[#B95E82]">
          {name}
        </strong>

        <Avtar
          name={name}
          size="md"
        />

      </div>

      {/* ================= PHOTOS ================= */}

      <div className="flex gap-3 mt-5 flex-wrap">

        {photos.map((photo, index) => (

          <PhotoViewer
            key={index}
            imgUrl={photo}
            index={index}
          />

        ))}

      </div>

      {/* ================= ACTION BUTTONS ================= */}

      <div className="absolute top-4 right-16 flex gap-3">

        <Link to={`/tours/${_id}/edit`}>

          <FilePenLine
            className="
              h-6
              w-6

              text-[#B95E82]

              cursor-pointer

              hover:scale-110
              transition
            "
          />

        </Link>

        <Trash2
          className="
            h-6
            w-6

            text-red-500

            cursor-pointer

            hover:scale-110
            transition
          "
          onClick={() => onDelete(_id)}
        />

      </div>

    </div>
  );
}

export default TourCard;