import React from 'react';
import { EatHero } from '../../../components/Customer/Hero/EatHero/EatHero';

import { topRestaurants } from './FakeRestaurantData';

export const Eat = () => {
  return (
    <div className="start-eating">
      <EatHero topRestaurants={topRestaurants} />
    </div>
  );
};
