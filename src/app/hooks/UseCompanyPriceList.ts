import { CompanyPriceList } from "@/types/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCompanyPriceLists,
  postCompanyPriceList,
} from "../services/CompanyPriceListService";

export const UseCompanyPriceLists = (page:number) => {
  const queryClient = useQueryClient();

  const companyPriceQuery = useQuery<CompanyPriceList>({
    queryKey: ["companyPrice"],
    queryFn: ()=>getCompanyPriceLists(page),
    staleTime: 300000,
    refetchOnReconnect: true,
  });
  const companyPriceMutation = useMutation({
    mutationFn: postCompanyPriceList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
  return {
    ...companyPriceQuery,
    addCompanyPriceMutation: companyPriceMutation.mutate,
  };
};
