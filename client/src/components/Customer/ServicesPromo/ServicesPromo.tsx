import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const ServicesPromo = () => {
  return (
    <div className="services-promo">
      <div className="item">
        <img src={'/imgs/become-driver.svg'} alt="" />
        <p>
          Become a PICKO Driver <FontAwesomeIcon icon={faArrowRight} size="sm" />
        </p>
      </div>
      <div className="item">
        <img src={'/imgs/restaurant-partner.svg'} alt="" />
        <p>
          Become a Restaurant Partner <FontAwesomeIcon icon={faArrowRight} size="sm" />
        </p>
      </div>
    </div>
  );
};
