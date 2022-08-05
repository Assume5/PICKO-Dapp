import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { DriverOrder } from '../../../types';

interface Props {
  onDeliveredClick: (orderId: string) => void;
  currentOrder: DriverOrder | null;
}

export const DriverStepThree: React.FC<Props> = ({ onDeliveredClick, currentOrder }) => {
  if (!currentOrder) return null;

  return (
    <div className="order-container step-two">
      <h3>
        <FontAwesomeIcon icon={faUser} />
        {currentOrder.customer.first_name} {currentOrder.customer.last_name}
      </h3>
      <h3>
        <FontAwesomeIcon icon={faLocationArrow} />
        {currentOrder.delivery_address}
      </h3>
      <div className="vertical-line"></div>
      <p>Total Items: {currentOrder.total_items}</p>
      <div className="item-container">
        {currentOrder.details.map((item) => {
          return (
            <>
              <div className="item" key={item.menu_id}>
                <p>Quality: {item.count}</p>
                <p>{item.menu_name}</p>
              </div>
            </>
          );
        })}
      </div>
      <button onClick={() => onDeliveredClick(currentOrder.id)}>Delivered</button>
    </div>
  );
};
