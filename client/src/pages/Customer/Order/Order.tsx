import React, { useEffect, useState } from 'react';
import { OrderDetail } from '@src/components/Customer/OrderDetail/OrderDetail';
import { Map } from '@src/components/Global/Map/Map';
import { OrderStatus } from '@src/types';
import { fakeOrderDetails } from './fakeOrder';

export const Order = () => {
  const [order, setOrder] = useState<OrderStatus | null>(null);
  useEffect(() => {
    setOrder(fakeOrderDetails);
  }, []);
  if (order) {
    return (
      <div className="order">
        <Map
          client={order.clientLocation}
          store={order.restaurantLocation}
          driver={order.driverCurrentLocation}
          status={order.currentStatus}
        />
        <OrderDetail order={order} />
      </div>
    );
  }
  return <></>;
};
