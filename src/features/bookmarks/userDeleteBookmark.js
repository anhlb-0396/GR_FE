import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark } from "../../services/users/bookmarkAPI";
import { toast } from "react-hot-toast";

export function useDeleteBookmark(userId) {
  const queryClient = useQueryClient();

  const { mutate: deleteNewBookmark, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      toast.success("Bỏ lưu công việc thành công");
      queryClient.invalidateQueries({ queryKey: ["bookmarks", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNewBookmark };
}
