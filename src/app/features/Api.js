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
console.log(import.meta.env.VITE_DALLE_API);

export const fetchVideo = async (data) => {
  const options = {
    method: "POST",
    url: "https://runwayml.p.rapidapi.com/generate/text",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "537d98ee39msh5066af70b202b07p18ec6fjsnfc8e4ee10ba5",
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
    url: "https://stable-diffusion9.p.rapidapi.com/generate",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_DALLE_API,
      "X-RapidAPI-Host": "stable-diffusion9.p.rapidapi.com",
    },
    data: {
      prompt: data,
      style: "photographic",
      seed: 0,
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
