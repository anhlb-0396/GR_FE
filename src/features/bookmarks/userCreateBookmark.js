import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "../../services/users/bookmarkAPI";
import { toast } from "react-hot-toast";

export function useCreateBookmark(userId) {
  const queryClient = useQueryClient();

  const { mutate: createNewBookmark, isLoading: isCreating } = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      toast.success("Lưu công việc thành công");
      queryClient.invalidateQueries({ queryKey: ["bookmarks", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewBookmark };
}
