import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../services/companyAPI";

export function useCompanies() {
  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(),
  });

  return { isLoading, isError, error, companies };
}
