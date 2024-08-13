import { ArticleListType } from "@/types/service";

export const ArticleListService = {
  getArticleList() {
    return fetch("/data/stock-list.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => response.json())
      .then((data) => data as ArticleListType[]);
  },
};
