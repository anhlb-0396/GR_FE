import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/urlConstants";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

console.log(SOCKET_SERVER_URL);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useAuth();

  console.log(currentUser);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser.id]);

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
