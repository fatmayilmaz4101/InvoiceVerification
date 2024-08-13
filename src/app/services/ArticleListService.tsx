import { ArticleListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getArticleLists = async (): Promise<ArticleListType[]> => {
  const response = await ApiClient.get("/ArticleList");
  return response.data;
};
