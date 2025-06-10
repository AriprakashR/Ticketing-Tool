import instance from "./api";

export const postCustomerDetails = async (data) => {
  try {
    const response = await instance.post(`/customer/createNewCustomer`, data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data?.msg);
  }
};
