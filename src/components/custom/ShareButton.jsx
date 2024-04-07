import React from "react";
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
const ShareButton = ({ imageUrl }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton url={imageUrl} quote="Check out this awesome image!">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={imageUrl}
        title="Shared Image"
        hashtag="yourimage"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={imageUrl} title="Shared Image">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <RedditShareButton url={imageUrl} title="Shared Image">
        <RedditIcon size={32} round />
      </RedditShareButton>
      {/* Add buttons for other platforms using their respective components and icons */}
    </div>
  );
};

export default ShareButton;
