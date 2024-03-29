import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

import { CartContextProvider, ContractContext, UserContextProvider } from '@src/contexts';

//pages customer
import { Account as CustomerAccount } from './Customer/Account/Account';
import { Eat } from './Customer/Eat/Eat';
import { Home as CustomerHome } from './Customer/Home/Home';
import { Order as CustomerOrder } from './Customer/Order/Order';
import { Restaurant } from './Customer/Restaurant/Restaurant';
import { TestServer } from './Customer/TestServer/TestServer';

//pages store owner
import { Home as StoreHome } from './Owner/Home/Home';
import { MenusPage } from './Owner/MenusPage/MenusPage';
import { Account as OwnerAccount } from './Owner/Account/Account';
import { SignUp as OwnerSignUp } from './Owner/SignUp/SignUp';
import { OwnerRestaurant } from './Owner/OwnerRestaurant/OwnerRestaurant';

//pages driver
import { Home as DriverHome } from './Driver/Home/Home';
import { Signup as DriverSignup } from './Driver/Signup/Signup';
import { Account as DriverAccount } from './Driver/Account/Account';

//components
import { Footer } from '@src/components/Global/Footer/Footer';
import { ScrollToTop } from '@src/components/Global/ScrollToTop/ScrollToTop';
import { Checkout } from './Customer/Checkout/Checkout';
import { Map } from './Customer/Map/Map';
import { OwnerOrderContextProvider } from '../contexts/OwnerOrderContext';

export const Page = () => {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <OwnerOrderContextProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<CustomerHome />} />
                <Route path="/restaurant/:restaurantName/:restaurantId" element={<Restaurant />} />
                <Route path="/eat" element={<Eat />} />
                <Route path="/account" element={<CustomerAccount />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/details/:id" element={<CustomerOrder />} />

                <Route path="/owner" element={<StoreHome />} />
                <Route path="/owner/menus" element={<MenusPage />} />
                <Route path="/owner/sign-up" element={<OwnerSignUp />} />
                <Route path="/owner/:id" element={<OwnerRestaurant />} />
                <Route path="/owner/:id/account/:page" element={<OwnerAccount />} />

                <Route path="/driver" element={<DriverHome />} />
                <Route path="/driver/sign-up" element={<DriverSignup />} />
                <Route path="/driver/account" element={<DriverAccount />} />

                <Route path="/test-example" element={<TestServer />} />
                <Route path="/map" element={<Map />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </OwnerOrderContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};
