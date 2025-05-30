import { instance } from "../api/api";

export const postCustomerDetails = async (data) => {
  const newInstance = instance();
  try {
    const response = await newInstance.post(
      `customer/createNewCustomer?compId=1`,
      data
    );
    return response;
  } catch (error) {
    console.log(error.response?.data?.msg);
  }
};
