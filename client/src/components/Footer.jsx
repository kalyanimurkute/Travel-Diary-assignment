import { Link } from "react-router";
import Logo from "./../assets/tinytour-logo.png";

function Footer() {
  return (
    <footer className="bg-teal-600 text-white mt-10 py-6">
      <div className="text-center w-11/12 mx-auto">

             <div>
        <Link to="/">
        <img src={Logo} alt="logo" className='h-10 w-10 inline-block' />
        <span className="playpen-sans text-xl">Tiny Tours</span>
        </Link>
      </div>

        <p className="text-sm mb-3">
          TinyTours helps you organize and remember your travel experiences.
          Save your tours, explore destinations, and keep your travel memories
          in one place.
        </p>

          <hr className="border-white/30 my-4" />
          
        <p className="text-sm opacity-80">
          © 2026 Travel Diary. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;