import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const BASE_URL = "http://localhost:3001/api/users";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorageState(
    "currentUser",
    null
  );
  const [token, setToken] = useLocalStorageState("token", null);

  const isAuthenticated = token && currentUser;

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, handleLogin, handleLogout, token }}
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
