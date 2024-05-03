import { useQuery } from "@tanstack/react-query";
import { fetchStatisticsByIndustries } from "../../services/users/statisticsAPI";

export function useStatisticsByIndustries() {
  const {
    data: statistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["statistics", "industries"],
    queryFn: fetchStatisticsByIndustries,
  });

  return { isLoading, isError, error, statistics };
}
