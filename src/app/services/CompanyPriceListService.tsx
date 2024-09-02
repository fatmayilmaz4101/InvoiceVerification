import { CompanyPriceList, CompanyPriceListType } from "@/types/service";
import ApiClient from "./ApiClient";
import * as jsonpatch from "fast-json-patch";

export const getCompanyPriceLists = async (
  page: number
): Promise<CompanyPriceList> => {
  const response = await ApiClient.get("/CompanyPriceList", {
    params: { page: page },
  });
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
  return response.data;
};
export const updateCompanyPriceList = async (
  id: number,
  patchData: jsonpatch.Operation[]
): Promise<void> => {
  try {
    const response = await ApiClient.patch(
      `/CompanyPriceList/${id}`,
      patchData
    );
    console.log("Update successful:", response);
  } catch (error: any) {
    console.error("Update error:", error);
  }
};
