import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, TileLayerProps } from 'react-leaflet';
import 'leaflet-routing-machine';

import L, { IconOptions } from 'leaflet';
import { icon } from '@fortawesome/fontawesome-svg-core';

export const Map = () => {
  const [latLong, setLatLong] = useState<[number, number]>();
  const [destLatLong, setDestLatLong] = useState<[number, number]>([42.99667, -78.80063]);
  const [map, setMap] = useState<L.Map>();
  const [status, setStatus] = useState<string | null>('');
  const [instance, setInstance] = useState<L.Routing.Control | null>(null);
  const [color, setColor] = useState(localStorage.getItem('map-color') ? localStorage.getItem('map-color') : 'dark');
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

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.watchPosition(
        (position) => {
          console.log(position);
          setStatus(null);
          setLatLong([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          setStatus('Unable to retrieve your location');
        },
      );
    }
  }, []);

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

  if (!latLong) return null;

  return (
    <div className={`leaflet-map driver-map ${color}`} id="mapid" style={{ height: '100vh' }}>
      <MapContainer
        center={[latLong[0], latLong[1]]}
        zoom={20}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
        whenCreated={(map) => setMap(map)}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url={color && color === 'dark' ? darkLayer : lightLayer}
          ref={ref}
        />
      </MapContainer>
      <button
        className="open-google-map map-button"
        onClick={() => {
          window.open(`https://maps.google.com/?q=${destLatLong[0]},${destLatLong[1]}`, '_blank');
        }}
      >
        Open in Google Map
      </button>

      <button
        className="map-button layer-button"
        onClick={() => {
          color === 'dark' ? setColor('light') : setColor('dark');
        }}
      >
        {color === 'dark' ? 'White Layer' : 'Dark Layer'}
      </button>
    </div>
  );
};
