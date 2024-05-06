import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
const MapArea = dynamic(() => import("./mapArea"), {ssr: false});
const compCities = require("countrycitystatejson");

const PropertyManagement = () => {
  const [isAddPropertyClicked, setIsAddPropertyClicked] = useState(false);

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [numOfShares, setNumberOfShares] = useState(1);
  const [totalPrize, setTotalPrize] = useState(0);
  const [areaSize, setAreaSize] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedNumOfBeds, setSelectedNumOfBeds] = useState("");
  const [selectedNumOfBaths, setSelectedNumOfBaths] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const [formPhase, setFormPhase] = useState(1);

  const allCountries = compCities.getCountries();

  const TextArea = () => {
    const textRef = useRef();
    console.log(`${textRef.current}`);
    return (
      <textarea
        ref={textRef}
        type="text"
        name="title"
        value={title}
        required={true}
        onChange={({ target }) => setTitle(target.value)}
        style={{ height: "46px" }}
        className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 resize-none rounded-full"
      />
    );
  };

  const propertyTypes = [
    "Select",
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
  ];

  const numOfBedsAndBaths = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10+",
  ];

  useEffect(() => {
    const date = new Date(startDate);
    const duration = numOfShares * 14;
    const afterDuration = new Date();
    afterDuration.setDate(date.getDate() + duration);
    console.log("in useEffect: ", afterDuration.toISOString().split("T")[0]);
    setEndDate(afterDuration.toISOString().split("T")[0]);
  }, [startDate, numOfShares]);

  useEffect(() => {
    console.log("in useEffect");
    if (selectedCountry) {
      setAllStates(compCities.getStatesByShort(selectedCountry.shortName));
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity("");
    if (selectedState) {
      setAllCities(
        compCities.getCities(selectedCountry.shortName, selectedState)
      );
    }
  }, [selectedState]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchedCoordinate, setSearchedCoordinate] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 3) {
      // Limit requests for performance
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
      );
      const data = await response.json();
      setResults(data);
    }
  };

  const handleSelect = (lat, lon, name) => {
    setSearchedCoordinate([lat, lon]);
    setQuery(name);
    setResults([]);
  };

  const handleLocation = (value) => {
    setCoordinates(value)
  }

  const changeFormPhase = (value) => {
    setFormPhase(value);
  };

  return (
    <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto">
      {isAddPropertyClicked ? (
        <div className="w-full flex flex-row items-center pb-8 px-14">
          <h1 className="text-2xl font-medium">Add Property</h1>
        </div>
      ) : (
        <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pb-7 px-14">
          <h1 className="text-2xl font-medium">My Properties</h1>
          <button
            onClick={() => setIsAddPropertyClicked(true)}
            type="button"
            className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
          >
            Add Property
            <FaPlus className="inline-flex text-sm ml-2 mb-1" />
          </button>
        </div>
      )}
      {isAddPropertyClicked ? (
        <form className="flex flex-row flex-wrap gap-x-[90px] px-14 py-5">
          {formPhase === 1 && (
            <>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="title" className="text-[#676767]">
                  Property Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  required={true}
                  onChange={({ target }) => setTitle(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="title" className="text-[#676767]">
                  Property Overview
                </label>
                <textarea
                  // ref={textRef}
                  type="text"
                  name="title"
                  value={overview}
                  required={true}
                  onChange={({ target }) => setOverview(target.value)}
                  style={{ height: "46px" }}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 resize-none rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="shares-slider" className="text-gray-600">
                  Total Number of Shares: <strong>{numOfShares}</strong>
                </label>
                <input
                  type="range"
                  id="shares-slider"
                  name="shares-slider"
                  min="1"
                  max="25"
                  step="1"
                  value={numOfShares}
                  onChange={({ target }) => setNumberOfShares(target.value)}
                  className="slider w-[620px] h-2 my-auto rounded-full bg-[#116A7B30] outline-none appearance-none"
                  style={{
                    backgroundSize: `${((numOfShares - 1) / 24) * 100}%`,
                    backgroundImage: `
            linear-gradient(#116A7B, #116A7B),
            url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='10' fill='%23116A7B'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundAttachment: "local",
                  }}
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="totalPrize" className="text-[#676767]">
                  Total Price{" "}
                  {`(${
                    JSON.parse(localStorage.getItem("userSettings")).currency
                  })`}
                </label>
                <input
                  type="number"
                  name="totalPrize"
                  value={totalPrize}
                  required={true}
                  onChange={({ target }) => setTotalPrize(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="areaSize" className="text-[#676767]">
                  Area Size{" "}
                  {`(${
                    JSON.parse(localStorage.getItem("userSettings")).areaUnit
                  })`}
                </label>
                <input
                  type="number"
                  name="areaSize"
                  value={areaSize}
                  required={true}
                  onChange={({ target }) => setAreaSize(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="title" className="text-[#676767]">
                  Duration
                  {startDate && endDate ? `: ${startDate} to ${endDate}` : ""}
                </label>
                <input
                  type="date"
                  name="title"
                  value={startDate}
                  required={true}
                  onChange={({ target }) => {
                    const date = new Date(target.value);
                    setStartDate(date.toISOString().split("T")[0]);
                  }}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>

              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="propertyType" className="text-[#676767]">
                    Property Type
                  </label>
                  <select
                    name="nationality"
                    value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedPropertyType("");
                      } else {
                        setSelectedPropertyType(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="propertyType"
                  value={selectedPropertyType}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="numOfBeds" className="text-[#676767]">
                    Beds
                  </label>
                  <select
                    name="nationality"
                    value={selectedNumOfBeds}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedNumOfBeds("");
                      } else {
                        setSelectedNumOfBeds(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {numOfBedsAndBaths.map((count, index) => (
                      <option key={index} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="numOfBeds"
                  value={selectedNumOfBeds}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="numOfBaths" className="text-[#676767]">
                    Baths
                  </label>
                  <select
                    name="numOfBaths"
                    value={selectedNumOfBaths}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedNumOfBaths("");
                      } else {
                        setSelectedNumOfBaths(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {numOfBedsAndBaths.map((count, index) => (
                      <option key={index} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="numOfBaths"
                  value={selectedNumOfBaths}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="hidden"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">Address</h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="houseNumber" className="text-[#676767]">
                  House Number
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={houseNumber}
                  required={true}
                  onChange={({ target }) => setHouseNumber(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="streetNumber" className="text-[#676767]">
                  Street Number
                </label>
                <input
                  type="text"
                  name="streetNumber"
                  value={streetNumber}
                  required={true}
                  onChange={({ target }) => setStreetNumber(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="zipCode" className="text-[#676767]">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={zipCode}
                  required={true}
                  onChange={({ target }) => setZipCode(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="country" className="text-[#676767]">
                    Country
                  </label>
                  <select
                    name="country"
                    value={selectedCountry?.name}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedCountry({});
                      } else {
                        const country = compCities.getCountryByShort(
                          target.value
                        );
                        country.shortName = target.value;
                        setSelectedCountry(country);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    <option value="Select">Select</option>
                    {allCountries.map((country, index) => (
                      <option key={index} value={country.shortName}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="country"
                  value={selectedCountry?.name}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="state" className="text-[#676767]">
                    State/Province
                  </label>
                  <select
                    name="state"
                    value={selectedState}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedState({});
                      } else {
                        setSelectedState(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    <option value="Select">Select</option>
                    {allStates?.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="state"
                  value={selectedState}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="City" className="text-[#676767]">
                    City
                  </label>
                  <select
                    name="City"
                    value={selectedCity}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedCity("");
                      } else {
                        setSelectedCity(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    <option value="Select">Select</option>
                    {allCities?.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="city"
                  value={selectedCity}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="fullAddress" className="text-[#676767]">
                  Full Address
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={fullAddress}
                  required={true}
                  onChange={({ target }) => setFullAddress(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              {/* <div className="mb-6 ml-6 flex flex-col">
            <input
              type="hidden"
              name="noName"
              className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
            />
          </div> */}
              <div className="mb-6 ml-6 flex flex-col relative">
                <label htmlFor="searchLocation" className="text-[#676767]">
                  Search Location
                </label>
                <input
                  type="text"
                  name="searchLocation"
                  value={query}
                  required={true}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
                <div className="absolute w-[620px] z-[5000] top-20">
                  {results.length > 0 && (
                    <ul className="mx-5 bg-white p-3">
                      {results.map((item, index) => (
                        <li
                          key={index}
                          className="my-1 cursor-pointer"
                          onClick={() =>
                            handleSelect(item.lat, item.lon, item.display_name)
                          }
                        >
                          {item.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <MapArea
                searchedCoordinate={searchedCoordinate}
                handleCoordinates={handleLocation}
              />
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="fullAddress" className="text-[#676767]">
                  Latitude
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={coordinates?.lat}
                  required={true}
                  readOnly={true}
                  placeholder="Click on the map..."
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>

              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="fullAddress" className="text-[#676767]">
                  Longitude
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={coordinates?.long}
                  required={true}
                  readOnly={true}
                  placeholder="Click on the map..."
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
            </>
          )}
          <div className="mb-6 ml-6 flex flex-row space-x-3">
            {formPhase < 3 && (
              <button
                type="button"
                onClick={() => changeFormPhase(formPhase + 1)}
                className="bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
              >
                Save & Next
              </button>
            )}
            {formPhase === 3 && (
              <button
                type="button"
                className="bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
              >
                Submit
              </button>
            )}
            {formPhase > 1 && (
              <button
                type="button"
                onClick={() => changeFormPhase(formPhase - 1)}
                className="bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
              >
                Back
              </button>
            )}
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PropertyManagement;
