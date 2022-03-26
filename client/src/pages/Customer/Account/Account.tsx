import React, { useEffect, useState } from 'react';
import { PastOrders } from '../../../components/Customer/PastOrders/PastOrders';
import { Orders } from '../../../types';
import { fakeOrders } from './FakeOrders';

export const Account = () => {
  const [orders, setOrder] = useState<Orders | null>(null);

  useEffect(() => {
    setOrder(fakeOrders);
  }, []);
  if (orders) {
    return (
      <div className="account">
        <PastOrders orders={orders} />
      </div>
    );
  }
  return <></>;
};
