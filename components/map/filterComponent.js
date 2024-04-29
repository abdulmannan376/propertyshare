import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const FilterComponent = ({ onFilterSelect }) => {
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
    { name: "All requests", data: [], active: false, iconURL: "/person-pin.png" },
  ]);

  const [dropdownsStatus, setDropdownsStatus] = useState({
    propertyTypeDropdownActive: false,
    availableSharesDropdownActive: false,
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

  const handleFilterClick = async (index, id, value, key) => {
    console.log(index, id, value, key);
    setFilters((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[index].active = value;
      return newDetails;
    });
    if (value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/fetch-coordinates-of-property/${id}/${key}`
      );
      const response = await res.json();

      onFilterSelect(response.data, filters[index].iconURL);
    } else {
      onFilterSelect([]);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute flex flex-row items-center justify-evenly bottom-16 left-16 z-[1000] bg-transparent border-2 border-white p-1 space-x-5 shadow-md"
      //   style={{
      //     position: "absolute",
      //     bottom: 64,
      //     left: 64,
      //     zIndex: 1000,
      //     backgroundColor: "white",
      //     padding: "10px",
      //     borderRadius: "5px",
      //     boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
      //   }}
    >
      {filters.map((filter, index) => (
        <div key={index} className="relative">
          <button
            className="flex flex-row items-center justify-around w-64 bg-white p-3 text-xl"
            onClick={(e) => {
              if (filter.data.length > 0) {
                if (index === 0) {
                  handleDropdownActivity(
                    "propertyTypeDropdownActive",
                    !dropdownsStatus["propertyTypeDropdownActive"],
                    e
                  );
                } else {
                  handleDropdownActivity(
                    "availableSharesDropdownActive",
                    !dropdownsStatus["availableSharesDropdownActive"],
                    e
                  );
                }
              } else {
                handleFilterClick(index, filter.name, !filter.active, "null");
              }
            }}
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
          {index === 0 && dropdownsStatus["propertyTypeDropdownActive"] && (
            <div className="absolute w-64 bg-white bottom-12 z-[1000]">
              <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                {filter.data.map((listItem, i) => (
                  <button
                    type="button"
                    key={i}
                    className="w-full flex flex-row items-center p-2 border-b border-black border-opacity-20 justify-between"
                  >
                    <li key={i} className="text-base text-[#676767]">
                      {listItem.name}
                    </li>
                    {listItem.selected && (
                      <div
                        className={`text-xs text-white rounded-full py-[3px] px-[8px] ml-5 bg-blue-500`}
                      >
                        x
                      </div>
                    )}
                  </button>
                ))}
              </ul>
            </div>
          )}
          {index === 1 && dropdownsStatus["availableSharesDropdownActive"] && (
            <div className="absolute w-64 bg-white bottom-12 z-[1000]">
              <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                {filter.data.map((listItem, i) => (
                  <button
                    type="button"
                    key={i}
                    className="w-full flex flex-row items-center p-2 border-b border-black border-opacity-20 justify-between"
                  >
                    <li key={i} className="text-base text-[#676767]">
                      {listItem.name}
                    </li>
                    {listItem.selected && (
                      <div
                        className={`text-xs text-white rounded-full py-[3px] px-[8px] ml-5 bg-blue-500`}
                      >
                        x
                      </div>
                    )}
                  </button>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
