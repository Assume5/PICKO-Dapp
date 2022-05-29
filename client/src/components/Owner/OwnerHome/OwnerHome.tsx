import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RestaurantInformation } from '../../../types';
import { serverUrl } from '../../../utils/constants';
import { Menus } from '../Menus/Menus';
import { OrderPanel } from '../OrderPanel/OrderPanel';
import { RestaurantDetails } from '../RestaurantDetails/RestaurantDetails';

export const OwnerHome = () => {
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<RestaurantInformation | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverUrl}/restaurant/${id}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const data = await res.json();
      if (data && data.error) {
        console.error(data.error);
        navigate('/owner');
      }
      console.log(data);
      setData({
        restaurantName: data.restaurant_name,
        status: data.status,
      });
      setLoaded(true);
    };

    fetchData();
  }, []);

  if (!loaded && !data) return <></>;

  return (
    <>
      <RestaurantDetails data={data!} />
      <OrderPanel />
    </>
  );
};
