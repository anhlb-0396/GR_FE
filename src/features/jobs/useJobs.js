import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../../services/users/jobsAPI";

export function useJobs() {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  return { isLoading, isError, error, jobs };
}
