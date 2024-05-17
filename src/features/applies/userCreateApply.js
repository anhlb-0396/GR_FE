import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApply } from "../../services/users/applyAPI";
import { toast } from "react-hot-toast";

export function useCreateApply(userId) {
  const queryClient = useQueryClient();

  const { mutate: createNewApply, isPending: isCreating } = useMutation({
    mutationFn: createApply,
    onSuccess: () => {
      toast.success(
        "Ứng tuyển việc thành công ! Hãy chờ đợi HR phê duyệt nhé !"
      );
      queryClient.invalidateQueries({ queryKey: ["applies", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewApply };
}
