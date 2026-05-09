import { Link } from "react-router";

function Footer() {

  return (

    <footer className="bg-[#B95E82] text-white mt-10 py-8 shadow-inner">

      <div className="text-center w-11/12 mx-auto">

        <div className="mb-4">

          <Link to="/">

            <span className="playpen-sans text-2xl text-[#FFECC0] font-semibold hover:text-white transition">

              Travel Diary

            </span>

          </Link>

        </div>


        <p className="text-sm md:text-base text-[#FFECC0] leading-7 max-w-2xl mx-auto">

          Travel Diary helps you organize and remember your travel experiences.
          Save your tours, explore destinations, and keep your beautiful travel
          memories in one place.

        </p>

        <hr className="border-[#FFC29B] my-5 w-3/4 mx-auto" />

        <p className="text-sm text-[#FFECC0]/90">

          © 2026 Travel Diary. All Rights Reserved.

        </p>

      </div>

    </footer>
  );
}

export default Footer;