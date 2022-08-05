import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { DriverOrder } from '../../../types';

interface Props {
  onPickUpClick: (dest: [number, number], orderId: string) => void;
  currentOrder: DriverOrder | null;
}

export const DriverStepTwo: React.FC<Props> = ({ onPickUpClick, currentOrder }) => {
  if (!currentOrder) return null;
  return (
    <div className="order-container step-two">
      <h3>
        <FontAwesomeIcon icon={faStore} />
        {currentOrder.restaurant.restaurant_name}
      </h3>
      <h3>
        <FontAwesomeIcon icon={faLocationArrow} />
        {currentOrder.restaurant.address}
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
      <button
        onClick={() => onPickUpClick([+currentOrder.destination_lat, +currentOrder.destination_long], currentOrder.id)}
      >
        Pick up
      </button>
    </div>
  );
};
