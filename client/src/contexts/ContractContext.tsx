import React, { createContext, useEffect, useState } from 'react';
import { Contract } from '@src/types';

interface contextType {
  contract: Contract | null;
  setContract: React.Dispatch<React.SetStateAction<Contract | null>>;
}

const contextState = {
  contract: null,
  setContract: () => {},
};

export const ContractContext = createContext<contextType>(contextState);

export const ContractContextProvider: React.FC = (props) => {
  const [contract, setContract] = useState<Contract | null>(null);

  return <ContractContext.Provider value={{ contract, setContract }}>{props.children}</ContractContext.Provider>;
};
