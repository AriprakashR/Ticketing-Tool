import instance from "./api";
import { toast } from "../utils/toastService";

export const postEmployeeLogin = async (data) => {
  try {
    const response = await instance.post("employee/login", data);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.msg || "Failed to Login");
  }
};

export const postEmployeeLogout = async () => {
  try {
    const response = await instance.post("employee/logout");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data?.errorMessege);
    toast.error(error.response?.data?.status || "Failed to Logout");
  }
};
