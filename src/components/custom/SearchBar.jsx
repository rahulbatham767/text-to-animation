import React from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ navigate }) => {
  const { darkmode } = useSelector((state) => state.TextAnimation);
  console.log(darkmode);
  return (
    <div
      className={`bg-${
        darkmode ? "gray-800" : "gray-100"
      } flex flex-col justify-center rounded-full`}
    >
      <div className="relative w-full sm:max-w-2xl sm:mx-auto">
        <div className="overflow-hidden z-0 rounded-full relative p-3">
          <form
            role="form"
            className="relative flex z-50 bg-white rounded-full"
          >
            <input
              type="text"
              placeholder="enter your search here"
              className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
            />
            <button
              className="bg-indigo-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none"
              onClick={() => {
                navigate("/login");
              }}
            >
              Search
            </button>
          </form>
          <div
            className={`glow glow-1 z-10 ${
              darkmode ? "bg-pink-400" : "bg-yellow"
            } absolute`}
          ></div>
          <div
            className={`glow glow-2 z-20 ${
              !darkmode ? "bg-purple-400" : "bg-blue"
            } absolute`}
          ></div>
          <div
            className={`glow glow-3 z-30 ${
              !darkmode ? "bg-yellow-400" : "bg-red"
            } absolute`}
          ></div>
          <div
            className={`glow glow-4 z-40 ${
              !darkmode ? "bg-blue-400" : "bg-purple"
            }  absolute`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
