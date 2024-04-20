import { useQuery } from "@tanstack/react-query";
import { fetchAllExpectJobsDataByUserId } from "../../services/users/expectJobAPI";

export function useExpectJobs(userId) {
  const {
    data: expectations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["expectJobs", userId],
    queryFn: () => fetchAllExpectJobsDataByUserId(userId),
  });

  return { isLoading, isError, error, expectations };
}
