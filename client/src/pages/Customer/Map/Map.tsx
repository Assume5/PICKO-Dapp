import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet-routing-machine';

import L, { IconOptions } from 'leaflet';
import { icon } from '@fortawesome/fontawesome-svg-core';

export const Map = () => {
  const [latLong, setLatLong] = useState<[number, number]>();
  const [map, setMap] = useState<L.Map>();
  const [status, setStatus] = useState<string | null>('');
  const clientDot = L.icon({
    iconUrl: '/imgs/dot.svg',
    iconSize: [32, 16],
  });
  const storeIcon = L.icon({
    iconUrl: '/imgs/restaurant-icon.svg',
    iconSize: [32, 32],
  });
  const driverIcon = L.icon({
    iconUrl: '/imgs/driver-car-icon.svg',
    iconSize: [32, 20],
  });
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
    const waypoints = [L.latLng(latLong[0], latLong[1]), L.latLng(42.9920483, -78.8195213)];

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

    const instance = new L.Routing.Control({
      waypoints: waypoints,
      routeWhileDragging: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: 'white', opacity: 1, weight: 3 }],
        missingRouteStyles: [
          { color: 'black', opacity: 0.15, weight: 7 },
          { color: 'white', opacity: 0.6, weight: 4 },
          { color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12' },
        ],
        addWaypoints: false,
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      plan,
    }).addTo(map);

    map.flyTo([latLong[0], latLong[1]]);
    return () => {
      map.removeControl(instance);
    };
  }, [latLong]);

  if (!latLong) return null;

  return (
    <div className="leaflet-map" id="mapid" style={{ height: '100vh' }}>
      <MapContainer
        center={[latLong[0], latLong[1]]}
        zoom={20}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
        whenCreated={(map) => setMap(map)}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};
