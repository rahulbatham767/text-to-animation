import React, { useContext, useEffect, useState } from "react";

const Loader = ({ display }) => {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(JSON.parse(localStorage.getItem("loading")));
  }, [loading]);
  return (
    <div
      className={`fixed ${
        loading ? "block" : "hidden"
      } top-0  left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-50 backdrop-blur-md`}
    >
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};

export default Loader;
