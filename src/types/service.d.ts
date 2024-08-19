import { CurrencyType } from "@/app/enums/CurrencyEnum";
import { InvoiceCurrency } from "@/app/enums/InvoiceCurrencyEnum";

export type ArticleListType = {
  id?: number;
  articleNo: string;
  articleName: string;
  unit: string;
  description?: string;
  createdDate?: Date;
};
export type ArticleList = {
  totalCount: number;
  articleLists: ArticleListType[];
};

export type CompanyPriceListType = {
  companyId: number;
  articleId: number;
  companyCode: string;
  articleNo: string;
  unitPrice: number;
  currency: number;
  description?: string;
  createdDate?: Date;
};
export type FormCompanyPriceListType = {
  companyCode: string;
  articleNo: string;
  unitPrice: number;
  currency: number;
  description?: string;
  createdDate?: Date;
};

export type CompanyPriceList = {
  totalCount: number;
  companyPriceLists: CompanyPriceListType[];
};

export type CompanyListType = {
  id?: number;
  companyCode: string;
  companyName: string;
  paymentTerm: number;
  invoiceCurrency: string;
  description?: string;
  createdDate?: Date;
};
export type CompanyList = {
  totalCount: number;
  companyLists: CompanyListType[];
};
