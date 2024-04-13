import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/urlConstants";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const newSocket = io(SOCKET_SERVER_URL);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket === null || !currentUser || !currentUser.id) return;

    socket.emit(
      "addNewUser",
      currentUser.id,
      currentUser.company_id,
      currentUser.role
    );

    return () => {};
  }, [socket, currentUser]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("agentJobApply", (data) => {
      toast.success(`Thông báo mới: ${data.message}`);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("agentJobApply");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined)
    throw new Error("SocketContext was used outside the SocketProvider");
  return context;
}

export { SocketProvider, useSocket };
