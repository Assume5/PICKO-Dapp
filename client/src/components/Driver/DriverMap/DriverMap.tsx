import React, { useContext, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, TileLayerProps } from 'react-leaflet';
import 'leaflet-routing-machine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import L, { IconOptions } from 'leaflet';
import { DriverOrder, User } from '../../../types';
import { serverUrl } from '../../../utils/constants';
import { DriverStepZero } from '../DriverPhase/DriverStepZero';
import { DriverStepOne } from '../DriverPhase/DriverStepOne';
import { DriverStepTwo } from '../DriverPhase/DriverStepTwo';
import { DriverStepThree } from '../DriverPhase/DriverStepThree';
import { SocketContext } from '../../../contexts/SocketContext';

interface contextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface Props {
  userCtx: contextType;
  newOrder: boolean;
  orders: DriverOrder[] | null;
  setOrders: React.Dispatch<React.SetStateAction<DriverOrder[] | null>>;

  currentOrder: DriverOrder | null;
  setCurrentOrders: React.Dispatch<React.SetStateAction<DriverOrder | null>>;
  setNewOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DriverMap: React.FC<Props> = ({
  userCtx,
  newOrder,
  setNewOrder,
  orders,
  setOrders,
  currentOrder,
  setCurrentOrders,
}) => {
  const [latLong, setLatLong] = useState<[number, number]>();
  const [destLatLong, setDestLatLong] = useState<[number, number] | null>(null);
  const [map, setMap] = useState<L.Map>();
  const [status, setStatus] = useState<string | null>('');
  const [instance, setInstance] = useState<L.Routing.Control | null>(null);
  const [color, setColor] = useState(localStorage.getItem('map-color') ? localStorage.getItem('map-color') : 'dark');
  const [displayOrder, setDisplayOrder] = useState(false);
  const [messageClass, setMessageClass] = useState('');
  const ref = useRef<any>(null);

  const lightLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
  const darkLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
  useEffect(() => {

    if (!currentOrder) return;

    if (userCtx.user.driverStatus === '2') {
      if (instance) {
        map?.removeControl(instance);
      }
      const dest: [number, number] = [currentOrder.restaurant_lat, currentOrder.restaurant_long];
      generateInstance(dest, '2');
      map?.setZoom(20);
      setDestLatLong(dest);
    } else if (userCtx.user.driverStatus === '3') {
      if (instance) {
        map?.removeControl(instance);
      }
      const dest: [number, number] = [currentOrder.destination_lat, currentOrder.destination_long];
      setDestLatLong(dest);
      generateInstance(dest, '3');
      map?.setZoom(20);
      setDestLatLong(dest);
    }
  }, [currentOrder]);

  useEffect(() => {
    if (!localStorage.getItem('map-color')) {
      localStorage.setItem('map-color', 'dark');
      return;
    }
    if (!color) return;
    localStorage.setItem('map-color', color);
  }, [color]);

  useEffect(() => {
    if (!ref.current) return;
    if (color === 'dark') {
      ref.current.setUrl(darkLayer);
    } else {
      ref.current.setUrl(lightLayer);
    }
  }, [color]);

  const updateDriverLocation = async (lat: number, long: number) => {
    if (userCtx && userCtx.user.checked && userCtx.user.login && userCtx.user.role === 'driver') {
      const res = await fetch(`${serverUrl}/user/driver/update-location`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          lat: lat,
          long: long,
        }),
      });

      const response = await res.json();

      return response;
    }
  };

  useEffect(() => {
    let nav: number;
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      setMessageClass('error-message');
    } else {
      setStatus('Locating ...');
      setMessageClass('');
      nav = navigator.geolocation.watchPosition(
        async (position) => {
          setStatus(null);
          setMessageClass('');
          setLatLong([position.coords.latitude, position.coords.longitude]);
          await updateDriverLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
          setMessageClass('error-message');
        },
      );
    }

    return () => {
      if (nav) {
        navigator.geolocation.clearWatch(nav);
      }
    };
  }, [userCtx]);

  useEffect(() => {
    if (!latLong) return;
    if (!map) return;
    if (instance && destLatLong) {
      const waypoints = [L.latLng(latLong), L.latLng(destLatLong)];
      instance.setWaypoints(waypoints);
    } else {
      map.flyTo([latLong[0], latLong[1]]);
      map.setZoom(16);
    }

    map.flyTo([latLong[0], latLong[1]]);
  }, [latLong]);

  useEffect(() => {
    if (!map) return;
    if (!latLong || !destLatLong || !instance) return;
    instance && map && map.removeControl(instance);

    const waypoints = [L.latLng(latLong), L.latLng(destLatLong)];
    const clientDot = L.icon({
      iconUrl: `/imgs/dot${color === 'light' ? '-dark' : ''}.svg`,
      iconSize: [32, 16],
    });
    const storeIcon = L.icon({
      iconUrl: `/imgs/restaurant-icon${color === 'light' ? '-dark' : ''}.svg`,
      iconSize: [32, 32],
    });
    const driverIcon = L.icon({
      iconUrl: `/imgs/driver-car-icon${color === 'light' ? '-dark' : ''}.svg`,
      iconSize: [32, 20],
    });
    const plan = new L.Routing.Plan(waypoints, {
      createMarker: (i, wp, nWps) => {
        let icon: L.Icon<IconOptions> | null = null;
        if (i === 0) {
          icon = driverIcon;
        } else if (i === nWps - 1) {
          icon = storeIcon;
        } else {
          icon = clientDot;
        }
        return L.marker(wp.latLng, {
          icon: icon,
        });
      },
    });

    const formatter = new L.Routing.Formatter({
      units: 'imperial',
      distanceTemplate: `{value} {unit}`,
    });

    const instanceControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: `${color === 'dark' ? 'white' : 'black'}`, opacity: 1, weight: 5 }],
        addWaypoints: false,
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      formatter,
      plan,
    }).addTo(map);

    setInstance(instanceControl);

    return () => {
      map.removeControl(instanceControl);
    };
  }, [map, color]);

  const updateStatus = async (status: string) => {
    const res = await fetch(`${serverUrl}/user/driver/status`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    });

    const response = await res.json();

    if (response.error) {
      console.error(response.error);
      return;
    }

    if (response.success) {
      userCtx.setUser({ ...userCtx.user, driverStatus: status });
      if (status === '1') {
        if (!latLong) return;
        await updateDriverLocation(latLong[0], latLong[1]);
        const res = await fetch(`${serverUrl}/order/driver/nearby-order`, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
        });

        const response = await res.json();

        if (response.error) {
          console.error(response.error);
        }

        if (response.success) {
          const data: DriverOrder[] = response.data;
          if (data.length) {
            setNewOrder(true);
          }
          setOrders(data.sort((a, b) => b.driver_tip - a.driver_tip));
        }
      }
    }
  };
  const generateInstance = (dest: [number, number], status: string) => {
    if (!map) return;
    if (!latLong) return;

    const waypoints = [L.latLng(latLong), L.latLng(dest)];
    const clientDot = L.icon({
      iconUrl: `/imgs/dot${color === 'light' ? '-dark' : ''}.svg`,
      iconSize: [32, 16],
    });
    const storeIcon = L.icon({
      iconUrl: `/imgs/restaurant-icon${color === 'light' ? '-dark' : ''}.svg`,
      iconSize: [32, 32],
    });
    const driverIcon = L.icon({
      iconUrl: `/imgs/driver-car-icon${color === 'light' ? '-dark' : ''}.svg`,
      iconSize: [32, 20],
    });
    const plan = new L.Routing.Plan(waypoints, {
      createMarker: (i, wp, nWps) => {
        let icon: L.Icon<IconOptions> | null = null;
        if (i === 0) {
          icon = driverIcon;
        } else if ((i === nWps - 1 && status === '1') || status === '2') {
          icon = storeIcon;
        } else if (i === nWps - 1 && status === '3') {
          icon = clientDot;
        } else {
          icon = clientDot;
        }
        return L.marker(wp.latLng, {
          icon: icon,
        });
      },
    });

    const formatter = new L.Routing.Formatter({
      units: 'imperial',
      distanceTemplate: `{value} {unit}`,
    });

    const instance = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: `${color === 'dark' ? 'white' : 'black'}`, opacity: 1, weight: 5 }],
        addWaypoints: false,
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      formatter,
      plan,
    }).addTo(map);

    setInstance(instance);
  };

  const onOrderClickZoom = async (dest: [number, number]) => {
    if (!latLong) return;
    if (instance) {
      map?.removeControl(instance);
    }
    setDestLatLong(dest);
    generateInstance(dest, '1');

    if (map) {
      map?.setZoom(10);
      setDisplayOrder(false);
    }
  };

  const onAcceptClick = async (dest: [number, number], orderId: string, order: DriverOrder) => {
    if (!latLong) return;

    const res = await fetch(`${serverUrl}/order/${orderId}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: '2',
      }),
    });

    const response = await res.json();

    if (response.success) {
      if (instance) {
        map?.removeControl(instance);
      }
      setDestLatLong(dest);
      generateInstance(dest, '2');
      map?.setZoom(20);
      setDisplayOrder(false);
      await updateStatus('2');
      setCurrentOrders(order);
    }
  };

  const onPickUpClick = async (dest: [number, number], orderId: string) => {
    if (!latLong) return;

    const res = await fetch(`${serverUrl}/order/${orderId}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: '3',
      }),
    });
    const response = await res.json();
    if (response.success) {
      if (instance) {
        map?.removeControl(instance);
      }

      setDestLatLong(dest);
      generateInstance(dest, '3');

      map?.setZoom(20);
      setDisplayOrder(false);
      await updateStatus('3');
    }
  };

  const onDeliveredClick = async (orderId: string) => {
    if (!latLong) return;
    const res = await fetch(`${serverUrl}/order/${orderId}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: '4',  
      }),
    });
    const response = await res.json();
    if (response.success) {
      if (instance) {
        map?.removeControl(instance);
        setInstance(null);
        setDestLatLong(null);
      }

      map?.setZoom(15);
      setDisplayOrder(false);
      await updateStatus('0');
    }
  };

  if (!latLong)
    return (
      <>
        <p className={messageClass ? messageClass : 'before-locating'}>{status}</p>
      </>
    );

  if (!orders) return null;

  return (
    <div className={`leaflet-map driver-map ${color}`} id="mapid">
      <MapContainer
        center={latLong}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
        whenCreated={(map) => setMap(map)}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url={color && color === 'dark' ? darkLayer : lightLayer}
          ref={ref}
        />
        {!instance && !destLatLong && (
          <Marker
            position={[latLong[0], latLong[1]]}
            icon={L.icon({
              iconUrl: `/imgs/driver-car-icon${color === 'light' ? '-dark' : ''}.svg`,
              iconSize: [32, 20],
            })}
          ></Marker>
        )}
      </MapContainer>
      {(userCtx.user.driverStatus === '2' || userCtx.user.driverStatus === '3') && (
        <button
          className="open-google-map map-button"
          onClick={() => {
            destLatLong && window.open(`https://maps.google.com/?q=${destLatLong[0]},${destLatLong[1]}`, '_blank');
          }}
        >
          Open in Google Map
        </button>
      )}
      <button
        className="map-button layer-button"
        onClick={() => {
          color === 'dark' ? setColor('light') : setColor('dark');
        }}
      >
        {color === 'dark' ? 'White Layer' : 'Dark Layer'}
      </button>

      {userCtx.user.driverStatus === '0' && <DriverStepZero updateStatus={updateStatus} />}
      {userCtx.user.driverStatus !== '0' && (
        <>
          {userCtx.user.driverStatus === '1' && (
            <div className="start-close-button-container">
              <button
                className="start-button map-button"
                onClick={() => {
                  updateStatus('0');
                }}
              >
                Stop
              </button>
            </div>
          )}

          <div className={`bottom-status-container online ${(displayOrder || newOrder) && 'active'}`}>
            <p
              className="display-order"
              onClick={() => {
                if (newOrder) {
                  setNewOrder(false);
                  setDisplayOrder(false);
                } else {
                  setDisplayOrder(!displayOrder);
                  setNewOrder(false);
                }
              }}
            >
              {<FontAwesomeIcon icon={displayOrder || newOrder ? faAngleDown : faAngleUp} />}
              {userCtx.user.driverStatus === '1'
                ? newOrder
                  ? ' New Order'
                  : ' You are Online'
                : ' View Current Order'}
            </p>
            {userCtx.user.driverStatus === '1' && (
              <>
                {orders.length ? (
                  <DriverStepOne
                    onOrderClickZoom={onOrderClickZoom}
                    onAcceptClick={onAcceptClick}
                    orders={orders}
                    latLong={latLong}
                  />
                ) : (
                  <div className="order-container">
                    <h3>No Available Orders at the Moment</h3>
                  </div>
                )}
              </>
            )}
            {userCtx.user.driverStatus === '2' && (
              <DriverStepTwo onPickUpClick={onPickUpClick} currentOrder={currentOrder} />
            )}
            {userCtx.user.driverStatus === '3' && (
              <DriverStepThree onDeliveredClick={onDeliveredClick} currentOrder={currentOrder} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
