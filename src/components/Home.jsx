import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Get_Status, User_fetchVideo } from "../app/features/AnimationSlice";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false); // Track image generation status
  const [title, Settitle] = useState("");
  const [videoprogress, setVideoprogress] = useState(0);
  const { fetch_Status, error } = useSelector((state) => state.TextAnimation);
  const container = useRef();
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { video_Fetched, fetchedData, success, uuid, darkmode } = useSelector(
    (state) => state.TextAnimation
  );
  const status = useSelector((state) => state.TextAnimation.status);

  const dispatch = useDispatch();
  const videoData = [fetchedData];

  const Get_Video = async (searchTerm) => {
    console.log("get video");
    Settitle(searchTerm);
    dispatch(User_fetchVideo(searchTerm))
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });
  };
  // Assuming searchTerm and uuid are available here

  // Call checkStatusRecursively after dispatching User_fetchVideo

  console.log(videoData);
  const Get_state = () => {
    console.log(fetch_Status);
    dispatch(Get_Status(fetch_Status)).then((response) => {
      console.log(response);
    });
    setVideoprogress(fetchedData.progress);
    if (videoprogress === 1) {
      toast.success("Video Generated Successfully...");
    } else if (videoprogress === "failed") {
      toast.error("Text did not pass content moderation.");
    }
  };

  return (
    <div
      className={` flex flex-col justify-center  items-center p-20 ${
        darkmode ? "text-white" : "text-black"
      }`}
    >
      <div className="  flex items-center justify-center flex-col flex-wrap">
        <div
          className="  flex flex-col items-center text-center "
          ref={container}
        >
          {/* <AnimatedText overlay={false} /> */}
          <h1 className="text-5xl ">Welcome To Text Animation Maker</h1>
          <div className="relative flex items-center rounded-full overflow-hidden text-black animate-hidden bg-gray-100 px-4 py-2  mx-auto mt-20">
            <input
              type="text"
              className="block w-full px-4 py-2 rounded-l-full border border-transparent focus:outline-none outline-none placeholder-gray-400"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              minLength={"10"}
              required
            />
            <button
              type="button"
              className="flex items-center px-4 py-2 rounded-r-full bg-blue-500  hover:bg-blue-700 focus:ring-white transition delay-300"
              onClick={() => {
                if (searchTerm.length === 0) {
                  toast.error("Enter some text to generate a video");
                } else {
                  Get_Video(searchTerm);
                }
              }}
            >
              {isGeneratingImage ? (
                <span>Generating...</span>
              ) : (
                <>
                  <FaSearch className="h-5 w-5 animate-spin" />
                </>
              )}
            </button>
          </div>
          <div className="flex justify-between mt-6 items-center">
            <button
              type="button"
              onClick={() => Get_state()}
              className={`p-4 rounded-lg  z-20 ${
                darkmode ? "text-white" : "text-black"
              } status status.explore Explore`}
            >
              Check Status <span className="icon-right"></span>
              {/* <span className="icon-right after"></span> */}
            </button>
            <p className="">Status: {status}</p>
          </div>
        </div>
        <div className="h-full space-y-3 flex flex-col shadow-lg p-2 m-3">
          {videoData.map(({ status, url, uuid }) => {
            console.log(status, url, uuid);
            return (
              <div
                className="w-[600px] mb-5 items-center justify-center flex relative"
                key={uuid}
              >
                <div className="w-full h-fit">
                  {video_Fetched ? (
                    <div className=" inset-0 flex justify-center flex-col  items-center">
                      Video Generation in Progress...
                      <div className="flex items-center justify-center relative">
                        <div className="w-20 mt-4 h-16 border-t-4   rounded-full animate-spin"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="video-container mt-4 h-full p-4 justify-center flex flex-col items-center">
                      <div>
                        <h1 className=" text-3xl lg:4xl">
                          {success ? title : "Enter Text For Generating Video"}
                        </h1>
                      </div>
                      <div className="flex flex-col mt-6">
                        {Math.floor(videoprogress * 100) === 100 ? (
                          <video controls autoPlay className="mt-5  mx-auto">
                            <source src={url} type="video/mp4" />
                          </video>
                        ) : (
                          <div
                            className="radial-progress"
                            style={{
                              "--value": "70",
                              "--size": "12rem",
                              "--thickness": "2px",
                            }}
                            role="progressbar"
                          >
                            {Math.floor(videoprogress * 100)}
                          </div>
                        )}
                        <div className="button-container-3 mt-2">
                          <span className="mas">Download</span>
                          <button
                            type="button"
                            name="Hover"
                            onClick={() => SaveVideo(url)}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
