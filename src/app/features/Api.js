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
      "X-RapidAPI-Key": "e2e5f3151amshe78e2ab005afe82p1c4714jsnc518e711f475",
      "X-RapidAPI-Host": "runwayml.p.rapidapi.com",
    },
    data: {
      text_prompt: data,
      width: 768,
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
export const saveVideo = async (data) => {
  const response = await axios.post("http://localhost:8080/api/v1/video", data);
  console.log(response);

  return response.data;
};
