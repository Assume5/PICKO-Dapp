import React, { createContext, useState } from 'react';
import { User } from '@src/types';

interface contextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const contextState = {
  user: { login: false },
  setUser: () => {},
};

export const UserContext = createContext<contextType>(contextState);

export const UserContextProvider: React.FC = (props) => {
  const [user, setUser] = useState<User>({ login: false });
  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};
