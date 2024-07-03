import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#app-body");

const NewThread = ({
  isOpen,
  onClose,
  propertyDocID,
  propertyID,
  category,
  setNewThreadSubmitted,
}) => {
  const [propertyShares, setPropertyShares] = useState([]);
  useEffect(() => {
    if (!isOpen) return; // Only fetch shares if the modal is open

    const fetchPropertyShares = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-property/${propertyDocID}/Purchased`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const response = await res.json();
        console.log("response: ", response);
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

    fetchPropertyShares();
  }, [isOpen, propertyDocID]);

  const [selectedShareID, setSelectedShareID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        shareID: selectedShareID,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/open-share-for-rent`,
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
        setNewThreadSubmitted(true);
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
      <div className="relative flex flex-col items-center justify-between bg-white border border-[#116A7B] py-5 px-10 rounded-xl shadow-lg max-w-5xl w-full z-[5000]">
        <h1 className="text-3xl font-semibold text-[#116A7B]">
          Open share for Rent
        </h1>

        <div>
          {/* <h2 className="text-2xl text-[#116A7B]">Duration:</h2> */}
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
            className="w-96 border border-[#116A7B] text-[#676767] focus:border-[#015A6B] outline-none p-3 mt-7 rounded-full"
          >
            <option value="Select">Select Duration</option>
            {propertyShares.map((share, index) => {
              const startDate = new Date(share.availableInDuration.startDate);
              const endDate = new Date(share.availableInDuration.endDate);
              return (
                share.currentOwnerDocID.username ===
                  JSON.parse(localStorage.getItem("userDetails")).username && (
                  <option key={index} value={share.shareID}>
                    {index + 1}: {startDate.toISOString().split("T")[0]} -{" "}
                    {endDate.toISOString().split("T")[0]}
                  </option>
                )
              );
            })}
          </select>
        </div>
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            className="bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewThread;
