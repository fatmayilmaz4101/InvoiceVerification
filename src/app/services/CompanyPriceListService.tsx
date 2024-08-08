export const CompanyPriceListService = {
  getCompanyDefinition() {
    return fetch("/data/company-price-list.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => response.json())
      .then((data) => data as Services.CompanyPriceList[]);
  },
};
