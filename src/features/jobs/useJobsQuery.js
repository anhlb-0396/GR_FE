import { useQuery } from "@tanstack/react-query";
import { fetchJobsWithQueries } from "../../services/users/jobsAPI";

export function useJobsQuery(queryString = "") {
  const {
    data: jobs,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["queryJobs"],
    queryFn: () => fetchJobsWithQueries(queryString),
  });

  return { isLoading, isError, error, jobs, refetch, isFetching };
}
