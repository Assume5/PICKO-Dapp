import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../../utils/constants';
import { Menus } from '../Menus/Menus';
import { OrderPanel } from '../OrderPanel/OrderPanel';
import { RestaurantDetails } from '../RestaurantDetails/RestaurantDetails';

export const OwnerHome = () => {
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/restaurant/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
    };

    fetchData();
  }, []);
  return (
    <>
      <RestaurantDetails />
      <OrderPanel />
    </>
  );
};
