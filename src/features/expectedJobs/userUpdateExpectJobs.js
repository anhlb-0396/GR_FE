import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpectJob } from "../../services/users/expectJobAPI";
import { toast } from "react-hot-toast";

export function useUpdateExpectJobs(userId) {
  const queryClient = useQueryClient();

  const { mutate: updateExistingExpectJob, isPending: isUpdating } =
    useMutation({
      mutationFn: updateExpectJob,
      onSuccess: () => {
        toast.success("Sửa lại thiết lập gợi ý công việc thành công");
        queryClient.invalidateQueries({ queryKey: ["expectJobs", userId] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isUpdating, updateExistingExpectJob };
}
