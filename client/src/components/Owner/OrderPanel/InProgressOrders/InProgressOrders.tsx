import React from 'react';
import { OwnerOrderDetails } from '../../../../types';
import { formatDate } from '../../../../utils/functions';

interface Props {
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  orders: OwnerOrderDetails[];
  setDetails: React.Dispatch<React.SetStateAction<OwnerOrderDetails | null>>;
}

export const InProgressOrders: React.FC<Props> = ({ setOrderModal, orders, setDetails }) => {
  return (
    <div className="in-progress-orders fade-in-up">
      <div className="new-order info-bar">
        <p className="order-number">Order Number</p>
        <p className="customer-name">Customer Name</p>
        <p className="order-time">Confirmed at</p>
      </div>

      {orders.map((item) => {
        if (item.status !== '1' && item.status !== '2') return;
        return (
          <div
            className="new-order"
            onClick={() => {
              setOrderModal(true);
              setDetails(item);
            }}
            key={item.id}
          >
            <p className="order-number">{item.id}</p>
            <p className="customer-name">
              {item.customer.first_name} {item.customer.last_name[0]}.
            </p>
            {item.confirm_at && <p className="order-time">{formatDate(item.confirm_at).split(' - ')[1]}</p>}
          </div>
        );
      })}
    </div>
  );
};
