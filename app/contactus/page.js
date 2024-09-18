"use client";
import SectionContact from "@/components/landing-page/section-contactus";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "../redux/features/navbarSlice";
import { toast } from "react-toastify";
import { errorAlert, successAlert } from "@/utils/alert";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-[#116A7B]",
        hoverTextColor: "text-[#116A7B]",
      })
    );
    dispatch(updateNavbarLogo("/logo-bbh.png"));
    dispatch(updateNotificationIconColor("text-white"));
    dispatch(
      updateCurrentPageValue({
        tag: "Contact",
        bgColor: "bg-[#116A7B]",
        textColor: "text-white",
      })
    );
    dispatch(updateBgColor("bg-transparent"));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        email: email,
        message: message,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/contact-us`,
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
    <div
      className="w-full h-full flex flex-row items-center justify-center bg-cover bg-center xxl:px-24 xl:px-16 lg:px-10 sm:px-5 py-24"
      style={{
        backgroundImage: "url('/assets/landing-page/section-contactus.png')",
      }}
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      <div className="xl:w-[35vw] lg:w-[45vw] md:w-[65vw] sm:w-[85vw] w-[95vw] bg-white py-14 px-7 rounded-3xl">
        <h1 className="sm:text-4xl text-2xl text-center text-[#116A7B] font-medium">
          Contact Us!
        </h1>
        <h2 className="text-center sm:text-2xl text-base text-[#116A7B]">
          <i>
            Feel free to contact us for any questions or queries. Our
            representatives will get in touch with you.{" "}
          </i>
        </h2>
        <form onSubmit={handleSubmit} className="pt-16 pb-10 sm:px-5 px-1 space-y-10">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={name}
              required={true}
              onChange={({ target }) => setName(target.value)}
              placeholder="Name"
              className="w-full bg-transparent border border-[#116A7B] placeholder:text-gray-500 sm:text-2xl text-base sm:placeholder:text-2xl placeholder:text-base outline-none sm:px-10 px-3 sm:py-5 py-2 rounded-full"
            />
            <span className="absolute sm:inset-y-6 inset-y-3 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
              *
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="email"
              value={email}
              required={true}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Email"
              className="w-full bg-transparent border border-[#116A7B] placeholder:text-gray-500 sm:text-2xl text-base sm:placeholder:text-2xl placeholder:text-base outline-none sm:px-10 px-3 sm:py-5 py-2 rounded-full"
            />
            <span className="absolute sm:inset-y-6 inset-y-3 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
              *
            </span>
          </div>
          <textarea
            rows={4}
            name="message"
            value={message}
            required={true}
            onChange={({ target }) => setMessage(target.value)}
            placeholder="Message"
            className="w-full bg-transparent border border-[#116A7B] placeholder:text-gray-500 sm:text-2xl text-base sm:placeholder:text-2xl placeholder:text-base outline-none resize-none sm:px-10 px-3 sm:py-5 py-2 rounded-3xl"
          />
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="text-3xl text-[#116A7B] font-semibold uppercase underline px-2"
            >
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
