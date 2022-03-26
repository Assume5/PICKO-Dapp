import React, { useContext, useEffect, useRef, useState } from 'react';
import { Cart } from '../../../types/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { fakeCartData } from './fakeCartData';
import Web3 from 'web3';
import { SideBar } from './SideBar';
import { getCookie } from '../../../utils/functions';
import { UserContext, CartContext } from '../../../contexts';
declare var window: any;

export const Nav = () => {
  const navbar = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebar = useRef(null);
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  if (userCtx === undefined) throw new Error('userCtx Not init');

  useEffect(() => {
    const checkLogin = async () => {
      const web3 = new Web3(window.ethereum);
      const account = await web3.eth.getAccounts();
      if (account.length) {
        userCtx.setUser({
          login: true,
          name: '',
          address: account[0],
        });
      } else {
        userCtx.setUser({
          login: false,
        });
      }
    };

    const listenScroll = () => {
      if (window.scrollY > 0) {
        navbar.current?.classList.add('sticky');
      } else {
        navbar.current?.classList.remove('sticky');
      }
    };

    document.addEventListener('scroll', listenScroll);
    if (window.ethereum) {
      checkLogin();
    }

    return () => document.removeEventListener('scroll', listenScroll);
  }, []);

  useEffect(() => {
    const tempFake = fakeCartData;
    if (getCookie('address_details')) {
      tempFake.deliveryAddress = getCookie('address_details').home;
    }

    cartCtx.setCart(tempFake);
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
        if (userCtx.user.login) {
          userCtx.setUser({
            login: false,
          });
        }
      });
    }
  });

  const login = async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    userCtx.setUser({
      login: true,
      name: '',
      address: accounts[0],
    });
    localStorage.setItem('userId', accounts[0]);
  };

  return (
    <div className="header" ref={navbar}>
      <div className="logo" onClick={() => (window.location = '/')}>
        <img src={'/imgs/PICKO-logo.png'} alt="logo" />
      </div>
      <div className="content">
        {userCtx.user.login ? (
          <>
            <p>{userCtx.user.address}</p>
            <button>View Account</button>
          </>
        ) : (
          <>
            <button onClick={() => login()}>Sign In</button>
          </>
        )}
        <div className={`${cartCtx.cart && !cartCtx.cart.isCartEmpty ? 'has-item' : ''}`}>
          <FontAwesomeIcon icon={faShoppingCart} onClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="dot"></div>
        </div>
      </div>
      <div className={`cart-sidebar-container ${sidebarOpen ? 'visible' : 'hidden'}`} ref={sidebar}>
        {cartCtx.cart && <SideBar cart={cartCtx.cart} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />}
        <div className="overlay"></div>
      </div>
    </div>
  );
};
