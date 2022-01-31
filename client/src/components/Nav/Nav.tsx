import React, { useEffect } from 'react';
import logo from './PICKO-logo.png';
import { User } from '../../types/index';
import Web3 from 'web3';
declare var window: any;

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const login = async (setUser: React.Dispatch<React.SetStateAction<User>>) => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable();
  const accounts = await web3.eth.getAccounts();
  setUser({
    login: true,
    name: '',
    address: accounts[0],
  });
  localStorage.setItem('userId', accounts[0]);
};

const logout = async (setUser: React.Dispatch<React.SetStateAction<User>>) => {
  localStorage.removeItem('userId');
  setUser({
    login: false,
    name: '',
    address: '',
  });
};

export const Nav: React.FC<Props> = ({ user, setUser }) => {
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('userId');
      if (token) {
        setUser({
          login: true,
          name: '',
          address: token,
        });
      } else {
        setUser({
          login: false,
          name: '',
          address: '',
        });
      }
    };
    checkLogin();
  }, [setUser]);
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="content">
        {user && user.login ? (
          <>
            <p>{user.address}</p>
            <button onClick={() => logout(setUser)}> Sign out</button>
          </>
        ) : (
          <>
            <button onClick={() => login(setUser)}>Sign In</button>
          </>
        )}
      </div>
    </div>
  );
};
