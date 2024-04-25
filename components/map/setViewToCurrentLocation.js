"use client"
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const SetViewToCurrentLocation = ({ position }) => {
  const map = useMap();  // This hook allows you to get the map instance

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());  // This will animate the map to a new center
    }
  }, [position, map]);  // This effect will run whenever 'position' changes

  return null;  // This component does not render anything
};

export default SetViewToCurrentLocation;
