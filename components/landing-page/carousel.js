"use client";
import React, { useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

const Carousel = () => {
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
  return (
    <div
      className="w-full h-screen flex flex-row items-center justify-start bg-cover bg-center xl:px-24 px-16"
      style={{ backgroundImage: "url('/assets/landing-page/carousel-bg.png')" }}
    >
      <div className="w-1/2 h-full flex flex-col items-start justify-center py-10">
        <h1 className="text-3xl font-raleway text-[#FFFDF4] tracking-wide font-thin">
          Find your dream vacation home
        </h1>
        <form className="flex flex-row bg-[#D9D9D9] bg-opacity-40 border border-[#F5F5F5] mt-6 rounded-md pl-2">
          <input
            type="text"
            name="searchbar"
            value={searchBar}
            placeholder="City, Address, ZIp..."
            className="w-96 bg-transparent text-xl font-raleway placeholder:text-[#FFFDF4] placeholder:opacity-80 text-[#FFFDF4] m-1 outline-none"
          />
          <button type="submit">
            <IoIosSearch className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] border-r border-[#F5F5F5]" />
          </button>
          <button type="button" onClick={handleShowFitlterBox}>
            {showFilterBox ? (
              <IoMdClose className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] rounded-r-md rounded-br-md" />
            ) : (
              <IoFilterOutline className="bg-[#CDC2AE] p-2 text-4xl text-[#FFFDF4] rounded-r-md rounded-br-md" />
            )}
          </button>
        </form>

        {showFilterBox && (
          <div className="flex flex-row bg-white mt-3 duration-700 transition">
            <div className="relative">
              <button
                type="button"
                onClick={(e) =>
                  handleDropdownActivity(
                    "propertyTypeActive",
                    !dropdownsStatus["propertyTypeActive"],
                    e
                  )
                }
                className="w-52 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Property Type <FaAngleDown />
              </button>
              {dropdownsStatus["propertyTypeActive"] && (
                <div className="absolute w-52 bg-white ">
                  <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                    {dropdowns.propertyType.data.map((listItem, index) => (
                      <li
                        key={index}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
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
                onClick={(e) =>
                  handleDropdownActivity(
                    "priceActive",
                    !dropdownsStatus["priceActive"],
                    e
                  )
                }
                className="w-52 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Price <FaAngleDown />
              </button>
              {dropdownsStatus["priceActive"] && (
                <div className="absolute w-52 bg-white flex flex-row items-center justify-between">
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      name="priceMin"
                      value={priceMin}
                      placeholder="MIN:"
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.price.dataMin.map((listItem, index) => (
                      <li
                        key={index}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      name="priceMax"
                      value={priceMax}
                      placeholder="MAX:"
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.price.dataMax.map((listItem, index) => (
                      <li
                        key={index}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
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
                onClick={(e) =>
                  handleDropdownActivity(
                    "areaActive",
                    !dropdownsStatus["areaActive"],
                    e
                  )
                }
                className="w-52 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Area <FaAngleDown />
              </button>
              {dropdownsStatus["areaActive"] && (
                <div className="absolute w-52 bg-white flex flex-row items-center justify-between">
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                    <input
                      type="text"
                      name="priceMin"
                      value={priceMin}
                      placeholder="MIN:"
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.area.dataMin.map((listItem, index) => (
                      <li
                        key={index}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                    <input
                      type="text"
                      name="priceMax"
                      value={priceMax}
                      placeholder="MAX:"
                      className="w-20 border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                    />
                    {dropdowns.area.dataMax.map((listItem, index) => (
                      <li
                        key={index}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
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
                onClick={(e) =>
                  handleDropdownActivity(
                    "bedsActive",
                    !dropdownsStatus["bedsActive"],
                    e
                  )
                }
                className="w-52 bg-transparent border-r border-[#676767] p-3 text-xl text-[#676767] flex items-center justify-between"
              >
                Beds <FaAngleDown />
              </button>
              {dropdownsStatus["bedsActive"] && (
                <div className="absolute w-52 bg-white ">
                  <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                    {dropdowns.beds.data.map((listItem, index) => (
                      <li
                        key={index}
                        className="p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          className="bg-[#CDC2AE] bg-opacity-40 border border-[#F5F5F5] uppercase px-5 text-[#FFFDF4] py-1 rounded-full mt-6"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Carousel;
