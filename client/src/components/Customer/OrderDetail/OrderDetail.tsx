import React, { useEffect, useState } from 'react';
import { OrderDetails, OrderStatus } from '@src/types';
import { formatDate } from '../../../utils/functions';

type Props = {
  order: OrderDetails;
};

export const OrderDetail = ({ order }: Props) => {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    if (order.status === '0') {
      setStatus('Waiting Restaurant Confirm');
    } else if (order.status === '1') {
      setStatus('Order is in Progress');
    } else if (order.status === '2') {
      setStatus('A Driver Accept Your Order');
    } else if (order.status === '3') {
      setStatus('Your Order is Picked Up');
    } else if (order.status === '4') {
      setStatus('Your Order Has Been Delivered');
    } else {
      setStatus('Cancelled By Restaurant');
    }

    setDate(formatDate(order.order_date));
  }, [order]);
  return (
    <div className="order-detail">
      <h2 className="space-btw">Status: {status}</h2>
      <div className="progress-bar"></div>
      <p className="space-btw">
        Order from: <span>{order.restaurant.restaurant_name}</span>
      </p>
      <p className="order-date">{date}</p>
      <hr />
      {order.details.map((item) => {
        return (
          <div className="order-detail-product" key={item.menu_id}>
            <p>{item.count}</p>
            <p>{item.menu_name}</p>
            <p>$ {item.price.toFixed(2)}</p>
          </div>
        );
      })}
      <hr />
      <p className="space-btw">
        Delivery Fee:
        <span>$ {order.deliver_fee.toFixed(2)}</span>
      </p>
      <p className="space-btw">
        Tip:
        <span>$ {order.driver_tip.toFixed(2)}</span>
      </p>
      <p className="space-btw">
        Sub Total:
        <span>$ {order.sub_total.toFixed(2)}</span>
      </p>
    </div>
  );
};
