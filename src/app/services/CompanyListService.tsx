import { CompanyListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getCompanyLists = async (): Promise<CompanyListType[]> => {
  const response = await ApiClient.get("/CompanyList");
  console.log(response.data);
  return response.data;
};
export const postCompanyList = async (
  newCompany: Omit<CompanyListType, "id">
): Promise<CompanyListType[]> => {
  try {
    const response = await ApiClient.post("/CompanyList", newCompany);
    return response.data;
  } catch (error) {
    throw new Error("Unable to add new company. Please try again later.");
  }
};
