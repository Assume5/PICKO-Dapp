import React, { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const LeafletgeoSearch = () => {
  const map = useMap();
  // const myIcon = L.icon({
  //   iconUrl: '/imgs/car.svg',
  //   iconSize: [64, 64],
  //   iconAnchor: [32, 64],
  // });
  useEffect(() => {
    const test = async () => {
      const provider = new OpenStreetMapProvider();
      const searchControl = GeoSearchControl({
        provider: provider,
        autoComplete: true,
        // marker: {
        //   icon: myIcon,
        // },
      });
      map.addControl(searchControl);
      map.on('geosearch/showlocation', (result: any) => {
        console.log(Object.keys(result));
        console.log(result.location);
      });
    };
    test();
  }, [map]);

  return null;
};

export const Map = () => {
  const center: [number, number] = [38.51073, -96.4247];
  const myIcon = L.icon({
    iconUrl: '/imgs/restaurant-icon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
  });
  return (
    <div id="mapid">
      <MapContainer center={center} zoom={5} scrollWheelZoom={true} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LeafletgeoSearch />
      </MapContainer>
    </div>
  );
};
