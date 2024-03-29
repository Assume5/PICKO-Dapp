import React, { createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { serverUrl } from '@src/constants';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

interface contextType {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

const contextState = {
  socket: null,
  setSocket: () => {},
};

export const SocketContext = createContext<contextType>(contextState);

export const SocketContextProvider: React.FC = (props) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      query: {
        'socket-cookie': Cookies.get('socket-cookie')!,
      },
    });
    setSocket(newSocket);

    return (): any => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!Cookies.get('socket-cookie')) return;
    socket && socket.emit('JOIN', Cookies.get('socket-cookie'));

    return () => {
      socket?.off('JOIN');
    };
  }, [socket]);

  // socket && socket.emit('JOIN', Cookies.get('socket-cookie'));

  socket?.on('message', (arg) => {
    console.log(arg);
  });

  socket?.on('hello', (arg) => {
    console.log('Some one joined with ID: ', arg);
  });

  return <SocketContext.Provider value={{ socket, setSocket }}>{props.children}</SocketContext.Provider>;
};
