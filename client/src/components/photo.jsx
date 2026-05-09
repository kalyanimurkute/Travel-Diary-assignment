import React from "react";

const SIZE_CLASSES = {

  sm:
    "h-8 w-8 text-sm",

  md:
    "h-10 w-10 text-lg",

  lg:
    "h-14 w-14 text-xl",
};

function Avtar({
  name = "",
  size = "md",
}) {

  const firstLetter =
    name.charAt(0).toUpperCase();

  return (

    <div
      className={`
        ${SIZE_CLASSES[size]}

        rounded-full

        bg-[#F39F9F]

        text-white

        flex
        items-center
        justify-center

        font-bold

        border-2
        border-[#FFECC0]

        shadow-md

        transition-all
        duration-300

        hover:scale-105
      `}
    >

      {firstLetter}

    </div>
  );
}

export default Avtar;