import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewResume } from "../../services/users/resumeAPI";
import { toast } from "react-hot-toast";

export function useCreateResume() {
  const queryClient = useQueryClient();

  const { mutate: createResume, isLoading: isCreating } = useMutation({
    mutationFn: createNewResume,
    onSuccess: () => {
      toast.success("Lưu CV thành công!");
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: () => toast.error("Lưu CV thất bại!"),
  });

  return { isCreating, createResume };
}
