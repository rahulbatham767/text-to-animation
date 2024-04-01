import React, { useState } from "react";

const DragAndDropTextFile = () => {
  const [fileContent, setFileContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
    reader.readAsText(file);

    // For demo purposes, set a placeholder image URL
    setImageUrl("https://via.placeholder.com/150");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center flex-wrap h-screen ">
      <div className="flex bg-slate-400 flex-wrap  rounded-lg p-3">
        <div
          className="border-2 border-dashed bg-slate-600  border-gray-400 p-4 rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-white">Drag and drop a text file here</p>
          <textarea
            className="mt-2 p-2 border border-gray-400 bg-slate-200 rounded-lg w-64 h-48"
            value={fileContent}
            placeholder="Your Content Will Be Shown Here..."
            readOnly
          />
        </div>
      </div>{" "}
      <div className="ml-4 shadow-lg border p-3 rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Image"
            className="w-64 h-64 object-cover rounded-lg"
          />
        ) : (
          <div className="relative z-500 w-5/6 items-center flex justify-center h-52 ">
            <p className=" text-center  shadow-lg  text-white font-semibold text-2xl">
              No image to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropTextFile;
