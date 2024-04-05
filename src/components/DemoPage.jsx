import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cat from "../assets/cat.png";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import SearchBar from "./custom/SearchBar";
import { useSelector } from "react-redux";
const DemoPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { darkmode } = useSelector((state) => state.TextAnimation); // Assuming your dark mode state is in Redux store

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center   p-16">
      <div className="w-full max-w-xl  px-4 flex pb-14 flex-col items-center justify-center">
        {/* Left side: Input field */}
        <span className="text-5xl mb-6 font-semibold text-white">
          {" "}
          DEMO PAGE{" "}
        </span>
        <div
          className={`flex flex-col w-full items-center justify-center ${
            darkmode ? "dark" : ""
          }`}
        >
          <div className="">
            <div className="h-full bg-black bg-opacity-50 rounded-lg p-4 dark:bg-gray-800">
              <p className="text-white p-2 rounded-lg bg-gray-700 bg-opacity-80 dark:bg-opacity-80">
                Black Cat Flying in Basket
              </p>
            </div>

            <div className="m-3 relative">
              <SearchBar navigate={navigate} />
            </div>
          </div>
        </div>
        <div className="p-4">
          {/* Right side: Image */}
          <div className="    mt-7 relative scaleUp rounded-xl  flex items-center justify-center">
            <div className="h-[500px] relative rounded-xl">
              <img
                src={cat}
                alt="Placeholder"
                className={`h-full  relative rounded-xl object-cover `}
              />{" "}
              <button
                onClick={() => handleDownloadImage(cat)}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
