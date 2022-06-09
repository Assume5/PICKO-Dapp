import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import { RestaurantDetailType } from '@src/types';
interface Props {
  details: RestaurantDetailType;
}

export const RestaurantDetail: React.FC<Props> = ({ details }) => {
  if (details) {
    return (
      <div className="restaurant-detail">
        <div className="container">
          <div className="name">
            <h2>{details.restaurantName}</h2>
          </div>
          <div className="description">
            <p>
              <span>Status:</span> {details.status}
            </p>
            <p>
              <span>Category:</span> {details.category}
            </p>
            <p>
              <span>Open: </span> {details.openTime}
            </p>
          </div>
          <div className="info">
            <p>
              {details.minToDeliver} <span>Minutes</span>
            </p>
            <p>
              <span>Delivery Fee: </span>$ {details.deliveryFee}
            </p>
          </div>
          <FontAwesomeIcon icon={faLocationArrow} />
          <p>{details.address}</p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
