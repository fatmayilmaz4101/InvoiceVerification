import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCompanyLists,
  postCompanyList,
} from "../services/CompanyListService";
import { CompanyListType } from "@/types/service";

export const UseCompanyList = () => {
  const queryClient = useQueryClient();

  const companyQuery = useQuery<CompanyListType[]>({
    queryKey: ["company"],
    queryFn: getCompanyLists,
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
