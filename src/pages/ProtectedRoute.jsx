import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAgent } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
        toast.error("Vui lòng đăng nhập để truy cập trang này!");
      }
      if (isAuthenticated && role === "agent" && !isAgent) {
        toast.error("Bạn không có quyền truy cập trang này!");
        navigate("/unauthorize");
      }
    },
    [isAuthenticated, navigate, role, isAgent]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
