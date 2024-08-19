import { ArticleList } from "@/types/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticleLists, postArticleList } from "../services/ArticleListService";

export const UseArticleList = (page:number, articleNo?: string) => {
  const queryClient = useQueryClient();
  const articleQuery = useQuery<ArticleList>({
    queryKey: ["article"],
    queryFn: ()=>getArticleLists(page, articleNo),
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
