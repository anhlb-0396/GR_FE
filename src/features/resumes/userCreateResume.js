import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewResume,
  createNewPdfResume,
} from "../../services/users/resumeAPI";
import { toast } from "react-hot-toast";

export function useCreateResume(userId) {
  const queryClient = useQueryClient();

  const { mutate: createResume, isPending: isCreating } = useMutation({
    mutationFn: createNewResume,
    onSuccess: () => {
      toast.success("Lưu CV thành công!");
      queryClient.invalidateQueries({ queryKey: ["resumes", userId] });
    },
    onError: () => toast.error("Lưu CV thất bại!"),
  });

  return { isCreating, createResume };
}

export function useCreatePdfResume(userId) {
  const queryClient = useQueryClient();

  const { mutate: createPdfResume, isLoading: isCreating } = useMutation({
    mutationFn: createNewPdfResume,
    onSuccess: () => {
      toast.success("Lưu CV thành công!");
      queryClient.invalidateQueries({ queryKey: ["resumes", userId] });
    },
    onError: () => toast.error("Lưu CV thất bại!"),
  });

  return { isCreating, createPdfResume };
}
