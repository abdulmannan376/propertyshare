import React from "react";
import { useMap } from "react-leaflet";

const FlyToCoordinate = ({ coordinate }) => {
  const map = useMap();
  if (coordinate.length > 0) {
    map.flyTo(coordinate, 15); // Adjust zoom level as necessary
  }
  return <></>;
};

export default FlyToCoordinate;
