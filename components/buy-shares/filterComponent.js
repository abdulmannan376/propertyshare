import {
  handleAllDropdownsActivity,
  updateAreaRange,
  updateNumberOfBeds,
  updatePriceRange,
  updatePropertyType,
} from "@/app/redux/features/buyShareSlice";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const FilterComponent = ({
  filters,
  setFilters,
  area,
  handleAreaRange,
  price,
  handlePriceRange,
}) => {
  const dispatch = useDispatch();

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
      dataMin: ["0", "300", "600", "900"],
      dataMax: ["300", "600", "900", "Any"],
    },
    area: {
      dataMin: ["0", "50", "100", "150", "200", "250", "300"],
      dataMax: ["50", "100", "150", "200", "250", "300", "Any"],
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
                  className="xxl:w-96 xl:w-64 lg:w-52 md:w-52 bg-transparent p-3 lg:text-xl text-base text-[#676767] flex items-center justify-between"
                >
                  Property Type{" "}
                  <div className="flex flex-row items-center space-x-5">
                    {propertyType.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updatePropertyType({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] text-sm p-1"
                      >
                        RESET
                      </span>
                    )}
                    <FaAngleDown />
                  </div>
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white z-[1000]">
                    <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                      {filter.data.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!propertyType.includes(listItem.name)) {
                              dispatch(
                                updatePropertyType({
                                  task: "add",
                                  propertyType: listItem.name,
                                })
                              );
                            } else {
                              dispatch(
                                updatePropertyType({
                                  task: "remove",
                                  propertyType: listItem.name,
                                })
                              );
                            }
                          }}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {propertyType.includes(listItem.name) && (
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
                  className="xxl:w-96 xl:w-64 lg:w-52 md:w-52 bg-transparent p-3 lg:text-xl text-base text-[#676767] flex items-center justify-between"
                >
                  Price {"($)"}
                  <div className="flex flex-row items-center space-x-5">
                    {priceRange.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updatePriceRange({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] text-sm p-1"
                      >
                        RESET
                      </span>
                    )}
                    <FaAngleDown />
                  </div>
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white flex flex-row z-[1000] items-center justify-between">
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        name="priceMin"
                        value={priceRange[0]}
                        placeholder="MIN:"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          dispatch(
                            updatePriceRange({
                              task: "min",
                              value: e.target.value,
                            })
                          );
                        }}
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMIN.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              updatePriceRange({
                                task: "min",
                                value: listItem.name,
                              })
                            );
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
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        name="priceMax"
                        value={priceRange[1]}
                        placeholder="MAX:"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updatePriceRange({
                              task: "max",
                              value: e.target.value,
                            })
                          );
                        }}
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMAX.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              updatePriceRange({
                                task: "max",
                                value: listItem.name,
                              })
                            );
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
                  className="xxl:w-96 xl:w-64 lg:w-52 md:w-52 bg-transparent p-3 lg:text-xl text-base text-[#676767] flex items-center justify-between"
                >
                  Area {"(sqmt)"}
                  <div className="flex flex-row items-center space-x-5">
                    {areaRange.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateAreaRange({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] text-sm p-1"
                      >
                        RESET
                      </span>
                    )}
                    <FaAngleDown />
                  </div>
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white flex flex-row z-[1000] items-center justify-between">
                    <ul className="w-1/2 px-3 space-y-1 max-h-60 overflow-y-auto overflow-x-hidden">
                      <input
                        type="text"
                        name="priceMin"
                        value={areaRange[0]}
                        placeholder="MIN:"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updateAreaRange({
                              task: "min",
                              value: e.target.value,
                            })
                          );
                        }}
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMIN.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(
                              updateAreaRange({
                                task: "min",
                                value: listItem.name,
                              })
                            );
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
                        value={areaRange[1]}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          dispatch(
                            updateAreaRange({
                              task: "max",
                              value: e.target.value,
                            })
                          );
                        }}
                        placeholder="MAX:"
                        className="w-full border border-[#D9D9D9] placeholder:font-semibold text-[#676767] px-2 rounded-md outline-none"
                      />
                      {filter.dataMAX.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(
                              updateAreaRange({
                                task: "max",
                                value: listItem.name,
                              })
                            );
                          }}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {/* {listItem.selected && (
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          )} */}
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
                  className="xxl:w-96 xl:w-64 lg:w-52 md:w-52 bg-transparent p-3 lg:text-xl text-base text-[#676767] flex items-center justify-between"
                >
                  Beds{" "}
                  <div className="flex flex-row items-center space-x-5">
                    {numberOfBeds.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateNumberOfBeds({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] text-sm p-1"
                      >
                        RESET
                      </span>
                    )}
                    <FaAngleDown />
                  </div>
                </button>
                {dropdownsStatus[filter.id] && (
                  <div className="absolute w-full bg-white z-[1000]">
                    <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                      {filter.data.map((listItem, i) => (
                        <li
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!numberOfBeds.includes(listItem.name)) {
                              dispatch(
                                updateNumberOfBeds({
                                  task: "add",
                                  beds: listItem.name,
                                })
                              );
                            } else {
                              dispatch(
                                updateNumberOfBeds({
                                  task: "remove",
                                  beds: listItem.name,
                                })
                              );
                            }
                          }}
                          className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                        >
                          <h1>{listItem.name}</h1>{" "}
                          {numberOfBeds.includes(listItem.name) && (
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
