import {
  updateAvailableShares,
  updatePropertyType,
} from "@/app/redux/features/mapPageSlice";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const FilterComponent = ({
  onFilterSelect,
  onPropertyFilterSelect,
  onAvailableShareFilterSelect,
}) => {
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
  ]);

  const [allRequestes, setAllRequestes] = useState({
    name: "All requests",
    active: false,
    iconURL: "/person-pin.png",
  });

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
  const dispatch = useDispatch();
  const handleFilterClick = (index, dataIndex, value) => {
    // console.log(index, id, value, key);

    if (index === 0) {
      if (value) {
        dispatch(
          updateAvailableShares({
            task: "add",
            value: filters[index].data[dataIndex].name,
          })
        );
      } else {
        dispatch(
          updateAvailableShares({
            task: "remove",
            value: filters[index].data[dataIndex].name,
          })
        );
      }
    } else {
      if (value) {
        dispatch(
          updatePropertyType({
            task: "add",
            value: filters[index].data[dataIndex].name,
          })
        );
      } else {
        dispatch(
          updatePropertyType({
            task: "remove",
            value: filters[index].data[dataIndex].name,
          })
        );
      }
    }
    setFilters((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[index].data[dataIndex].selected = value;
      return newDetails;
    });
  };

  const handleAllRequestesClick = async (value) => {
    setAllRequestes((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails.active = value;
      return newDetails;
    });
    if (value) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/fetch-coordinates-of-property`
      );
      const response = await res.json();

      onFilterSelect(response.data, allRequestes.iconURL);
    } else {
      onFilterSelect([]);
    }
  };

  const propertyType = useSelector(
    (state) => state.mapPageSliceReducer.propertyType
  );
  const availableShares = useSelector(
    (state) => state.mapPageSliceReducer.availableShares
  );

  const handleFilterSubmit = async () => {
    if (propertyType.length > 0) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/property/get-property-by-type/${JSON.stringify({
          propertyType: propertyType,
        })}`
      );

      const response = await res.json();
      console.log("response: ", response);
      onPropertyFilterSelect(response.body);
    } else {
      onPropertyFilterSelect([]);
    }

    if (availableShares.length > 0) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/property/get-property-by-available-shares/${JSON.stringify({
          availableShares: availableShares,
        })}`
      );

      const response = await res.json();

      onAvailableShareFilterSelect(response.body);
    } else {
      onAvailableShareFilterSelect([]);
    }
  };

  const [isFilterUpdated, setIsFilterUpdated] = useState(false);
  const [pageMounted, setPageMounted] = useState(false);

  useEffect(() => {
    if (pageMounted) {
      setIsFilterUpdated(true);
    } else {
      setPageMounted(true);
    }
  }, [filters]);

  const applyBtnRef = useRef();
  useEffect(() => {
    console.log("in page useEffect");
    if (!isFilterUpdated) {
      applyBtnRef.current.classList.remove("translate-x-10");
      applyBtnRef.current.classList.remove("z-0");
      applyBtnRef.current.classList.add("-translate-x-60");
      applyBtnRef.current.classList.add("-z-50");
    } else {
      applyBtnRef.current.classList.remove("-translate-x-60");
      applyBtnRef.current.classList.remove("-z-50");
      applyBtnRef.current.classList.add("translate-x-10");
      applyBtnRef.current.classList.add("z-0");
    }
  }, [isFilterUpdated]);

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
              if (index === 0) {
                handleDropdownActivity(
                  "propertyTypeDropdownActive",
                  !dropdownsStatus["propertyTypeDropdownActive"],
                  e
                );
                handleDropdownActivity(
                  "availableSharesDropdownActive",
                  false,
                  e
                );
              } else {
                handleDropdownActivity(
                  "availableSharesDropdownActive",
                  !dropdownsStatus["availableSharesDropdownActive"],
                  e
                );
                handleDropdownActivity("propertyTypeDropdownActive", false, e);
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
                    onClick={() =>
                      handleFilterClick(index, i, !listItem.selected)
                    }
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
                    onClick={() =>
                      handleFilterClick(index, i, !listItem.selected)
                    }
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
      <div className="relative">
        <button
          className="flex flex-row items-center justify-around w-64 bg-white p-3 text-xl"
          onClick={(e) => {
            handleAllRequestesClick(!allRequestes.active);
            handleDropdownActivity("availableSharesDropdownActive", false, e);
            handleDropdownActivity("propertyTypeDropdownActive", false, e);
          }}
        >
          <h1>{allRequestes.name} </h1>
          {allRequestes.active && (
            <div
              className={`text-xs text-white rounded-full py-[3px] px-[8px] ml-5 bg-blue-500`}
            >
              &nbsp;
            </div>
          )}
        </button>
      </div>
      <div className="relative mb-8">
        <button
          type="button"
          ref={applyBtnRef}
          onClick={(e) => {
            setIsFilterUpdated(false);
            handleFilterSubmit();
            handleDropdownActivity("availableSharesDropdownActive", false, e);
            handleDropdownActivity("propertyTypeDropdownActive", false, e);
          }}
          className="absolute bg-[#116A7B] w-40 text-white transition-transform -translate-x-60 -z-50 px-3 py-2 rounded-lg "
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
