import instance from "./api";
import { toast } from "../utils/toastService";

export const getLocationListByBranchId = async (branchId) => {
  try {
    const response = await instance.get(`branch/UseBranchIdToGetLocAssignList/${branchId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    toast.error(error.response?.data?.msg || "Failed to get location list");
  }
};
