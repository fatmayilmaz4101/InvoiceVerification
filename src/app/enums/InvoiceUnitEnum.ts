export enum InvoiceCurrency {
  DovizFaturaSatisKuru = 1,
  DovizFaturaAlisKuru = 2,
  TlFaturaSatisKuru = 3,
  TlFaturaAlisKuru = 4,
}

export const InvoiceCurrencyOptions = [
  {
    label: "Döviz Fatura Satış Kuru",
    value: InvoiceCurrency.DovizFaturaSatisKuru,
  },
  {
    label: "Döviz Fatura Alış Kuru",
    value: InvoiceCurrency.DovizFaturaAlisKuru,
  },
  { label: "TL Fatura Satış Kuru", value: InvoiceCurrency.TlFaturaSatisKuru },
  { label: "TL Fatura Alış Kuru", value: InvoiceCurrency.TlFaturaAlisKuru },
];
