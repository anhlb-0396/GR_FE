import { useQuery } from "@tanstack/react-query";
import { fetchCompanyById } from "../../../services/agents/companyAPI";

export function useCompany(companyId) {
  const {
    data: company,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies", companyId],
    queryFn: () => fetchCompanyById(companyId),
  });

  return { isLoading, isError, error, company };
}
