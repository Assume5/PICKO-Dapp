import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const ServicesPromo = () => {
  const navigate = useNavigate();
  return (
    <div className="services-promo">
      <div className="item" onClick={() => navigate('/driver')}>
        <img src={'/imgs/become-driver.svg'} alt="" />
        <p>
          Become a PICKO Driver <FontAwesomeIcon icon={faArrowRight} size="sm" />
        </p>
      </div>
      <div className="item" onClick={() => navigate('/owner')}>
        <img src={'/imgs/restaurant-partner.svg'} alt="" />
        <p>
          Become a Restaurant Partner <FontAwesomeIcon icon={faArrowRight} size="sm" />
        </p>
      </div>
    </div>
  );
};
