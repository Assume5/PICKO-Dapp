import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface Props {
  onPickUpClick: (dest: [number, number]) => void;
}

export const DriverStepTwo: React.FC<Props> = ({ onPickUpClick }) => {
  return (
    <div className="order-container step-two">
      <h3>
        <FontAwesomeIcon icon={faStore} />
        China Taste
      </h3>
      <h3>
        <FontAwesomeIcon icon={faLocationArrow} />
        1280 Sweet Home Rd Graphics
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
      <button onClick={() => onPickUpClick([43.00628, -78.81488])}>Pick up</button>
    </div>
  );
};
