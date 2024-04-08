import React, { useState } from "react";
import {
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  // Import other desired share button components
} from "react-share";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { useEffect } from "react";
const ShareButton = ({ imageUrl }) => {
  const [shareImage, setShareimage] = useState("");
  const blobToDataUrl = (blobUrl) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open("GET", blobUrl);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  useEffect(() => {
    const uploadImageToCloudinary = async () => {
      const imageDataUrl = await blobToDataUrl(imageUrl);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dor9ze1rj/upload`,
          { file: imageDataUrl, upload_preset: "text-to-animation" }
        );
        setShareimage(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    uploadImageToCloudinary();
  }, [imageUrl]);
  return (
    <div className="share-buttons">
      <FacebookShareButton
        url={shareImage}
        quote="Check out this awesome image!"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareImage}
        title="Shared Image"
        hashtag="yourimage"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareImage} title="Shared Image">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <RedditShareButton url={shareImage} title="Shared Image">
        <RedditIcon size={32} round />
      </RedditShareButton>
      {/* Add buttons for other platforms using their respective components and icons */}
    </div>
  );
};

export default ShareButton;
