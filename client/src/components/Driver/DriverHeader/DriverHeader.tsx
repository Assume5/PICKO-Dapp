import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '@src/contexts';
import { useNavigate, useParams } from 'react-router-dom';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { logout } from '../../../utils/functions';
import { SocketContext } from '../../../contexts/SocketContext';

export const DriverHeader = () => {
  useCheckLogin();
  const navigate = useNavigate();
  const navbar = useRef<HTMLDivElement>(null);
  const userCtx = useContext(UserContext);
  const socketCtx = useContext(SocketContext);

  useEffect(() => {
    userCtx.user.role === 'customer' && navigate('/');
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

  const onLogoClick = () => {
    navigate('/driver');
  };

  const onViewAccountClick = () => {
    navigate(`/driver/account`);
  };

  const onSignOutClick = async () => {
    const res = await logout();
    if (res) {
      userCtx.setUser({ login: false, checked: true });
      navigate('/driver');
      socketCtx && socketCtx.socket && socketCtx.socket.emit('logout');
    }
  };

  return (
    <>
      <div className="header" ref={navbar}>
        <div className="logo" onClick={() => onLogoClick()}>
          <img src={'/imgs/PICKO-logo.png'} alt="logo" />
        </div>
        <div className="content">
          {userCtx.user.login && (
            <>
              <p>{userCtx.user.name}</p>
              {userCtx && userCtx.user.login && (
                <>
                  <button onClick={() => onViewAccountClick()} className="view-button">
                    View Account
                  </button>
                  <button onClick={() => onSignOutClick()}>Logout</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
