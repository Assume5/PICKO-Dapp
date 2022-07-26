import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
export const Map = () => {
  const [latLong, setLatLong] = useState<[number, number]>();
  const [map, setMap] = useState<L.Map>();
  const [status, setStatus] = useState<string | null>('');
  const clientDot = L.icon({
    iconUrl: '/imgs/dot.svg',
    iconSize: [32, 16],
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

    map.flyTo([latLong[0], latLong[1]]);
  }, [latLong]);

  if (!latLong) return null;

  return (
    <div className="leaflet-map" id="mapid" style={{ height: '100vh' }}>
      <MapContainer
        center={[latLong[0], latLong[1]]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
        whenCreated={(map) => setMap(map)}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <Marker position={[latLong[0], latLong[1]]} icon={clientDot}></Marker>
      </MapContainer>
    </div>
  );
};
