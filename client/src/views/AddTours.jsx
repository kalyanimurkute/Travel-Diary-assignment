import { useEffect, useState, useRef } from 'react';
import { setPageTitle, getuserJwtToken } from "./../utils.jsx";
import Navbar from '../components/Navbar';
import Input from '../components/Input.jsx';
import MultiSelect from '../components/MultiSelect.jsx';
import Button from '../components/Button.jsx';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViewer from "./../components/PhotoViewer.jsx"


function NewTour() {
  const [newTour, setNewTour] = useState({
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };
  const handleUpload = async () => {

    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey, } = authParams;
    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      setNewTour({
        ...newTour,
        photos: [...newTour.photos, uploadResponse.url],
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
        console.error("Upload error:", error);
      }
    }
  };

  const addTour = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tours`, newTour, {
      headers: {
        Authorization: `Bearer ${getuserJwtToken()}`,
      }
    });
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("failed to add the tours");
    };
  }

  useEffect(() => {
    setPageTitle("New Tour - TinyTours");
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <h1 className='text-center mt-10 playpen-sans text-xl'>Let's Add a New Travel Story</h1>
      <div className='w-85 block mx-auto my-3'>
        <Input type="text"
          placeholder="Enter Title..."
          value={newTour.title}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              title: e.target.value,

            })
          }}
        />
        <Input type="text"
          placeholder="Enter Discription..."
          value={newTour.description}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              description: e.target.value,

            })
          }}
        />

        <MultiSelect
          selectedItems={newTour.cities}
          placeholder={"Enter Cities..."}
          onAddItem={(val) => {
            setNewTour({
              ...newTour,
              cities: [...newTour.cities, val]
            });
          }}
          onRemoveItem={(val) => {
            setNewTour({
              ...newTour,
              cities: newTour.cities.filter((city) => city !== val),
            });
          }}
        />
        <div className='flex gap-2'>
        <Input type="date"
          placeholder="Enter Start Date..."
          value={newTour.startDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              startDate: e.target.value,

            })
          }}
        />
        <Input type="date"
          placeholder="Enter End Date..."
          value={newTour.endDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              endDate: e.target.value,

            })
          }}
        />
        </div>
        <div className="flex gap-2 grid grid-cols-3 gap-3">
          {newTour.photos.map((photo, index) => (
            <PhotoViewer
              key={index}
              imgUrl={photo}
              showDelete
              onDelete={(url) =>
                setNewTour((prev) => ({
                  ...prev,
                  photos: prev.photos.filter((p) => p !== url),
                }))
              }
            />
          ))}
        </div>
       <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center hover:bg-purple-50 transition">
        <p className="text-gray-500 mb-2">📸 Upload Photos</p>

        <input
          type="file"
          ref={fileInputRef}
          className="cursor-pointer"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              handleUpload();
            }
          }}
        />

        {progress > 0 && (
          <div className="mt-3 text-sm text-purple-600">
            Uploading... {Math.round(progress)}%
          </div>
        )}
      </div>
      </div>
      <div className='w-80 block mx-auto mt-10'>
        <Button title="Add Tour"
          varient='primary'
          size='large'
          onClick={addTour}
        />
      </div>
      <Toaster />
    </div>
  )
}

export default NewTour