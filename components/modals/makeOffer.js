import { errorAlert, successAlert } from "@/utils/alert";
import Image from "next/image";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#app-body");

const MakeOffer = ({
  isOpen,
  onClose,
  username,
  category,
  startDate,
  endDate,
  propertyID,
  shareID,
}) => {
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    try {
      if (price === 0) {
        throw new Error("Price cannot be 0");
      }
      const data = {
        username: username,
        shareID: shareID,
        price: price,
        category: category,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/gen-new-offer`,
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
        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "15px",
          outline: "none",
          padding: "5px",
          width: "fit",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="relative flex flex-row items-stretch bg-white border border-[#116A7B] py-5 px-10 rounded-xl shadow-lg max-w-5xl w-full">
        <div className="w-1/2 flex flex-col justify-between items-start mr-5">
          <div className="mb-3">
            <h4 className="text-4xl text-[#09363F] font-medium">
              Make offer for {category}
            </h4>
            <h4 className="text-2xl text-[#09363F] font-medium">
              User: <strong>{username}</strong>
            </h4>
          </div>
          <div>
            <h2 className="text-xl text-[#116A7B]">Duration:</h2>
            <p>
              {startDate} - {endDate}
            </p>
          </div>
          <div className="relative">
            <label htmlFor="Price" className="text-xl text-[#116A7B]">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
              className="block w-[392px] text-xl border border-[#116A7B] mb-4 px-3 py-3 rounded-xl outline-none "
            />
            <span className="absolute inset-y-11 right-0 px-5 text-lg text-red-600 font-semibold focus:outline-none cursor-pointer">
              *
            </span>
          </div>
          <div className="mt-4">
            <button
              onClick={(e) => {
                onClose();
                handleSubmit(e);
              }}
              className="bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
            >
              Make Offer
            </button>
          </div>
        </div>
        <div className="1/2">
          <Image
            width={2000}
            height={2000}
            src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${propertyID}/image-1.png`}
            className="w-full h-[25rem] object-contain object-center"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#116A7B] text-white p-1 rounded-full cursor-pointer"
        >
          <MdClose />
        </button>
      </div>
    </Modal>
  );
};

export default MakeOffer;
