import React, { useContext } from 'react';
import { MetaMaskLogin } from '@src/components/Owner/MetaMaskLogin/MetaMaskLogin';
import { UserContext } from '@src/contexts';
import { RestaurantForm } from '@src/components/Owner/RestaurantForm/RestaurantForm';
import { OwnerHome } from '@src/components/Owner/OwnerHome/OwnerHome';
import { RestaurantDetails } from '@src/components/Owner/RestaurantDetails/RestaurantDetails';
export const Home = () => {
  const userCtx = useContext(UserContext);
  return (
    <div className="owner-home">
      <RestaurantDetails />
      <OwnerHome />
    </div>
  );
};
