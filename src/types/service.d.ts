import { CurrencyType } from "@/app/enums/CurrencyEnum";
import { InvoiceCurrency } from "@/app/enums/InvoiceCurrencyEnum";

//Article Types
export type ArticleListType = {
  id: number;
  articleNo: string;
  articleName: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  cost: number;
  description?: string;
  createdDate?: Date;
};
export type ArticleList = {
  totalCount: number;
  articleLists: ArticleListType[];
};
//Company Price List Type
export type CompanyPriceListType = {
  id: number;
  companyId: number;
  articleId: number;
  companyCode: string;
  articleNo: string;
  unitPrice: number;
  currency: number;
  minPrice?: number;
  maxPrice?: number;
  cost?: number;
  description?: string;
  createdDate?: Date;
};
export type FormCompanyPriceListType = {
  companyCode: string;
  articleNo: string;
  unitPrice: number;
  currency: number;
  companyId: number;
  articleId: number;
  description?: string;
  createdDate?: Date;
};

export type CompanyPriceList = {
  totalCount: number;
  companyPriceLists: CompanyPriceListType[];
};
//Company List Type
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
