import { useQuery } from "@tanstack/react-query";
import { fetchStatisticsByIndustries } from "../../../services/agents/statisticsAPI";

export function useStatisticsByIndustries(companyId) {
  const {
    data: statisticsByIndustries,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["statistics", "industries", companyId],
    queryFn: () => fetchStatisticsByIndustries(companyId),
  });

  return { isLoading, isError, error, statisticsByIndustries };
}
