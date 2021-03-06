import React, { createContext, useEffect, useState } from 'react';
import { Abi, Contract } from '@src/types';
import Web3 from 'web3';
import SimpleStorageContract from '../contracts/SimpleStorage.json';

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

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const contractNetwork: any = SimpleStorageContract.networks;
        const deployedNetwork = contractNetwork[networkId];
        const contract = await new web3.eth.Contract(
          SimpleStorageContract.abi as Abi[],
          deployedNetwork && deployedNetwork.address,
        );
        setContract(contract);
      }
    };
    initContract();
  }, []);

  return <ContractContext.Provider value={{ contract, setContract }}>{props.children}</ContractContext.Provider>;
};
