"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentPageValue,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "@/app/redux/features/navbarSlice";
import Link from "next/link";
import Image from "next/image";
import {
  updateAreaRange,
  updateCoordinates,
  updateNumberOfBeds,
  updatePriceRange,
  updatePropertyType,
} from "@/app/redux/features/buyShareSlice";

const Carousel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-gray-600",
        hoverTextColor: "text-gray-900",
      })
    );

    dispatch(updateNavbarLogo("/icon-bbh.png"));
    dispatch(updateNotificationIconColor("text-white"));
    dispatch(
      updateCurrentPageValue({
        tag: "Home",
        bgColor: "bg-[#116A7B]",
        textColor: "text-white",
      })
    );
  }, []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  //   const map = useMap();

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
    setQuery(name);
    dispatch(updateCoordinates({ coordinates: [lon, lat] }));
    setResults([]);
  };

  const coordinates = useSelector(
    (state) => state.buyShareSliceReducer.coordinates
  );

  const numberOfBeds = useSelector(
    (state) => state.buyShareSliceReducer.numberOfBeds
  );
  const propertyType = useSelector(
    (state) => state.buyShareSliceReducer.propertyType
  );
  const areaRange = useSelector(
    (state) => state.buyShareSliceReducer.areaRange
  );
  const priceRange = useSelector(
    (state) => state.buyShareSliceReducer.priceRange
  );

  const [searchBar, setSearchBar] = useState();
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [dropdownsStatus, setDropdownsStatus] = useState({
    propertyTypeActive: false,
    priceActive: false,
    areaActive: false,
    bedsActive: false,
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
    price: {
      dataMin: ["0", "30000", "60000", "90000"],
      dataMax: ["30000", "60000", "90000", "Any"],
    },
    area: {
      dataMin: ["0", "500", "1000", "1500", "2000", "2500", "3000"],
      dataMax: ["500", "1000", "1500", "2000", "2500", "3000", "Any"],
    },
    beds: {
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
    },
  };

  const handleShowFitlterBox = () => {
    setShowFilterBox(!showFilterBox);
  };

  const handleBuySharesClick = () => {};
  return (
    <div
      onClick={(e) => {
        handleDropdownActivity("propertyTypeActive", false, e);
        handleDropdownActivity("priceActive", false, e);
        handleDropdownActivity("areaActive", false, e);
        handleDropdownActivity("bedsActive", false, e);
      }}
      className="w-full h-screen flex flex-row items-center justify-start bg-cover bg-center xl:px-24 px-16"
      style={{ backgroundImage: "url('/assets/landing-page/carousel-bg.svg')" }}
    >
      <div className="mr-10">
        <Image
          width={2000}
          height={2000}
          src={"/logo-bbh-without-bg.png"}
          className="w-[245px] h-[210px] object-contain"
        />
      </div>
      <div className="w-1/2 h-full flex flex-col items-start justify-center py-10">
        <h1 className="text-3xl font-raleway text-[#116A7B] tracking-wide font-thin">
          Find your dream vacation home
        </h1>
        <form className="flex flex-row bg-[#D9D9D9] bg-opacity-40 border border-[#F5F5F5] mt-6 rounded-md">
          <input
            type="text"
            name="searchbar"
            value={query}
            placeholder="City, Address, Zip..."
            onChange={handleSearch}
            className="w-96 bg-transparent text-xl font-raleway placeholder:text-[#676767] placeholder:opacity-80 text-[#FFFDF4] m-1 pl-2 outline-none"
          />
          <button type="submit">
            {query.length > 0 ? (
              <IoMdClose
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(updateCoordinates({ coordinates: [] }));
                  setQuery("");
                }}
                className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] border-r border-[#F5F5F5]"
              />
            ) : (
              <IoIosSearch className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] border-r border-[#F5F5F5]" />
            )}
          </button>
          <button type="button" onClick={handleShowFitlterBox}>
            {showFilterBox ? (
              <IoMdClose className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] rounded-r-md rounded-br-md" />
            ) : (
              <IoFilterOutline className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] rounded-r-md rounded-br-md" />
            )}
          </button>
          <div className="absolute w-[45rem] mt-10 z-[5000]">
            {results.length > 0 && (
              <ul className="bg-white p-3">
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
        </form>

        {showFilterBox && (
          <div className="flex flex-row bg-white mt-3 duration-700 transition">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownActivity(
                    "propertyTypeActive",
                    !dropdownsStatus["propertyTypeActive"],
                    e
                  );
                  handleDropdownActivity("priceActive", false, e);
                  handleDropdownActivity("areaActive", false, e);
                  handleDropdownActivity("bedsActive", false, e);
                }}
                className="w-64 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Property Type <FaAngleDown />
              </button>
              {dropdownsStatus["propertyTypeActive"] && (
                <div className="absolute w-64 bg-white ">
                  <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                    {dropdowns.propertyType.data.map((listItem, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!propertyType.includes(listItem)) {
                            dispatch(
                              updatePropertyType({
                                task: "add",
                                propertyType: listItem,
                              })
                            );
                          } else {
                            dispatch(
                              updatePropertyType({
                                task: "remove",
                                propertyType: listItem,
                              })
                            );
                          }
                        }}
                        className="w-full flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem}
                        {propertyType.includes(listItem) && (
                          <span
                            className={`text-xs text-white rounded-full py-[3px] px-[8px] ml-5 bg-blue-500`}
                          >
                            x
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownActivity(
                    "priceActive",
                    !dropdownsStatus["priceActive"],
                    e
                  );
                  handleDropdownActivity("propertyTypeActive", false, e);
                  handleDropdownActivity("areaActive", false, e);
                  handleDropdownActivity("bedsActive", false, e);
                }}
                className="w-64 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Price <FaAngleDown />
              </button>
              {dropdownsStatus["priceActive"] && (
                <div className="absolute w-64 bg-white flex flex-row items-center justify-between">
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      name="priceMin"
                      value={priceRange[0]}
                      placeholder="MIN:"
                      onClick={(e) => e.stopPropagation()}
                      onChange={({ target }) => {
                        dispatch(
                          updatePriceRange({ task: "min", value: target.value })
                        );
                      }}
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.price.dataMin.map((listItem, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updatePriceRange({ task: "min", value: listItem })
                          );
                        }}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      name="priceMax"
                      value={priceRange[1]}
                      placeholder="MAX:"
                      onClick={(e) => e.stopPropagation()}
                      onChange={({ target }) => {
                        dispatch(
                          updatePriceRange({ task: "max", value: target.value })
                        );
                      }}
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.price.dataMax.map((listItem, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updatePriceRange({ task: "max", value: listItem })
                          );
                        }}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownActivity(
                    "areaActive",
                    !dropdownsStatus["areaActive"],
                    e
                  );
                  handleDropdownActivity("propertyTypeActive", false, e);
                  handleDropdownActivity("priceActive", false, e);
                  handleDropdownActivity("bedsActive", false, e);
                }}
                className="w-64 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Area <FaAngleDown />
              </button>
              {dropdownsStatus["areaActive"] && (
                <div className="absolute w-64 bg-white flex flex-row items-center justify-between">
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                    <input
                      type="text"
                      name="priceMin"
                      value={areaRange[0]}
                      placeholder="MIN:"
                      onClick={(e) => e.stopPropagation()}
                      onChange={({ target }) => {
                        dispatch(
                          updateAreaRange({ task: "min", value: target.value })
                        );
                      }}
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.area.dataMin.map((listItem, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updateAreaRange({ task: "min", value: listItem })
                          );
                        }}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                    <input
                      type="text"
                      name="priceMax"
                      value={areaRange[1]}
                      placeholder="MAX:"
                      onClick={(e) => e.stopPropagation()}
                      onChange={({ target }) => {
                        dispatch(
                          updateAreaRange({ task: "max", value: target.value })
                        );
                      }}
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.area.dataMax.map((listItem, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updateAreaRange({ task: "max", value: listItem })
                          );
                        }}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownActivity(
                    "bedsActive",
                    !dropdownsStatus["bedsActive"],
                    e
                  );
                  handleDropdownActivity("propertyTypeActive", false, e);
                  handleDropdownActivity("priceActive", false, e);
                  handleDropdownActivity("areaActive", false, e);
                }}
                className="w-64 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Beds <FaAngleDown />
              </button>
              {dropdownsStatus["bedsActive"] && (
                <div className="absolute w-64 bg-white ">
                  <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                    {dropdowns.beds.data.map((listItem, index) => (
                      <li
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!numberOfBeds.includes(listItem)) {
                            dispatch(
                              updateNumberOfBeds({
                                task: "add",
                                beds: listItem,
                              })
                            );
                          } else {
                            dispatch(
                              updateNumberOfBeds({
                                task: "remove",
                                beds: listItem,
                              })
                            );
                          }
                        }}
                        className="w-full flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem}
                        {numberOfBeds.includes(listItem) && (
                          <span
                            className={`text-xs text-white rounded-full py-[3px] px-[8px] ml-5 bg-blue-500`}
                          >
                            x
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-row space-x-5">
          <Link href={"/buy-shares"}>
          <button
            type="button"
            onClick={() => handleBuySharesClick()}
            className="bg-[#CDC2AE] bg-opacity-40 border border-[#F5F5F5] uppercase px-5 text-[#676767] py-1 rounded-full mt-6"
          >
            Buy
          </button>
          </Link>
          <Link href={"/under-development"}>
            <button
              type="button"
              className="bg-[#D9D9D9] bg-opacity-40 border border-[#F5F5F5] uppercase px-5 text-[#676767] py-1 rounded-full mt-6"
            >
              Rent
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
