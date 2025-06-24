import instance from "./api";
import { toast } from "../utils/toastService";

export const postMachineDetails = async (data) => {
  try {
    const response = await instance.post(`machine/createNewMachineDetails`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response?.data?.msg || error.response?.data?.errorMessage);
    toast.error(error.response?.data?.msg || error.response?.data?.errorMessage || "Failed to submit machine details");
  }
};

export const getMachineDetailsList = async () => {
  try {
    const response = await instance.get("machine/listOfMachineDetails");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.msg);
    toast.error(error.response?.data?.msg || "Failed to get machine list");
  }
};
