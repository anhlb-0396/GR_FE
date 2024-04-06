import { useQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "../../services/users/bookmarkAPI";

export function useBookmarks(userId) {
  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => fetchBookmarks(userId),
  });

  return { isLoading, isError, error, bookmarks };
}
