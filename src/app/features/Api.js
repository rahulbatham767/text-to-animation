import axios from "axios";

const url = "https://text-to-animation-backend.vercel.app/api/v1/";

export const login = async (data) => {
  const response = await axios.post(url + "user/login", data);
  console.log(response.data);

  return response.data;
};

export const register = async (data) => {
  console.log(data);

  const response = await axios.post(url + "user/register", data);
  console.log(response.data); // Log the response data

  return response.data;
};

export const feedback = async (data) => {
  const response = await axios.post(url + "feedback", data);
  console.log(response);

  return response.data;
};

export const fetchVideo = async (data) => {
  const options = {
    method: "POST",
    url: "https://runwayml.p.rapidapi.com/generate/text",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "6ddce2cb15mshde3d1e0eb400649p1e8504jsn93acfdb0c330",
      "X-RapidAPI-Host": "runwayml.p.rapidapi.com",
    },
    data: {
      text_prompt: data,
      width: 1344,
      height: 768,
      motion: 5,
      seed: 0,
      upscale: true,
      interpolate: true,
    },
  };
  const response = await axios.request(options);

  console.log(response.data);
  return response.data;
};

export const fetchImage = async (data) => {
  const options = {
    method: "POST",
    url: "https://text-to-image-dalle.p.rapidapi.com/generate/reality",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "6ddce2cb15mshde3d1e0eb400649p1e8504jsn93acfdb0c330",
      "X-RapidAPI-Host": "text-to-image-dalle.p.rapidapi.com",
    },
    data: {
      text_query: data,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const saveVideo = async (data) => {
  const response = await axios.post("http://localhost:8080/api/v1/video", data);
  console.log(response);

  return response.data;
};
