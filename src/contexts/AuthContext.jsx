import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { toast } from "react-hot-toast";
import { BASE_URL as ROOT_URL } from "../constants/urlConstants";

const BASE_URL = `${ROOT_URL}/users`;

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorageState(
    "currentUser",
    null
  );
  const [token, setToken] = useLocalStorageState("token", null);

  const isAuthenticated = token && currentUser;
  const isAgent = currentUser?.role === "agent";
  const isUser = currentUser?.role === "user";
  const navigate = useNavigate();

  const handleLogin = async (gmail, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        gmail,
        password,
      });

      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }

      setCurrentUser(response.data.data.currentUser);
      setToken(response.data.token);

      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error("Đăng nhập thất bại vui lòng kiểm tra lại thông tin");
    }
  };

  const handleSignup = async (
    gmail,
    password,
    confirmPassword,
    name,
    role = "user"
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        gmail,
        password,
        confirmPassword,
        name,
        role,
      });

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }

      setCurrentUser(response.data.data.currentUser);
      setToken(response.data.token);
      toast.success("Đăng ký thành công");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAgent,
        isUser,
        handleLogin,
        handleLogout,
        token,
        handleSignup,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
