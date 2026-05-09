import React from "react";

function Button({
  title,
  onClick,
  size = "medium",
  variant = "primary",
}) {

  // ================= SIZE =================

  const SIZE_CLASSES = {

    small:
      "px-3 py-1 text-xs",

    medium:
      "px-5 py-2 text-sm",

    large:
      "px-7 py-3 text-lg",
  };

  // ================= COLOR THEME =================
  // Palette:
  // #FFECC0
  // #FFC29B
  // #F39F9F
  // #B95E82

  const VARIANT_CLASSES = {

    // Main Rose Purple

    primary:
      `
      bg-[#B95E82]
      text-white
      hover:bg-[#a84f73]
      `,

    // Soft Pink

    secondary:
      `
      bg-[#F39F9F]
      text-white
      hover:bg-[#eb8e8e]
      `,

    // Peach Cream

    tertiary:
      `
      bg-[#FFC29B]
      text-[#5c2d40]
      hover:bg-[#ffb183]
      `,
  };

  return (

    <button
      onClick={onClick}
      className={`
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}

        rounded-xl
        font-medium
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        cursor-pointer
        playpen-sans
      `}
    >

      {title}

    </button>
  );
}

export default Button;