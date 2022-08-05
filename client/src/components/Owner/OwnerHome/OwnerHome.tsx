import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OwnerOrderContext } from '../../../contexts/OwnerOrderContext';
import { OwnerOrderDetails, RestaurantInformation } from '../../../types';
import { serverUrl } from '../../../utils/constants';
import { Menus } from '../Menus/Menus';
import { NewOrderModal } from '../NewOrderModal/NewOrderModal';
import { OrderPanel } from '../OrderPanel/OrderPanel';
import { RestaurantDetails } from '../RestaurantDetails/RestaurantDetails';

export const OwnerHome = () => {
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<RestaurantInformation | null>(null);
  const [newOrderModal, setNewOrderModal] = useState(false);
  const orderCtx = useContext(OwnerOrderContext);

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
      setData({
        restaurantName: data.restaurant_name,
        status: data.status,
        open_time: data.open_time,
        close_time: data.close_time,
        address: data.address,
        category: data.category,
      });
      setLoaded(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!orderCtx.orders) return;
    if (Cookies.get('order-modal-trigger')) return;
    const data: OwnerOrderDetails[] = orderCtx.orders;
    for (const i of data) {
      if (i.status === '0') {
        setNewOrderModal(true);
        Cookies.set('order-modal-trigger', 'true');
        break;
      }
    }
  }, [orderCtx]);

  if (!loaded || !data || !orderCtx.orders) return <></>;
  return (
    <>
      <RestaurantDetails data={data} />
      {orderCtx.orders && <OrderPanel orders={orderCtx} />}
      <NewOrderModal setNewOrderModal={setNewOrderModal} newOrderModal={newOrderModal} disableNav={true} />
    </>
  );
};
