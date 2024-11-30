"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainAppComponent = ({ children }) => {
  return (
    <PayPalScriptProvider options={{ 'clientId': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, "disable-funding": "paylater" }}>
      {children}
    </PayPalScriptProvider>
  );
};

export default MainAppComponent;
