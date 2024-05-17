import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../services/users/profileAPI";
import { toast } from "react-hot-toast";

export function useUpdateProfile(userId) {
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Lưu thông tin thành công!");
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
    onError: () => toast.error("Lưu thông tin thất bại!"),
  });

  return { isUpdating, updateUserProfile };
}
