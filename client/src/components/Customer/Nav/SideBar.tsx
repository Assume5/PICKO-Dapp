import React from 'react';
import { Cart } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  cart: Cart;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

export const SideBar: React.FC<Props> = ({ cart, setSidebarOpen, sidebarOpen }) => {
  const onRestaurantCardClick = (key: string, id: number) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    // (`/restaurant/${keyWithDash}-${id}`);
  };
  return (
    <div className={`side-bar ${cart.isCartEmpty && 'empty'}`}>
      <div className="close-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      {cart.isCartEmpty ? (
        <div className="empty">
          <FontAwesomeIcon icon={faCartArrowDown} />
          <h3>Your Cart is Empty</h3>
        </div>
      ) : (
        <div className="cart-content">
          <h2 onClick={() => onRestaurantCardClick(cart.restaurantName!, cart.restaurantID!)}>{cart.restaurantName}</h2>
          <p className="delivery-to">Delivery to {cart.deliveryAddress}</p>
          {Object.keys(cart.cartItems!).map((key) => {
            const item = cart.cartItems![key];
            return (
              <div className="cart-item" key={key}>
                <div className="item-quantity">
                  <p>{item.quantity}</p>
                </div>
                <div className="item-desc">
                  <h3>{key}</h3>
                  <p>{item.price} ETH</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="checkout-button">
        <button>Checkout</button>
      </div>
    </div>
  );
};
