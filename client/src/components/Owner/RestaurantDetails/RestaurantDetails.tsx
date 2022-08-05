import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <div className="description">
          <p>
            <span>Category:</span> {data.category}
          </p>
          <p>
            <span>Open: </span> {data.open_time} - {data.close_time}
          </p>
        </div>
        <FontAwesomeIcon icon={faLocationArrow} />
        <p>{data.address}</p>
      </div>
    </div>
  );
};
