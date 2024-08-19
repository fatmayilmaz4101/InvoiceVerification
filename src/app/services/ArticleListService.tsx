import { ArticleList, ArticleListType } from "@/types/service";
import ApiClient from "./ApiClient";

export const getArticleLists = async (
  page: number,
  articleNo?: string
): Promise<ArticleList> => {
  const response = await ApiClient.get("/ArticleList", {
    params: { page: page, articleNo: articleNo },
  });
  return {
    articleLists: response.data.articleLists,
    totalCount: response.data.totalCount,
  };
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
