"use client";
import FloatingLabelInput from "@/components/FloatingInputButton";
import CodeVerificationInput from "@/components/codeVerificationForm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarTextColor,
} from "../redux/features/navbarSlice";
import { errorAlert, successAlert } from "@/utils/alert";
import { signupSchema } from "../../lib/validations/authentications";
import { isEmpty } from "lodash";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(
      updateCurrentPageValue({
        tag: "Signup",
        bgColor: "bg-[#116A7B]",
        textColor: "text-white",
      })
    );
    dispatch(updateBgColor("bg-transparent"));
  }, []);
  const initialErrors = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phase, setPhase] = useState(1);
  const [errors, setErrors] = useState(initialErrors);
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const [isLoading, setIsLoading] = useState(false);
  const resetError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "", // Clear the error for the specific field
    }));
  };
  const handleSubmission = async (e) => {
    e.preventDefault();

    setErrors(initialErrors);
    try {
      let fieldErrors;

      // Validate the schema
      await signupSchema
        .validate(
          { name, username, email, password, confirmPassword },
          { abortEarly: false }
        )
        .catch((error) => {
          fieldErrors = error.inner.reduce((acc, err) => {
            return {
              ...acc,
              [err.path]: err.message,
            };
          }, {});

          setErrors(fieldErrors);
        });

      if (isEmpty(fieldErrors)) {
        console.log("yes");
        setIsLoading(true);
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
          successAlert("Success", response.message);
          setPhase(2);
          setName("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("check error", error);
      // let fieldErrors = error.inner.reduce((acc, err) => {
      //   return {
      //     ...acc,
      //     [err.path]: err.message,
      //   };
      // }, {});

      // setErrors(fieldErrors);
      errorAlert("Error", error.message);
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
      {/* <div className="w-full h-20 bg-none"></div> */}
      <div
        className="w-screen lg:h-screen h-full flex flex-col justify-center items-center bg-cover bg-center lg:py-0 py-20"
        style={{ backgroundImage: "url('/background.png')" }}
        onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
      >
        <div className="lg:flex hidden">
          <Image
            width={1000}
            height={1000}
            src={"/logo-bbh.png"}
            alt="Logo"
            className="w-auto h-24 object-contain object-center"
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
              resetError={resetError}
            />
            {errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
            <FloatingLabelInput
              id={"username"}
              label={"Username"}
              name={"username"}
              value={username}
              setValue={setUsername}
              type={"text"}
              resetError={resetError}
            />
            {errors.username && (
              <div className="text-red-500 text-xs mt-1">{errors.username}</div>
            )}
            <FloatingLabelInput
              id={"email"}
              label={"Email"}
              name={"email"}
              value={email}
              setValue={setEmail}
              type={"email"}
              resetError={resetError}
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
            <FloatingLabelInput
              id={"password"}
              label={"Password"}
              name={"password"}
              value={password}
              setValue={setPassword}
              type={showPassword ? "text" : "password"}
              handleShow={handleShowPassword}
              resetError={resetError}
            />
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
            <FloatingLabelInput
              id={"confirmPassword"}
              label={"Confirm Password"}
              name={"confirmPassword"}
              value={confirmPassword}
              setValue={setConfirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              handleShow={handleShowConfirmPassword}
              resetError={resetError}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </div>
            )}
            <div className="lg:w-[550px] xs:w-[443px] w-[320px] relative mt-6">
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
              className="lg:w-[550px] xs:w-[443px] w-[320px] bg-[#FFFDF4] bg-opacity-[78%] rounded border border-[#CACACA] mt-6 p-4 text-xl text-[#676767] "
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
