import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const MapDisplay = ({ initialLocation=null }) => {

  const initialPosition = initialLocation ? 
  {
    lat: Number.parseFloat(initialLocation.split(',')[0]) , 
    lng: Number.parseFloat(initialLocation.split(',')[1])
  }
  :
  {
    lat: 14.817998074460505 , 
    lng: -86.63145650838396 
  }
  
  const zoom = initialLocation ? 18 : 7;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        center={initialPosition}
        zoom={zoom}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
      {
        initialLocation && <Marker position={initialPosition} />
      }
      </GoogleMap>
    </LoadScript>
  );
};
