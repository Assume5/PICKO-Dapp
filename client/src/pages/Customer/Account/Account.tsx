import React, { useEffect, useState } from 'react';
import { PastOrders } from '@src/components/Customer/PastOrders/PastOrders';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';

export const Account = () => {
  return (
    <>
      <CustomerHeader />
      <div className="account">
        <div className="past-orders">
          <PastOrders />
        </div>
      </div>
    </>
  );
};
