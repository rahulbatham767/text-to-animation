import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import VerticalCarousel from "./custom/VerticalCarousel";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false); // Track image generation status
  const [backgroundImage, setBackgroundImage] = useState(false);
  const container = useRef();
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const generateImageForCarousel = async (searchTerm) => {
    setIsGeneratingImage(true); // Set generating state
    const formData = new FormData();
    formData.append("prompt", searchTerm);

    try {
      const response = await axios.post(
        "https://ai-api.magicstudio.com/api/ai-art-generator",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "User-Agent": "Unstabli", // You may need to set the proper user agent
            Origin: "https://magicstudio.com",
          },
        }
      );

      const arrayBuffer = response.data;
      const base64 = btoa(
        String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
      );
      setBackgroundImage(`data:image/png;base64,${base64}`); // Assuming PNG format
      setIsGeneratingImage(false); // Reset generating state
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGeneratingImage(false); // Reset generating state
      // Update state to display error message
    }
  };

  useGSAP(
    () => {
      // Slide in from left animation
      gsap
        .fromTo(".text-move", { x: -300 }, { x: 0, duration: 1.5, rotate: 360 })
        .then(() => {
          // Callback function after animation completes
          const searchBar = document.querySelector(".animate-hidden");
          searchBar.classList.remove("hidden");

          gsap.to(".animate-hidden", { rotateX: true }, { duration: 1 });
        });
    },
    { scope: container }
  );

  return (
    <div className=" mx-auto ">
      <div className=" container flex items-center justify-center flex-wrap">
        <div
          className="z-10 opacity-1 items-center justify-center"
          ref={container}
        >
          <div className="flex flex-col">
            <div className=" text-move text-5xl rounded-sm font-semibold shadow-md mx-auto text-center font-poplin text-white ">
              Welcome To <br /> Text Animation Maker
            </div>
          </div>
          <div className="relative flex items-center rounded-full overflow-hidden hidden animate-hidden bg-gray-100 px-4 py-2 shadow-sm  mx-auto mt-20">
            <input
              type="text"
              className="block w-full px-4 py-2 rounded-l-full border border-transparent focus:outline-none outline-none placeholder-gray-400"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="flex items-center px-4 py-2 rounded-r-full bg-blue-500 text-white hover:bg-blue-700 focus:ring-white transition delay-300"
              onClick={() => generateImageForCarousel(searchTerm)}
              disabled={isGeneratingImage} // Disable button while generating
            >
              {isGeneratingImage ? (
                <span>Generating...</span>
              ) : (
                <FaSearch className="h-5 w-5 animate-spin" />
              )}
            </button>
          </div>
        </div>
        {backgroundImage && (
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          />
        )}
        <div className="ml-5 mt-4">
          <VerticalCarousel data={backgroundImage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
