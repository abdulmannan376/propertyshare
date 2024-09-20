import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import { FaAngleDown } from "react-icons/fa";
import {
    updateAreaRange,
  updateNumberOfBeds,
  updatePriceRange,
  updatePropertyType,
} from "@/app/redux/features/buyShareSlice";
import { useDispatch, useSelector } from "react-redux";

Modal.setAppElement("#app-body");

const FiltersModal = ({
  isOpen,
  onClose,
  filters,
  handleDropdownActivity,
  dropdownsStatus,
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-[5000] flex justify-center items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          // border: "1px solid #ccc",
          background: "transparent",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "15px",
          outline: "none",
          padding: "5px",
          width: "full",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="w-full h-[65vh] flex-col items-center justify-center bg-white px-5 py-3 my-5 space-y-10 mx-auto duration-700 transition rounded-2xl">
        {filters.map((filter, index) => (
          <Fragment key={index}>
            {index === 0 && (
              <div className="relative w-full">
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
                  className="w-64 bg-transparent md:p-3 px-1 py-3 lg:text-xl md:text-base sm:text-sm text-[#676767] flex items-center justify-between"
                >
                  Property Type{" "}
                  <div className="flex flex-row items-center md:space-x-5 space-x-0">
                    {propertyType.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updatePropertyType({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] sm:text-sm text-xs p-1"
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
              <div className="relative w-full">
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
                  className="w-64 bg-transparent md:p-3 px-1 py-3 lg:text-xl md:text-base sm:text-sm text-[#676767] flex items-center justify-between"
                >
                  Price {"($)"}
                  <div className="flex flex-row items-center md:space-x-5 space-x-0">
                    {priceRange.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updatePriceRange({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] sm:text-sm text-xs p-1"
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
                  className="w-64 bg-transparent md:p-3 px-1 py-3 lg:text-xl md:text-base sm:text-sm text-[#676767] flex items-center justify-between"
                >
                  Area {"(sqmt)"}
                  <div className="flex flex-row items-center md:space-x-5 space-x-0">
                    {areaRange.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateAreaRange({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] md:text-sm text-xs p-1"
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
                  className="w-64 bg-transparent md:p-3 px-1 py-3 lg:text-xl md:text-base sm:text-sm text-[#676767] flex items-center justify-between"
                >
                  Beds{" "}
                  <div className="flex flex-row items-center md:space-x-5 space-x-0">
                    {numberOfBeds.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(updateNumberOfBeds({ task: "reset" }));
                        }}
                        className="rounded-full text-[#116A7B] md:text-sm text-xs p-1"
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
    </Modal>
  );
};

export default FiltersModal;
