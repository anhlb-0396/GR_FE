import axios from "axios";
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:3001/api/users";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorageState(
    "currentUser",
    null
  );
  const [token, setToken] = useLocalStorageState("token", null);

  const isAuthenticated = token && currentUser;
  const isAgent = currentUser?.role === "agent";

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
      console.error(error);
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
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAgent,
        handleLogin,
        handleLogout,
        token,
        handleSignup,
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
