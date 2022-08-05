import { faLocationArrow, faStore, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { DriverHeader } from '../../../components/Driver/DriverHeader/DriverHeader';
import { DriverPastOrders } from '../../../types';
import { serverUrl } from '../../../utils/constants';
export const Account = () => {
  const [pastOrders, setPastOrders] = useState<DriverPastOrders[] | null>(null);
  const [detailModal, setDetailModal] = useState(false);
  const [detail, setDetail] = useState<DriverPastOrders | null>(null);
  const [totalEarn, setTotalEarn] = useState(0);
  const storeIcon = L.icon({
    iconUrl: '/imgs/restaurant-icon.svg',
    iconSize: [32, 32],
  });
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${serverUrl}/order/driver`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      const response = await res.json();

      if (response.error) {
        console.error(response.error);
      }

      if (response.success) {
        const data: DriverPastOrders[] = response.data;
        let sum = 0;
        data.forEach((item) => {
          sum = sum + 3 + item.driver_tip;
        });
        setTotalEarn(sum);
        setPastOrders(data);
      }
    };

    fetchOrders();
  }, []);
  if (!pastOrders) return null;

  return (
    <>
      <DriverHeader />
      <div className="page driver-account">
        <h2>Total Earn: $ {totalEarn.toFixed(2)}</h2>
        {pastOrders.map((item) => {
          return (
            <div className="driver-order-item" key={item.id}>
              <div>
                <p>
                  Earn: <strong>$ {(item.driver_tip + 3).toFixed(2)}</strong>
                </p>
                <p>Form: {item.restaurant.restaurant_name}</p>
                <p>
                  To: {item.customer.first_name} {item.customer.last_name}
                </p>
              </div>

              <button
                onClick={() => {
                  setDetailModal(true);
                  setDetail(item);
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
        {detail && detailModal && (
          <div className={`driver-account-modal modal ${detailModal && detail && 'visible'}`}>
            <div className="close-button">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => {
                  setDetailModal(false);
                  setDetail(null);
                }}
                className="close-button"
              />
            </div>
            <div className="modal-inner">
              <h3>
                <FontAwesomeIcon icon={faStore} />
                {detail.restaurant.restaurant_name}
              </h3>
              <h3>
                <FontAwesomeIcon icon={faLocationArrow} />
                {detail.restaurant.address}
              </h3>
              <h3>
                <FontAwesomeIcon icon={faUser} />
                {detail.customer.first_name} {detail.customer.last_name}
              </h3>
              <div className="vertical-line"></div>
              <p>Total Items: {detail.total_items}</p>
              <div className="item-container">
                {detail.details.map((item) => {
                  return (
                    <>
                      <div className="item" key={item.menu_id}>
                        <p>Quality: {item.count}</p>
                        <p>{item.menu_name}</p>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="leaflet-map" id="mapid" style={{ height: '500px' }}>
                <MapContainer
                  center={[detail.restaurant_lat, detail.restaurant_long]}
                  zoom={16}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  style={{ height: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                  />
                  <Marker position={[detail.restaurant_lat, detail.restaurant_long]} icon={storeIcon}></Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
