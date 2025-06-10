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
