import instance from "./api";
import { toast } from "../utils/toastService";

export const postProductDetails = async (data) => {
  try {
    const response = await instance.post(`product/createNewProduct`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg);
  }
};

export const getGeneratedPrdCode = async () => {
  try {
    const response = await instance.get("product/generatePrdCode");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg);
  }
};

export const getProductDetailsList = async () => {
  try {
    const response = await instance.get("product/getAllProducts");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data?.msg);
    toast.error(error.response?.data?.msg);
  }
};
