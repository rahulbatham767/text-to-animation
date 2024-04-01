import React, { useState } from "react";
import ShareButton from "../custom/ShareButton";

const LogoRemover = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [removedImage, setRemovedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    // If original image exists and removed image is not set yet
    if (originalImage && !removedImage) {
      // Implement your logo removal logic here
      // This is just a placeholder
      setRemovedImage(originalImage);
    }
  };

  const handleDownload = () => {
    // Creating a temporary anchor element to download the image
    const anchor = document.createElement("a");
    anchor.href = removedImage;
    anchor.download = "removed_logo.png";
    anchor.click();
  };

  const handleShare = (removedImage) => {
    console.log("Removed Image:", removedImage);
    if (navigator.share) {
      navigator
        .share({
          title: "Share Image",
          text: "Check out this image",
          url: removedImage,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
      // Provide a fallback option for browsers that do not support Web Share API
    }
  };

  return (
    <div className="flex justify-center   items-center  w-full flex-col">
      <div className="p-8 bg-transparent text-white rounded-lg shadow-md flex space-x-8 items-center">
        <h1 className="text-3xl font-bold mb-4">Logo Remover</h1>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

            {originalImage && !removedImage && (
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRemoveLogo}
              >
                Remove Logo
              </button>
            )}
          </div>
        </div>
        <div>
          {originalImage && (
            <div className="mt-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Original Image</h2>
              <img src={originalImage} alt="Original" className="max-w-md" />
            </div>
          )}
        </div>
      </div>
      {removedImage && (
        <div className="mt-8 flex text-white flex-col items-center pb-12">
          <h2 className="text-xl font-semibold mb-4">Removed Logo</h2>
          <div className="relative items-end">
            <img src={removedImage} alt="Removed" className="max-w-md" />
            <div className="absolute bottom-0 right-2 flex justify-between items-center w-full">
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded ml-3 "
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
              <div className="mt-3">
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoRemover;
