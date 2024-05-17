import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateJob } from "../../../services/agents/jobAPI";

export function useUpdateJob(companyId) {
  const queryClient = useQueryClient();

  const { mutate: updateNewJob, isPending: isUpdating } = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      toast.success("Cập nhật công việc mới thành công");
      queryClient.invalidateQueries({
        queryKey: ["companies", "jobs", companyId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateNewJob };
}
