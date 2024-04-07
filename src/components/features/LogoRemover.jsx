import React, { useState } from "react";
import ShareButton from "../custom/ShareButton";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoad } from "../../app/features/AnimationSlice";
import axios from "axios";
import toast from "react-hot-toast";
const LogoRemover = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [removedImage, setRemovedImage] = useState(null);
  const [blobimage, setBlobimage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setBlobimage(file);
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const { darkmode } = useSelector((state) => state.TextAnimation);
  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const dispatch = useDispatch();

  const handleRemoveLogo = async () => {
    dispatch(CustomLoad(true));
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", blobimage);

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Api-Key": process.env.BG_REMOVER,
          },
        }
      );

      const url = URL.createObjectURL(new Blob([response.data]));
      setRemovedImage(url);
      toast.success("Background Removed Successfully");
    } catch (error) {
      console.error("Error removing logo:", error);
      toast.error("Error removing logo:", error);
    }
    dispatch(CustomLoad(false));
  };

  const handleDownload = () => {
    // Creating a temporary anchor element to download the image
    const anchor = document.createElement("a");
    anchor.href = removedImage;
    anchor.download = "removed_logo.png";
    anchor.click();
  };

  return (
    <div
      className={`flex justify-center   items-center   w-full flex-col ${
        darkmode ? "text-white" : "text-black"
      }`}
    >
      <div className="p-8 bg-transparent  rounded-lg w-full flex flex-col flex-wrap  space-x-4 justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Background Remover</h1>
          <div className="flex flex-col items-center">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div
              className="mt-4 border-2 border-dashed border-gray-400 rounded-lg w-80 h-40 flex justify-center items-center cursor-pointer"
              onDrop={handleImageDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <p>Drag & Drop Image Here</p>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-evenly flex-wrap shadow-lg w-full container mt-5 p-4 ">
          <div>
            {originalImage && (
              <div className="mt-8 flex flex-col items-center shadow-lg drop-shadow-3xl  p-3 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Original Image</h2>
                <div className="h-[500px]">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="object-cover h-full rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 flex flex-col items-center w-full xl:w-auto lg:w-auto md:w-full">
            <section className="centered-container rounded-full flex items-center flex-wrap ">
              <button
                className="link  flex link--arrowed"
                onClick={handleRemoveLogo}
              >
                <div className="flex items-center">
                  <div>
                    {originalImage
                      ? "Click To Remove The Background"
                      : "Upload Your Photo"}
                  </div>
                  <svg
                    className="arrow-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <g
                      fill="none"
                      stroke="#2175FF"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                    >
                      <circle
                        className="arrow-icon--circle"
                        cx="16"
                        cy="16"
                        r="15.12"
                      />
                      <path
                        className="arrow-icon--arrow"
                        d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"
                      />
                    </g>
                  </svg>
                </div>
              </button>
            </section>
          </div>
          <div>
            {removedImage && (
              <div className=" flex  flex-col items-center justify-center space-x-7 ">
                <div className="relative items-end">
                  <div className="h-[500px] items-center flex flex-col shadow-lg drop-shadow-3xl  p-3 rounded-lg">
                    <h2 className="text-xl font-semibold ">
                      Removed Background
                    </h2>
                    <img
                      alt="Removed"
                      src={removedImage}
                      className="h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="absolute bottom-0 right-2 flex justify-between items-center w-full">
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-3 text-sm rounded ml-3 bottom-1 "
                        onClick={handleDownload}
                      >
                        Download
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-3 text-sm rounded ml-3 bottom-1 "
                        onClick={() => {
                          setRemovedImage("");
                          setOriginalImage("");
                          setBlobimage("");
                          toast.success("Image removed successfully");
                        }}
                      >
                        Clear
                      </button>
                    </div>

                    <div className="mt-3">
                      <ShareButton imageUrl={removedImage} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoRemover;
