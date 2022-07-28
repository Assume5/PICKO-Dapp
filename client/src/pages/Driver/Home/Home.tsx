import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DriverHeader } from '../../../components/Driver/DriverHeader/DriverHeader';
import { DriverMap } from '../../../components/Driver/DriverMap/DriverMap';
import { Login } from '../../../components/Global/Login/Login';
import { UserContext } from '../../../contexts';

export const Home = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  console.log(userCtx.user);

  return (
    <>
      <DriverHeader />
      <div className={`driver-home page ${userCtx.user.checked && !userCtx.user.login && 'driver-not-login'}`}>
        {userCtx.user.checked && !userCtx.user.login ? <Login role={'driver'} /> : <DriverMap userCtx={userCtx} />}
      </div>
    </>
  );
};
