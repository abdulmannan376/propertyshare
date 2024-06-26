"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SetViewToCurrentLocation from "../../components/map/setViewToCurrentLocation";
import L from "leaflet";
import SearchBar from "@/components/map/searchBar";
import FilterComponent from "@/components/map/filterComponent";
import Modal from "@/components/map/requestPropertyModal";
import NoSsr from "@/components/noSSR";
import { useDispatch } from "react-redux";
import { updateNavbarLogo } from "@/app/redux/features/navbarSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const MapPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNavbarLogo("/logo-bbh.png"));
  }, []);
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [propertyTypeMarkers, setPropertyTypeMarkers] = useState([]);
  const [availableShareMarkers, setAvailableShareMarkers] = useState([]);
  const [customIcon, setCustomIcon] = useState(null);
  const [customPropertyTypeIcon, setCustomPropertyTypeIcon] = useState(null);
  const [customAvailableSharesIcon, setAvailableSharesIcon] = useState(null);
  const [customFilterIcon, setCustomFilterIcon] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCoordinates, setModalCoordinates] = useState({
    lat: null,
    long: null,
  });

  const [myMarkers, setMyMarkers] = useState([]);

  useEffect(() => {
    console.log("title: ", process?.title);
    if (process?.title === "browser") {
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
        console.log("Clicked class: ", e.originalEvent.target.className);
        console.log("Event: ", e);

        const elClass = e.originalEvent.target.className;
        if (
          elClass.includes("leaflet-container") &&
          elClass.includes("leaflet-touch")
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
    console.log("title: ", process?.title);
    if (process?.title === "browser") {
      setCustomFilterIcon(
        new L.Icon({
          iconUrl: `/assets${iconURL}`, // Ensure this is the correct path from your public directory
          iconSize: [45, 45],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        })
      );
    }
  };

  const handlePropertyTypeFilterSelect = (coordinates, iconURL) => {
    setPropertyTypeMarkers(coordinates);
    console.log("title: ", process?.title);
    if (process?.title === "browser") {
      setCustomPropertyTypeIcon(
        new L.Icon({
          iconUrl: `/assets/property-icon.svg`, // Ensure this is the correct path from your public directory
          iconSize: [45, 45],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        })
      );
    }
  };

  const handleAvailableSharesFilterSelect = (coordinates, iconURL) => {
    setAvailableShareMarkers(coordinates);
    console.log("title: ", process?.title);
    if (process?.title === "browser") {
      setAvailableSharesIcon(
        new L.Icon({
          iconUrl: `/assets/property-icon.svg`, // Ensure this is the correct path from your public directory
          iconSize: [45, 45],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        })
      );
    }
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

  const router = useRouter(); // Hook for programmatic navigation

  // Function to handle marker click
  const handleMarkerClick = (propertyID) => {
    router.push(`/buy-shares/property/${propertyID}`);
  };

  return (
    <NoSsr>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <MapContainer
        // zoomControl
        center={position || [51.505, -0.09]}
        zoom={15}
        style={{ height: "90vh", width: "100%" }}
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
        {markers.map(
          (data, index) =>
            data.location.coordinates.length > 0 && (
              <Marker
                key={index}
                position={[
                  data.location.coordinates[1],
                  data.location.coordinates[0],
                ]}
                icon={customFilterIcon}
              >
                <Popup>
                  Marker at {data.location.coordinates[1]},{" "}
                  {data.location.coordinates[0]}
                </Popup>
              </Marker>
            )
        )}
        {propertyTypeMarkers.map((data, index) => (
          <Marker
            key={index}
            position={[data.coordinates[1], data.coordinates[0]]}
            icon={customPropertyTypeIcon}
            eventHandlers={{ click: () => handleMarkerClick(data.propertyID) }}
          ></Marker>
        ))}
        {availableShareMarkers.map((data, index) => (
          <Marker
            key={index}
            position={[data.coordinates[1], data.coordinates[0]]}
            icon={customAvailableSharesIcon}
            eventHandlers={{ click: () => handleMarkerClick(data.propertyID) }}
          ></Marker>
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
        <FilterComponent
          onFilterSelect={handleFilterSelect}
          onPropertyFilterSelect={handlePropertyTypeFilterSelect}
          onAvailableShareFilterSelect={handleAvailableSharesFilterSelect}
        />
        <MapEvents />
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleModalSave}
          coordinates={modalCoordinates}
        />
      </MapContainer>{" "}
    </NoSsr>
  );
};

export default MapPage;
