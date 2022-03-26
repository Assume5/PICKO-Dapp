import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import { Abi, Contract, User } from './types/index';
import './dist/main.css';

//components
import { Nav } from './components/Customer/Nav/Nav';
import { Footer } from './components/Customer/Footer/Footer';

import Customer from './pages/Customer/index';

declare var window: any;

const App: React.FC = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [metamask, setMetamask] = useState(false);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        setMetamask(true);
      }
    };

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
      } else {
        alert('Please install Metamask');
      }
    };
    checkMetaMask();
    initContract();
  }, []);
  return (
    <div className="App">
      <Customer contract={contract} />
    </div>
  );
};

export default App;
