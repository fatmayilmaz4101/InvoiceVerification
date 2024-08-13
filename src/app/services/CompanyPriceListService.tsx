import { CompanyPriceListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getCompanyPriceLists = async (): Promise<
  CompanyPriceListType[]
> => {
  const response = await ApiClient.get("/CompanyPriceList");
  return response.data;
};
