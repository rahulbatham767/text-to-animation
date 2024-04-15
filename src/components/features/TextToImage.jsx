import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { User_fetch_Image } from "../../app/features/AnimationSlice";
import cat from "../../assets/cat.png";

import VerticalCarousel from "../custom/VerticalCarousel";
import toast from "react-hot-toast";
import ShareButton from "../custom/ShareButton";
import { handleDownloadImage } from "../utils/handleDownloadImage";

const TexToImage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const container = useRef();

  const { imgData, success, darkmode, message, imgcheck } = useSelector(
    (state) => state.TextAnimation
  );
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const generateImageForCarousel = async (searchTerm) => {
    try {
      const response = await dispatch(User_fetch_Image(searchTerm));

      // Accessing payload values
      const { url, message, status } = response.payload;

      // Displaying toast based on the status
      if (status === "success") {
        toast.success("Image Generated Successfully");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col p-5 ${darkmode ? "text-white" : "text-black"}`}
    >
      <div className="container flex items-center justify-center flex-wrap">
        <div
          className="z-10 opacity-1 items-center justify-center"
          ref={container}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="mt-11">
              {/* <AnimatedText /> */}
              <h1 className="text-5xl text-center">
                Welcome To Text Image Maker
              </h1>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="relative flex items-center justify-center rounded-full overflow-hidden  animate-hidden bg-gray-100 px-4 py-2 shadow-sm mx-auto mt-20">
              <input
                type="text"
                className="block w-full px-4 py-2 rounded-l-full border text-black border-transparent focus:outline-none outline-none placeholder-gray-400 "
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    () => generateImageForCarousel(searchTerm);
                    // Call CustomToast directly inside the event handler
                    CustomToast(darkmode);
                  }
                }}
              />
              <button
                type="button"
                className="flex items-center px-4 py-2 rounded-r-full bg-blue-500 hover:bg-blue-700 focus:ring-white transition delay-300"
                onClick={() => generateImageForCarousel(searchTerm)}
                disabled={isGeneratingImage}
              >
                {isGeneratingImage ? (
                  <span>Generating...</span>
                ) : (
                  <FaSearch className="h-5 w-5 animate-spin" />
                )}
              </button>
            </div>
            <div className="p-4">
              <div className="mt-4 h-full p-4">
                {imgcheck ? (
                  <VerticalCarousel
                    imageUrl={imgData?.url}
                    {...imgData}
                    check={success}
                  />
                ) : (
                  <div className="card w-96 glass relative delay-20 hover:scale-110">
                    <figure>
                      <img
                        src={cat}
                        alt="car!"
                        // Lazy loading attribute
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-actions justify-end absolute bottom-1 right-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDownloadImage(cat)}
                      >
                        Download
                      </button>
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
