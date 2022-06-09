import React, { useEffect, useState } from 'react';
import { RestaurantDetailType, Store, StoreSocialLinks, StoreHeroImages } from '@src/types';
import { serverUrl } from '@src/constants';

import { RestaurantHero } from '@src/components/Customer/Hero/RestaurantHero/RestaurantHero';
import { Menu } from '@src/components//Customer/Menu/Menu';
import { RestaurantDetail } from '@src/components/Customer/RestaurantDetail/RestaurantDetail';
import { CustomerHeader } from '../../../components/Customer/CustomerHeader/CustomerHeader';
import { useNavigate, useParams } from 'react-router-dom';

export const Restaurant = () => {
  const [details, setDetails] = useState<RestaurantDetailType>();
  const [heroData, setHeroData] = useState<StoreHeroImages[]>();
  const [socialData, setSocialData] = useState<StoreSocialLinks>();
  const [data, setData] = useState<Store>();
  const navigate = useNavigate();

  const { restaurantId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/store/${restaurantId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const response = await res.json();

      if (response.error) {
        navigate('/');
      }

      if (response.success) {
        const data: Store = response.data;
        setData(response.data);
        setSocialData(data.social_links);
        setHeroData(data.hero_images);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const details: RestaurantDetailType = {
        deliveryFee: 3,
        minToDeliver: '30',
        restaurantName: data.restaurant_name,
        category: data.category,
        openTime: `${data.open_time} -  ${data.close_time}`,
        address: `${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`,
        status: data.status,
      };
      setDetails(details);
    }
  }, [data]);

  if (!data || !socialData || !heroData || !details) return null;

  return (
    <>
      <CustomerHeader />
      <div className="restaurant">
        <RestaurantHero heroImages={heroData} socialData={socialData} heroType={data.hero_type} />
        <RestaurantDetail details={details} />
        <Menu menuType={data.menu_type} menus={data.menu_category} />
      </div>
    </>
  );
};
