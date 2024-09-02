import { ArticleList, ArticleListType } from "@/types/service";
import ApiClient from "./ApiClient";
import * as jsonpatch from "fast-json-patch";

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
export const getArticleById = async (id: number): Promise<ArticleListType> => {
  const response = await ApiClient.get(`/ArticleList/${id}`);
  return response.data;
};
export const updateArticleList = async (
  id: number,
  patchData: jsonpatch.Operation[]
): Promise<void> => {
  try {
    const response = await ApiClient.patch(`/ArticleList/${id}`, patchData);
    console.log("Update successful:", response);
  } catch (error: any) {
    console.error("Update error:", error);
  }
};
