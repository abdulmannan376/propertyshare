"use client";

import React, { useEffect, useState } from "react";

import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { errorAlert } from "@/utils/alert";

const PaypalPayment = ({ amount, handlePayment }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    adminArea1: "",
    adminArea2: "",
    countryCode: "",
    postalCode: "",
  });

  useEffect(() => {
    console.log("Amount: ", amount);
  }, []);

  async function createOrder(data) {
    data.amount = amount;
    console.log("data: ", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add Content-Type header
          },
          body: JSON.stringify(data), // Send the payload as a JSON string
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Failed to create order: ${response.status} ${
            response.statusText
          } - ${JSON.stringify(errorDetails)}`
        );
      }

      const order = await response.json();
      console.log("Order created successfully:", order);
      return order.id; // Return the order ID
    } catch (err) {
      console.error("Error in createOrder:", err.message);
      throw err; // Propagate the error to the caller
    }
  }

  async function onApprove(data) {
    
    try {
      
      handlePayment(data.orderID)
      
      return true
    } catch (error) {
      console.error(error)
      return true
    }
      
  }

  function onError(error) {
    // Do something with the error from the SDK
  }

  function handleBillingAddressChange(field, value) {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <>
      <PayPalButtons
        className="w-72 max-h-80 overflow-y-auto"
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
      {/* <PayPalCardFieldsProvider
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      >
        <PayPalCardFieldsForm />
        <input
          type="text"
          id="card-billing-address-line-2"
          name="card-billing-address-line-2"
          placeholder="Address line 1"
          onChange={(e) =>
            handleBillingAddressChange("addressLine1", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-line-2"
          name="card-billing-address-line-2"
          placeholder="Address line 2"
          onChange={(e) =>
            handleBillingAddressChange("addressLine2", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-admin-area-line-1"
          name="card-billing-address-admin-area-line-1"
          placeholder="Admin area line 1"
          onChange={(e) =>
            handleBillingAddressChange("adminArea1", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-admin-area-line-2"
          name="card-billing-address-admin-area-line-2"
          placeholder="Admin area line 2"
          onChange={(e) =>
            handleBillingAddressChange("adminArea2", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-country-code"
          name="card-billing-address-country-code"
          placeholder="Country code"
          onChange={(e) =>
            handleBillingAddressChange("countryCode", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-postal-code"
          name="card-billing-address-postal-code"
          placeholder="Postal/zip code"
          onChange={(e) =>
            handleBillingAddressChange("postalCode", e.target.value)
          }
        />
        {/* Custom client component to handle card fields submission 
        <SubmitPayment
          isPaying={isPaying}
          setIsPaying={setIsPaying}
          billingAddress={billingAddress}
        />
      </PayPalCardFieldsProvider> */}{" "}
    </>
  );
};

export default PaypalPayment;

const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }) => {
  const { cardFieldsForm, fields } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit({ billingAddress }).catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <button
      className={isPaying ? "btn" : "btn btn-primary"}
      style={{ float: "right" }}
      onClick={handleClick}
    >
      {isPaying ? <div className="spinner tiny" /> : "Pay"}
    </button>
  );
};
