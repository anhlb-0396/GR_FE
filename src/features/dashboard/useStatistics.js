import { useQuery } from "@tanstack/react-query";
import { fetchStatisticsByUserId } from "../../services/users/statisticsAPI";

export function useStatistics(userId) {
  const {
    data: statistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["statistics", userId],
    queryFn: () => fetchStatisticsByUserId(userId),
  });

  return { isLoading, isError, error, statistics };
}
