import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const MapInput = ({ changeLocation, initialLocation=null }) => {

  const [showMarker, setShowMarker] = useState(initialLocation !== null)

  const centerPosition = {
    lat: 14.817998074460505 , 
    lng: -86.63145650838396 
  }

  const initialPosition = initialLocation ? 
  {
    lat: Number.parseFloat(initialLocation.split(',')[0]) , 
    lng: Number.parseFloat(initialLocation.split(',')[1])
  }
  :
  centerPosition

  const [position, setPosition] = useState(initialPosition);

  const handleMapClick = (e) => {
    setPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    changeLocation(e.latLng.lat() + ',' + e.latLng.lng());
    setShowMarker(true);
  };

  const zoom = initialLocation ? 18 : 7;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        center={position}
        zoom={zoom}
        onClick={handleMapClick}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
      {
        showMarker && <Marker position={position} />
      }
      </GoogleMap>
    </LoadScript>
  );
};
