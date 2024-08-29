"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { SocialIcon } from "react-social-icons";
import { IoPinSharp } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";

const Footer = () => {
  const currentPage = useSelector(
    (state) => state.navbarSliceReducer.currentPage
  );

  const socialIconStyles = {
    width: "30px",
    height: "30px",
  };
  return (
    <>
      <div
        className={`bg-[#116A7B] w-full ${
          currentPage.tag === "Messages" ? "hidden" : "flex"
        } flex-row items-start justify-between xxl:px-24 xl:px-16 lg:px-10 sm:px-5 py-20`}
      >
        <div className="w-1/2">
          <Image
            width={1000}
            height={1000}
            src={"/logo-bbh-transparent-bg.png"}
            className="w-[320px] h-[250px] object-contain object-center"
            alt="Footer-logo"
          />
        </div>
        <div className="w-1/2">
          <div className=" flex flex-row items-start justify-start space-x-20">
            <div>
              <h1 className="text-2xl font-semibold text-white uppercase">
                Connect
              </h1>
              <ul className="space-y-4 mt-4">
                <li className="text-lg font-normal text-white">
                  <Link href={"/map"}>Map</Link>
                </li>
                <li className="text-lg font-normal text-white">
                  <Link href={"/buy-share"}>Buy Share</Link>
                </li>
                <li className="text-lg font-normal text-white">
                  <Link href={"/rent-share"}>Rent Share</Link>
                </li>
                <li className="text-lg font-normal text-white">
                  <Link href={"/login"}>Login</Link>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white uppercase">
                Company
              </h1>
              <ul className="space-y-4 mt-4">
                <li className="text-lg font-normal text-white">
                  <Link href={"/about-us"}>About Us</Link>
                </li>
                <li className="text-lg font-normal text-white">
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white uppercase">
                Follow Us
              </h1>
              <ul className="space-y-4 mt-4">
                <li className="text-lg font-normal text-white">
                  <SocialIcon
                    url={"https://facebook.com"}
                    fgColor="#116A7B"
                    bgColor="#fff"
                    style={socialIconStyles}
                  />
                </li>
                <li className="text-lg font-normal text-white">
                  <SocialIcon
                    url={"https://instagram.com"}
                    fgColor="#116A7B"
                    bgColor="#fff"
                    style={socialIconStyles}
                  />
                </li>
                <li className="text-lg font-normal text-white">
                  <SocialIcon
                    url={"https://x.com"}
                    fgColor="#116A7B"
                    bgColor="#fff"
                    style={socialIconStyles}
                  />
                </li>
                <li className="text-lg font-normal text-white">
                  <SocialIcon
                    url={"https://youtube.com"}
                    fgColor="#116A7B"
                    bgColor="#fff"
                    style={socialIconStyles}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 space-y-2">
            <h1 className="text-white">
              <IoPinSharp className="inline-flex text-xl mb-1" />
              office number, street number, state, city
            </h1>
            <h1 className="text-white">
              <MdOutlinePhoneIphone className="inline-flex text-xl mb-1" />
              +1 (XXX) XXX XXXX
            </h1>
            {/* <h1 className="text-white">
              <IoPinSharp className="inline-flex text-xl mb-1" />
              office number, street number, state, city
            </h1> */}
          </div>
        </div>
      </div>
      <div
        className={`bg-[#116A7B] text-white text-center w-full ${
          currentPage.tag === "Messages" ? "hidden" : "flex"
        } flex-row items-center justify-center xxl:px-24 xl:px-16 lg:px-10 sm:px-5 py-2`}
      >
        <h1 className="text-center">
          &copy; Copyright Beach Bunny House. All rights reserved.
        </h1>
      </div>
    </>
  );
};

export default Footer;
