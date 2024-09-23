"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateWishList } from "@/app/redux/features/userSlice";
import { errorAlert, successAlert } from "@/utils/alert";
import DropIn from "braintree-web-drop-in";

// Set the app element for accessibility reasons
Modal.setAppElement("#app-body");

const BuyShareModal = ({
  isOpen,
  onClose,
  propertyDocID,
  propertyID,
  price,
}) => {
  const [propertyShares, setPropertyShares] = useState([]);
  const [selectedShareID, setSelectedShareID] = useState("");

  useEffect(() => {
    if (!isOpen) return; // Only fetch shares if the modal is open

    const fetchPropertyShares = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-property/${propertyDocID}/Listed`,
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

    fetchPropertyShares();
  }, [isOpen, propertyDocID]);

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
        successAlert("Success", response.message);
        onClose(); // Close modal on success
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const handlePayLaterSubmit = async (e) => {
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
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/reserve-share`,
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
        onClose(); // Close modal on success
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const dispatch = useDispatch();

  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/client-token`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const { token } = await res.json();
        setClientToken(token);
      } catch (error) {
        errorAlert("Error", error.message);
      }
    };

    fetchClientToken();
  }, []);

  useEffect(() => {
    if (selectedShareID.length > 0) {
      if (clientToken && isOpen) {
        DropIn.create(
          {
            authorization: clientToken,
            container: "#dropin-container",
            paypal: {
              flow: "vault", // Options are 'vault' or 'checkout'
              amount: "", // You can specify an amount or leave this empty
              currency: "USD", // Specify currency
              buttonStyle: {
                color: "blue", // Options are 'blue', 'gold', 'silver', 'white', 'black'
                shape: "rect", // Options are 'rect', 'pill'
                size: "medium", // Options are 'small', 'medium', 'large', 'responsive'
              },
            },
          },
          (error, dropinInstance) => {
            if (error) errorAlert("Error", error);
            else setInstance(dropinInstance);
          }
        );
      }
    } else {
      if (instance) {
        // Clear the instance
        instance.teardown((err) => {
          if (err) {
            console.error("Error tearing down DropIn instance:", err);
          } else {
            setInstance(null); // Clear instance state
          }
        });
      }
      // Remove children from #dropin-container
      const dropinContainer = document.getElementById("dropin-container");
      if (dropinContainer) {
        while (dropinContainer.firstChild) {
          dropinContainer.removeChild(dropinContainer.firstChild);
        }
      }
    }

  }, [clientToken, isOpen, selectedShareID]);

  const [isLoading, setIsLoading] = useState(false);

  // Handle payment submission
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      if (!localStorage.getItem("userDetails")) {
        throw new Error("Login first.");
      }

      const { nonce } = await instance.requestPaymentMethod();
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const purpose = `Buy Share of Property: ${propertyID}`;

      const request = {
        payment: { nonce, amount: price, username, purpose },
        data: {
          username,
          shareID: selectedShareID,
          price: price,
        },
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/buy-share-transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );

      const response = await res.json();

      setIsLoading(false);
      if (response.success) {
        successAlert("Success", response.message);
        setSelectedShareID("");
        onClose();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setSelectedShareID("");
      onClose();
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
      {/* Modal Content */}

      <div className="relative flex flex-row items-stretch bg-white border border-[#116A7B] py-5 px-10 rounded-xl shadow-lg max-w-5xl md:w-full w-[70vw]">
        <div className="md:w-1/2 w-full flex flex-col justify-between items-start mr-5">
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
                const startDate = new Date(
                  share.availableInDuration.startDateString
                    ? share.availableInDuration.startDateString
                    : share.availableInDuration.startDate
                );
                const endDate = new Date(
                  share.availableInDuration.endDateString
                    ? share.availableInDuration.endDateString
                    : share.availableInDuration.endDate
                );
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
          <div id="dropin-container"></div>
          <div className="mt-4">
            <button
              onClick={handlePayment}
              className="w-32 bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
            >
              {!isLoading && "Pay Now"}
              {isLoading && (
                <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
              )}
            </button>
            <button
              onClick={handlePayLaterSubmit}
              className="bg-transparent text-white[#116A7B] py-2 px-4 rounded transition duration-150"
            >
              Pay Later
            </button>
          </div>
        </div>
        <div className="w-1/2 md:block hidden">
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

export default BuyShareModal;
