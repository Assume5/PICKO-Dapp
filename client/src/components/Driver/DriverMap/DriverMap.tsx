import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, TileLayerProps } from 'react-leaflet';
import 'leaflet-routing-machine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import L, { IconOptions } from 'leaflet';
import { User } from '../../../types';
import { serverUrl } from '../../../utils/constants';

interface contextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface Props {
  userCtx: contextType;
}

export const DriverMap: React.FC<Props> = ({ userCtx }) => {
  const [latLong, setLatLong] = useState<[number, number]>();
  const [destLatLong, setDestLatLong] = useState<[number, number]>([42.99667, -78.80063]);
  const [map, setMap] = useState<L.Map>();
  const [status, setStatus] = useState<string | null>('');
  const [instance, setInstance] = useState<L.Routing.Control | null>(null);
  const [color, setColor] = useState(localStorage.getItem('map-color') ? localStorage.getItem('map-color') : 'dark');
  const [displayOrder, setDisplayOrder] = useState(false);
  const ref = useRef<any>(null);

  const lightLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
  const darkLayer = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';

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
    if (
      userCtx &&
      userCtx.user.checked &&
      userCtx.user.login &&
      userCtx.user.role === 'driver' &&
      (userCtx.user.driverStatus === '1' || userCtx.user.driverStatus === '2')
    ) {
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
    }
  };

  useEffect(() => {
    let nav: number;
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      nav = navigator.geolocation.watchPosition(
        async (position) => {
          console.log(position);
          setStatus(null);
          setLatLong([position.coords.latitude, position.coords.longitude]);
          updateDriverLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
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
    const waypoints = [L.latLng(latLong[0], latLong[1]), L.latLng(destLatLong[0], destLatLong[1])];

    if (instance) {
      instance.setWaypoints(waypoints);
    }

    map.flyTo([latLong[0], latLong[1]]);
  }, [latLong]);

  useEffect(() => {
    if (!map) return;
    if (!latLong) return;

    const waypoints = [L.latLng(latLong[0], latLong[1]), L.latLng(destLatLong[0], destLatLong[1])];
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

    return () => {
      map.removeControl(instance);
    };
  }, [map, color]);

  useEffect(() => {
    if (!userCtx.user.login || userCtx.user.role !== 'driver') return;

    const user = userCtx.user;
  }, [userCtx]);

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
      console.log(userCtx);
      userCtx.setUser({ ...userCtx.user, driverStatus: status });
    }
  };

  if (!latLong) return null;

  return (
    <div className={`leaflet-map driver-map ${color}`} id="mapid">
      <MapContainer
        center={[latLong[0], latLong[1]]}
        zoom={20}
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
      </MapContainer>
      {userCtx.user.driverStatus === '2' && (
        <button
          className="open-google-map map-button"
          onClick={() => {
            window.open(`https://maps.google.com/?q=${destLatLong[0]},${destLatLong[1]}`, '_blank');
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

      {userCtx.user.driverStatus === '0' && (
        <>
          <div className="start-close-button-container">
            <button
              className="start-button map-button"
              onClick={() => {
                updateStatus('1');
              }}
            >
              Start
            </button>
          </div>

          <div className="bottom-status-container">You are Offline</div>
        </>
      )}
      {userCtx.user.driverStatus === '1' && (
        <>
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

          <div className={`bottom-status-container online ${displayOrder && 'active'}`}>
            <p
              className="display-order"
              onClick={() => {
                setDisplayOrder(!displayOrder);
              }}
            >
              {<FontAwesomeIcon icon={displayOrder ? faAngleDown : faAngleUp} />} You are Online
            </p>
            <div className="order-container">
              <div className="order-item">
                <div>
                  <p>Earning: $5.00</p>
                  <p>Distance to Store: 2 mile</p>
                </div>
                <button>Accept</button>
              </div>
              <div className="order-item">
                <div>
                  <p>Earning: $5.00</p>
                  <p>Distance to Store: 2 mile</p>
                </div>
                <button>Accept</button>
              </div>
              <div className="order-item">
                <div>
                  <p>Earning: $5.00</p>
                  <p>Distance to Store: 2 mile</p>
                </div>
                <button>Accept</button>
              </div>
              <div className="order-item">
                <div>
                  <p>Earning: $5.00</p>
                  <p>Distance to Store: 2 mile</p>
                </div>
                <button>Accept</button>
              </div>
              <div className="order-item">
                <div>
                  <p>Earning: $5.00</p>
                  <p>Distance to Store: 2 mile</p>
                </div>
                <button>Accept</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
