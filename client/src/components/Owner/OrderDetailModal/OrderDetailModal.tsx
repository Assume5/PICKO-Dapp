import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OwnerOrderDetails } from '../../../types';
import { formatDate } from '../../../utils/functions';
import { serverUrl } from '../../../utils/constants';

interface Props {
  setOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  details: OwnerOrderDetails;
  orders: OwnerOrderDetails[];
  setOrders: React.Dispatch<React.SetStateAction<OwnerOrderDetails[] | null>>;
}

export const OrderDetailModal: React.FC<Props> = ({ setOrderModal, details, orders, setOrders }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let tempTotal = 0;
    details.details.forEach((item) => {
      tempTotal += item.price;
    });

    setTotal(+tempTotal.toFixed(2));
  }, []);

  const updateStatus = async (status: string) => {
    const res = await fetch(`${serverUrl}/order/${details.id}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    });

    const response = await res.json();

    if (response.success) {
      const newState = orders.map((item) => {
        if (item.id === details.id) {
          return {
            ...item,
            status: status,
            compelete_at: response.compelete_at,
            confirm_at: response.confirm_at,
            pickup_at: response.update_at,
            ready_at: response.ready_at,
          };
        }
        return item;
      });
      setOrders(newState);
      setOrderModal(false);
    }
  };

  return (
    <div className="order-details-modal modal fade-in">
      <div className="close-button">
        <FontAwesomeIcon icon={faTimes} onClick={() => setOrderModal(false)} className="close-button" />
      </div>
      <div className="modal-inner">
        <div className="order-info">
          <p className="order-number">
            Order number: <strong>{details.id}</strong>
          </p>
          <p className="customer-name">
            Order from:{' '}
            <strong>
              {details.customer.first_name} {details.customer.last_name[0]}
            </strong>
          </p>
          <p className="customer-phone">
            Phone number: <strong>{details.customer.phone}</strong>
          </p>
          <p className="order-date">
            Order at: <strong>{formatDate(details.order_date)}</strong>
          </p>
        </div>
        <div className="order-items">
          {details.details.map((item) => {
            return (
              <div className="item" key={item.menu_id}>
                <p>{item.count}</p>
                <p>{item.menu_name}</p>
                <p>$ {item.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <div className="summary">
          Total: <strong>$ {total}</strong>
        </div>
        <div className="action-button">
          {details.status === '0' && (
            <div>
              <button className="cancel-button" onClick={() => updateStatus('-1')}>
                CANCEL
              </button>
              <button className="button" onClick={() => updateStatus('1')}>
                CONFIRM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
