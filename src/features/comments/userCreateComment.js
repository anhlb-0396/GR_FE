import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentOfCompany } from "../../services/commentAPI";
import { toast } from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createComment, isLoading: isCreating } = useMutation({
    mutationFn: createCommentOfCompany,
    onSuccess: () => {
      toast.success("Gửi ý kiến đánh giá thành công");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createComment };
}
