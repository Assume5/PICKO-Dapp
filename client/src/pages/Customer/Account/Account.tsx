import React, { useEffect, useState } from 'react';
import { PastOrders } from '@src/components/Customer/PastOrders/PastOrders';
import { Orders } from '@src/types';
import { fakeOrders } from './FakeOrders';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';

export const Account = () => {
  const [orders, setOrder] = useState<Orders | null>(null);

  useEffect(() => {
    setOrder(fakeOrders);
  }, []);
  if (orders) {
    return (
      <>
        <CustomerHeader />
        <div className="account">
          <div className="past-orders">
            <PastOrders orders={orders} />
          </div>
        </div>
      </>
    );
  }
  return <></>;
};
