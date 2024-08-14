export enum InvoiceCurrency {
  ForeignCurrencySelling = 1,
  ForeignCurrencyBuying,
  TLForexSelling,
  TLForexBuying,
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
