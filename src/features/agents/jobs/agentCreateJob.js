import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createJob } from "../../../services/agents/jobAPI";

export function useCreateJob(companyId) {
  const queryClient = useQueryClient();

  const { mutate: createNewJob, isPending: isCreating } = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success("Tạo công việc mới thành công");
      queryClient.invalidateQueries({
        queryKey: ["companies", "jobs", companyId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewJob };
}
