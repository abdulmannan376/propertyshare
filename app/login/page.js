"use client";
import FloatingLabelInput from "@/components/FloatingInputButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBgColor, updateNavbarTextColor } from "../redux/features/navbarSlice";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(updateBgColor("bg-transparent"));
  }, []);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        username: username,
        password: password,
        rememberMe: rememberMe,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/user-login`,
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

        localStorage.setItem("token", response.token);
        localStorage.setItem("userDetails", JSON.stringify(response.body));
        setTimeout(() => {
          router.push("/");
        }, 5100);
      } else {
        throw new Error(response.message);
      }
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
            src={"/logo-bbh.png"}
            alt="Logo"
            className="w-auto h-24 object-contain object-center"
          />
        </div>
        <form
          onSubmit={handleSubmission}
          className="w-full flex flex-col items-center justify-center"
        >
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
          <div className="lg:w-[550px] md:w-[443px] relative mt-6">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              value={rememberMe}
              onChange={({ target }) => {
                setRememberMe(target.checked);
              }}
              className="inline-flex bg-transparent rounded border border-[#CACACA] text-xl outline-none text-[#676767] pt-1 pb-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <label
              htmlFor="rememberMe"
              className="leading-7 px-3 absolute -translate-y-1 text-white font-semibold duration-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="lg:w-[550px] md:w-[443px] bg-[#FFFDF4] bg-opacity-[78%] rounded border border-[#CACACA] mt-6 p-4 text-xl text-[#676767] "
          >
            {" "}
            {!isLoading && `Login`}
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
              Do not have an account?{" "}
              <Link href={"/signup"} className="underline">
                {" "}
                Sign Up
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
