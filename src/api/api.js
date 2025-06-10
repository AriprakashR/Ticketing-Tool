import axios from "axios";

export function getCookieByName(cookiename) {
  // Get name followed by anything except a semicolon
  const cookiestring = RegExp(`${cookiename}=[^;]+`).exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(
    cookiestring ? cookiestring?.toString().replace(/^[^=]+./, "") : ""
  );
}

export const deleteCookie = (name) => {
  document.cookie = name + "=";
};

export function handleApiError(error) {
  console.log(error);
}
// To delete a specific cookie by name, call the function with the cookie name

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = getCookieByName("token1");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
