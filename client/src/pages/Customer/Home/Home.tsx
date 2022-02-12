import React from 'react';
import { HomeHero } from '../../../components/Customer/Hero/HomeHero/HomeHero';
import { ServicesPromo } from '../../../components/Customer/ServicesPromo/ServicesPromo';

export const Home = () => {
  return (
    <div className="home">
      <HomeHero />
      <ServicesPromo />
    </div>
  );
};
