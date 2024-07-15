"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Offers = () => {
  const [mySentOffers, setmySentOffers] = useState([]);

  const fetchMySentOffers = async () => {
    try {
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="bg-white w-full my-6 h-[85vh] max-h-[90vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Offers</h1>
      </div>
    </div>
  );
};

export default Offers;
