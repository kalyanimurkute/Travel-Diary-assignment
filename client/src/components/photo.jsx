import React from 'react'
import { Link } from 'react-router'
const SIZE_CLASSES = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-lg"
}
function Avtar({ name, size = "md" }) {
    return (
        <Link to={"/profile"}>
            <div className={`text-xl font-bold bg-[#2563EB] cursor-pointer  ${SIZE_CLASSES[size]} flex items-center justify-center rounded-full text-white`}>
                {name?.charAt(0).toUpperCase() || "U"}
            </div></Link>
    )
}

export default Avtar