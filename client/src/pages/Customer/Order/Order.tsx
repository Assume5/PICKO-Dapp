import React, { useContext, useEffect, useState } from 'react';
import { OrderDetail } from '@src/components/Customer/OrderDetail/OrderDetail';
import { Map } from '@src/components/Global/Map/Map';
import { OrderDetails, orderSocketArgs, OrderStatus } from '@src/types';
import { fakeOrderDetails } from './fakeOrder';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';
import { serverUrl } from '../../../utils/constants';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../../contexts/SocketContext';

export const Order = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [clientLocation, setClientLocation] = useState<[number, number] | null>(null);
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);
  const [restaurantLocation, setRestaurantLocation] = useState<[number, number] | null>(null);
  const socketCtx = useContext(SocketContext);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`${serverUrl}/order/order-details/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
      }

      if (response.success) {
        const data: OrderDetails = response.data;

        setClientLocation([data.destination_lat, data.destination_long]);
        setRestaurantLocation([data.restaurant_lat, data.restaurant_long]);
        if (data.driver && data.driver.lat && data.driver.long && data.status !== '4') {
          setDriverLocation([+data.driver.lat, +data.driver.long]);
        }
        setOrderDetails(data);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    if (!socketCtx || !socketCtx.socket || !orderDetails) return;

    const socket = socketCtx.socket;

    socket.on('update-order-details', (args: orderSocketArgs) => {
      if (args.id !== id) return;
      if (args.driverLat && args.driverLong) {
        setOrderDetails({
          ...orderDetails,
          driver: { lat: args.driverLat, long: args.driverLong },
          status: args.status,
        });
        setDriverLocation([+args.driverLat, +args.driverLong]);
      } else {
        setOrderDetails({ ...orderDetails, status: args.status });
      }
    });

    socket.on('update-location', (args: orderSocketArgs) => {
      if (!args.driverLat || !args.driverLong || args.id !== id) return;
      setOrderDetails({
        ...orderDetails,
        driver: { lat: args.driverLat, long: args.driverLong },
      });
      setDriverLocation([+args.driverLat, +args.driverLong]);
    });

    return () => {
      socket.off('update-order-details');
      socket.off('update-location');
    };
  }, [socketCtx, orderDetails, socketCtx.socket]);

  if (!orderDetails) return null;
  return (
    <>
      <CustomerHeader />
      <div className="order">
        <Map client={clientLocation} store={restaurantLocation} driver={driverLocation} status={orderDetails.status} />
        <OrderDetail order={orderDetails} />
      </div>
    </>
  );
};
