import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface Props {
  onDeliveredClick: () => void;
}

export const DriverStepThree: React.FC<Props> = ({ onDeliveredClick }) => {
  return (
    <div className="order-container step-two">
      <h3>
        <FontAwesomeIcon icon={faUser} />
        Chenyi Zou
      </h3>
      <h3>
        <FontAwesomeIcon icon={faLocationArrow} />
        4363 Chestnut Ridge Rd
      </h3>
      <div className="vertical-line"></div>
      <p>Total Items: 3</p>
      <div className="item-container">
        <div className="item">
          <p>Quality: 1</p>
          <p>Spicy Beef</p>
        </div>
        <div className="item">
          <p>Quality: 1</p>
          <p>Spicy Beef</p>
        </div>
        <div className="item">
          <p>Quality: 1</p>
          <p>Spicy Beef</p>
        </div>
      </div>
      <button onClick={() => onDeliveredClick()}>Delivered</button>
    </div>
  );
};
