import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

interface Props {
  client: [number, number];
  driver: [number, number];
  store: [number, number];
  status: number;
}

export const Map: React.FC<Props> = ({ client, driver, store, status }) => {
  const center = status >= 1 || status <= 2 ? [store, client] : [driver, client];
  const storeIcon = L.icon({
    iconUrl: '/imgs/restaurant-icon.svg',
    iconSize: [32, 32],
  });
  const driverIcon = L.icon({
    iconUrl: '/imgs/driver-car-icon.svg',
    iconSize: [32, 20],
  });
  const clientDot = L.icon({
    iconUrl: '/imgs/dot.svg',
    iconSize: [32, 16],
  });
  return (
    <div className="leaflet-map" id="mapid">
      <MapContainer bounds={center} zoom={8} scrollWheelZoom={true} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <Marker position={store} icon={storeIcon}></Marker>
        <Marker position={driver} icon={driverIcon}></Marker>
        <Marker position={client} icon={clientDot}></Marker>
      </MapContainer>
    </div>
  );
};
