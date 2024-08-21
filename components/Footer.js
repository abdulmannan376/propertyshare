"use client"
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentPage = useSelector(
    (state) => state.navbarSliceReducer.currentPage
  );
  return (
    <div className={`bg-[#116A7B] w-full ${currentPage.tag === "Messages"? "hidden": "flex"} flex-row items-start justify-between xxl:px-24 xl:px-16 lg:px-10 sm:px-5 py-32`}>
      <div className="w-1/2">
        <Image
          width={1000}
          height={1000}
          src={"/logo-bbh.png"}
          className="w-[420px] h-[350px] object-contain object-center"
          alt="Footer-logo"
        />
      </div>
      <div className="w-1/2">
        
      </div>
    </div>
  );
};

export default Footer;
