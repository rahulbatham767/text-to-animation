import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User_fetch_Image } from "../../app/features/AnimationSlice";
import toast from "react-hot-toast";

const DragAndDropTextFile = () => {
  const [fileContent, setFileContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const { imgData, darkmode } = useSelector((state) => state.TextAnimation);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);

      // Dispatch action to fetch image data using file content
      dispatch(User_fetch_Image(content))
        .then((response) => {
          console.log(response);
          if (response.status === "error") {
            toast.error(response.message);
          } else if (response.status === "success") {
            toast.success("Image Generated Succesfully..");
          }
          setImageUrl(imgData.image_url); // Assuming imgData contains image URL
        })
        .catch((err) => {
          console.log(err);
        });
      // For demo purposes, set a placeholder image URL
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex justify-center items-center flex-wrap h-screen ${
        darkmode ? "bg-gray-900 text-white" : ""
      }`}
    >
      <div className="flex bg-slate-400 flex-wrap rounded-lg p-3">
        <div
          className={`border-2 border-dashed ${
            darkmode
              ? "bg-gray-800 border-gray-600"
              : "bg-slate-600 border-gray-400"
          } p-4 rounded-lg`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className={`${darkmode ? "text-gray-300" : "text-white"}`}>
            Drag and drop a text file here
          </p>
          <textarea
            className={`mt-2 p-2 border ${
              darkmode
                ? "border-gray-600 bg-gray-800 text-gray-300"
                : "border-gray-400 bg-slate-200 text-black"
            } rounded-lg w-64 h-48`}
            value={fileContent}
            placeholder="Your Content Will Be Shown Here..."
            readOnly
          />
        </div>
      </div>{" "}
      <div
        className={`ml-4 shadow-lg  p-3 ${
          darkmode ? "shadow-purple-400" : "shadow-sky-500"
        }   rounded-lg opacity-55`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Image"
            className="w-64 h-64 object-cover rounded-lg"
          />
        ) : (
          <div
            className={`relative z-500 w-5/6 ${
              darkmode ? "shadow-purple" : "shadow-sky"
            }
           items-center flex justify-center h-52`}
          >
            <p className="text-center  font-semibold text-2xl">
              No image to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropTextFile;
