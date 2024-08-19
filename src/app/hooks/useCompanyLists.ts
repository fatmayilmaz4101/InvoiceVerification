import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCompanyLists,
  postCompanyList,
} from "../services/CompanyListService";
import { CompanyList } from "@/types/service";

export const UseCompanyList = (page:number, companyCode?: string) => {
  const queryClient = useQueryClient();

  const companyQuery = useQuery<CompanyList>({
    queryKey: ["company"],
    queryFn: ()=>getCompanyLists(page, companyCode),
    staleTime: 300000,
    refetchOnReconnect: true,
  });
  const companyMutation = useMutation({
    mutationFn: postCompanyList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
  return {
    ...companyQuery,
    addCompanyMutation: companyMutation.mutate,
  };
};
