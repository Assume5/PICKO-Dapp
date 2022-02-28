import React, { useEffect, useState } from 'react';
import { HeroType, Social, RestaurantDetailType } from '../../../types/index';
import { serverUrl } from '../../../utils/constant';

import { RestaurantHero } from '../../../components/Customer/Hero/RestaurantHero/RestaurantHero';
import { Menu } from '../../../components/Customer/Menu/Menu';
import { RestaurantDetail } from '../../../components/Customer/RestaurantDetail/RestaurantDetail';

export const Restaurant = () => {
  const [hero, setHero] = useState<HeroType>(null);
  const [social, setSocial] = useState<Social>({ hasSocialMedia: false });
  const [details, setDetails] = useState<RestaurantDetailType>(null);

  useEffect(() => {
    //get hero
    const getHeroType = async () => {
      setHero({
        type: 'image',
        image: '/imgs/restaurant-hero-holder.jpg',
      });
    };
    // const getHeroType = async () => {
    //   setHero({
    //     type: 'video',
    //     videoUrl: 'https://www.youtube.com/watch?v=xPPLbEFbCAo',
    //   });
    // };
    // const getHeroType = async () => {
    //   setHero({
    //     type: 'carousel',
    //     images:
    //       '/imgs/restaurant-hero-holder.jpg,/imgs/restaurant-hero-holder-2.jpg,/imgs/restaurant-hero-holder-3.jpg',
    //   });
    // };

    getHeroType();
  }, []);

  useEffect(() => {
    //get Social
    const getSocial = async () => {
      setSocial({
        hasSocialMedia: true,
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        twitter: 'https://twitter.com/',
      });
    };

    getSocial();
  }, []);

  useEffect(() => {
    const getRestaurantDetail = async () => {
      const details: RestaurantDetailType = {
        deliveryFee: 1,
        minToDeliver: '20 - 30',
        restaurantName: 'PICKO',
        distance: 1.2,
        category: 'Fast Food',
        openTime: '9 am - 9 pm',
      };
      setDetails(details);
    };

    getRestaurantDetail();
  }, []);

  return (
    <div className="restaurant">
      <RestaurantHero hero={hero} social={social} />
      <RestaurantDetail details={details} />
      <Menu />
    </div>
  );
};
