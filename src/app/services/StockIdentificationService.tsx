export const StockIdentificationService = {
  getStockIdentification() {
    return fetch("/data/stock-identification.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => response.json())
      .then((data) => data as Services.StockIdentification[]);
  },
};
