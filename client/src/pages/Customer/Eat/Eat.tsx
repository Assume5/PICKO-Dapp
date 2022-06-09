import React, { useEffect, useState } from 'react';
import { CategoryFilter } from '@src/components/Customer/CateogryFilter/CategoryFilter';
import { EatHero } from '@src/components/Customer/Hero/EatHero/EatHero';
import { RestaurantList } from '@src/components/Customer/RestaurantList/RestaurantList';
import { checkAddress, getCookie } from '@src/helpers';

import { topRestaurants } from './FakeRestaurantData';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';
import { serverUrl } from '../../../utils/constants';

type RestaurantType = {
  id: string;
  category: string;
  distance: number;
  full_address: string;
  lat: string;
  long: string;
  open_time: string;
  close_time: string;
  restaurant_name: string;
  restaurant_card_image: string;
  view_count: number;
  status: string;
};

export const Eat = () => {
  const [currentFilter, setCurrentFilter] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>();

  const [data, setData] = useState<RestaurantType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const address = getCookie('lat_long');
      const res = await fetch(`${serverUrl}/store/${address.lat}/${address.long}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      const response: RestaurantType[] = data.data;

      response.sort((a, b) => {
        return b.view_count - a.view_count;
      });

      const tempArray: string[] = [];
      response.forEach((restaurant) => {
        const category = restaurant.category;
        category.split(', ').forEach((category) => {
          if (tempArray.indexOf(category) === -1) tempArray.push(category);
        });
      });

      setCategories(tempArray);
      setData(response);
    };

    fetchData();
  }, []);

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

  return (
    <>
      <CustomerHeader />
      <div className="start-eating">
        {!data ? null : (
          <>
            {!data.length && (
              <p className="no-nearby">
                No Nearby Restaurant for Testing Please Use <strong>4363 Chestnut Ridge Road</strong>
              </p>
            )}
            <EatHero topRestaurants={topRestaurants} data={data} />
            <div className="eat-content">
              {data && categories && (
                <>
                  {categories.length > 1 && (
                    <CategoryFilter
                      categories={categories}
                      currentFilter={currentFilter}
                      setCurrentFilter={setCurrentFilter}
                    />
                  )}

                  <RestaurantList restaurants={data} currentFilter={currentFilter} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
