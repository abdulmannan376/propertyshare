"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BuyShareModal = ({
  isOpen,
  onClose,
  propertyDocID,
  propertyID,
  price,
}) => {
  if (!isOpen) return null;

  const [propertyShares, setPropertyShares] = useState([]);
  const [selectedShareID, setSelectedShareID] = useState("");

  const fetchPropertyShares = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-property/${propertyDocID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        setPropertyShares(response.body);
      } else {
        throw new Error(response.message);
      }
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
  useEffect(() => {
    if (propertyShares.length === 0) {
      fetchPropertyShares();
    }
    console.log(propertyShares);
  }, [propertyShares]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!localStorage.getItem("userDetails")) {
        throw new Error("Login first.");
      }
      const data = {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        shareID: selectedShareID,
        price: price,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/buy-share`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      if (response.success) {
        toast.success(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onClose();
      } else {
        throw new Error(response.message);
      }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="flex flex-row items-stretch bg-white border border-[#116A7B] py-5 px-10 rounded-xl shadow-lg max-w-5xl w-full">
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-4xl text-[#09363F] font-medium">Buy shares</h4>
          </div>
          <div>
            <h2 className="text-2xl text-[#116A7B]">Duration:</h2>
            <select
              name="duration of share"
              value={selectedShareID}
              onChange={({ target }) => {
                if (target.value == "Select") {
                  setSelectedShareID("");
                } else {
                  setSelectedShareID(target.value);
                }
              }}
              className="inline-flex mr-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
            >
              <option value="Select">Select</option>
              {propertyShares.map((share, index) => {
                const startDate = new Date(share.availableInDuration.startDate);
                const endDate = new Date(share.availableInDuration.endDate);
                return (
                  share.utilisedStatus === "Listed" && (
                    <option key={index} value={share.shareID}>
                      {index + 1}: {startDate.toISOString().split("T")[0]} -{" "}
                      {endDate.toISOString().split("T")[0]}
                    </option>
                  )
                );
              })}
            </select>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
            >
              Buy Now
            </button>
            <button
              onClick={onClose}
              className="bg-transparent text-white[#116A7B] py-2 px-4 rounded transition duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="1/2">
          <Image
            width={2000}
            height={2000}
            src={`/background.png`}
            className="w-full h-auto object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyShareModal;

//${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${propertyID}/image-1.png
