import React from "react";

function Button({ title, onClick, size = "medium", variant = "primary" }) {

  const SIZE_CLASSES = {
    small: "px-2 py-1 text-xs mx-3",
    medium: "px-4 py-2 text-sm mx-4",
    large: "px-6 py-2 text-lg mx-4",
  };

  const VARIANT_CLASSES = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-orange-400 text-black hover:bg-orange-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} rounded playpen-sans cursor-pointer`}
    >
      {title}
    </button>
  );
}

export default Button;