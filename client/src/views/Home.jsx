import Navbar from "./../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";

import ImgHero from "../assets/Home-section.png";

function Home() {

  return (

    <div
      className="
        min-h-screen
        m-0
        p-0
        bg-gradient-to-br
        from-[#FFECC0]
        via-[#fff4da]
        to-[#FFC29B]
      "
    >

      <Navbar />

      {/* ================= HERO SECTION ================= */}

      <div
        className="
          flex
          flex-col
          items-center
          justify-center

          px-6
          py-10
        "
      >

        {/* ================= HERO IMAGE ================= */}

        <img
          src={ImgHero}
          alt="home section image"

          className="
            w-[350px]
            md:w-[500px]

            mx-auto

            mt-10

            drop-shadow-2xl

            animate-[float_4s_ease-in-out_infinite]
          "
        />

        {/* ================= TITLE ================= */}

        <h1
          className="
            text-center

            text-5xl
            md:text-6xl

            playpen-sans

            text-[#B95E82]

            font-bold

            mt-8
          "
        >

          Travel Diary

        </h1>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            text-center

            playpen-sans

            text-[#6B4A57]

            text-lg

            mt-5

            max-w-2xl

            leading-8
          "
        >

          Travel the world, discover
          beautiful places, and collect
          unforgettable memories along
          your Travel diary journey.

        </p>

        {/* ================= BUTTON ================= */}

        <div className="text-center mt-8">

          <Button
            title="Get Started"
            variant="primary"
            size="large"

            onClick={() => {
              window.location.href =
                "/dashboard";
            }}
          />

        </div>

      </div>

      <Footer />

      {/* ================= CUSTOM ANIMATION ================= */}

      <style>

        {`

          @keyframes float {

            0% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-20px);
            }

            100% {
              transform: translateY(0px);
            }
          }

        `}

      </style>

    </div>
  );
}

export default Home;