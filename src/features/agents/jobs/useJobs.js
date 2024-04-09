import { useQuery } from "@tanstack/react-query";
import { fetchJobsByCompanyId } from "../../../services/agents/jobAPI";

export function useJobs(companyId) {
  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies", "jobs", companyId],
    queryFn: () => fetchJobsByCompanyId(companyId),
  });
  return { isLoading, isError, error, jobs };
}
