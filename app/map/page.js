"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SetViewToCurrentLocation from "../../components/map/setViewToCurrentLocation"; // Make sure the import path matches where you save this file
import L from "leaflet";
import SearchBar from "@/components/map/searchBar";
import FilterComponent from "@/components/map/filterComponent";
import Modal from "@/components/map/requestPropertyModal";
// import PinIcon from "@/public/assets/pin.png";
// Fixing icons issue with Webpack as per Leaflet's known issue
// delete L.Icon.Default.prototype._getIconUrl;
// Define your custom icon
// const customIcon = new L.Icon({
//     iconUrl: PinIcon,  // Update with the path to your image
//     iconSize: [35, 35],  // Size of the icon, adjust as needed
//     iconAnchor: [17, 35],  // Point of the icon which will correspond to marker's location
//     popupAnchor: [0, -35],  // Point from which the popup should open relative to the iconAnchor
//   });

const Page = () => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [customIcon, setCustomIcon] = useState(null);
  const [customFilterIcon, setCustomFilterIcon] = useState(null)

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCoordinates, setModalCoordinates] = useState({
    lat: null,
    long: null,
  });

  const [myMarkers, setMyMarkers] = useState([]);

  useEffect(() => {
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
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const elClass = e.originalEvent.target.className;
        if (
          elClass ===
          "leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
        ) {
          setModalCoordinates({ lat: e.latlng.lat, long: e.latlng.lng });
          setModalOpen(true);
        }
      },
    });
    return null;
  };

  const handleFilterSelect = (coordinates, iconURL) => {
    setMarkers(coordinates);
    setCustomFilterIcon(
      new L.Icon({
        iconUrl: `/assets${iconURL}`, // Ensure this is the correct path from your public directory
        iconSize: [45, 45],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35],
      })
    )
  };

  const handleModalSave = async (data) => {
    console.log(data);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/add-property-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          contact: data.contact,
          lat: data.coordinates.lat,
          long: data.coordinates.long,
        }),
      }
    );

    setMyMarkers((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails.push(data.coordinates);
      return newDetails;
    });
    const responseData = await response.json();
    console.log(responseData);
    // Handle response
  };

  return (
    <MapContainer
      center={position || [51.505, -0.09]}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SearchBar />
      {position && customIcon && (
        <>
          <Marker position={position} icon={customIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        </>
      )}
      {markers.map((data, index) => (
        <Marker
          key={index}
          position={[data.coordinates.lat, data.coordinates.long]}
          icon={customFilterIcon}
        >
          <Popup>
            Marker at {data.coordinates.lat}, {data.coordinates.long}
          </Popup>
        </Marker>
      ))}
      {myMarkers.map((coordinates, index) => (
        <Marker
          key={index}
          position={[coordinates.lat, coordinates.long]}
          icon={customIcon}
        >
          <Popup>
            Marker at {coordinates.lat}, {coordinates.long}
          </Popup>
        </Marker>
      ))}
      <SetViewToCurrentLocation position={position} />
      <FilterComponent onFilterSelect={handleFilterSelect} />
      <MapEvents />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
        coordinates={modalCoordinates}
      />
    </MapContainer>
  );
};

export default Page;
