export enum InvoiceCurrency {
  ForeignCurrencySelling = 1,
  ForeignCurrencyBuying = 2,
  TLForexSelling = 3,
  TLForexBuying = 4,
}

export const InvoiceCurrencyOptions = [
  {
    label: "Foreign Currency Selling",
    value: InvoiceCurrency.ForeignCurrencySelling,
  },
  {
    label: "Foreign Currency Buying",
    value: InvoiceCurrency.ForeignCurrencyBuying,
  },
  { label: "TL Forex Selling", value: InvoiceCurrency.TLForexSelling },
  { label: "TL Forex Buying", value: InvoiceCurrency.TLForexBuying },
];
