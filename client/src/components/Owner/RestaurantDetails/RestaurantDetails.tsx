import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const RestaurantDetails = () => {
  return (
    <div className="restaurant-detail">
      <div className="container">
        <div className="name">
          <h2>PICKO</h2>
        </div>
        <div className="description">
          <p>
            <span>Category:</span> Asian
          </p>
          <p>
            <span>Open: </span> 9:00 AM - 9:00 PM
          </p>
        </div>
        <FontAwesomeIcon icon={faLocationArrow} />
        <p>1234 Chestnut Ridge Road, Buffalo NY, 14228</p>
      </div>
    </div>
  );
};
