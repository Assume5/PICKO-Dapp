import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OwnerOrderDetails } from '../../../../types';
import { formatDate } from '../../../../utils/functions';

interface Props {
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  orders: OwnerOrderDetails[];
  setDetails: React.Dispatch<React.SetStateAction<OwnerOrderDetails | null>>;
}

export const OrderHistory: React.FC<Props> = ({ setOrderModal, orders, setDetails }) => {
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
        {orders.map((item) => {
          if (item.status !== '4' && item.status !== '-1') return;

          return (
            <>
              <tr
                onClick={() => {
                  setOrderModal(true);
                  setDetails(item);
                }}
                key={item.id}
              >
                <td className="status-container">
                  {item.status === '4' ? (
                    <FontAwesomeIcon icon={faCheckCircle} className="success" />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} className="fail" />
                  )}
                  <div className="status">
                    <p>{item.status === '4' ? 'Completed' : 'Cancelled'}</p>
                    <p>{formatDate(item.order_date)}</p>
                  </div>
                </td>
                <td>{item.id}</td>
                <td>
                  {item.customer.first_name} {item.customer.last_name[0]}.
                </td>

                <td>
                  {item.driver &&
                    item.driver.first_name &&
                    item.driver.last_name &&
                    `${item.driver.first_name} ${item.driver.last_name[0]}.`}
                </td>
                <td>$ {item.sub_total}</td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};
