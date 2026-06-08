import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  "http://localhost:5000";

const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
}) => {
  const [socket] = useState<Socket>(() =>
    io(SOCKET_URL, {
      transports: ["websocket"],
    })
  );

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(SocketContext);
};