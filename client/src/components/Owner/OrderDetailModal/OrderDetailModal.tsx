import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderDetailModal: React.FC<Props> = ({ setOrderModal }) => {
  //fetch, different status has different layout
  return (
    <div className="order-details-modal modal fade-in">
      <div className="close-button">
        <FontAwesomeIcon icon={faTimes} onClick={() => setOrderModal(false)} className="close-button" />
      </div>
      <div className="modal-inner">
        <div className="order-info">
          <p className="order-number">
            Order number: <strong>1</strong>
          </p>
          <p className="customer-name">
            Order from: <strong>Chenyi Z</strong>
          </p>
          <p className="customer-phone">
            Phone number: <strong>1-123-123-1234</strong>
          </p>
          <p className="order-date">
            Order at: <strong>05/13/2022 - 12:00PM</strong>
          </p>
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
          {/* {status === 'new-order' && (
            <div>
              <button>CANCEL</button>
              <button>CONFIRM</button>
            </div>
          )}

          {status === 'in-progress' && (
            <div>
              <button>READY FOR PICKUP</button>
            </div>
          )} */}

          <button className="cancel-button">CANCEL</button>
          <button className="button">CONFIRM</button>
        </div>
      </div>
    </div>
  );
};
