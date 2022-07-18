import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3';
import { CartSidebar } from '../../Customer/CartSidebar/CartSidebar';
import { getCookie } from '@src/helpers';
import { UserContext, CartContext } from '@src/contexts';
import { useLocation, useNavigate } from 'react-router-dom';

export const Nav = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const navbar = useRef<HTMLDivElement>(null);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const sidebar = useRef(null);
  // const userCtx = useContext(UserContext);
  // const cartCtx = useContext(CartContext);
  // if (userCtx === undefined) throw new Error('userCtx Not init');

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const web3 = new Web3(window.ethereum);
  //     const account = await web3.eth.getAccounts();
  //     if (account.length) {
  //       userCtx.setUser({
  //         login: true,
  //         name: '',
  //         address: account[0],
  //       });
  //     } else {
  //       userCtx.setUser({
  //         login: false,
  //       });
  //     }
  //   };

  //   const listenScroll = () => {
  //     if (window.scrollY > 0) {
  //       navbar.current?.classList.add('sticky');
  //     } else {
  //       navbar.current?.classList.remove('sticky');
  //     }
  //   };

  //   document.addEventListener('scroll', listenScroll);
  //   if (window.ethereum) {
  //     checkLogin();
  //   }

  //   return () => document.removeEventListener('scroll', listenScroll);
  // }, []);

  // useEffect(() => {
  //   const tempFake = fakeCartData;
  //   if (getCookie('address_details')) {
  //     tempFake.deliveryAddress = getCookie('address_details').home;
  //   }

  //   cartCtx.setCart(tempFake);
  // }, [sidebarOpen]);

  // useEffect(() => {
  //   const body: HTMLBodyElement | null = document.querySelector('body');
  //   if (sidebarOpen && body && document) {
  //     body.style.overflowY = 'hidden';
  //   } else if (!sidebarOpen && body && document) {
  //     body.style.overflowY = 'auto';
  //   }
  // }, [sidebarOpen]);

  // useEffect(() => {
  //   //detect account change
  //   if (window.ethereum) {
  //     window.ethereum.on('accountsChanged', () => {
  //       if (userCtx.user.login) {
  //         userCtx.setUser({
  //           login: false,
  //         });
  //       }
  //     });
  //   }
  // });

  // const login = async () => {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   userCtx.setUser({
  //     login: true,
  //     name: '',
  //     address: accounts[0],
  //   });
  // };

  // const onLogoClick = () => {
  //   if (!location.pathname.includes('/owner') && !location.pathname.includes('/driver')) {
  //     navigate('/');
  //   } else if (location.pathname.includes('/owner')) {
  //     navigate('/owner');
  //   } else {
  //     navigate('/driver');
  //   }
  // };

  // const onViewAccountClick = () => {
  //   if (!location.pathname.includes('/owner') && !location.pathname.includes('/driver')) {
  //     navigate('/account');
  //   } else if (location.pathname.includes('/owner')) {
  //     navigate('/owner/account');
  //   } else {
  //     navigate('/driver/account');
  //   }
  // };

  return (
    // <div className="header" ref={navbar}>
    //   <div className="logo" onClick={() => onLogoClick()}>
    //     <img src={'/imgs/PICKO-logo.png'} alt="logo" />
    //   </div>
    //   <div className="content">
    //     {userCtx.user.login ? (
    //       <>
    //         <p>{userCtx.user.address}</p>
    //         <button onClick={() => onViewAccountClick()}>View Account</button>
    //         {location.pathname.includes('/owner') && (
    //           <button className="nav-menus-page" onClick={() => navigate('/owner/menus')}>
    //             Menus
    //           </button>
    //         )}
    //       </>
    //     ) : (
    //       <>
    //         <button onClick={() => login()}>Sign In</button>
    //         {location.pathname.includes('/owner') && (
    //           <button className="nav-menus-page" onClick={() => navigate('/owner/menus')}>
    //             Menus
    //           </button>
    //         )}
    //       </>
    //     )}
    //     {!location.pathname.includes('/owner') && !location.pathname.includes('/driver') && (
    //       <>
    //         <div className={`${cartCtx.cart && !cartCtx.cart.isCartEmpty ? 'has-item' : ''}`}>
    //           <FontAwesomeIcon icon={faShoppingCart} onClick={() => setSidebarOpen(!sidebarOpen)} />
    //           <div className="dot"></div>
    //         </div>
    //       </>
    //     )}
    //   </div>
    //   {!location.pathname.includes('/owner') && !location.pathname.includes('/driver') && (
    //     <div className={`cart-sidebar-container ${sidebarOpen ? 'visible' : 'hidden'}`} ref={sidebar}>
    //       {cartCtx.cart && (
    //         <CartSidebar cart={cartCtx.cart} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
    //       )}
    //       <div className="overlay"></div>
    //     </div>
    //   )}
    // </div>
    null
  );
};
