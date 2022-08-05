import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '@src/contexts';
import { useNavigate, useParams } from 'react-router-dom';
import { useCheckLogin } from '../../../hooks/useCheckLogin';
import { logout } from '../../../utils/functions';
import { NewOrderModal } from '../NewOrderModal/NewOrderModal';
import { SocketContext } from '../../../contexts/SocketContext';
import { OwnerOrderContext } from '../../../contexts/OwnerOrderContext';
import { OwnerOrderDetails } from '../../../types';
import Cookies from 'js-cookie';

export const OwnerHeader = () => {
  useCheckLogin();
  const navigate = useNavigate();
  const navbar = useRef<HTMLDivElement>(null);
  const userCtx = useContext(UserContext);
  const [newOrderModal, setNewOrderModal] = useState(false);
  const socketCtx = useContext(SocketContext);
  const ordersCtx = useContext(OwnerOrderContext);
  const { id } = useParams();

  useEffect(() => {
    const event = () => {
      Cookies.remove('order-modal-trigger');
    };
    addEventListener('beforeunload', event);

    return () => {
      removeEventListener('beforeunload', event);
    };
  }, []);

  useEffect(() => {
    userCtx.user.role === 'customer' && navigate('/');
    userCtx.user.role === 'driver' && navigate('/driver');
  }, [userCtx]);

  useEffect(() => {
    if (!socketCtx || !socketCtx.socket) return;
    const socket = socketCtx.socket;
    socket.on('owner-new-order', (args: OwnerOrderDetails) => {
      if (ordersCtx && ordersCtx.orders) {
        ordersCtx.setOrders([args, ...ordersCtx.orders]);
      } else {
        ordersCtx.setOrders([args]);
      }
      setNewOrderModal(true);
    });

    socket.on('owner-order-update', (args) => {
      if (!ordersCtx.orders) return;
      const orders = ordersCtx.orders;
      const newState = orders.map((item) => {
        if (item.id === args.id) {
          return {
            ...item,
            status: args.status,
            compelete_at: args.compelete_at,
            confirm_at: args.confirm_at,
            pickup_at: args.pickup_at,
            ready_at: args.ready_at,
          };
        }
        return item;
      });
      ordersCtx.setOrders(newState);
    });

    return () => {
      socket.off('owner-new-order');
    };
  }, [socketCtx, ordersCtx]);

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
    navigate(`/owner/${id}/account/settings`);
  };

  const onSignOutClick = async () => {
    const res = await logout();
    if (res) {
      userCtx.setUser({ login: false, checked: true });
      navigate('/owner');
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
              <button onClick={() => onViewAccountClick()} className="view-button">
                View Account
              </button>
              <button onClick={() => onSignOutClick()}>Logout</button>
            </>
          )}
        </div>
      </div>
      <NewOrderModal setNewOrderModal={setNewOrderModal} newOrderModal={newOrderModal} />
    </>
  );
};
