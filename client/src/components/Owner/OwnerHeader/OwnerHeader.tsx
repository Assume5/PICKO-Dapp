import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '@src/contexts';
import { useNavigate } from 'react-router-dom';
import { useCheckLogin } from '../../../hooks/useCheckLogin';

export const OwnerHeader = () => {
  useCheckLogin();
  const navigate = useNavigate();
  const navbar = useRef<HTMLDivElement>(null);
  const userCtx = useContext(UserContext);

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

  const onLogoClick = () => {
    navigate('/owner');
  };

  const onViewAccountClick = () => {
    navigate('/owner/account');
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
            <button className="nav-menus-page" onClick={() => navigate('/owner/menus')}>
              Menus
            </button>
          </>
        ) : (
          <>
            <button className="nav-menus-page" onClick={() => navigate('/owner/menus')}>
              Menus
            </button>
          </>
        )}
      </div>
    </div>
  );
};
