"use client";
import FloatingLabelInput from "@/components/FloatingInputButton";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className="w-screen h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div>
          <Image
            width={1000}
            height={1000}
            src={"/logo.png"}
            alt="Logo"
            className="w-auto h-16 object-contain object-center"
          />
        </div>
        <form>
          <FloatingLabelInput
            id={"username"}
            label={"Username"}
            name={"username"}
            value={username}
            setValue={setUsername}
            type={"text"}
          />
          <FloatingLabelInput
            id={"password"}
            label={"Password"}
            name={"password"}
            value={password}
            setValue={setPassword}
            type={showPassword ? "text" : "password"}
            handleShow={handleShowPassword}
          />
        </form>
      </div>
    </>
  );
};

export default Page;
