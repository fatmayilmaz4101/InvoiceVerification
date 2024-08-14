import { CurrencyType } from "@/app/enums/CurrencyTypeEnum";
import { InvoiceUnit } from "@/app/enums/InvoiceUnitEnum";

export type ArticleListType = {
  ArticleNo: string;
  ArticleName: string;
  Unit: string;
  Description: string;
  CreatedDate?: string;
};
export type CompanyPriceListType = {
  CompanyCode: string;
  CompanyName: string;
  ArticleNo: string;
  ArticleName: string;
  UnitPrice: number;
  Unit: string;
  Currency: string;
  Description: string;
  CreatedDate?: string;
};

export type CompanyListType = {
  CompanyCode: string;
  CompanyName: string;
  PaymentTerm: number;
  InvoiceCurrency: InvoiceUnit;
  Description: string;
  CreatedDate?: string;
};

export type Country = {
  name: string;
  code: string;
};
