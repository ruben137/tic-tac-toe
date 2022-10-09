import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";

const SocketContext = React.createContext({ socket: undefined });

export function useSocket() {
  return useContext(SocketContext);
}
interface Props {
  children: React.ReactNode;
}
export function SocketProvider({ children }: Props) {
  const [socket, setSocket] = useState<any>();
  const params = useParams();
  const { id } = params;
  useEffect((): any => {
    if (!id) return;
    const newSocket = io(process.env.REACT_APP_SERVER as string, {
      query: { id },
      path: "/socket.io",
      transports: ["websocket","polling"],
      secure: true,
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
