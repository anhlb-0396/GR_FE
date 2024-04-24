import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "../../services/users/industryAPI";

export function useIndustries() {
  const {
    data: industries,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchIndustries,
  });

  return { isLoading, isError, error, industries };
}
