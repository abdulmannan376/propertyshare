"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

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
import SearchBar from "./searchBar";
import Modal from "@/components/map/requestPropertyModal";
import FlyToCoordinate from "./flyToCoordinate";
import NoSsr from "../noSSR";

const SectionMap = () => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [customIcon, setCustomIcon] = useState(null);
  const [customFilterIcon, setCustomFilterIcon] = useState(null);

  const [searchedName, setSearchedName] = useState("");
  const [searchedCoordinate, setSearchedCoordinate] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCoordinates, setModalCoordinates] = useState({
    lat: null,
    long: null,
  });

  const [myMarkers, setMyMarkers] = useState([]);

  const [filters, setFilters] = useState([
    {
      name: "Available shares",
      data: [
        { name: "Fully Available", selected: false },
        { name: "Partially Available", selected: false },
        { name: "Sold", selected: false },
      ],
      active: false,
    },
    {
      name: "Type of property",
      data: [
        { name: "Mansion", selected: false },
        { name: "Villa", selected: false },
        { name: "Apartment", selected: false },
        { name: "Suite", selected: false },
        { name: "Condo", selected: false },
        { name: "Townhouse", selected: false },
        { name: "Bungalow", selected: false },
        { name: "Cabin", selected: false },
        { name: "Studio", selected: false },
        { name: "Single family home", selected: false },
      ],
      active: false,
    },
    {
      name: "All requests",
      data: [],
      active: false,
      iconURL: "/person-pin.png",
    },
  ]);
  console.log("window: ", typeof window);

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

  const handleFilterClick = async (index, id, value, key) => {
    console.log(index, id, value, key);
    setFilters((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[index].active = value;
      return newDetails;
    });
    if (value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/fetch-coordinates-of-property`
      );
      const response = await res.json();

      handleFilterSelect(response.data, filters[index].iconURL);
    } else {
      handleFilterSelect([]);
    }
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
    );
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
  const [searchBar, setSearchBar] = useState();
  const [dropdownsStatus, setDropdownsStatus] = useState({
    propertyTypeActive: false,
    availableSharesActive: false,
  });

  const priceMin = "";
  const priceMax = "";

  const handleDropdownActivity = (field, value, e) => {
    e.preventDefault();
    console.log("in handle dropdown activity");
    setDropdownsStatus((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails[field] = value;
      return newDetails;
    });
  };

  const dropdowns = {
    propertyType: {
      data: [
        "Mansion",
        "Villa",
        "Apartment",
        "Suite",
        "Condo",
        "Townhouse",
        "Bungalow",
        "Cabin",
        "Studio",
        "Single family home",
      ],
    },
    availableShares: {
      data: ["Fully Available", "Partially Available", "Sold"],
    },
  };

  const availableShareTypeColorList = [
    "bg-green-400",
    "bg-amber-400",
    "bg-red-400",
  ];
  return (
    <NoSsr>
      <div
        onClick={(e) => {
          handleDropdownActivity("availableSharesActive", false, e);
          handleDropdownActivity("propertyTypeActive", false, e);
        }}
        className="bg-white"
      >
        <div className=" xxl:mx-24 xl:mx-16 mx-16 lg:mx-10 sm:mx-5 mt-14">
          <h1 className="xl:text-[40px] md:text-4xl text-2xl text-center uppercase font-semibold text-[#116A7B] ">
            request property <i className="text-[#CDC2AE]"> anywhere</i> you
            wish
          </h1>
          {/* <form className="flex flex-row bg-[#D9D9D9] bg-opacity-[76%] border border-[#F5F5F5] mt-6 rounded-md pl-2">
          <input
            type="text"
            name="searchbar"
            value={searchBar}
            placeholder="Search location on map..."
            className="w-full bg-transparent text-xl font-raleway placeholder:text-[#676767] placeholder:opacity-80 text-[#676767] m-4 outline-none"
          />
          <button type="submit">
            <IoIosSearch className="bg-[#CDC2AE] p-2 text-6xl text-[#FFFDF4] border-r border-[#F5F5F5] rounded-r-md rounded-br-md" />
          </button>
        </form> */}
          <SearchBar
            handleSearchedCoordinate={setSearchedCoordinate}
            nameResult={setSearchedName}
          />
        </div>
        <div className="mt-6 xxl:mx-24 xl:mx-16 lg:mx-10 sm:mx-5">
          <MapContainer
            center={position || [51.505, -0.09]}
            zoom={15}
            style={{ height: "60vh", width: "100%" }}
          >
            {/* <SearchBar /> */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FlyToCoordinate coordinate={searchedCoordinate} />
            {searchedCoordinate.length > 0 && (
              <>
                <Marker position={searchedCoordinate} icon={customIcon}>
                  <Popup>{searchedName}</Popup>
                </Marker>
              </>
            )}
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
            {/* <FilterComponent onFilterSelect={handleFilterSelect} /> */}
            <MapEvents />
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onSave={handleModalSave}
              coordinates={modalCoordinates}
            />
          </MapContainer>
        </div>

        <div className="w-fit flex flex-row items-center border-2 border-[#676767] divide-x-2 divide-[#676767] justify-center bg-white my-16 mx-auto duration-700 transition">
          {filters.map((filter, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (filter.data.length > 0) {
                    if (index === 0) {
                      handleDropdownActivity(
                        "propertyTypeActive",
                        !dropdownsStatus["propertyTypeActive"],
                        e
                      );
                      handleDropdownActivity("availableSharesActive", false, e);
                    } else {
                      handleDropdownActivity(
                        "availableSharesActive",
                        !dropdownsStatus["availableSharesActive"],
                        e
                      );
                      handleDropdownActivity("propertyTypeActive", false, e);
                    }
                  } else {
                    handleFilterClick(
                      index,
                      filter.name,
                      !filter.active,
                      "null"
                    );
                    handleDropdownActivity("availableSharesActive", false, e);
                    handleDropdownActivity("propertyTypeActive", false, e);
                  }
                }}
                className="md:w-72 w-56 bg-transparent p-3 md:text-xl text-base font-semibold flex items-center justify-between"
              >
                <h1>
                  {filter.name}{" "}
                  {filter.data.length > 0 && (
                    <FaAngleDown className="inline-flex" />
                  )}
                </h1>
                {filter.active && (
                  <div
                    className={`text-xs text-white rounded-full py-[3px] px-[8px] ml-5 bg-blue-500`}
                  >
                    1
                  </div>
                )}
              </button>
              {index === 1 && dropdownsStatus["availableSharesActive"] && (
                <div className="absolute md:w-72 w-56 bg-white ">
                  <ul className="px-5 space-y-1 max-h-40 overflow-y-auto">
                    {filter.data.map((listItem, i) => (
                      <li
                        key={i}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem.name}{" "}
                        {/* <div
                        className={`w-3 h-3 rounded-full ml-5 ${availableShareTypeColorList[i]}`}
                      /> */}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {index === 0 && dropdownsStatus["propertyTypeActive"] && (
                <div className="absolute md:w-72 w-56 bg-white z-[5000]">
                  <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                    {filter.data.map((listItem, i) => (
                      <li
                        key={i}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem.name}{" "}
                        <div
                          className={`w-3 h-3 rounded-full ml-5 ${availableShareTypeColorList[i]}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </NoSsr>
  );
};

export default SectionMap;
