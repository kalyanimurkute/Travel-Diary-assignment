import React, { useState } from "react";

import {
  X,
  Trash2,
} from "lucide-react";



function PhotoPreview({
  imgUrl,
  show,
  onClose,
}) {

  if (!show) return null;

  const handleBackdropClick = (e) => {

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (

    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/80

        backdrop-blur-sm

        p-4
      "
      onClick={handleBackdropClick}
    >


      <button
        onClick={onClose}
        className="
          absolute
          top-5
          right-5

          bg-[#B95E82]

          text-white

          p-2

          rounded-full

          hover:bg-[#a84f73]

          transition

          shadow-lg

          cursor-pointer
        "
        aria-label="Close preview"
      >

        <X size={28} />

      </button>

  

      <img
        src={imgUrl}
        alt="preview"

        className="
          max-w-3xl
          max-h-[85vh]

          rounded-3xl

          object-contain

          border-4
          border-[#FFECC0]

          shadow-2xl
        "

        onClick={(e) => e.stopPropagation()}
      />

    </div>
  );
}


function PhotoViewer({
  imgUrl,
  index,
  onDelete,
  showDelete = false,
}) {

  const [showPreview, setShowPreview] =
    useState(false);

  return (

    <div
      className="
        relative

        w-fit

        rounded-2xl

        overflow-hidden

        shadow-md
        hover:shadow-xl

        transition-all
        duration-300
      "
    >

   

      <img
        key={index}

        src={imgUrl}

        alt={`Tour Photo ${index + 1}`}

        className="
          w-28
          h-28

          object-cover

          cursor-pointer

          hover:scale-105

          transition-all
          duration-300
        "

        onClick={() => setShowPreview(true)}
      />

  
      {
        showDelete && (

          <button
            className="
              absolute
              top-2
              right-2

              bg-white/90

              p-1.5

              rounded-full

              shadow-md

              hover:bg-red-500
              hover:text-white

              transition

              cursor-pointer
            "

            onClick={() => onDelete(imgUrl)}
          >

            <Trash2 className="h-4 w-4" />

          </button>
        )
      }

      

      <PhotoPreview
        imgUrl={imgUrl}
        show={showPreview}
        onClose={() => setShowPreview(false)}
      />

    </div>
  );
}

export default PhotoViewer;