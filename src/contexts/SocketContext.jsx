import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/urlConstants";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser.id]);

  useEffect(() => {
    if (socket === null) return;

    socket.emit(
      "addNewUser",
      currentUser.id,
      currentUser.company_id,
      currentUser.role
    );

    return () => {};
  }, [socket, currentUser.id, currentUser.company_id, currentUser.role]);

  useEffect(() => {
    if (socket === null) return;

    // Listen for 'agentJobApply' event
    socket.on("agentJobApply", (data) => {
      // Display toast message when 'agentJobApply' event is received
      toast.success(`Thông báo mới: ${data.message}`);
    });

    // Clean up function to remove event listener
    return () => {
      socket.off("agentJobApply");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
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
