import React, { createContext, useEffect, useState } from 'react';
import { OwnerOrderDetails, User } from '@src/types';
import { serverUrl } from '../utils/constants';
import Cookies from 'js-cookie';

interface contextType {
  orders: OwnerOrderDetails[] | null;
  setOrders: React.Dispatch<React.SetStateAction<OwnerOrderDetails[] | null>>;
}

const contextState = {
  orders: null,
  setOrders: () => {},
};

export const OwnerOrderContext = createContext<contextType>(contextState);

export const OwnerOrderContextProvider: React.FC = (props) => {
  const [orders, setOrders] = useState<OwnerOrderDetails[] | null>(null);

  const fetchOrders = async () => {
    const res = await fetch(`${serverUrl}/order/owner`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    const response = await res.json();
    if (response.error) {
      console.error(response.error);
    }

    if (response.success) {
      const data: OwnerOrderDetails[] = response.data;
      setOrders(data);
    }
  };

  useEffect(() => {
    if (Cookies.get('role') === 'driver' || Cookies.get('role') === 'customer') {
      return;
    }
    fetchOrders();
  }, []);
  return <OwnerOrderContext.Provider value={{ orders, setOrders }}>{props.children}</OwnerOrderContext.Provider>;
};
