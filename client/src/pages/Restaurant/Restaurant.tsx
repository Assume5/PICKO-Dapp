import React, { useEffect, useState } from 'react';
import { RestaurantHero } from '../../components/Hero/RestaurantHero/RestaurantHero';
import { HeroType } from '../../types/index';

export const Restaurant = () => {
  const [hero, setHero] = useState<HeroType>(null);
  useEffect(() => {
    // const getHeroType = async () => {
    //   setHero({
    //     type: 'image',
    //     image: '/imgs/restaurant-hero-holder.jpg',
    //   });
    // };
    const getHeroType = async () => {
      setHero({
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=xPPLbEFbCAo',
      });
    };
    // const getHeroType = async () => {
    //   setHero({
    //     type: 'carousel',
    //     images:
    //       '/imgs/restaurant-hero-holder.jpg,/imgs/restaurant-hero-holder-2.jpg,/imgs/restaurant-hero-holder-3.jpg',
    //   });
    // };
    getHeroType();
  }, []);
  return (
    <div className="restaurant">
      <RestaurantHero hero={hero} />
    </div>
  );
};
