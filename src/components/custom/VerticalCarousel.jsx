import React, { useState } from "react";

const VerticalCarousel = ({ imageUrl, success, check }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  console.log(imageUrl);
  return (
    <div className=" p-4 ">
      <div className="relative overflow-hidden inline-block  rounded-lg flex items-center justify-center">
        <div className=" lg:w-3/4 p-2 shadow-lg rounded-lg">
          {check ? (
            <div>
              <img
                src={imageUrl}
                alt="Your Image"
                className={`transition-transform rounded-xl duration-300 object-cover h-full ${
                  isZoomed ? "transform scale-125" : "transform scale-100"
                }`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              />{" "}
              <button
                onClick={() => handleDownloadImage(cat)}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
              >
                Download
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center relative">
              <div className="w-20 mt-4 h-16 border-t-4   rounded-full animate-spin">
                {success}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
