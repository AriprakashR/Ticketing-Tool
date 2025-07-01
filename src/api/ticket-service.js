import instance from "./api";
import { toast } from "../utils/toastService";

export const getTicketDetailsList = async () => {
  try {
    const response = await instance.get("ticket/getListOfTicketingDetails");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.msg);
    toast.error(error.response?.data?.msg || "Failed to get ticket list");
  }
};
