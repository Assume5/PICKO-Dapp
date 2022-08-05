import React from 'react';
import { DriverOrder } from '../../../types';
import { calculateDistance } from '../../../utils/functions';

interface Props {
  onOrderClickZoom: (dest: [number, number]) => void;
  onAcceptClick: (dest: [number, number], orderId: string, order: DriverOrder) => void;
  orders: DriverOrder[];
  latLong: [number, number];
}

export const DriverStepOne: React.FC<Props> = ({ onOrderClickZoom, onAcceptClick, orders, latLong }) => {
  return (
    <div className="order-container">
      {orders.map((item) => {
        return (
          <div className="order-item" key={item.id}>
            <div>
              <p>Earning: $ {(item.driver_tip + 3).toFixed(2)}</p>
              <p>
                Distance to Store:{' '}
                {calculateDistance(latLong[0], latLong[1], item.restaurant_lat, item.restaurant_long).toFixed(2)} mile
              </p>
              <p>
                Store To Customer:{' '}
                {calculateDistance(latLong[0], latLong[1], item.destination_lat, item.destination_long).toFixed(2)} mile
              </p>
            </div>
            <div className="button-container">
              <button
                className="preview-button"
                onClick={() => onOrderClickZoom([item.restaurant_lat, item.restaurant_long])}
              >
                Preview
              </button>
              <button
                onClick={() => {
                  onAcceptClick([item.restaurant_lat, item.restaurant_long], item.id, item);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
