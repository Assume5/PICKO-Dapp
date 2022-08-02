import React, { useContext, useEffect, useState } from 'react';
import { DriverHeader } from '../../../components/Driver/DriverHeader/DriverHeader';
import { DriverMap } from '../../../components/Driver/DriverMap/DriverMap';
import { Login } from '../../../components/Global/Login/Login';
import { UserContext } from '../../../contexts';
import { SocketContext } from '../../../contexts/SocketContext';

export const Home = () => {
  const userCtx = useContext(UserContext);
  const [orders, setOrders] = useState();

  const socketCtx = useContext(SocketContext);

  useEffect(() => {
    //fetch orders
  }, []);

  useEffect(() => {
    if (!socketCtx || !socketCtx.socket) return;

    const socket = socketCtx.socket;

    socket.on('driver-new-order', (args) => {
      console.log(args);
    });

    socket.on('driver-order-been-accepted', (orderId) => {});

    return () => {
      socket.off('driver-new-order');
      socket.off('driver-order-been-accepted');
    };
  }, [socketCtx]);
  return (
    <>
      <DriverHeader />
      <div className={`driver-home page ${userCtx.user.checked && !userCtx.user.login && 'driver-not-login'}`}>
        {userCtx.user.checked && !userCtx.user.login ? <Login role={'driver'} /> : <DriverMap userCtx={userCtx} />}
      </div>
    </>
  );
};
