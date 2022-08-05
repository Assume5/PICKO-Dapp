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
  const [map, setMap] = useState<L.Map>();
  useEffect(() => {
    if (status === '0' || status === '1' || status === '-1' || status === '4') {
      if (store && client) {
        const center = [store, client];
        setCenter(center);
        map && map.fitBounds(center);
      }
    } else if (status === '2' && driver && client && store) {
      const center = [store, client, driver];
      setCenter(center);
      map && map.fitBounds(center);
    } else {
      if (client && driver) {
        const center = [driver, client];
        setCenter(center);
        map && map.fitBounds(center);
      }
    }
  }, [map, status, client, store, driver]);
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
      <MapContainer
        bounds={center}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%' }}
        whenCreated={(map) => setMap(map)}
      >
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
