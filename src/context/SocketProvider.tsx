"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = (): SocketContextProps => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
  url: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, url }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
