import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-50 backdrop-blur-md">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};

export default Loader;
