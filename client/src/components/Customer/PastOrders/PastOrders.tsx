import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Orders } from '../../../types';

interface Props {
  orders: Orders;
}

export const PastOrders: React.FC<Props> = ({ orders }) => {
  const navigate = useNavigate();
  
  const onRedirectClick = (key: string, id: number) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}-${id}`);
  };

  return (
    <div className="past-orders">
      {Object.keys(orders).map((key) => {
        const order = orders[key];
        console.log(order);
        return (
          <div className="order-details" key={key}>
            <div className="order-details-image">
              <img onClick={() => onRedirectClick(key, order.storeID)} src={order.storeImage} alt="" />
            </div>
            <div className="order-details-desc">
              <h2 onClick={() => onRedirectClick(key, order.storeID)}>{key}</h2>
              <p>
                Total {order.totalItems} Items for {order.totalPrice} ETH at {order.orderDate}
              </p>
              <div className="order-items">
                {Object.keys(order.orderItems).map((item) => {
                  const orderItem = order.orderItems[item];
                  console.log(orderItem);
                  return (
                    <div className="order-item" key={item}>
                      <p className="item-quantity">{orderItem.quantity}</p>
                      <p>{item}</p>
                      <p>{orderItem.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
