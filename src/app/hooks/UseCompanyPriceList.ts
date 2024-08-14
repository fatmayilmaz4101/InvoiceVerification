import { CompanyPriceListType } from "@/types/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCompanyPriceLists,
  postCompanyPriceList,
} from "../services/CompanyPriceListService";

export const UseCompanyPriceLists = () => {
  const queryClient = useQueryClient();
  const companyPriceQuery = useQuery<CompanyPriceListType[]>({
    queryKey: ["companyPrice"],
    queryFn: getCompanyPriceLists,
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
