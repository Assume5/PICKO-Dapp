import React from 'react';
import { RestaurantInformation } from '../../../types';

interface Props {
  data: RestaurantInformation;
}

export const RestaurantDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="restaurant-detail">
      <div className="container">
        <div className="name">
          <h2>{data.restaurantName}</h2>
        </div>
        <p>
          Status: <strong>{data.status === 'close' ? 'Close' : 'Open'}</strong>
        </p>
        <button>{data.status === 'close' ? 'Start Accepting New Orders' : 'Stop Accepting New Orders'}</button>
      </div>
    </div>
  );
};
