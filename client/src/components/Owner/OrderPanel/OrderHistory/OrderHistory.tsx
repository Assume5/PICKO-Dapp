import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderHistory: React.FC<Props> = ({ setOrderModal }) => {
  return (
    <div className="order-history fade-in-up">
      <div className="top-bar">
        <input placeholder="Search by order number" />
      </div>
      <table className="history-table">
        <tr className="info-bar">
          <th className="status">Status</th>
          <th className="order-number">Order Number</th>
          <th className="customer-name">Customer</th>
          <th className="courier-name">Courier</th>
          <th className="total">Subtotal</th>
        </tr>
        <tr onClick={() => setOrderModal(true)}>
          <td className="status-container">
            <FontAwesomeIcon icon={faCheckCircle} className="success" />
            <div className="status">
              <p>Completed</p>
              <p>May 14, 2022 - 12:00 PM</p>
            </div>
          </td>
          <td>1</td>
          <td>Chenyi Z.</td>
          <td>Chenyi Z</td>
          <td>$1000</td>
        </tr>
        <tr onClick={() => setOrderModal(true)}>
          <td className="status-container">
            <FontAwesomeIcon icon={faCheckCircle} className="success" />
            <div className="status">
              <p>Completed</p>
              <p>May 14, 2022 - 12:00 PM</p>
            </div>
          </td>
          <td>1</td>
          <td>Chenyi Z.</td>
          <td>Chenyi Z</td>
          <td>$1000</td>
        </tr>
        <tr onClick={() => setOrderModal(true)}>
          <td className="status-container">
            <FontAwesomeIcon icon={faTimesCircle} className="fail" />
            <div className="status">
              <p>Cancelled</p>
              <p>May 14, 2022 - 12:00 PM</p>
            </div>
          </td>
          <td>1</td>
          <td>Chenyi Z.</td>
          <td>Chenyi Z</td>
          <td>$1000</td>
        </tr>
        <tr onClick={() => setOrderModal(true)}>
          <td className="status-container">
            <FontAwesomeIcon icon={faTimesCircle} className="fail" />
            <div className="status">
              <p>Cancelled</p>
              <p>May 14, 2022 - 12:00 PM</p>
            </div>
          </td>
          <td>1</td>
          <td>Chenyi Z.</td>
          <td>Chenyi Z</td>
          <td>$1000</td>
        </tr>
      </table>
    </div>
  );
};
