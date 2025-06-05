import { instance } from "./api";
import { useToast } from "../context/ToastContext";

const { showToast } = useToast();

export const postEmployeeLogin = async (data) => {
  const newInstance = instance();
  try {
    const response = await newInstance.post("employee/login", data);
    return response.data;
  } catch (error) {
    showToast(error.response?.data?.msg || "Failed to Login");
  }
};
