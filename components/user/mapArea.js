import React, { useEffect, useState } from "react";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NoSsr from "../noSSR";
import SetViewToCurrentLocation from "../map/setViewToCurrentLocation";

const MapArea = ({ searchedCoordinate, handleCoordinates }) => {
  const [position, setPosition] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // console.log("window: ", window);
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );

      setCustomIcon(
        new L.Icon({
          iconUrl: "/assets/pin.png", // Ensure this is the correct path from your public directory
          iconSize: [45, 45],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        })
      );
    }
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const elClass = e.originalEvent.target.className;
        if (
          elClass.includes("leaflet-container") &&
          elClass.includes("leaflet-touch")
        ) {
          handleCoordinates({ lat: e.latlng.lat, long: e.latlng.lng });
          setMarker([`${e.latlng.lat}`, `${e.latlng.lng}`]);
        }
      },
    });
    return null;
  };
  const FlyToSearchPin = () => {
    const map = useMap();
    if (searchedCoordinate.length > 0) {
      map.flyTo(searchedCoordinate, 15); // Adjust zoom level as necessary
    }
  };
  return (
    <NoSsr>
      <div className="w-full my-6 ml-6">
        <MapContainer
          center={position || [51.505, -0.09]}
          zoom={15}
          style={{ height: "60vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* {searchedCoordinate.length > 0 && (
                  <>
                    <Marker position={searchedCoordinate} icon={customIcon}>
                      <Popup>{"Your Pin"}</Popup>
                    </Marker>
                  </>
                )} */}
          <SetViewToCurrentLocation position={position} />
          {position && customIcon && (
            <>
              <Marker position={position} icon={customIcon}>
                <Popup>You are here!</Popup>
              </Marker>
            </>
          )}
          {marker && customIcon && (
            <>
              <Marker position={marker} icon={customIcon}>
                <Popup>Your Property Pin</Popup>
              </Marker>
            </>
          )}
          <FlyToSearchPin />

          <MapEvents />
        </MapContainer>
      </div>
    </NoSsr>
  );
};

export default MapArea;
