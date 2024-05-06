"use client";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const FloatingLabelInput = ({
  label,
  type,
  name,
  id,
  value,
  setValue,
  handleShow,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  //   const [value, setValue] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative mt-6">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={true}
        className={`lg:w-[550px] md:w-[443px] bg-[#FFFDF4] bg-opacity-[78%] rounded border border-[#CACACA] text-xl outline-none text-[#676767] pt-4 pb-3 pr-7 pl-3 leading-8 transition-colors duration-200 ease-in-out`}
        placeholder=" "
      />
      <span className="absolute inset-y-5 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
        *
      </span>
      {name === "password" || name === "confirmPassword" ? (
        <span
          onClick={handleShow}
          className="absolute inset-y-5 right-0 mt-[3px] px-10 text-[#676767] font-semibold focus:outline-none cursor-pointer"
        >
          {type === "password" ? <IoMdEyeOff /> : <IoMdEye />}
        </span>
      ) : (
        <span></span>
      )}
      <label
        htmlFor={id}
        className={`absolute top-0 left-0 duration-300 origin-0 ${
          isFocused || value
            ? "text-xs -translate-y-4 py-5 px-3 text-blue-500"
            : "text-gray-500 p-4"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
