import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
        toast.error("Vui lòng đăng nhập để truy cập trang này!");
      }
      if (isAuthenticated && role !== currentUser.role) {
        toast.error("Bạn không có quyền truy cập trang này!");
        navigate("/unauthorize");
      }
    },
    [isAuthenticated, navigate, role, currentUser.role]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
