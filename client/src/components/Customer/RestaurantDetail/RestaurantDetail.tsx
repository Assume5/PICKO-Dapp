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
              <span>Category:</span> {details.category}
            </p>
            <p>
              <span>Distance: </span> {details.distance}mi
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
              <span>Delivery Fee: </span>
              {details.deliveryFee} ETH
            </p>
          </div>
          <FontAwesomeIcon icon={faLocationArrow} />
          <p>1234 Chestnut Ridge Road, Buffalo NY, 14228</p>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
