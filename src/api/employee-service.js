import instance from "./api";
import { toast } from "../utils/toastService";

export const postEmployeeDetails = async (data) => {
  try {
    const response = await instance.post("employee/createNewEmployee", data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.msg || "Failed to submit employee details");
  }
};

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

export const getEmployeeDesignationList = async () => {
  try {
    const response = await instance.get("empDesignation/getAllEmployeeDesignation");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg || "Failed to get designation list");
  }
};
