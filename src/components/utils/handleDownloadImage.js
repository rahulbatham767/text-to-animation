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
