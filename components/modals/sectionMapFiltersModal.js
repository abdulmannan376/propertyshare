import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DropIn from "braintree-web-drop-in";
import { errorAlert, successAlert } from "@/utils/alert";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

Modal.setAppElement("#app-body");

const FiltersModal = ({
  isOpen,
  onClose,
  filters,
  dropdownsStatus,
  handleDropdownActivity,
  allRequestes,
  handleFilterClick,
  handleAllRequestesClick,
  handleFilterSubmit,
}) => {
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
      <div className="sm:p-10 p-5 lg:w-[30vw] md:w-[50vw] sm:w-[70vw] w-[95vw] h-[40vh] bg-white rounded-2xl">
        <div className="flex flex-col space-y-5 z-50">
          {filters.map((filter, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (filter.data.length > 0) {
                    if (index === 1) {
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
                  } else if (index === 2) {
                    handleDropdownActivity("availableSharesActive", false, e);
                    handleDropdownActivity("propertyTypeActive", false, e);
                  } else if (index === 0) {
                    handleAllRequestesClick(!allRequestes.active);
                    handleDropdownActivity("availableSharesActive", false, e);
                    handleDropdownActivity("propertyTypeActive", false, e);
                    onClose()
                  }
                }}
                className="w-full bg-transparent p-3 md:text-xl text-base font-semibold flex items-center justify-between"
              >
                <h1 className="flex-1">
                  {filter.name}{" "}
                  {filter.data.length > 0 && (
                    <FaAngleDown className="inline-flex" />
                  )}
                </h1>
                {index !== 0 && filter.active && (
                  <div className="text-xs text-white rounded-full py-[3px] px-[3px] ml-5 bg-blue-500">
                    <IoClose />
                  </div>
                )}
                {index === 0 && allRequestes.active && (
                  <div className="text-xs text-white rounded-full py-[3px] px-[3px] ml-5 bg-blue-500">
                    <IoClose />
                  </div>
                )}
              </button>

              {index === 2 && dropdownsStatus["availableSharesActive"] && (
                <div className="absolute w-full bg-white">
                  <ul className="px-5 space-y-1 max-h-40 overflow-y-auto">
                    {filter.data.map((listItem, i) => (
                      <li
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterClick(index, i, !listItem.selected);
                        }}
                        className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem.name}{" "}
                        {listItem.selected && (
                          <div className="text-xs text-white rounded-full py-[3px] px-[3px] ml-5 bg-blue-500">
                            <IoClose />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {index === 1 && dropdownsStatus["propertyTypeActive"] && (
                <div className="absolute w-full bg-white z-50">
                  <ul className="px-5 space-y-1 max-h-60 overflow-y-auto">
                    {filter.data.map((listItem, i) => (
                      <li
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterClick(index, i, !listItem.selected);
                        }}
                        className="flex flex-row items-center justify-between p-2 border-b border-black border-opacity-20 text-base text-[#676767] cursor-pointer"
                      >
                        {listItem.name}{" "}
                        {listItem.selected && (
                          <div className="text-xs text-white rounded-full py-[3px] px-[3px] ml-5 bg-blue-500">
                            <IoClose />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mx-auto my-5">
          <button
            type="button"
            onClick={(e) => {
              handleFilterSubmit();
              handleDropdownActivity("availableSharesActive", false, e);
              handleDropdownActivity("propertyTypeActive", false, e);
              onClose();
            }}
            className="bg-[#116A7B] w-32 text-sm text-white px-3 py-2 rounded-lg "
          >
            Apply Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FiltersModal;
