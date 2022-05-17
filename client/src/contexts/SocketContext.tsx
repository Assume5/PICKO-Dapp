import React, { createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { serverUrl } from '@src/constants';
import { getCookie } from '../utils/functions';
import { randomBytes } from 'crypto';
import Cookies from 'js-cookie';

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
    if (!Cookies.get('socket-cookie')) {
      const random = [...Array(26)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
      Cookies.set('socket-cookie', random, { expires: 365 });
    }
    const newSocket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      extraHeaders: {
        'socket-cookie': Cookies.get('socket-cookie')!,
      },
    });
    setSocket(newSocket);
    console.log(1);

    return (): any => newSocket.close();
  }, [setSocket]);
  socket?.on('message', (arg) => {
    console.log(arg);
  });

  socket?.on('hello', (arg) => {
    console.log('Some one joined with ID: ', arg);
  });
  return <SocketContext.Provider value={{ socket, setSocket }}>{props.children}</SocketContext.Provider>;
};
