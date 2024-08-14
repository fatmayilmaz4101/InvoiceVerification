import { ArticleListType } from "@/types/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompanyPriceLists } from "../services/CompanyPriceListService";
import { getArticleLists, postArticleList } from "../services/ArticleListService";

export const UseArticleList = () => {
  const queryClient = useQueryClient();
  const articleQuery = useQuery<ArticleListType[]>({
    queryKey: ["article"],
    queryFn: getArticleLists,
    staleTime: 300000,
    refetchOnReconnect: true,
  });
  const articleMutation = useMutation({
    mutationFn: postArticleList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });
  return {
    ...articleQuery,
    addArticleMutation: articleMutation.mutate,
  };
};
