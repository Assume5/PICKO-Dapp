import React from 'react';

export const InProgressOrders = () => {
  return (
    <div className="in-progress-orders fade-in-up">
      <div className="new-order info-bar">
        <p className="order-number">Order Number</p>
        <p className="customer-name">Customer Name</p>
        <p className="order-time">Confirmed at</p>
      </div>

      <div className="new-order">
        <p className="order-number">1</p>
        <p className="customer-name">Chenyi Z.</p>
        <p className="order-time">12:00PM</p>
      </div>
      <div className="new-order">
        <p className="order-number">2</p>
        <p className="customer-name">Random Z.</p>
        <p className="order-time">12:01PM</p>
      </div>
      <div className="new-order">
        <p className="order-number">3</p>
        <p className="customer-name">LongLongRandomFirstName Z.</p>
        <p className="order-time">12:03PM</p>
      </div>
    </div>
  );
};
