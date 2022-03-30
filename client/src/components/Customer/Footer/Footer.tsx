import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-col">
        <p className="title">About PICKO</p>
        <p className="footer-link">
          <a href="#">About Us</a>
        </p>
        <p className="footer-link">
          <a href="#">Privacy Statement</a>
        </p>
        <p className="footer-link">
          <a href="#">Terms Of Use</a>
        </p>
      </div>

      <div className="footer-col">
        <p className="title">Service</p>
        <p className="footer-link">
          <a href="#">Become a Restaurant Partner</a>
        </p>
        <p className="footer-link">
          <a href="#">Become a PICKO Driver</a>
        </p>
      </div>

      <div className="footer-col">
        <div className="social">
          <p className="title">Social</p>
          <p className="footer-link">
            <a href="#">
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faFacebookSquare} size="2x" />
            </a>
          </p>
          <p className="footer-link">
            <a href="#">
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faTwitter} size="2x" />
            </a>
          </p>
          <p className="footer-link">
            <a href="#">
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faInstagram} size="2x" />
            </a>
          </p>
        </div>
        <div className="newsletter">
          <p className="title">Sign Up For News And Exclusive Deals</p>
          <div className="email-input">
            <input type="email" name="email-address" id="email-address" placeholder="Email" />
            <button>
              <FontAwesomeIcon className="FontAwesomeIcon" icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
