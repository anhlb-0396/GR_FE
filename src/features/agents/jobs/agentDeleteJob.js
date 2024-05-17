import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteJob } from "../../../services/agents/jobAPI";

export function useDeleteJob(companyId) {
  const queryClient = useQueryClient();

  const { mutate: deleteNewJob, isPending: isDeleting } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Xóa công việc thành công");
      queryClient.invalidateQueries({
        queryKey: ["companies", "jobs", companyId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNewJob };
}
