import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Restaurant, RestaurantType } from '@src/types';
import { getCookie } from '@src/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { EatHeroModal } from './EatHeroModal';
import { useNavigate } from 'react-router-dom';

interface Props {
  topRestaurants: Restaurant;
  data: RestaurantType[];
}

export const EatHero: React.FC<Props> = ({ topRestaurants, data }) => {
  const [currentSlideData, setCurrentSlideData] = useState('');
  const [slideIndexData, setSlideIndexData] = useState(0);
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
    if (data.length) {
      setCurrentSlideData(data[0].restaurant_name);
      setSlideIndexData(0);
    }
  }, [data]);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      const len = data.length;
      const nextSlide = setTimeout(() => {
        if (slideIndexData + 1 === len) {
          setCurrentSlideData(data[0].restaurant_name);
          setSlideIndexData(0);
        } else {
          setCurrentSlideData(data[slideIndexData + 1].restaurant_name);
          setSlideIndexData(slideIndexData + 1);
        }
      }, 5000);

      return () => clearTimeout(nextSlide);
    }
  }, [slideIndexData, currentSlideData, topRestaurants, data]);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      const container: HTMLDivElement | null = document.querySelector('.slider-lists');

      if (container && container.scrollWidth > container.clientWidth) {
        let mouseDown = false;
        let startX: number, scrollLeft: number;

        const dragging = (e: any) => {
          mouseDown = true;
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        };

        const stopDragging = (e: any) => {
          mouseDown = false;
        };

        container.addEventListener('mousemove', (e: any) => {
          e.preventDefault();
          if (!mouseDown) {
            return;
          }
          const x = e.pageX - container.offsetLeft;
          const scroll = x - startX;
          container.scrollLeft = scrollLeft - scroll;
        });
        container?.addEventListener('mousedown', dragging, false);
        container?.addEventListener('mouseup', stopDragging, false);
        container?.addEventListener('mouseleave', stopDragging, false);
      }
    }
  });

  const onSliderClick = (key: string, i: number) => {
    setCurrentSlideData(key);
    setSlideIndexData(i);
  };

  const onModalClick = () => {
    setHeroModal(true);
  };

  const onHeroImageClick = (key: string, id: string) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}/${id}`);
  };

  return (
    <div className="eat-hero">
      <div className="top-restaurants">
        <div className="image-container">
          {data.map((restaurant) => {
            return (
              <div
                className={`carousel-item ${currentSlideData === restaurant.restaurant_name ? 'active' : ''}`}
                key={restaurant.id}
                onClick={() => onHeroImageClick(restaurant.restaurant_name, restaurant.id)}
              >
                <img src={restaurant.restaurant_card_image} alt="" />
                <div className="overlay-text">
                  <h2>Top Restaurant at Your Location:</h2>
                  <p>{restaurant.restaurant_name}</p>
                </div>
                <div className="overlay"></div>
              </div>
            );
          })}
        </div>
        <div className="slider-lists">
          {data.map((restaurant, i) => {
            return (
              <div
                className={`slider-list ${currentSlideData === restaurant.restaurant_name ? 'active' : ''}`}
                key={restaurant.id}
                onClick={() => onSliderClick(restaurant.restaurant_name, i)}
              >
                <img src={restaurant.restaurant_card_image} alt="" />
                <p>{restaurant.restaurant_name}</p>
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
