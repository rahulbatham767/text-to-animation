import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cat from "../assets/cat.png";
import { handleDownloadImage } from "./utils/handleDownloadImage";
const DemoPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-fit p-16">
      <div className="w-full max-w-xl  px-4 flex pb-14 max-h-fit h-80">
        {/* Left side: Input field */}
        <div className="w-1/2 ">
          <div className="h-full w-full bg-black bg-opacity-50 rounded-lg p-4">
            <p className="text-white p-2 rounded-lg bg-gray-700 bg-opacity-80">
              Black Cat Flying in Basket
            </p>
          </div>
          <div className="mt-4 relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter text..."
            />
            <button
              className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-md flex items-center justify-center"
              onClick={() => {
                navigate("/login");
              }}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Right side: Image */}
        <div className=" ml-20 h-fit w-6xl relative scaleUp rounded-xl">
          <div className="h-72 rounded-xl">
            <img
              src={cat}
              alt="Placeholder"
              className={`h-full w-full rounded-xl object-contain `}
            />{" "}
          </div>
          <button
            onClick={() => handleDownloadImage(cat)}
            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
