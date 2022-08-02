import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

interface Props {
  client: [number, number] | null;
  driver: [number, number] | null;
  store: [number, number] | null;
  status: string;
}

export const Map: React.FC<Props> = ({ client, driver, store, status }) => {
  const [center, setCenter] = useState<[number, number][]>();
  useEffect(() => {
    if (status === '0' || status === '1') {
      if (store && client) {
        setCenter([store, client]);
      }
    } else {
      if (client && driver) {
        setCenter([driver, client]);
      }
    }
  }, [store, client, driver, status]);
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

  if (!center) return null;
  return (
    <div className="leaflet-map" id="mapid">
      {console.log(center)}
      <MapContainer bounds={center} zoom={8} scrollWheelZoom={true} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {driver && <Marker position={driver} icon={driverIcon}></Marker>}
        {store && <Marker position={store} icon={storeIcon}></Marker>}
        {client && <Marker position={client} icon={clientDot}></Marker>}
      </MapContainer>
    </div>
  );
};
