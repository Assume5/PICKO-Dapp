import React from 'react';

export const OrderModal = () => {
  return (
    <div className="new-order-modal">
      <div className="order-info">
        <p className="order-number">Order number:1</p>
        <p className="customer-name">Chenyi Z</p>
      </div>
      <div className="order-items">
        <div className="item">
          <h3>1</h3>
          <h4>Ramen</h4>
          <p>$100</p>
        </div>
        <div className="item">
          <h3>5</h3>
          <h4>Ramen</h4>
          <p>$100</p>
        </div>
        <div className="item">
          <h3>3</h3>
          <h4>Ramen</h4>
          <p>$100</p>
        </div>
      </div>
      <div className="summary">Total: 1000</div>
      <div className="action-button">
        <button>CANCEL</button>
        <button>READY FOR PICKUP</button>
        <button>CONFIRM</button>
      </div>
    </div>
  );
};
