import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Cart } from '../../../../types';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCookie } from '../../../../utils/functions';
import { SocketContext } from '../../../../contexts/SocketContext';
import { etherscanAPI } from '../../../../utils/constants';

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
  const [tip, setTip] = useState(0);
  const [tipType, setTipType] = useState('15');
  const [etherNow, setEtherNow] = useState(0);
  const socketCtx = useContext(SocketContext);

  const clientDot = L.icon({
    iconUrl: '/imgs/dot.svg',
    iconSize: [32, 16],
  });

  useEffect(() => {
    const fetchEtherNow = async () => {
      try {
        const res = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscanAPI}`);
        const data = await res.json();
        console.log(data.result.ethusd);
        console.log(data);
        setEtherNow(+data.result.ethusd);
      } catch (err) {
        console.error('EtherScan Error: ', err);
      }
    };

    fetchEtherNow();
  }, []);

  useEffect(() => {
    if (!cartCtx) return;
    let total = 0;
    cartCtx.cart?.cartItems?.forEach((item) => {
      total += item.price;
    });

    setTip(+((total + 3) * 0.15).toFixed(2));
    setTotal(total + 3);
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

  const createOrder = async () => {
    socketCtx &&
      socketCtx.socket &&
      cartCtx &&
      cartCtx.cart &&
      socketCtx.socket.emit('customer-place-order', cartCtx.cart.restaurantID);
  };

  const onCheckoutClick = async (type: string) => {
    if (type === 'card') {
      createOrder();
    } else {
      // trigger metamask
    }
  };

  useEffect(() => {
    if (tipType === 'custom') {
      setTip(0);
      return;
    }
    if (total === 0) return;
    setTip(+(total * +tipType).toFixed(2));
  }, [tipType]);

  const onTipChange = (e: FormEvent) => {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    setTip(+value);
  };

  return (
    <>
      <div className="checkout-price">
        {latLong && (
          <>
            <div className="leaflet-map" id="mapid" style={{ height: '500px' }}>
              <MapContainer
                center={[latLong.lat, latLong.long]}
                zoom={16}
                scrollWheelZoom={false}
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
        <div className="tip">
          <p className="text">
            Tip: <strong>$ {tip}</strong>
          </p>
          <div className="radio-group">
            <div className="radios" onChange={(e) => setTipType((e.target as HTMLInputElement).value)}>
              <input type="radio" value="0.15" name="tip" defaultChecked={true} id="option-1" />
              <label htmlFor="option-1">15%</label>

              <input type="radio" value="0.18" name="tip" id="option-2" />
              <label htmlFor="option-2">18%</label>

              <input type="radio" value="0.20" name="tip" id="option-3" />
              <label htmlFor="option-3">20%</label>

              <input type="radio" value="custom" name="tip" id="option-4" />
              <label htmlFor="option-4">Custom</label>
            </div>
            {tipType === 'custom' && (
              <input className="custom-tip" type="number" min="0" onChange={(e) => onTipChange(e)} defaultValue="0" />
            )}
          </div>
        </div>

        <p className="total text">
          Total: <strong>$ {(total + tip).toFixed(2)}</strong>
        </p>
        <button onClick={() => onCheckoutClick('card')}>
          Place Order - $ {(total + tip).toFixed(2)} <img src="/imgs/credit-card.svg" alt="" />
        </button>
        <button onClick={() => onCheckoutClick('metamask')}>
          Place Order - ETH {((total + tip) / etherNow).toFixed(3)} <img src="/imgs/MetaMask_Fox.svg" alt="" />
        </button>
      </div>
    </>
  );
};
