import { CompanyPriceList, CompanyPriceListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getCompanyPriceLists = async (
  page: number
): Promise<CompanyPriceList> => {
  const response = await ApiClient.get("/CompanyPriceList", {
    params: { page: page },
  });
  console.log("dataa: ", response.data.companyPriceLists);
  return {
    companyPriceLists: response.data.companyPriceLists,
    totalCount: response.data.totalCount,
  };
};
export const postCompanyPriceList = async (
  newCompanyPrice: CompanyPriceListType
): Promise<CompanyPriceListType[]> => {
  try {
    const response = await ApiClient.post("/CompanyPriceList", newCompanyPrice);
    return response.data;
  } catch (error: any) {
    throw new Error("Hata:", error);
  }
};
export const getCompanyPriceById = async (
  id: number
): Promise<CompanyPriceListType> => {
  const response = await ApiClient.get(`/CompanyPriceList/${id}`);
  console.log("aa: ", response.data);
  return response.data;
};
