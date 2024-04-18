"use client";
import FloatingLabelInput from "@/components/FloatingInputButton";
import CodeVerificationInput from "@/components/codeVerificationForm";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phase, setPhase] = useState(1);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      const data = {
        name: name,
        username: username,
        email: email,
        password: password,
        role: "user",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/user-signup`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      setIsLoading(false);
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
        setPhase(2);
        setName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(response.message);
      }

      // throw new Error("new error")
    } catch (error) {
      setIsLoading(false);
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
            className="w-auto h-10 object-contain object-center"
          />
        </div>
        {phase === 1 && (
          <form
            onSubmit={handleSubmission}
            className="w-full flex flex-col items-center justify-center"
          >
            <FloatingLabelInput
              id={"name"}
              label={"Name"}
              name={"name"}
              value={name}
              setValue={setName}
              type={"text"}
            />
            <FloatingLabelInput
              id={"username"}
              label={"Username"}
              name={"username"}
              value={username}
              setValue={setUsername}
              type={"text"}
            />
            <FloatingLabelInput
              id={"email"}
              label={"Email"}
              name={"email"}
              value={email}
              setValue={setEmail}
              type={"email"}
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
            <FloatingLabelInput
              id={"confirmPassword"}
              label={"Confirm Password"}
              name={"confirmPassword"}
              value={confirmPassword}
              setValue={setConfirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              handleShow={handleShowConfirmPassword}
            />
            <div className="lg:w-[550px] md:w-[443px] relative mt-6">
              <input
                type="checkbox"
                id="TermsAndCondition"
                name="TermsAndCondition"
                required={true}
                value={name}
                onChange={({ target }) => {
                  setName(target.value);
                }}
                className="bg-transparent rounded border border-[#CACACA] text-xl outline-none text-[#676767] pt-4 pb-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <label
                htmlFor="TermsAndCondition"
                className="leading-7 px-3 absolute -translate-y-1 text-white font-semibold underline duration-300"
              >
                I agree to the Terms and Condition.
              </label>
            </div>

            <button
              type="submit"
              className="lg:w-[550px] md:w-[443px] bg-[#FFFDF4] bg-opacity-[78%] rounded border border-[#CACACA] mt-6 p-4 text-xl text-[#676767] "
            >
              {" "}
              {!isLoading && `Sign Up`}
              {isLoading && (
                <div className="border-t-2 border-b-2 border-blue-800 bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
              )}
            </button>
            <div className="w-full flex flex-row items-center justify-center mt-6">
              <div className="w-full h-[1px]  bg-[#FFFDF4]"></div>
              <h2 className="text-xl text-[#FFFDF4] px-3">OR</h2>
              <div className="w-full h-[1px]  bg-[#FFFDF4]"></div>
            </div>
            <div className="lg:w-[550px] md:[443px] mt-6 flex flex-row items-center justify-center">
              <h3 className="leading-7 px-3 absolute -translate-y-1 text-white font-semibold duration-300">
                Already have an account?{" "}
                <Link href={"/login"} className="underline">
                  {" "}
                  Sign In
                </Link>
              </h3>
            </div>
          </form>
        )}
        {phase === 2 && (
          <div className="lg:w-[684px] md:w-[577px] bg-[#FFFDF4] bg-opacity-[78%] rounded-xl border border-[#CACACA] p-10">
            <h1 className="text-xl text-[#676767] text-center">
              Enter the verification code that has been sent to your email:{" "}
              <strong>{email}</strong>
            </h1>
            <CodeVerificationInput userEmail={email} />
            {/* <form className="flex flex-row items-center justify-center">
                 <input type="text" name="vcDigit1" value={vcDigit1} /> 
            </form> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
