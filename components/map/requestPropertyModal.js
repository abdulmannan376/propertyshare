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

  const areaMin = ["0", "50", "100", "150", "200", "250", "300"];
  const areaMax = ["50", "100", "150", "200", "250", "300", "Any"];

  const priceMin = ["0", "300", "600", "900"];
  const priceMax = ["300", "600", "900", "Any"];

  const handleSubmit = () => {
    onSave({ name, email, contact, coordinates });
    onClose(); // Close modal after saving
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white border-2 border-[#116A7B] p-8 rounded-3xl shadow-lg max-w-[550px] w-full">
        <h2 className="text-3xl text-center font-semibold uppercase">
          Notify me when available
        </h2>
        <p className="text-base text-center mt-3 mb-10">
          We&apos;ll notify you when a property is listed within 5km of this
          area.
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-5 rounded-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-5 rounded-full"
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-5 rounded-full"
        />
        <div>
          {/* <h2 className="text-2xl text-[#116A7B]">Duration:</h2> */}
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
            className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-5 rounded-full"
          >
            <option value="Select">Select Property Type</option>
            {propertyTypes.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <input
          type="text"
          placeholder="Area"
          className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-5 rounded-full"
        />
        <input
          type="text"
          placeholder="Price"
          className="block w-[492px] text-xl border border-[#116A7B] mb-4 px-7 py-5 rounded-full"
        />

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
