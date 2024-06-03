import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../../services/users/tagAPI";

export function useTags() {
  const {
    data: tags,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  return { isLoading, isError, error, tags };
}
