import { CompanyPriceListType } from "@/types/service";

export const CompanyPriceListService = {
  getCompanyList() {
    return fetch("/data/company-price-list.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => response.json())
      .then((data) => data as CompanyPriceListType[]);
  },
};
