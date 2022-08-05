import React, { useContext, useEffect, useState } from 'react';
import { DriverHeader } from '../../../components/Driver/DriverHeader/DriverHeader';
import { DriverMap } from '../../../components/Driver/DriverMap/DriverMap';
import { Login } from '../../../components/Global/Login/Login';
import { UserContext } from '../../../contexts';
import { SocketContext } from '../../../contexts/SocketContext';
import { DriverOrder } from '../../../types';
import { serverUrl } from '../../../utils/constants';

export const Home = () => {
  const userCtx = useContext(UserContext);
  const [orders, setOrders] = useState<DriverOrder[] | null>(null);
  const [currentOrder, setCurrentOrder] = useState<DriverOrder | null>(null);
  const [newOrder, setNewOrder] = useState(false);
  const [latLong, setLatLong] = useState<[number, number] | null>(null);

  const socketCtx = useContext(SocketContext);

  useEffect(() => {
    const user = userCtx.user;
    if (!user.driverStatus) return;

    const fetchNearByOrders = async () => {
      const res = await fetch(`${serverUrl}/order/driver/nearby-order`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
      }

      if (response.success) {
        const data: DriverOrder[] = response.data;
        if (data.length) {
          setNewOrder(true);
        }
        setOrders(data.sort((a, b) => b.driver_tip - a.driver_tip));
      }
    };

    const fetchCurrentOrder = async () => {
      const res = await fetch(`${serverUrl}/order/driver/current-order`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
      }

      if (response.success) {
        setCurrentOrder(response.data);
      }
    };
    if (user.driverStatus === '0') {
      setOrders([]);
    } else if (user.driverStatus === '2' || user.driverStatus === '3') {
      setOrders([]);
      fetchCurrentOrder();
    } else {
      fetchNearByOrders();
    }
  }, [userCtx]);

  useEffect(() => {
    if (!socketCtx || !socketCtx.socket || !userCtx.user.driverStatus) return;

    const socket = socketCtx.socket;

    socket.on('driver-new-order', (args: DriverOrder) => {
      if (userCtx.user.driverStatus !== '1') return;

      if (orders) {
        setOrders([...orders, args].sort((a, b) => b.driver_tip - a.driver_tip));
      } else {
        setOrders([args]);
      }
      setNewOrder(true);
    });

    socket.on('driver-order-been-accepted', (orderId: string) => {
      if (!orders || !orders.length) return;
      const updateOrders = orders.filter((item) => item.id !== orderId);
      setOrders(updateOrders);
    });

    return () => {
      socket.off('driver-new-order');
      socket.off('driver-order-been-accepted');
    };
  }, [socketCtx, userCtx, orders]);

  return (
    <>
      <DriverHeader />
      <div className={`driver-home page ${userCtx.user.checked && !userCtx.user.login && 'driver-not-login'}`}>
        {userCtx.user.checked && !userCtx.user.login ? (
          <Login role={'driver'} />
        ) : (
          <DriverMap
            userCtx={userCtx}
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            orders={orders}
            setOrders={setOrders}
            currentOrder={currentOrder}
            setCurrentOrders={setCurrentOrder}
          />
        )}
      </div>
    </>
  );
};
