import { CurrencyType } from "@/app/enums/CurrencyEnum";
import { InvoiceCurrency } from "@/app/enums/InvoiceCurrencyEnum";

export type ArticleListType = {
  ArticleNo: string;
  ArticleName: string;
  Unit: string;
  Description?: string;
  CreatedDate?: Date;
};
export type CompanyPriceListType = {
  CompanyCode: string;
  CompanyName: string;
  ArticleNo: string;
  ArticleName: string;
  UnitPrice: number;
  Unit: string;
  Currency: string;
  Description?: string;
  CreatedDate?: Date;
};

export type CompanyListType = {
  CompanyCode: string;
  CompanyName: string;
  PaymentTerm: number;
  InvoiceCurrency: InvoiceCurrency;
  Description?: string;
  CreatedDate?: Date;
};

export type Country = {
  name: string;
  code: string;
};
