"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "../redux/features/navbarSlice";
import Image from "next/image";

const SectionOne = () => {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center bg-[#116A7B] px-24 py-10">
      <div className="w-1/3 flex items-center justify-end pr-10">
        <Image
          width={1000}
          height={2000}
          src={"/assets/about-us/section-1-1.jpg"}
          className="w-[526px] h-[617px] border-4 border-white object-cover object-center rounded-3xl overflow-hidden"
        />
      </div>
      <div className="w-1/3 pr-10 space-y-5">
        <h1 className="text-6xl font-bold text-white uppercase">Our Story</h1>
        <p className="text-xl font-normal text-white leading-10">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, Lorem
          Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting.
        </p>
      </div>
    </div>
  );
};

const SectionTwo = () => {
  return (
    <div
      className="w-full h-screen flex flex-row items-center justify-center p-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/about-us/section-2-bg.jpg')" }}
    >
      <div className="w-2/3 bg-white border-4 border-[#116A7B] rounded-3xl space-y-10 p-20">
        <h1 className="text-[#116A7B] text-4xl text-center font-semibold uppercase">
          What we do
        </h1>
        <p className="text-xl font-normal leading-10">
          Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, Lorem
          Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting.
        </p>
      </div>
    </div>
  );
};

const SectionThree = () => {
  return (
    <div className="w-full h-full bg-[#116A7B] py-10">
      <h1 className="text-4xl text-white text-center font-semibold uppercase">
        our leadership
      </h1>
      <div className="w-full h-screen flex flex-row items-center justify-center bg-[#116A7B] px-24 py-10">
        <div className="w-1/3 flex items-center justify-end pr-10">
          <Image
            width={1000}
            height={2000}
            src={"/assets/about-us/section-3-1.png"}
            className="w-[526px] h-[617px] border-4 border-white object-cover object-center rounded-3xl overflow-hidden"
          />
        </div>
        <div className="w-1/3 pr-10 space-y-5">
          <h1 className="text-6xl font-bold text-white uppercase">John Doe</h1>
          <p className="text-xl font-normal text-white leading-10">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, Lorem
            Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
      </div>
      <div className="w-full h-screen flex flex-row items-center justify-center bg-white px-24 py-10">
        <div className="w-1/3 pr-10 space-y-5">
          <h1 className="text-6xl font-bold text-[#116A7B] uppercase">
            Jane Doe
          </h1>
          <p className="text-xl font-normal text-[#116A7B] leading-10">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, Lorem
            Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
        <div className="w-1/3 flex items-center justify-end pr-10">
          <Image
            width={1000}
            height={2000}
            src={"/assets/about-us/section-3-2.png"}
            className="w-[526px] h-[617px] border-4 border-white object-cover object-center rounded-3xl overflow-hidden"
          />
        </div>
      </div>
      <div className="w-full h-screen flex flex-row items-center justify-center bg-[#116A7B] px-24 py-10">
        <div className="w-1/3 flex items-center justify-end pr-10">
          <Image
            width={1000}
            height={2000}
            src={"/assets/about-us/section-3-1.png"}
            className="w-[526px] h-[617px] border-4 border-white object-cover object-center rounded-3xl overflow-hidden"
          />
        </div>
        <div className="w-1/3 pr-10 space-y-5">
          <h1 className="text-6xl font-bold text-white uppercase">John Doe</h1>
          <p className="text-xl font-normal text-white leading-10">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, Lorem
            Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
      </div>
    </div>
  );
};

const SectionFour = () => {
  return (
    <div className="w-full h-[50vh] bg-white px-24 py-10">
      <h1 className="text-4xl text-[#116A7B] text-center font-semibold uppercase">
        our investors
      </h1>
    </div>
  )
}
const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(updateNavbarLogo("/white-icon-bbh.png"));
    dispatch(updateBgColor("bg-[#116A7B]"));
    dispatch(updateNotificationIconColor("text-white"));
    dispatch(
      updateCurrentPageValue({
        tag: "About",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
  }, []);
  return (
    <div>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour/>
    </div>
  );
};

export default Page;
