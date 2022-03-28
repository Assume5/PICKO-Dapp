import React from 'react';
import { OrderStatus } from '../../../types';

type Props = {
  order: OrderStatus;
};

export const OrderDetail = ({ order }: Props) => {
  return (
    <div className="order-detail">
      <h2 className="space-btw">Status: {order.currentStatus}</h2>
      <div className="progress-bar"></div>
      <p className="space-btw">
        Order from: <span>{order.orderFrom}</span>
      </p>
      <p className="order-date">
        {order.orderDate} - {order.orderTime}
      </p>
      <hr />
      {order.orderItems.map((obj) => {
        return (
          <div className="order-detail-product" key={obj.productName}>
            <p>{obj.quantity}</p>
            <p>{obj.productName}</p>
            <p>{obj.price}</p>
          </div>
        );
      })}
      <hr />
      <p className="space-btw">
        Delivery Fee:
        <span>{order.deliveryFee}</span>
      </p>
      <p className="space-btw">
        Tip:
        <span>{order.driverTips}</span>
      </p>
      <p className="space-btw">
        Sub Total:
        <span>{order.total}</span>
      </p>
    </div>
  );
};
