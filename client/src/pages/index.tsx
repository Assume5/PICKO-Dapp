import React, { useContext } from 'react';
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
import { TestServer } from './Customer/TestServer/TestServer';

//pages store owner
import { Home as StoreHome } from './Owner/Home/Home';
import { MenusPage } from './Owner/MenusPage/MenusPage';
import { Account as OwnerAccount } from './Owner/Account/Account';

//components
import { Footer } from '@src/components/Global/Footer/Footer';
import { Nav } from '@src/components/Global/Nav/Nav';
import { ScrollToTop } from '@src/components/Global/ScrollToTop/ScrollToTop';
import { SocketExample } from '@src/components/Global/SocketExample/SocketExample';


export const Page = () => {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Nav />
            <SocketExample />
            <Routes>
              <Route path="/" element={<CustomerHome />} />
              <Route path="/restaurant/*" element={<Restaurant />} />
              <Route path="/map" element={<LeafletMap />} />
              <Route path="/eat" element={<Eat />} />
              <Route path="/account" element={<CustomerAccount />} />
              <Route path="/order/*" element={<CustomerOrder />} />

              <Route path="/owner" element={<StoreHome />} />
              <Route path="/owner/menus" element={<MenusPage />} />
              <Route path="/owner/account" element={<OwnerAccount />} />

              <Route path="/test-example" element={<TestServer />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};
