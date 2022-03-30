import React, { createContext, useState } from 'react';
import { Cart } from '@src/types';

type contextType = {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

const contextState = {
  cart: { isCartEmpty: true },
  setCart: () => {},
};

export const CartContext = createContext<contextType>(contextState);

export const CartContextProvider: React.FC = (props) => {
  const [cart, setCart] = useState(contextState.cart);
  return <CartContext.Provider value={{ cart, setCart }}>{props.children}</CartContext.Provider>;
};
