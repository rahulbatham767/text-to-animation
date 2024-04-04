export const handleDownloadImage = (imageUrl) => {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg"; // Set desired filename
      a.click();
    })
    .catch((error) => console.error(error));
};
export const videoeDownload = (url) => {
  // Create a temporary anchor element
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "video.mp4"; // Set the default filename for the downloaded file
  anchor.click(); // Trigger the click event programmatically
};
