import instance from "./api";
import { toast } from "../utils/toastService";

export const getRegionalDetailsList = async () => {
  try {
    const response = await instance.get("regional/getRegionalDetailsList");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.msg);
    toast.error(error.response?.data?.msg || "Failed to get regional list");
  }
};
