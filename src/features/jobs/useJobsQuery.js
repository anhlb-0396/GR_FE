import { useQuery } from "@tanstack/react-query";
import { fetchJobsWithQueries } from "../../services/jobsAPI";

export function useJobsQuery(queryString = "") {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["queryJobs"],
    queryFn: () => fetchJobsWithQueries(queryString),
  });

  return { isLoading, isError, error, jobs, refetch };
}
