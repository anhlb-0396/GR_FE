import { useQuery } from "@tanstack/react-query";
import { fetchAppliesOfCompany } from "../../../services/agents/applyAPI";

export function useApplies(companyId) {
  const {
    data: applies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies", "applies", companyId],
    queryFn: () => fetchAppliesOfCompany(companyId),
  });

  return { isLoading, isError, error, applies };
}
