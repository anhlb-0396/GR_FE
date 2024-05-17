import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpectJob } from "../../services/users/expectJobAPI";
import { toast } from "react-hot-toast";

export function useCreateExpectJobs(userId) {
  const queryClient = useQueryClient();

  const { mutate: createNewExpectJob, isPending: isCreating } = useMutation({
    mutationFn: createExpectJob,
    onSuccess: () => {
      toast.success("Gửi thiết lập gợi ý công việc thành công");
      queryClient.invalidateQueries({ queryKey: ["expectJobs", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewExpectJob };
}
