import { useQuery } from "@tanstack/react-query";
import { fetchAllResumesOfUser } from "../../services/users/resumeAPI";

export function useResumes(userId) {
  const {
    data: resumes,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["resumes", userId],
    queryFn: () => fetchAllResumesOfUser(userId),
  });

  return { isLoading, isError, error, resumes, isFetching };
}
