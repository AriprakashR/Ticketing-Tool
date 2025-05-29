import axios from "axios";

export const instance = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    headers: {},
  });
};
