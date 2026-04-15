import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { setPageTitle, getuserJwtToken } from "./../utils.jsx";
import Navbar from '../components/Navbar';
import Input from '../components/Input.jsx';
import MultiSelect from '../components/MultiSelect.jsx';
import Button from '../components/Button.jsx';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViewer from "./../components/PhotoViewer.jsx"

function EditTour() {
  const [existingTour, setExistingTour] = useState({
    "title": "",
    "description": "",
    "cities": [],
    "startDate": "",
    "endDate": "",
    "photos": []
  });
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("http://localhost:8080/auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };
  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey, } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      setExistingTour({
        ...existingTour,
        photos: [...existingTour.photos, uploadResponse.url],
      });

      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      console.log(error)
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  const { id } = useParams();

  const loadExistingTour = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getuserJwtToken()}`
        }
      }
    );

    if (response.data.success) {
      const tourData = response.data.data;

      setExistingTour({
        ...tourData,
        startDate: tourData.startDate?.split("T")[0],
        endDate: tourData.endDate?.split("T")[0],
      });
    }
  };
  useEffect(() => {
    loadExistingTour();
  }, [id]);

  const editTour = async () => {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tours/${id}`, existingTour, {
      headers: {
        Authorization: `Bearer ${getuserJwtToken()}`,
      }
    });
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("failed to add the tours");
    }
  };


  useEffect(() => {
    setPageTitle("edit Tour - TinyTours");
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className='text-center mt-10 playpen-sans text-xl'>Edit Your Travel Story</h1>
      <div className='w-85 block mx-auto my-3'>
        <Input type="text"
          placeholder="Enter Title..."
          value={existingTour.title}
          onChange={(e) => {
            setExistingTour({
              ...existingTour,
              title: e.target.value,

            })
          }}
        />
        <Input type="text"
          placeholder="Enter Description..."
          value={existingTour.description}
          onChange={(e) => {
            setExistingTour({
              ...existingTour,
              description: e.target.value,

            })
          }}
        />

        <MultiSelect
          selectedItems={existingTour.cities}
          placeholder={"Enter Cities..."}
          onAddItem={(val) => {
            setExistingTour({
              ...existingTour,
              cities: [...existingTour.cities, val]
            });
          }}
          onRemoveItem={(val) => {
            setExistingTour({
              ...existingTour,
              cities: existingTour.cities.filter((city) => city !== val),
            });
          }}
        />
        <Input type="date"
          placeholder="Enter Start Date..."
          value={existingTour.startDate}
          onChange={(e) => {
            setExistingTour({
              ...existingTour,
              startDate: e.target.value,

            })
          }}
        />
        <Input type="date"
          placeholder="Enter End Date..."
          value={existingTour.endDate}
          onChange={(e) => {
            setExistingTour({
              ...existingTour,
              endDate: e.target.value,

            })
          }}
        />
        <div className="flex gap-x-2 flex-wrap">
          {existingTour.photos?.map((photo, index) => (
            <PhotoViewer
              key={index}
              imgUrl={photo}
              index={index}
              showDelete
              onDelete={(url) =>
                setExistingTour({
                  ...existingTour,
                  photos: existingTour.photos.filter((p) => p !== url),
                })
              }
            />
          ))}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            console.log("file selected");
            console.log(e.target.files)
            if (e.target.files.length > 0) {
              handleUpload();
            }
          }}
        />
        {progress > 0 ? `Uploading...${progress}%` : null}
      </div>
      <div className='w-80 block mx-auto mt-10'>
        <Button title="Edit Tour"
          variant='primary'
          size='large'
          onClick={editTour}
        />
      </div>
      <Toaster />
    </div>
  )
}

export default EditTour