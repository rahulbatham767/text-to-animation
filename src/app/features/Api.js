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
