import { useState, useRef } from "react";

import Navbar from "../components/Navbar";
import Input from "../components/Input.jsx";
import MultiSelect from "../components/Select.jsx";
import Button from "../components/Button.jsx";
import PhotoViewer from "../components/Viewer.jsx";

import axios from "axios";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import {
  getuserJwtToken,
} from "../utils.jsx";

function NewTour() {

  const API_URL =
    import.meta.env.VITE_API_BASE_URL;

  const [newTour, setNewTour] =
    useState({
      title: "",
      description: "",
      cities: [],
      startDate: "",
      endDate: "",
      photos: [],
    });

  const [progress, setProgress] =
    useState(0);

  const fileInputRef = useRef();

  // ================= AUTH =================

  const authenticator = async () => {

    try {

      const res = await fetch(`${API_URL}/auth`);

      if (!res.ok) {
        throw new Error("Auth failed");
      }

      return await res.json();

    } catch (error) {

      console.error(error);

      toast.error(
        "Authentication Failed"
      );

      throw error;
    }
  };

  // ================= HANDLE UPLOAD =================

  const handleUpload = async () => {

    const fileInput =
      fileInputRef.current;

    if (!fileInput.files.length) {

      toast.error(
        "Please select photo"
      );

      return;
    }

    const file =
      fileInput.files[0];

    try {

      const authParams = await authenticator();

      if (!authParams.signature) {
        toast.error("Auth failed");
        return;
      }

      const {
        signature,
        expire,
        token,
        publicKey,
      } = authParams;

      const uploadResponse =
        await upload({

          expire,
          token,
          signature,
          publicKey,

          file,

          fileName:
            file.name,

          onProgress: (event) => {

            setProgress(
              (
                event.loaded /
                event.total
              ) * 100
            );
          },
        });

      setNewTour((prev) => ({
        ...prev,

        photos: [
          ...prev.photos,
          uploadResponse.url,
        ],
      }));

      toast.success(
        "Photo Uploaded"
      );

      setProgress(0);

      fileInput.value = "";

    } catch (error) {

      console.log(error);

      if (
        error instanceof
        ImageKitAbortError
      ) {

        toast.error(
          "Upload aborted"
        );

      } else if (
        error instanceof
        ImageKitInvalidRequestError
      ) {

        toast.error(
          "Invalid request"
        );

      } else if (
        error instanceof
        ImageKitUploadNetworkError
      ) {

        toast.error(
          "Network error"
        );

      } else if (
        error instanceof
        ImageKitServerError
      ) {

        toast.error(
          "Server error"
        );

      } else {

        toast.error(
          "Upload failed"
        );
      }
    }
  };

  // ================= ADD TOUR =================

  const addTour = async () => {

    if (
      !newTour.title ||
      !newTour.description
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      const response =
        await axios.post(

          `${API_URL}/tours`,

          newTour,

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
          "Tour Added Successfully"
        );

        setNewTour({
          title: "",
          description: "",
          cities: [],
          startDate: "",
          endDate: "",
          photos: [],
        });

      } else {

        toast.error(
          "Failed to Add Tour"
        );
      }

    } catch (error) {

      console.error(error);

      if (error.response) {

        toast.error(
          error.response.data.message
        );

      } else if (
        error.request
      ) {

        toast.error(
          "No response from server"
        );

      } else {

        toast.error(
          "Something went wrong"
        );
      }
    }
  };

  return (

    <div
      className="
        min-h-screen

        bg-gradient-to-br
        from-[#FFECC0]
        via-[#fff4da]
        to-[#FFC29B]

        pb-10
      "
    >

      <Navbar />

      {/* ================= TITLE ================= */}

      <h1
        className="
          text-center
          mt-10

          text-3xl

          playpen-sans

          text-[#B95E82]

          font-semibold
        "
      >

        Add Your Travel Story

      </h1>

      {/* ================= FORM ================= */}

      <div
        className="
          w-[90%]
          md:w-[500px]

          mx-auto

          mt-8

          bg-white/80

          backdrop-blur-md

          border
          border-[#FFC29B]

          rounded-3xl

          shadow-2xl

          p-8
        "
      >

        {/* ================= TITLE ================= */}

        <Input
          type="text"
          placeholder="Enter Title..."
          value={newTour.title}

          onChange={(e) =>
            setNewTour({
              ...newTour,
              title:
                e.target.value,
            })
          }
        />

        {/* ================= DESCRIPTION ================= */}

        <Input
          type="text"
          placeholder="Enter Description..."
          value={newTour.description}

          onChange={(e) =>
            setNewTour({
              ...newTour,
              description:
                e.target.value,
            })
          }
        />

        {/* ================= CITIES ================= */}

        <MultiSelect
          selectedItems={
            newTour.cities
          }

          placeholder="Enter Cities..."

          onAddItem={(val) =>
            setNewTour({
              ...newTour,

              cities: [
                ...newTour.cities,
                val,
              ],
            })
          }

          onRemoveItem={(val) =>
            setNewTour({
              ...newTour,

              cities:
                newTour.cities.filter(
                  (city) =>
                    city !== val
                ),
            })
          }
        />

        {/* ================= DATES ================= */}

        <div className="flex gap-3">

          <Input
            type="date"

            value={
              newTour.startDate
            }

            onChange={(e) =>
              setNewTour({
                ...newTour,

                startDate:
                  e.target.value,
              })
            }
          />

          <Input
            type="date"

            value={
              newTour.endDate
            }

            onChange={(e) =>
              setNewTour({
                ...newTour,

                endDate:
                  e.target.value,
              })
            }
          />

        </div>

        {/* ================= PHOTOS ================= */}

        <div
          className="
            grid
            grid-cols-3
            gap-3
            mt-5
          "
        >

          {newTour.photos.map(
            (
              photo,
              index
            ) => (

              <PhotoViewer
                key={index}
                imgUrl={photo}

                showDelete

                onDelete={(url) =>
                  setNewTour(
                    (prev) => ({
                      ...prev,

                      photos:
                        prev.photos.filter(
                          (p) =>
                            p !== url
                        ),
                    })
                  )
                }
              />
            )
          )}

        </div>

        {/* ================= FILE UPLOAD ================= */}

        <div
          className="
            mt-6

            border-2
            border-dashed
            border-[#F39F9F]

            bg-[#FFECC0]/50

            rounded-2xl

            p-6

            text-center
          "
        >

          <p
            className="
              text-[#B95E82]
              font-medium
              mb-3
            "
          >

            Upload Tour Photos

          </p>

          <input
            type="file"

            ref={fileInputRef}

            className="
              cursor-pointer

              text-sm

              text-[#5A3444]
            "

            onChange={(e) => {

              if (
                e.target.files.length > 0
              ) {

                handleUpload();
              }
            }}
          />

          {/* ================= PROGRESS ================= */}

          {
            progress > 0 && (

              <div className="mt-4">

                <div
                  className="
                    w-full
                    h-3

                    bg-[#FFECC0]

                    rounded-full

                    overflow-hidden
                  "
                >

                  <div
                    className="
                      h-full

                      bg-[#B95E82]

                      transition-all
                    "
                    style={{
                      width:
                        `${progress}%`,
                    }}
                  />

                </div>

                <p
                  className="
                    text-sm
                    mt-2

                    text-[#B95E82]
                  "
                >

                  Uploading...
                  {" "}
                  {Math.round(
                    progress
                  )}%

                </p>

              </div>
            )
          }

        </div>

        {/* ================= BUTTON ================= */}

        <div className="mt-8 text-center">

          <Button
            title="Add Tour"
            variant="primary"
            size="large"
            onClick={addTour}
          />

        </div>

      </div>

      <Toaster />

    </div>
  );
}

export default NewTour;