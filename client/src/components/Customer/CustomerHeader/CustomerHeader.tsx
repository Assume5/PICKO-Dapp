import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartSidebar } from '../../Customer/CartSidebar/CartSidebar';
import { getCookie, logout } from '@src/helpers';
import { UserContext, CartContext } from '@src/contexts';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthModal } from '../AuthModal/AuthModal';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { SocketContext } from '../../../contexts/SocketContext';

export const CustomerHeader = () => {
  useCheckLogin();
  const navigate = useNavigate();
  const navbar = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authState, setAuthState] = useState('login');
  const sidebar = useRef(null);
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const socketCtx = useContext(SocketContext);
  if (userCtx === undefined) throw new Error('userCtx Not init');

  useEffect(() => {
    userCtx.user.role === 'owner' && navigate('/owner');
    userCtx.user.role === 'driver' && navigate('/driver');
  }, [userCtx]);

  useEffect(() => {
    const listenScroll = () => {
      if (window.scrollY > 0) {
        navbar.current?.classList.add('sticky');
      } else {
        navbar.current?.classList.remove('sticky');
      }
    };

    document.addEventListener('scroll', listenScroll);

    return () => document.removeEventListener('scroll', listenScroll);
  }, []);

  useEffect(() => {
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (sidebarOpen && body && document) {
      body.style.overflowY = 'hidden';
    } else if (!sidebarOpen && body && document) {
      body.style.overflowY = 'auto';
    }
  }, [sidebarOpen]);

  const onLogoClick = () => {
    navigate('/');
  };

  const onViewAccountClick = () => {
    navigate('/account');
  };

  const onSignOutClick = async () => {
    const res = await logout();
    if (res) {
      userCtx.setUser({ login: false, checked: true });
      cartCtx.setCart({ isCartEmpty: true });
      socketCtx && socketCtx.socket && socketCtx.socket.emit('logout');
      navigate('/');
    }
  };

  return (
    <div className="header" ref={navbar}>
      <div className="logo" onClick={() => onLogoClick()}>
        <img src={'/imgs/PICKO-logo.png'} alt="logo" />
      </div>
      <div className="content">
        {userCtx.user.login ? (
          <>
            <p>{userCtx.user.name}</p>
            <button className="view-button" onClick={() => onViewAccountClick()}>
              View Account
            </button>
            <button onClick={() => onSignOutClick()}>Logout</button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setAuthModal(true);
                setAuthState('login');
              }}
            >
              Sign In
            </button>
          </>
        )}
        <div className={`${cartCtx.cart && !cartCtx.cart.isCartEmpty ? 'has-item' : ''}`}>
          <FontAwesomeIcon icon={faShoppingCart} onClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="dot"></div>
        </div>
      </div>
      <div className={`cart-sidebar-container ${sidebarOpen ? 'visible' : 'hidden'}`} ref={sidebar}>
        {cartCtx.cart && <CartSidebar cart={cartCtx.cart} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />}
        <div className="overlay"></div>
      </div>

      {authModal && <AuthModal authState={authState} setAuthState={setAuthState} setAuthModal={setAuthModal} />}
    </div>
  );
};
