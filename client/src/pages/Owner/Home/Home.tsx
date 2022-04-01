import React, { useContext } from 'react';
import { MetaMaskLogin } from '@src/components/Owner/MetaMaskLogin/MetaMaskLogin';
import { UserContext } from '@src/contexts';

export const Home = () => {
  const userCtx = useContext(UserContext);
  return (
    <div className="owner-home">
      <MetaMaskLogin />
    </div>
  );
};
