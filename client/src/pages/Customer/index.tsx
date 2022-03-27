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

const Customer = () => {
  const contractCtx = useContext(ContractContext);
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
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};

export default Customer;
