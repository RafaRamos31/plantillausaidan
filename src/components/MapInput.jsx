import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const MapInput = ({ initialLat=null, initialLng=null }) => {

  const initialPosition = {
    lat: initialLat ? initialLat : 14.817998074460505 , 
    lng: initialLng ? initialLng : -86.63145650838396 
  }
  const [position, setPosition] = useState(initialPosition);

  const handleMapClick = (e) => {
    console.log(position.lat)
    console.log(position.lng)
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };
  
  const zoom = initialLng ? 16 : 7;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        center={position}
        zoom={zoom}
        onClick={handleMapClick}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};
