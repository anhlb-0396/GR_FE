import { useQuery } from "@tanstack/react-query";
import { fetchResumeById } from "../../services/users/resumeAPI";

export function useResume(id) {
  const {
    data: resume,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: () => fetchResumeById(id),
  });

  return { isLoading, isError, error, resume, isFetching };
}
