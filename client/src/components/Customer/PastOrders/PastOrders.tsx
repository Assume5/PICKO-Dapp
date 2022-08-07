import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderDetails } from '@src/types';
import { serverUrl } from '../../../utils/constants';
import { formatDate } from '../../../utils/functions';



export const PastOrders = () => {
  const navigate = useNavigate();
  const [pastOrders, setPastOrders] = useState<OrderDetails[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${serverUrl}/order/customer`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
      }

      if (response.success) {
        setPastOrders(response.data);
      }
    };

    fetchOrders();
  }, []);

  if (!pastOrders) return null;

  const onRedirectClick = (key: string, id: string) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}/${id}`);
  };

  return (
    <>
      {pastOrders.map((order) => {
        return (
          <div className="order-details" key={order.id}>
            <div className="order-details-image">
              <img
                onClick={() => onRedirectClick(order.restaurant.restaurant_name, order.restaurant.id)}
                src={order.restaurant.restaurant_card_image}
                alt=""
              />
            </div>
            <div className="order-details-desc">
              <h2 onClick={() => onRedirectClick(order.restaurant.restaurant_name, order.restaurant.id)}>
                {order.restaurant.restaurant_name}
              </h2>
              <h4>{formatDate(order.order_date)}</h4>
              <p>
                Total {order.total_items} Items for $ {order.sub_total}
              </p>
              <p onClick={() => navigate(`/order/details/${order.id}`)} className="receipt">
                View Receipt
              </p>
              <div className="order-items">
                {order.details.map((item) => {
                  return (
                    <div className="order-item" key={item.menu_id}>
                      <p className="item-quantity">{item.count}</p>
                      <p>{item.menu_name}</p>
                      <p className="price">${item.price.toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
