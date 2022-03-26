import React, { useEffect, useRef, useState } from 'react';
import { Cart, User } from '../../../types/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { fakeCartData } from './fakeCartData';
import Web3 from 'web3';
import { SideBar } from './SideBar';
import { getCookie } from '../../../utils/functions';
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
  });
};

export const Nav: React.FC<Props> = ({ user, setUser }) => {
  const navbar = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Cart | null>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebar = useRef(null);

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
        });
      }
    };

    document.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        navbar.current?.classList.add('sticky');
      } else {
        navbar.current?.classList.remove('sticky');
      }
    });
    if (window.ethereum) {
      checkLogin();
    }
  }, [setUser]);

  useEffect(() => {
    const tempFake = fakeCartData;
    tempFake.deliveryAddress = getCookie('address_details').home;

    setCart(tempFake);
  }, []);

  useEffect(() => {
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (sidebarOpen && body && document) {
      body.style.overflowY = 'hidden';
    } else if (!sidebarOpen && body && document) {
      body.style.overflowY = 'auto';
    }
  }, [sidebarOpen]);

  useEffect(() => {
    //detect account change
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        if (user.login) {
          logout(setUser);
        }
      });
    }
  });

  return (
    <div className="header" ref={navbar}>
      <div className="logo" onClick={() => (window.location = '/')}>
        <img src={'/imgs/PICKO-logo.png'} alt="logo" />
      </div>
      <div className="content">
        {user && user.login ? (
          <>
            <p>{user.address}</p>
            <button>View Account</button>
          </>
        ) : (
          <>
            <button onClick={() => login(setUser)}>Sign In</button>
          </>
        )}
        <FontAwesomeIcon icon={faShoppingCart} onClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className={`sidebar-container ${sidebarOpen ? 'visible' : 'hidden'}`} ref={sidebar}>
        {cart && <SideBar cart={cart} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />}
        <div className="overlay"></div>
      </div>
    </div>
  );
};
