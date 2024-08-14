import { CompanyPriceListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getCompanyPriceLists = async (): Promise<
  CompanyPriceListType[]
> => {
  const response = await ApiClient.get("/CompanyPriceList");
  console.log(response.data);
  return response.data;
};
export const postCompanyPriceList = async (
  newCompanyPrice: Omit<CompanyPriceListType, "id">
): Promise<CompanyPriceListType[]> => {
  try {
    const response = await ApiClient.post("/CompanyPriceList", newCompanyPrice);
    return response.data;
  } catch (error: any) {
    throw new Error("Hata:", error);
  }
};
