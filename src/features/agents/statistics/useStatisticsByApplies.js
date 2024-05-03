import { useQuery } from "@tanstack/react-query";
import { fetchStatisticsByApplies } from "../../../services/agents/statisticsAPI";

export function useStatisticsByApplies(companyId) {
  const {
    data: statisticsByApplies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["statistics", "applies", companyId],
    queryFn: () => fetchStatisticsByApplies(companyId),
  });

  return { isLoading, isError, error, statisticsByApplies };
}
