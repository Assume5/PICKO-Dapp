import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
export const HomeHero = () => {
  return (
    <div className="home-hero">
      <h2>Enter your address and order your food!</h2>
      <div className="address-input">
        <input type="text" placeholder="Address" />
        <FontAwesomeIcon icon={faArrowCircleRight} />
      </div>
      <div className='overlay'></div>
    </div>
  );
};
