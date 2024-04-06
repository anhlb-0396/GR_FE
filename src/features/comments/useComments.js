import { useQuery } from "@tanstack/react-query";
import { fetchCommentsOfCompany } from "../../services/users/commentAPI";

export function useComments(companyId) {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", companyId],
    queryFn: () => fetchCommentsOfCompany(companyId),
  });

  return { isLoading, isError, error, comments };
}
