import instance from "./api";

export const postEmployeeLogin = async (data) => {
  try {
    const response = await instance.post("employee/login", data);
    console.log("Login response:", response);
    return response.data;
  } catch (error) {
    alert(error.response?.data?.msg || "Failed to Login");
  }
};
