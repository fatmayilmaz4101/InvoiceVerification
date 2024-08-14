import { ArticleListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getArticleLists = async (): Promise<ArticleListType[]> => {
  const response = await ApiClient.get("/ArticleList");
  return response.data;
};

export const postArticleList = async (
  newArticle: Omit<ArticleListType, "id">
): Promise<ArticleListType[]> => {
  try {
    const response = await ApiClient.post("ArticleList", newArticle);
    return response.data;
  } catch (error: any) {
    throw new Error("Hata:", error);
  }
};
