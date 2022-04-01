import React, { useEffect, useState } from 'react';
import { CategoryFilter } from '@src/components/Customer/CateogryFilter/CategoryFilter';
import { EatHero } from '@src/components/Customer/Hero/EatHero/EatHero';
import { RestaurantList } from '@src/components/Customer/RestaurantList/RestaurantList';
import { Restaurant } from '@src/types';
import { checkAddress } from '@src/helpers';

import { topRestaurants, restaurants } from './FakeRestaurantData';

export const Eat = () => {
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>();
  const [tempRestaurants, setTempRestaurants] = useState<Restaurant>();
  useEffect(() => {
    const check = async () => {
      const res = await checkAddress();
      if (!res) {
        const win: Window = window;
        win.location = '/';
      }
    };
    check();
  }, []);

  useEffect(() => {
    const tempArray: string[] = [];

    Object.keys(restaurants).forEach((key) => {
      const category = restaurants[key].category;
      category.split(', ').forEach((category) => {
        if (tempArray.indexOf(category) === -1) tempArray.push(category);
      });
    });
    setCategories(tempArray.sort());
    setTempRestaurants(restaurants);
  }, []);

  return (
    <div className="start-eating">
      <EatHero topRestaurants={topRestaurants} />
      <div className="eat-content">
        {tempRestaurants && categories && (
          <>
            <CategoryFilter categories={categories} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            <RestaurantList restaurants={tempRestaurants} currentFilter={currentFilter} />
          </>
        )}
        {}
      </div>
    </div>
  );
};
