import React, { useContext } from 'react';
import Web3 from 'web3';
import { UserContext } from '@src/contexts';
declare var window: any;
export const MetaMaskLogin = () => {
  const userCtx = useContext(UserContext);
  const login = async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    userCtx.setUser({
      login: true,
      name: '',
      address: accounts[0],
    });
  };
  return (
    <div className="metamask-login">
      <img alt="" src="/imgs/MetaMask_Fox.svg" />
      <button onClick={() => login()}>Login with MetaMask</button>
    </div>
  );
};
