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
  return (
    <div
      className="w-full h-full flex flex-row items-center justify-center bg-cover bg-center px-16 py-32"
      style={{
        backgroundImage: "url('/assets/landing-page/section-contactus.png')",
      }}
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      <div className="xxl:w-[35vw] lg:w-[45vw] md:w-[65vw] bg-white py-14 px-7 rounded-3xl">
        <h1 className="text-4xl text-center text-[#116A7B] font-medium">
          Contact Us!
        </h1>
        <h2 className="text-center text-2xl text-[#116A7B]">
          <i>
            Feel free to contact us for any questions or queries. Our
            representatives will get in touch with you.{" "}
          </i>
        </h2>
        <form className="pt-16 pb-10 px-5 space-y-10">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={name}
              required={true}
              onChange={({ target }) => setName(target.value)}
              placeholder="Name"
              className="w-full bg-transparent border border-[#116A7B] placeholder:text-gray-500 text-2xl placeholder:text-2xl outline-none px-10 py-5 rounded-full"
            />
            <span className="absolute inset-y-6 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
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
              className="w-full bg-transparent border border-[#116A7B] placeholder:text-gray-500 text-2xl placeholder:text-2xl outline-none px-10 py-5 rounded-full"
            />
            <span className="absolute inset-y-6 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
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
            className="w-full bg-transparent border border-[#116A7B] placeholder:text-gray-500 text-2xl placeholder:text-2xl outline-none resize-none px-10 py-5 rounded-3xl"
          />
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
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
