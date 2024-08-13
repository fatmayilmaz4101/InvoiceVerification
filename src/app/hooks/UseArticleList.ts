import { ArticleListType } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import { getCompanyPriceLists } from "../services/CompanyPriceListService";

export const UseArticleList = () => {
  const articleQuery = useQuery<ArticleListType[]>({
    queryKey: ["article"],
    queryFn: getCompanyPriceLists,
    staleTime: 300000,
    refetchOnReconnect: true,
  });

  return {
    ...articleQuery,
  };
};
