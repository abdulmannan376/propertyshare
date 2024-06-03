import {
  handleAllDropdownsActivity,
  updateAreaRange,
  updateNumberOfBeds,
  updatePriceRange,
  updatePropertyType,
} from "@/app/redux/features/buyShareSlice";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const FilterComponent = ({ filters, setFilters }) => {
  const dispatch = useDispatch();

  const [dropdownsStatus, setDropdownsStatus] = useState({
    propertyTypeActive: false,
    priceActive: false,
    areaActive: false,
    bedsActive: false,
  });

  const handleFilterSelect = (index, dataIndex, value, dataType) => {
    console.log(
      "in handleFilterSelect",
      index,
      dataIndex,
      value,
      typeof dataType
    );
    if (index === 0 || index === 3) {
      console.log("in if");
      setFilters((prevDetails) => {
        const newDetails = [...prevDetails];
        newDetails[index].data[dataIndex].selected = value;
        return newDetails;
      });
      if (index === 0) {
        if (value) {
          dispatch(
            updatePropertyType({
              task: "add",
              propertyType: filters[index].data[dataIndex].name,
            })
          );
        } else {
          dispatch(
            updatePropertyType({
              task: "remove",
              propertyType: filters[index].data[dataIndex].name,
            })
          );
        }
      } else {
        if (value) {
          dispatch(
            updateNumberOfBeds({
              task: "add",
              beds: filters[index].data[dataIndex].name,
            })
          );
        } else {
          dispatch(
            updateNumberOfBeds({
              task: "remove",
              beds: filters[index].data[dataIndex].name,
            })
          );
        }
      }
    } else if (index === 1) {
      console.log("in else if");
      if (dataType === "min") {
        console.log("in if");
        setFilters((prevDetails) => {
          const newDetails = [...prevDetails];
          newDetails[index].dataMIN[dataIndex].selected = value;
          return newDetails;
        });
      } else if (dataType === "max") {
        setFilters((prevDetails) => {
          const newDetails = [...prevDetails];
          newDetails[index].dataMAX[dataIndex].selected = value;
          return newDetails;
        });
      }
    }
  };

  const [area, setArea] = useState({ min: "", max: "" });

  const handleAreaRange = (field, value) => {
    if (
      field === "max" &&
      area.max !== "ANY" &&
      parseInt(area.min) >= parseInt(value)
    ) {
      return;
    }
    dispatch(updateAreaRange({ task: field, value: value }));
    setArea((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails[field] = value;
      return newDetails;
    });
  };

  const [price, setPrice] = useState({ min: "", max: "" });

  const handlePriceRange = (field, value) => {
    if (
      field === "max" &&
      price.max !== "ANY" &&
      parseInt(price.min) >= parseInt(value)
    ) {
      return;
    }

    dispatch(updatePriceRange({ task: field, value: value }));

    setPrice((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails[field] = value;
      return newDetails;
    });
  };

  const handleDropdownActivity = (field, value, e) => {
    e.preventDefault();
    console.log("in handle dropdown activity");
    setDropdownsStatus((prevDetails) => {
      const newDetails = { ...prevDetails };
      Object.keys(newDetails).map((data) => {
        if (data === field) {
          newDetails[data] = value;
        } else {
          newDetails[data] = false;
        }
      });
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

  const priceMin = "";
  const priceMax = "";

  const availableShareTypeColorList = [
    "bg-green-400",
    "bg-amber-400",
    "bg-red-400",
  ];

  const [userSettings, setUserSettings] = useState({});

  const fetchUserSettings = async () => {
    try {
    } catch (error) {}
  };

  const isAllDropdownsClosed = useSelector(
    (state) => state.buyShareSliceReducer.isAllDropdownsClosed
  );

  useEffect(() => {
    if (!isAllDropdownsClosed) {
      setDropdownsStatus((prevDetails) => {
        const newDetails = { ...prevDetails };

        Object.keys(newDetails).map((fieldName) => {
          newDetails[fieldName] = false;
        });

        return newDetails;
      });

      dispatch(handleAllDropdownsActivity(true));
    }
  }, [isAllDropdownsClosed]);

  return (
    <>
      <div className="w-full flex flex-row items-center border-2 border-[#676767] divide-x-2 divide-[#676767] justify-center bg-white my-5 space-x-10 mx-auto duration-700 transition">
        {filters.map((filter, index) => (
          <Fragment key={index}>
            {index === 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownActivity(
                      filter.id,
                      !dropdownsStatus[filter.id],
                      e
                    );
                  }}
                  className="xl:w-96 lg:w-64 bg-transparent p-3 text-xl text-[#676767] flex items-center justify-between"
                >
                  Property Type <FaAngleDown />
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white z-[1000]">
                    <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                      {filter.data.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={() =>
                            handleFilterSelect(index, i, !listItem.selected)
                          }
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {index === 1 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownActivity(
                      filter.id,
                      !dropdownsStatus[filter.id],
                      e
                    );
                  }}
                  className="xl:w-96 lg:w-64 bg-transparent p-3 text-xl text-[#676767] flex items-center justify-between"
                >
                  Price <FaAngleDown />
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white flex flex-row z-[1000] items-center justify-between">
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        name="priceMin"
                        value={price.min}
                        placeholder="MIN:"
                        onChange={({ target }) =>
                          handlePriceRange("min", target.value)
                        }
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMIN.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={() => handlePriceRange("min", listItem.name)}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        name="priceMax"
                        value={price.max}
                        placeholder="MAX:"
                        onChange={({ target }) =>
                          handlePriceRange("max", target.value)
                        }
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMAX.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={() => handlePriceRange("max", listItem.name)}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {index === 2 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownActivity(
                      filter.id,
                      !dropdownsStatus[filter.id],
                      e
                    );
                  }}
                  className="xl:w-96 lg:w-64 bg-transparent p-3 text-xl text-[#676767] flex items-center justify-between"
                >
                  Area <FaAngleDown />
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white flex flex-row z-[1000] items-center justify-between">
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                      <input
                        type="text"
                        name="priceMin"
                        value={area.min}
                        placeholder="MIN:"
                        onChange={({ target }) =>
                          handleAreaRange("min", target.value)
                        }
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMIN.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(event) => {
                            handleAreaRange("min", listItem.name);
                          }}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                      <input
                        type="text"
                        name="priceMax"
                        value={area.max}
                        onChange={({ target }) =>
                          handleAreaRange("max", target.value)
                        }
                        placeholder="MAX:"
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMAX.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(event) => {
                            handleAreaRange("max", listItem.name);
                          }}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {index === 3 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownActivity(
                      filter.id,
                      !dropdownsStatus[filter.id],
                      e
                    );
                  }}
                  className="xl:w-96 lg:w-64 bg-transparent p-3 text-xl text-[#676767] flex items-center justify-between"
                >
                  Beds <FaAngleDown />
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white z-[1000]">
                    <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                      {filter.data.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={() =>
                            handleFilterSelect(index, i, !listItem.selected)
                          }
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default FilterComponent;
