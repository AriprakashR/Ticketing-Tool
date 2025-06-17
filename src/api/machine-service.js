import instance from "./api";
import { toast } from "../utils/toastService";

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
