import { CompanyPriceListType } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import { getCompanyPriceLists } from "../services/CompanyPriceListService";

export const UseCompanyPriceLists = () => {
  const companyPriceQuery = useQuery<CompanyPriceListType[]>({
    queryKey: ["companyPrice"],
    queryFn: getCompanyPriceLists,
    staleTime: 300000,
    refetchOnReconnect: true,
  });

  return {
    ...companyPriceQuery,
  };
};
