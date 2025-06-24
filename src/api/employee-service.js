import instance from "./api";
import { toast } from "../utils/toastService";

export const getEmployeeDetailsList = async () => {
  try {
    const response = await instance.get("employee/getCredentialsAndEmployeeDetailsList");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg || "Failed to get employee list");
  }
};
