import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DropIn from "braintree-web-drop-in";
import { errorAlert, successAlert } from "@/utils/alert";

Modal.setAppElement("#app-body");

const PaymentModal = ({ isOpen, onClose, paymentID, amount }) => {
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
    if (clientToken && isOpen) {
      DropIn.create(
        {
          authorization: clientToken,
          container: "#dropin-container",
          paypal: {
            flow: "vault", // Options are 'vault' or 'checkout'
            amount: "10.00", // You can specify an amount or leave this empty
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

    console.log(instance);
  }, [clientToken, isOpen]);

  const [isLoading, setIsLoading] = useState(false);

  // Handle payment submission
  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const { nonce } = await instance.requestPaymentMethod();
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      //   const purpose = `Buy Share of Property: ${propertyID}`;

      const request = {
        payment: { nonce, username, amount, paymentID },
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/pending-payment-transaction`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );

      const response = await res.json();

      setIsLoading(false);
      if (response.success) {
        successAlert(response.message, "");
        onClose();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
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
          width: "30vw",
          height: "60vh",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="p-10 ">
        <h1 className="text-2xl font-semibold text-[#116A7B] text-center">Payment Action</h1>
        <div id="dropin-container"></div>
        {instance && <div className="mt-4">
          <button
            onClick={handlePayment}
            className="w-32 bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
          >
            {!isLoading && "Pay Now"}
            {isLoading && (
              <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
            )}
          </button>
        </div>}
      </div>
    </Modal>
  );
};

export default PaymentModal;
