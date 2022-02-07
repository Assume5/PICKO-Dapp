import React from 'react';
import { HomeHero } from '../../components/Hero/HomeHero/HomeHero';
import { ServicesPromo } from '../../components/ServicesPromo/ServicesPromo';

export const Home = () => {
  return (
    <div className="home">
      <HomeHero />
      <ServicesPromo />
    </div>
  );
};
