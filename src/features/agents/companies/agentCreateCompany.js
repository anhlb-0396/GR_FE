import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCompany } from "../../../services/agents/companyAPI";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  const { mutate: createNewCompany, isPending: isCreating } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      toast.success(
        "Tạo doanh nghiệp mới thành công ! Vui lòng đăng đăng nhập lại để đồng bộ dữ liệu !"
      );
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewCompany };
}
