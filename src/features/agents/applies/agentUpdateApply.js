import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApply } from "../../../services/agents/applyAPI";
import { toast } from "react-hot-toast";

export function useUpdateApply(companyId) {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentApply, isPending: isUpdating } = useMutation({
    mutationFn: updateApply,
    onSuccess: () => {
      toast.success(
        "📧 Gửi mail thông báo và thay đổi trạng thái thành công !"
      );
      queryClient.invalidateQueries({
        queryKey: ["companies", "applies", companyId],
      });
    },
    onError: () => toast.error("Thay đổi trạng thái thất bại !"),
  });

  return { isUpdating, updateCurrentApply };
}
