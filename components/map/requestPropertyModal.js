import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSave, coordinates }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const [areaRange, setAreaRange] = useState(["0", "ANY"]);
  const [priceRange, setPriceRange] = useState(["0", "ANY"]);

  const propertyTypes = [
    "All",
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

  const areaMin = ["MIN", "0", "50", "100", "150", "200", "250", "300"];
  const areaMax = ["MAX", "50", "100", "150", "200", "250", "300", "Any"];

  const priceMin = ["MIN", "0", "300", "600", "900"];
  const priceMax = ["MAX", "300", "600", "900", "Any"];

  const handleSubmit = () => {
    onSave({
      name,
      email,
      contact,
      coordinates,
      areaRange,
      priceRange,
      selectedPropertyType,
    });
    onClose(); // Close modal after saving
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white border-2 border-[#116A7B] p-8 rounded-3xl shadow-lg max-w-[550px] w-full">
        <h2 className="text-2xl text-center font-semibold uppercase">
          Notify me when available
        </h2>
        <p className="text-xl text-center mt-3 mb-10">
          We&apos;ll notify you when a property is listed within 5km of this
          area.
        </p>
        <div className="relative">
          <label htmlFor="Name" className="text-xl text-[#116A7B] mx-7">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-full"
          />
          <span className="absolute inset-y-11 right-0 px-5 text-lg text-red-600 font-semibold focus:outline-none cursor-pointer">
            *
          </span>
        </div>
        <div className="relative">
          <label htmlFor="Email" className="text-xl text-[#116A7B] mx-7">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-full"
          />
          <span className="absolute inset-y-11 right-0 px-5 text-lg text-red-600 font-semibold focus:outline-none cursor-pointer">
            *
          </span>
        </div>
        <div className="relative">
          <label htmlFor="Contact" className="text-xl text-[#116A7B] mx-7">
            Contact Number
          </label>
          <input
            type="text"
            placeholder="Enter Contact..."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl text-[#116A7B] mx-7">Property Type</h2>
          <select
            name="property types"
            value={selectedPropertyType}
            onChange={({ target }) => {
              if (target.value == "Select") {
                setSelectedPropertyType("");
              } else {
                setSelectedPropertyType(target.value);
              }
            }}
            className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-full outline-none"
          >
            {/* <option value="Select">Select Property Type</option> */}
            {propertyTypes.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row">
          <div>
            <h2 className="text-xl text-[#116A7B] mx-7">Area (sqmt)</h2>
            <select
              name="area range"
              value={areaRange[0]}
              onChange={({ target }) => {
                if (target.value == "MIN") {
                  setAreaRange((prevData) => {
                    const newData = [...prevData];
                    newData[0] = "";
                    return newData;
                  });
                } else {
                  setAreaRange((prevData) => {
                    const newData = [...prevData];
                    newData[0] = target.value;
                    return newData;
                  });
                }
              }}
              className="block w-[242px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-s-full outline-none"
            >
              {/* <option value="Select">Select Property Type</option> */}
              {areaMin.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="ml-2">
            <h2 className="text-xl text-[#116A7B] mx-7">&nbsp;</h2>
            <select
              name="area range"
              value={areaRange[1]}
              onChange={({ target }) => {
                if (target.value == "MAX") {
                  setAreaRange((prevData) => {
                    const newData = [...prevData];
                    newData[1] = "";
                    return newData;
                  });
                } else {
                  setAreaRange((prevData) => {
                    const newData = [...prevData];
                    newData[1] = target.value;
                    return newData;
                  });
                }
              }}
              className="block w-[242px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-e-full outline-none"
            >
              {/* <option value="Select">Select Property Type</option> */}
              {areaMax.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="">
            <h2 className="text-xl text-[#116A7B] mx-7">Price ($)</h2>
            <select
              name="price range"
              value={priceRange[0]}
              onChange={({ target }) => {
                if (target.value == "MIN") {
                  setPriceRange((prevData) => {
                    const newData = [...prevData];
                    newData[0] = "";
                    return newData;
                  });
                } else {
                  setPriceRange((prevData) => {
                    const newData = [...prevData];
                    newData[0] = target.value;
                    return newData;
                  });
                }
              }}
              className="block w-[242px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-s-full outline-none"
            >
              {/* <option value="Select">Select Property Type</option> */}
              {priceMin.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="ml-2">
            <h2 className="text-xl text-[#116A7B] mx-7">&nbsp;</h2>
            <select
              name="price range"
              value={priceRange[1]}
              onChange={({ target }) => {
                if (target.value == "MIN") {
                  setPriceRange((prevData) => {
                    const newData = [...prevData];
                    newData[1] = "";
                    return newData;
                  });
                } else {
                  setPriceRange((prevData) => {
                    const newData = [...prevData];
                    newData[1] = target.value;
                    return newData;
                  });
                }
              }}
              className="block w-[242px] text-xl border border-[#116A7B] mb-4 px-7 py-3 rounded-e-full outline-none"
            >
              {/* <option value="Select">Select Property Type</option> */}
              {priceMax.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <h4><span className="text-lg text-red-600">*</span> fields are mandatory.</h4>
        </div>
        <div className="flex justify-start mt-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit();
            }}
            className="bg-[#116A7B] text-base text-white font-bold py-2 px-4 rounded-lg"
          >
            Notify me
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className=" text-[#116A7B] text-base font-bold py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
