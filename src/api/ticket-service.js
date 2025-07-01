import instance from "./api";
import { toast } from "../utils/toastService";

export const postTicketDetails = async (data) => {
  try {
    const response = await instance.post(`ticket/createNewTicketing`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response?.data?.msg || error.response?.data?.errorMessage);
    toast.error(error.response?.data?.msg || error.response?.data?.errorMessage || "Failed to generate ticket");
  }
};

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
