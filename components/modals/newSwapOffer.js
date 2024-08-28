import { errorAlert, successAlert } from "@/utils/alert";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#app-body");

const NewSwapOfferModal = ({
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

  const [selectedShareID, setSelectedShareID] = useState("");

  const fetchMyShares = async () => {
    try {
      //   setIsSentOffersLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-swap-shares/${username}/${propertyID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        // setIsSentOffersLoading(false);
        setMyPropertyShares(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      //   setIsSentOffersLoading(false);
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
  const [myPropertyShares, setMyPropertyShares] = useState([]);
  useEffect(() => {
    fetchMyShares();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedShareID) {
        throw new Error("no share selected");
      }

      const data = {
        shareID: shareID,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        offeredShareID: selectedShareID,
      };
      console.log(data);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/gen-share-swap-offer`,
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
              Make offer for Swap
            </h4>
            <h4 className="text-2xl text-[#09363F] font-medium">
              User: <strong>{username}</strong>
            </h4>
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
              {myPropertyShares.map((share, index) => {
                const startDate = new Date(
                  share.availableInDuration.startDateString
                );
                const endDate = new Date(
                  share.availableInDuration.endDateString
                );
                return (
                  <option key={index} value={share.shareID}>
                    {index + 1}: {startDate.toISOString().split("T")[0]} -{" "}
                    {endDate.toISOString().split("T")[0]}
                  </option>
                );
              })}
            </select>
          </div>
          {myPropertyShares.length === 0 && (
            <div>
              <h3>Please make a share available to swap.</h3>
            </div>
          )}
          <div className="mt-4">
            <button
              onClick={(e) => {
                onClose();
                handleSubmit(e);
              }}
              disabled={myPropertyShares.length === 0}
              className="disabled:bg-[#116A7B30] bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
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

export default NewSwapOfferModal;
