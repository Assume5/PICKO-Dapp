import React from 'react';

interface Props {
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewOrders: React.FC<Props> = ({ setOrderModal }) => {
  //fetch all
  return (
    <div className="new-orders fade-in-up">
      <div className="new-order info-bar">
        <p className="order-number">Order Number</p>
        <p className="customer-name">Customer Name</p>
        <p className="order-time">Ordered at</p>
      </div>

      <div className="new-order" onClick={() => setOrderModal(true)}>
        <p className="order-number">1</p>
        <p className="customer-name">Chenyi Z.</p>
        <p className="order-time">12:00PM</p>
      </div>
      <div className="new-order" onClick={() => setOrderModal(true)}>
        <p className="order-number">2</p>
        <p className="customer-name">Random Z.</p>
        <p className="order-time">12:01PM</p>
      </div>
      <div className="new-order" onClick={() => setOrderModal(true)}>
        <p className="order-number">3</p>
        <p className="customer-name">LongLongRandomFirstName Z.</p>
        <p className="order-time">12:03PM</p>
      </div>
    </div>
  );
};
