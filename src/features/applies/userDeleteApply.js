import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApply } from "../../services/users/applyAPI";
import { toast } from "react-hot-toast";

export function useDeleteApply(userId) {
  const queryClient = useQueryClient();

  const { mutate: deleteNewApply, isPending: isDeleting } = useMutation({
    mutationFn: deleteApply,
    onSuccess: () => {
      toast.success("Hủy ứng tuyển việc thành công");
      queryClient.invalidateQueries({ queryKey: ["applies", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNewApply };
}
