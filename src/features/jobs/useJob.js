import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "../../services/users/jobsAPI";

export function useJob(id) {
  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
  });

  return { isLoading, isError, error, job };
}
