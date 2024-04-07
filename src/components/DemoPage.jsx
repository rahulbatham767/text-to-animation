import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cat from "../assets/cat.png";
import { handleDownloadImage } from "./utils/handleDownloadImage";
import SearchBar from "./custom/SearchBar";
import { useSelector } from "react-redux";
const DemoPage = () => {
  const { darkmode } = useSelector((state) => state.TextAnimation); // Assuming your dark mode state is in Redux store
  const dalleApiKey = import.meta.env.VITE_DALLE_API;
  console.log(dalleApiKey);
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-center   p-16 ${
        darkmode ? "text-white" : "text-black"
      }} `}
    >
      <div className="w-full max-w-xl  px-4 flex pb-14 flex-col items-center justify-center">
        {/* Left side: Input field */}
        <span className="text-5xl mb-6 font-bold "> HOMEPAGE </span>
        <div
          className={`flex flex-col w-full items-center justify-center ${
            darkmode ? "text-white" : "text-black"
          }`}
        >
          <div className="">
            <div
              className={`h-full  ${
                darkmode
                  ? "shadow-purple-500 shadow-sm"
                  : " shadow-blue-300 shadow-lg spread-1 shadow-inset-2 s"
              } bg-opacity-50  rounded-lg p-4 `}
            >
              <p
                className={` p-2 rounded-lg ${
                  darkmode
                    ? "bg-purple-900 bg-opacity-30"
                    : "bg-blue-200 bg-opacity-55"
                } `}
              >
                Black Cat Flying in Basket
              </p>
            </div>

            <div className="mt-4 relative">
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
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700  font-bold py-2 px-2 rounded"
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
