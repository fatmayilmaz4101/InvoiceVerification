import { CompanyList, CompanyListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getCompanyLists = async (
  page: number,
  companyCode?: string
): Promise<CompanyList> => {
  const response = await ApiClient.get("/CompanyList", {
    params: { page: page, companyCode: companyCode },
  });
  return {
    companyLists: response.data.companyLists,
    totalCount: response.data.totalCount,
  };
};
export const postCompanyList = async (
  newCompany: Omit<CompanyListType, "id">
): Promise<CompanyListType[]> => {
  try {
    const response = await ApiClient.post("/CompanyList", newCompany);
    return response.data;
  } catch (error: any) {
    throw new Error("Hata:", error);
  }
};
export const getCompanyById = async (id: number): Promise<CompanyListType> => {
  const response = await ApiClient.get(`/CompanyList/${id}`);
  return response.data;
};
