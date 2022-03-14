import React, { useState, useEffect } from 'react';
import { Restaurant } from '../../../../types/components';
import { getCookie } from '../../../../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { EatHeroModal } from './EatHeroModal';
import { useNavigate } from 'react-router-dom';

interface Props {
  topRestaurants: Restaurant;
}

export const EatHero: React.FC<Props> = ({ topRestaurants }) => {
  const [currentSlide, setCurrentSlide] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');
  const [heroModal, setHeroModal] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentLocation(getCookie('address_details').home);
    setHeroModal(false);
    setChangeSuccess(false);
  }, [changeSuccess]);

  useEffect(() => {
    setCurrentSlide(Object.keys(topRestaurants)[0]);
    setSlideIndex(0);
  }, [topRestaurants]);

  useEffect(() => {
    const len = Object.keys(topRestaurants).length;
    const nextSlide = setTimeout(() => {
      if (slideIndex + 1 === len) {
        setCurrentSlide(Object.keys(topRestaurants)[0]);
        setSlideIndex(0);
      } else {
        setCurrentSlide(Object.keys(topRestaurants)[slideIndex + 1]);
        setSlideIndex(slideIndex + 1);
      }
    }, 5000);

    return () => clearTimeout(nextSlide);
  }, [slideIndex, currentSlide, topRestaurants]);

  const onSliderClick = (key: string, i: number) => {
    setCurrentSlide(key);
    setSlideIndex(i);
  };

  const onModalClick = () => {
    setHeroModal(true);
  };

  const onHeroImageClick = (key: string, id: number) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}-${id}`);
  };

  return (
    <div className="eat-hero">
      <div className="top-restaurants">
        <div className="image-container">
          {Object.keys(topRestaurants).map((key, i) => {
            const restaurant = topRestaurants[key];
            return (
              <div
                className={`carousel-item ${currentSlide === key ? 'active' : ''}`}
                key={i}
                onClick={() => onHeroImageClick(key, restaurant.id)}
              >
                <img src={restaurant.image} alt="" />
                <div className="overlay-text">
                  <h2>Top Restaurant at Your Location:</h2>
                  <p>{key}</p>
                </div>
                <div className="overlay"></div>
              </div>
            );
          })}
        </div>
        <div className="slider-lists">
          {Object.keys(topRestaurants).map((key, i) => {
            const restaurant = topRestaurants[key];
            return (
              <div
                className={`slider-list ${currentSlide === key ? 'active' : ''}`}
                key={i}
                onClick={() => onSliderClick(key, i)}
              >
                <img src={restaurant.image} alt="" />
                <p>{key}</p>
                <div className="overlay"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="current-location" onClick={onModalClick}>
        <p>
          <FontAwesomeIcon icon={faLocationArrow} />
          Current Location: {currentLocation}
        </p>
      </div>

      <EatHeroModal
        heroModal={heroModal}
        setHeroModal={setHeroModal}
        changeSuccess={changeSuccess}
        setChangeSuccess={setChangeSuccess}
      />
    </div>
  );
};
