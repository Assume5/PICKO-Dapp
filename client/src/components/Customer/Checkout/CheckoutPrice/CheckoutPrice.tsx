import React, { useEffect, useState } from 'react';
import { Cart } from '../../../../types';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCookie } from '../../../../utils/functions';

type contextType = {
  cart: Cart | undefined;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};
interface Props {
  cartCtx: contextType;
  address: boolean;
}

type latLong = {
  lat: number;
  long: number;
};

export const CheckoutPrice: React.FC<Props> = ({ cartCtx, address }) => {
  const [total, setTotal] = useState(0);
  const [latLong, setLatLong] = useState<latLong>();
  const [map, setMap] = useState<L.Map>();
  const clientDot = L.icon({
    iconUrl: '/imgs/dot.svg',
    iconSize: [32, 16],
  });

  useEffect(() => {
    if (!cartCtx) return;
    let total = 0;
    cartCtx.cart?.cartItems?.forEach((item) => {
      total += item.price;
    });

    setTotal(total);
  }, [cartCtx]);

  const changeView = (center: [number, number]) => {
    if (!map) return;
    map.setView(center);
    return null;
  };

  useEffect(() => {
    const latLong = getCookie('lat_long') as latLong;
    changeView([latLong.lat, latLong.long]);
    setLatLong(latLong);
  }, [address]);

  const createOrder = async () => {};

  const onCheckoutClick = async (type: string) => {
    if (type === 'card') {
      createOrder();
    } else {
      // trigger metamask
    }
  };

  return (
    <>
      <div className="checkout-price">
        {latLong && (
          <>
            <div className="leaflet-map" id="mapid" style={{ height: '500px' }}>
              <MapContainer
                center={[latLong.lat, latLong.long]}
                zoom={18}
                scrollWheelZoom={true}
                style={{ height: '100%' }}
                whenCreated={(map) => setMap(map)}
              >
                <TileLayer
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                <Marker position={[latLong.lat, latLong.long]} icon={clientDot}></Marker>
              </MapContainer>
            </div>
          </>
        )}
        <p className="subtotal text">
          Subtotal: <strong>$ {total}</strong>
        </p>
        <p className="delivery-fee text">
          Delivery Fee & Services Fee: <strong>$ 3.00</strong>
        </p>
        <div className="tip"></div>
        <p className="total text">
          Total: <strong>$ {total + 3}</strong>
        </p>
        <button onClick={() => onCheckoutClick('card')}>
          Place Order - $ {total + 3} <img src="/imgs/credit-card.svg" alt="" />
        </button>
        <button onClick={() => onCheckoutClick('metamask')}>
          Place Order - $ {total + 3} <img src="/imgs/MetaMask_Fox.svg" alt="" />
        </button>
      </div>
    </>
  );
};
