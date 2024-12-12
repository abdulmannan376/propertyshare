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
    width: "15px",
    height: "15px",
  };
  return (
    <>
      <div
        className={`bg-[#116A7B] text-white text-center w-full ${
          currentPage.tag === "Messages" ? "hidden" : "flex"
        } flex-row items-center justify-center xxl:px-24 xl:px-16 lg:px-10 sm:px-5 border-y-[1px] border-white`}
      >
        <h1 className="text-center uppercase lg:text-xl text-base font-semibold lg:p-5 p-3">
          Come, explore, own, and stay!
        </h1>
      </div>
      <div
        className={`bg-[#116A7B] w-full ${
          currentPage.tag === "Messages" ? "hidden" : "flex"
        } md:flex-row flex-col md:items-start items-center justify-between xxl:px-24 xl:px-16 lg:px-10 sm:px-5 pt-5`}
      >
        <div className="lg:w-1/2 w-1/3">
          <Image
            width={1000}
            height={1000}
            src={"/logo-bbh-transparent-bg.png"}
            className="lg:w-[320px] lg:h-[250px] w-[220px] h-[150px] object-contain object-center"
            alt="Footer-logo"
          />
        </div>
        <div className="lg:w-1/2 md:w-1/2 w-full my-5 md:px-0 sm:px-20 xs:px-5 px-0">
          <div className="grid lg:grid-cols-4 lg:grid-rows-1 grid-rows-2 grid-cols-2 gap-5 items-start justify-start">
            <div className="md:ml-0 sm:ml-20 xs:ml-10 ml-5">
              <h1 className="lg:text-xl text-base font-semibold text-white uppercase">
                Connect
              </h1>
              <ul className="space-y-1 mt-1 text-xs">
                <li className=" font-normal text-white">
                  <Link href={"/map"}>Map</Link>
                </li>
                <li className=" font-normal text-white">
                  <Link href={"/buy-shares"}>Buy Share</Link>
                </li>
                <li className=" font-normal text-white">
                  <Link href={"/rent-shares"}>Rent Share</Link>
                </li>
                <li className=" font-normal text-white">
                  <Link href={"/login"}>Login</Link>
                </li>
              </ul>
            </div>
            <div className="md:ml-0 sm:ml-20 xs:ml-10 ml-5">
              <h1 className="lg:text-xl text-base font-semibold text-white uppercase">
                Company
              </h1>
              <ul className="space-y-1 mt-1 text-xs">
                <li className="font-normal text-white">
                  <Link href={"/aboutus"}>About Us</Link>
                </li>
                <li className="font-normal text-white">
                  <Link href={"/faqs"}>FAQs</Link>
                </li>
                <li className="font-normal text-white">
                  <Link href={"/how-it-works"}>How It Works</Link>
                </li>
                <li className="font-normal text-white">
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="md:ml-0 sm:ml-20 xs:ml-10 ml-5">
              <h1 className="lg:text-xl text-base font-semibold text-white uppercase">
                Follow Us
              </h1>
              <ul className="space-y-1 mt-2 text-xs">
                <li className="font-normal text-white">
                  <SocialIcon
                    url={"https://facebook.com"}
                    fgColor="#116A7B"
                    bgColor="#fff"
                    style={socialIconStyles}
                  />
                </li>
                <li className="font-normal text-white">
                  <div className="flex items-center space-x-2">
                    <SocialIcon
                      url={
                        "https://www.instagram.com/beachbunnyhouseofficial?igsh=b2oxZnRxbjRpaTdo"
                      }
                      fgColor="#116A7B"
                      bgColor="#fff"
                      style={socialIconStyles}
                      target="blank"
                    />
                    <Link
                      href={
                        "https://www.instagram.com/beachbunnyhouseofficial?igsh=b2oxZnRxbjRpaTdo"
                      }
                      target="blank"
                    >
                      beachbunnyhouseofficial
                    </Link>
                  </div>
                </li>
                <li className="font-normal text-white">
                  <div className="flex items-center space-x-2">
                    <SocialIcon
                      url={
                        "https://x.com/beachbunnyhouse"
                      }
                      fgColor="#116A7B"
                      bgColor="#fff"
                      style={socialIconStyles}
                      target="blank"
                    />
                    <Link
                      href={
                        "https://x.com/beachbunnyhouse"
                      }
                      target="blank"
                    >
                      Beachbunnyhouse
                    </Link>
                  </div>
                </li>
                <li className="font-normal text-white">
                  <div className="flex items-center space-x-2">
                    <SocialIcon
                      url={"http://www.youtube.com/@Beachbunnyhouse"}
                      fgColor="#116A7B"
                      bgColor="#fff"
                      style={socialIconStyles}
                      target="blank"
                    />
                    <Link
                      href={"http://www.youtube.com/@Beachbunnyhouse"}
                      target="blank"
                    >
                      Beachbunnyhouse
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:ml-0 sm:ml-20 xs:ml-10 ml-5 space-y-1">
              <h1 className="lg:text-xl text-base font-semibold text-white uppercase">
                Contact
              </h1>
              <h1 className="lg:text-sm text-xs text-white">
                <IoPinSharp className="inline-flex text-lg mb-1" />
                office number, street number, state, city
              </h1>
              <h1 className="lg:text-sm text-xs text-white">
                <MdOutlinePhoneIphone className="inline-flex text-lg mb-1" />
                +49 (176) 238 757 17
              </h1>
              {/* <h1 className="text-white">
              <IoPinSharp className="inline-flex text-xl mb-1" />
              office number, street number, state, city
            </h1> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-[#116A7B] text-white text-center w-full ${
          currentPage.tag === "Messages" ? "hidden" : "flex"
        } flex-row items-center justify-center xxl:px-24 xl:px-16 lg:px-10 sm:px-5 pb-2`}
      >
        <h1 className="text-center">
          &copy; Copyright Beach Bunny House. All rights reserved.
        </h1>
      </div>
    </>
  );
};

export default Footer;
