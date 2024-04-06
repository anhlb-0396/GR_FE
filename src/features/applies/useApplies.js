import { useQuery } from "@tanstack/react-query";
import { fetchApplies } from "../../services/users/applyAPI";

export function useApplies(userId) {
  const {
    data: applies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["applies", userId],
    queryFn: () => fetchApplies(userId),
  });

  return { isLoading, isError, error, applies };
}
