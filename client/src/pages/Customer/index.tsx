import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from '../../components/Customer/Nav/Nav';
import { Footer } from '../../components/Customer/Footer/Footer';

//pages
import { Home } from './Home/Home';
import { Restaurant } from './Restaurant/Restaurant';
import { LeafletMap } from './LeafletMap/LeafletMap';
import { Eat } from './Eat/Eat';
import { UserContextProvider, ContractContext, CartContextProvider } from '../../contexts';
import { Account } from './Account/Account';
import { ScrollToTop } from '../../components/Global/ScrollToTop/ScrollToTop';
import { Order } from './Order/Order';
import Web3 from 'web3';
declare var window: any;

const Customer = () => {
  const contractCtx = useContext(ContractContext);
  const runExample = async () => {
    if (contractCtx.contract) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      await contractCtx.contract.methods.set(5).send({ from: accounts[0] });
      const response = await contractCtx.contract.methods.get().call();
      console.log(response);
    }
  };

  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/*" element={<Restaurant />} />
              <Route path="/map" element={<LeafletMap />} />
              <Route path="/eat" element={<Eat />} />
              <Route path="/account" element={<Account />} />
              <Route path="/order/*" element={<Order />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};

export default Customer;
