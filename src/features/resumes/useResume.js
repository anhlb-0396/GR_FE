import { useQuery } from "@tanstack/react-query";
import { fetchResumeByUserId } from "../../services/resumeAPI";

export function useResume(id) {
  const {
    data: resume,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: () => fetchResumeByUserId(id),
  });

  return { isLoading, isError, error, resume, isFetching };
}
