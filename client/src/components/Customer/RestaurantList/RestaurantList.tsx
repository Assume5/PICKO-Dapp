import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '@src/types';

interface Props {
  restaurants: Restaurant;
  currentFilter: string[];
}

export const RestaurantList: React.FC<Props> = ({ restaurants, currentFilter }) => {
  const navigate = useNavigate();
  const onRestaurantCardClick = (key: string, id: number) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}-${id}`);
  };
  return (
    <div className="restaurant-list">
      {Object.keys(restaurants).map((key, i) => {
        const restaurant = restaurants[key];
        const category = restaurant.category.split(', ');
        if (currentFilter.length === 0 || category.some((r) => currentFilter.indexOf(r) >= 0)) {
          return (
            <div
              className="restaurant-card"
              onClick={() => onRestaurantCardClick(key, restaurant.id)}
              key={i}
              style={{ backgroundImage: `url(${restaurant.image})` }}
            >
              <div className="corner"></div>
              <div className="corner"></div>
              <div className="corner"></div>
              <div className="corner"></div>
              <div className="restaurant-card-content">
                <div className="restaurant-card-name">
                  <h4>
                    {key} - {restaurant.address}
                  </h4>
                </div>
                <div className="restaurant-card-information">
                  <p>{restaurant.mile} mi</p>
                  <p>|</p>
                  <p>{restaurant.time}</p>
                </div>
                <div className="restaurant-card-fee">
                  <p>Delivery Fee: {restaurant.fee} ETH</p>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          );
        } else return <></>;
      })}
      <div className='load-more'>
        <button>Load More</button>
      </div>
    </div>
  );
};
