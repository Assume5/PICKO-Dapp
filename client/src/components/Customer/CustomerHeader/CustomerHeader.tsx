import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { fakeCartData } from '../../Customer/CartSidebar/fakeCartData';
import { CartSidebar } from '../../Customer/CartSidebar/CartSidebar';
import { getCookie } from '@src/helpers';
import { UserContext, CartContext } from '@src/contexts';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthModal } from '../AuthModal/AuthModal';
import { useCheckLogin } from '../../../hooks/useCheckLogin';

export const CustomerHeader = () => {
  useCheckLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const navbar = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authState, setAuthState] = useState('login');
  const sidebar = useRef(null);
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  if (userCtx === undefined) throw new Error('userCtx Not init');

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
    const tempFake = fakeCartData;
    if (getCookie('address_details')) {
      tempFake.deliveryAddress = getCookie('address_details').home;
    }

    cartCtx.setCart(tempFake);
  }, [sidebarOpen]);

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

  return (
    <div className="header" ref={navbar}>
      <div className="logo" onClick={() => onLogoClick()}>
        <img src={'/imgs/PICKO-logo.png'} alt="logo" />
      </div>
      <div className="content">
        {userCtx.user.login ? (
          <>
            <p>{userCtx.user.address}</p>
            <button onClick={() => onViewAccountClick()}>View Account</button>
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
            {location.pathname.includes('/owner') && (
              <button className="nav-menus-page" onClick={() => navigate('/owner/menus')}>
                Menus
              </button>
            )}
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
