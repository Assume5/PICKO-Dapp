import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

import { CartContextProvider, ContractContext, UserContextProvider } from '@src/contexts';

//pages customer
import { Account as CustomerAccount } from './Customer/Account/Account';
import { Eat } from './Customer/Eat/Eat';
import { Home as CustomerHome } from './Customer/Home/Home';
import { LeafletMap } from './Customer/LeafletMap/LeafletMap';
import { Order as CustomerOrder } from './Customer/Order/Order';
import { Restaurant } from './Customer/Restaurant/Restaurant';

//pages store owner
import { Home as StoreHome } from './Owner/Home/Home';

//components
import { Footer } from '@src/components/Global/Footer/Footer';
import { Nav } from '@src/components/Global/Nav/Nav';
import { ScrollToTop } from '@src/components/Global/ScrollToTop/ScrollToTop';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import { Abi, Contract } from '@src/types';

declare var window: any;
export const Page = () => {
  const contractCtx = useContext(ContractContext);
  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        console.log(`networkId: ${networkId}`);
        const contractNetwork: any = SimpleStorageContract.networks;
        const deployedNetwork = contractNetwork[networkId];
        console.log(contractNetwork, deployedNetwork);
        const contract = await new web3.eth.Contract(
          SimpleStorageContract.abi as Abi[],
          deployedNetwork && deployedNetwork.address,
        );
        console.log('Contract: ');
        console.log(contract);
        contractCtx.setContract(contract);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await contract.methods.set(5).send({ from: accounts[0] });
        const response = await contract.methods.get().call();
        console.log(response);
      } else {
        alert('Please install Metamask');
      }
    };
    initContract();
  }, []);
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Nav />
            <Routes>
              <Route path="/" element={<CustomerHome />} />
              <Route path="/restaurant/*" element={<Restaurant />} />
              <Route path="/map" element={<LeafletMap />} />
              <Route path="/eat" element={<Eat />} />
              <Route path="/account" element={<CustomerAccount />} />
              <Route path="/order/*" element={<CustomerOrder />} />

              <Route path="/owner" element={<StoreHome />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};
