"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const SectionMap = () => {
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

  const availableShareTypeColorList = ["bg-green-400", "bg-amber-400", "bg-red-400"];
  return (
    <div className="bg-white ">
      <div className="mx-14 mt-14">
        <h1 className="text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          request property <i className="text-[#CDC2AE]"> anywhere</i> you wish
        </h1>
        <form className="flex flex-row bg-[#D9D9D9] bg-opacity-[76%] border border-[#F5F5F5] mt-6 rounded-md pl-2">
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
        </form>
      </div>
      <div className="mt-6 mx-14">
        <Image
          width={2000}
          height={2000}
          src={"/assets/landing-page/section-map-bg.png"}
          className="w-screen h-auto object-contain object-center"
          alt="map image"
        />
      </div>

      <div className="flex flex-row items-center justify-center bg-white my-16 duration-700 transition">
        <div className="relative">
          <button
            type="button"
            onClick={(e) =>
              handleDropdownActivity(
                "availableSharesActive",
                !dropdownsStatus["availableSharesActive"],
                e
              )
            }
            className="w-72 bg-transparent  border-y-2 border-l-2 border-[#676767] p-3 text-xl font-semibold flex items-center justify-between"
          >
            Available shares <FaAngleDown />
          </button>
          {dropdownsStatus["availableSharesActive"] && (
            <div className="absolute w-72 bg-white ">
              <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                {dropdowns.availableShares.data.map((listItem, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767]"
                  >
                    {listItem}{" "}
                    <div
                      className={`w-3 h-3 rounded-full ml-5 ${availableShareTypeColorList[index]}`}
                    />
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
                "propertyTypeActive",
                !dropdownsStatus["propertyTypeActive"],
                e
              )
            }
            className="w-72 bg-transparent border-y-2 border-l border-[#676767] p-3 text-xl font-semibold flex items-center justify-between"
          >
            Type of property <FaAngleDown />
          </button>
          {dropdownsStatus["propertyTypeActive"] && (
            <div className="absolute w-72 bg-white ">
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
            // onClick={(e) =>
            //   handleDropdownActivity(
            //     "bedsActive",
            //     !dropdownsStatus["bedsActive"],
            //     e
            //   )
            // }
            className="w-72 bg-transparent  border-y-2 border-l border-r-2 border-[#676767] p-3 text-xl font-semibold flex items-center justify-between"
          >
            Other requesters
          </button>
          {/* {dropdownsStatus["bedsActive"] && (
            <div className="absolute w-72 bg-white ">
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SectionMap;
