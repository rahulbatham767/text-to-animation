import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
// import VerticalCarousel from "./custom/VerticalCarousel";
import { useSelector, useDispatch } from "react-redux";
import { User_fetch_Image } from "../../app/features/AnimationSlice";
import cat from "../../assets/cat.png";
import VerticalCarousel from "../custom/VerticalCarousel";
const TexToImage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false); // Track image generation status
  const [backgroundImage, setBackgroundImage] = useState(false);
  const container = useRef();

  const { imgData, success, imgfetch } = useSelector(
    (state) => state.TextAnimation
  );
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const generateImageForCarousel = async (searchTerm) => {
    dispatch(User_fetch_Image(searchTerm));
    setIsGeneratingImage(false); // Set generating state
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
    <div className="flex flex-col ">
      <div className=" container flex items-center justify-center flex-wrap">
        <div
          className="z-10 opacity-1 items-center justify-center"
          ref={container}
        >
          <div className="flex flex-col justify-center items-center">
            <div className=" text-move text-5xl rounded-sm font-semibold shadow-md mx-auto text-center font-poplin text-white ">
              Welcome To <br /> Text Image Maker
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="relative flex items-center justify-center rounded-full overflow-hidden hidden animate-hidden bg-gray-100 px-4 py-2 shadow-sm  mx-auto mt-20">
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
            <div className="p-4">
              <div className=" mt-4 h-full p-4">
                {imgfetch ? (
                  <VerticalCarousel
                    imageUrl={imgData.image_url}
                    {...imgData}
                    check={success}
                  />
                ) : (
                  <div className="card w-96 glass relative delay-20  hover:scale-110 ">
                    <figure>
                      <img src={cat} alt="car!" />
                    </figure>

                    <div className="card-actions justify-end absolute bottom-1 right-2">
                      <button className="btn btn-primary">Download</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TexToImage;
