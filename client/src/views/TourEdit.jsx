import React, { useEffect, useState, useRef } from "react";
import { setPageTitle, getuserJwtToken } from "./../utils.jsx";
import Navbar from "../components/Navbar";
import Input from "../components/Input.jsx";
import MultiSelect from "../components/Select.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import PhotoViewer from "./../components/Viewer.jsx";

function EditTour() {

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [existingTour, setExistingTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef();

  const { id } = useParams();

  // ================= PAGE TITLE =================

  useEffect(() => {
    setPageTitle("Edit Tour - TinyTours");
  }, []);

  // ================= LOAD TOUR =================

  const loadExistingTour = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/tours/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getuserJwtToken()}`,
          },
        }
      );

      if (response.data.success) {

        const tourData = response.data.data;

        setExistingTour({
          ...tourData,
          startDate: tourData.startDate?.split("T")[0],
          endDate: tourData.endDate?.split("T")[0],
        });

      } else {

        toast.error("Failed to load tour");
      }

    } catch (error) {

      console.log(error);

      toast.error("Error loading tour");
    }
  };

  useEffect(() => {
    loadExistingTour();
  }, [id]);

  // ================= AUTHENTICATOR =================

  const authenticator = async () => {

    try {

      const response = await fetch(`${API_URL}/auth`);

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      return await response.json();

    } catch (error) {

      console.log(error);

      toast.error("Authentication Failed");

      throw error;
    }
  };

  // ================= HANDLE UPLOAD =================

  const handleUpload = async () => {

    const fileInput = fileInputRef.current;

    if (!fileInput.files.length) {

      toast.error("Please select file");

      return;
    }

    const file = fileInput.files[0];

    try {

      const authParams = await authenticator();

      const {
        signature,
        expire,
        token,
        publicKey,
      } = authParams;

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,

        onProgress: (event) => {
          setProgress(
            (event.loaded / event.total) * 100
          );
        },
      });

      setExistingTour((prev) => ({
        ...prev,
        photos: [
          ...prev.photos,
          uploadResponse.url,
        ],
      }));

      toast.success("Photo Uploaded");

      setProgress(0);

      fileInput.value = "";

    } catch (error) {

      console.log(error);

      if (error instanceof ImageKitAbortError) {
        toast.error("Upload aborted");
      }

      else if (
        error instanceof ImageKitInvalidRequestError
      ) {
        toast.error("Invalid request");
      }

      else if (
        error instanceof ImageKitUploadNetworkError
      ) {
        toast.error("Network error");
      }

      else if (
        error instanceof ImageKitServerError
      ) {
        toast.error("Server error");
      }

      else {
        toast.error("Upload failed");
      }
    }
  };

  // ================= EDIT TOUR =================

  const editTour = async () => {

    try {

      const response = await axios.put(
        `${API_URL}/tours/${id}`,
        existingTour,
        {
          headers: {
            Authorization: `Bearer ${getuserJwtToken()}`,
          },
        }
      );

      if (response.data.success) {

        toast.success("Tour Updated Successfully");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);

      } else {

        toast.error(response.data.message);
      }

    } catch (error) {

      console.log(error);

      if (error.response) {

        toast.error(
          error.response.data.message ||
          "Failed to update tour"
        );

      } else {

        toast.error("Something went wrong");
      }
    }
  };

  return (

    <div className="min-h-screen bg-[#FFECC0]">

      <Navbar />

      {/* ================= TITLE ================= */}

      <h1
        className="
          text-center
          mt-10
          playpen-sans
          text-3xl
          text-[#B95E82]
        "
      >
        Edit Your Travel Story ✈️
      </h1>

      {/* ================= FORM ================= */}

      <div
        className="
          w-[90%]
          md:w-[450px]
          block
          mx-auto
          my-6
          bg-white
          p-7
          rounded-3xl
          shadow-2xl
          border-2
          border-[#FFC29B]
        "
      >

        <Input
          type="text"
          placeholder="Enter Title..."
          value={existingTour.title}
          onChange={(e) => {
            setExistingTour({
              ...existingTour,
              title: e.target.value,
            });
          }}
        />

        <Input
          type="text"
          placeholder="Enter Description..."
          value={existingTour.description}
          onChange={(e) => {
            setExistingTour({
              ...existingTour,
              description: e.target.value,
            });
          }}
        />

        <MultiSelect
          selectedItems={existingTour.cities}
          placeholder="Enter Cities..."
          onAddItem={(val) => {
            setExistingTour({
              ...existingTour,
              cities: [
                ...existingTour.cities,
                val,
              ],
            });
          }}
          onRemoveItem={(val) => {
            setExistingTour({
              ...existingTour,
              cities: existingTour.cities.filter(
                (city) => city !== val
              ),
            });
          }}
        />

        {/* ================= DATES ================= */}

        <div className="flex gap-3">

          <Input
            type="date"
            value={existingTour.startDate}
            onChange={(e) => {
              setExistingTour({
                ...existingTour,
                startDate: e.target.value,
              });
            }}
          />

          <Input
            type="date"
            value={existingTour.endDate}
            onChange={(e) => {
              setExistingTour({
                ...existingTour,
                endDate: e.target.value,
              });
            }}
          />

        </div>

        {/* ================= PHOTOS ================= */}

        <div className="flex gap-3 flex-wrap mt-4">

          {existingTour.photos?.map(
            (photo, index) => (

              <PhotoViewer
                key={index}
                imgUrl={photo}
                index={index}
                showDelete
                onDelete={(url) =>
                  setExistingTour({
                    ...existingTour,
                    photos:
                      existingTour.photos.filter(
                        (p) => p !== url
                      ),
                  })
                }
              />

            )
          )}

        </div>

        {/* ================= FILE INPUT ================= */}

        <div
          className="
            border-2
            border-dashed
            border-[#F39F9F]
            rounded-2xl
            p-5
            text-center
            mt-5
            bg-[#FFF7EE]
          "
        >

          <p className="mb-3 text-[#B95E82]">
            Upload New Photos 📸
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                handleUpload();
              }
            }}
          />

          {progress > 0 && (

            <div className="mt-3 text-[#B95E82]">

              Uploading...
              {" "}
              {Math.round(progress)}%

            </div>

          )}

        </div>

      </div>

      {/* ================= BUTTON ================= */}

      <div className="w-80 block mx-auto mt-8">

        <Button
          title="Update Tour"
          variant="primary"
          size="large"
          onClick={editTour}
        />

      </div>

      <Toaster position="top-center" />

    </div>
  );
}

export default EditTour;