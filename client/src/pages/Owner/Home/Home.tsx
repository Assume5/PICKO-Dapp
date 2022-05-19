import React, { useContext } from 'react';
import { MetaMaskLogin } from '@src/components/Owner/MetaMaskLogin/MetaMaskLogin';
import { UserContext } from '@src/contexts';
import { RestaurantForm } from '@src/components/Owner/RestaurantForm/RestaurantForm';
import { OwnerHome } from '@src/components/Owner/OwnerHome/OwnerHome';
import { RestaurantDetails } from '@src/components/Owner/RestaurantDetails/RestaurantDetails';
import { RestaurantSettingForm } from '../../../components/Owner/RestaurantSettingForm/RestaurantSettingForm';
import { Login } from '../../../components/Global/Login/Login';
import { OwnerHeader } from '../../../components/Owner/OwnerHeader/OwnerHeader';
export const Home = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <OwnerHeader />
      <div className="owner-home">
        {!userCtx.user.login && <Login role={'owner'} />}
        <RestaurantForm />
        <RestaurantSettingForm />
        <RestaurantDetails />
        <OwnerHome />
      </div>
    </>
  );
};
