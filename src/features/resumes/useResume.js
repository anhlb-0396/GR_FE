import { useQuery } from "@tanstack/react-query";
import { fetchResumeByUserId } from "../../services/resumeAPI";

export function useResume(userId) {
  const {
    data: resume,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["resume", userId],
    queryFn: () => fetchResumeByUserId(userId),
  });

  return { isLoading, isError, error, resume, isFetching };
}
