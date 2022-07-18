import React, { createContext, useEffect, useState } from 'react';
import { Cart } from '@src/types';
import { serverUrl } from '../../utils/constants';
import Cookies from 'js-cookie';
import { getCookie } from '../../utils/functions';

type contextType = {
  cart: Cart | undefined;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

const contextState = {
  cart: { isCartEmpty: true },
  setCart: () => {},
};

export const CartContext = createContext<contextType>(contextState);

export const CartContextProvider: React.FC = (props) => {
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    const initCart = async () => {
      if (!getCookie('address_details')) {
        setCart({ isCartEmpty: true });
        return;
      }

      const guest = Cookies.get('guest_cookie');
      const endpoint = `${serverUrl}/cart${guest ? `/guest/${guest}` : ''}`;
      const home = getCookie('address_details').home;

      const res = await fetch(endpoint, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
        setCart({ isCartEmpty: true });
      }

      if (response.data === 'EMPTY') {
        setCart({ isCartEmpty: true });
        return;
      }

      if (response.success) {
        const data = response.data;
        setCart({
          cartItems: data.cartItems,
          restaurantID: data.restaurantId,
          restaurantName: data.restaurantName,
          isCartEmpty: false,
          deliveryAddress: home,
        });
      }
    };

    initCart();
  }, []);
  return <CartContext.Provider value={{ cart, setCart }}>{props.children}</CartContext.Provider>;
};
