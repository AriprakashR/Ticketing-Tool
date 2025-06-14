import instance from "./api";
import { toast } from "../utils/toastService";

export const postCustomerDetails = async (data) => {
  try {
    const response = await instance.post(`customer/createNewCustomer`, data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg);
  }
};

export const getCustomerDetailsList = async () => {
  try {
    const response = await instance.get("customer/getCustomerDetailsList");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg || "Failed to get customer list");
  }
};
