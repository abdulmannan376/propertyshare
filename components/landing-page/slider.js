"use client";
// Import Swiper React components and Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
// Install modules
// SwiperCore.use([Pagination]);

const SwiperComponent = () => {
  const [favourites, setFavourites] = useState([
    [
      { status: true },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
    ],
    [
      { status: true },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
    ],
    [
      { status: true },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
    ],
  ]);
  const [viewedCountList, setViewedCountList] = useState([
    [
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
    ],
    [
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
    ],
    [
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
      { viewCount: 13 },
    ],
  ]);

  const handleFavouriteList = (slideIndex, cardIndex, value) => {
    setFavourites((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails[slideIndex][cardIndex].status = value;
      return newDetails;
    });
  };
  return (
    <div className="swiper-container">
      {/* Swiper component */}
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: "#swiper-pagination",
          type: "bullets",
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
        }}
        style={{ width: "100%", height: "70%" }}
        className="mb-5"
      >
        {[1, 2, 3].map((slide, slideIndex) => (
          <SwiperSlide key={slide}>
            <div className="card-container">
              {[1, 2, 3, 4, 5].map((card, cardIndex) => (
                <div className="bg-white border-2 border-[#D9D9D9] rounded-xl">
                  <div className="p-2 relative">
                    <Image
                      width={1000}
                      height={1000}
                      src={"/assets/landing-page/property-image.png"}
                      className="w-[16rem] h-auto object-cover object-center rounded-md overflow-hidden"
                    />
                    <span
                      onClick={() =>
                        handleFavouriteList(
                          slideIndex,
                          cardIndex,
                          !favourites[slideIndex][cardIndex]?.status
                        )
                      }
                      className="absolute inset-y-5 left-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer"
                    >
                      {favourites[slideIndex][cardIndex]?.status ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </span>
                    <span className="absolute text-xs inset-y-5 right-0 px-5 text-white font-semibold focus:outline-none cursor-pointer">
                      {" "}
                      <VscEye className="inline-flex mb-[1px] mr-1 text-base" />
                      {viewedCountList[slideIndex][cardIndex].viewCount}{" "}
                    </span>
                  </div>
                  <div className="p-2 space-y-1">
                    <h1 className="text-xl text-[#116A7B]">Townhouse</h1>
                    <h2 className="text-sm text-[#116A7B]">
                      <strong>3</strong> bd <strong>4</strong> ba{" "}
                      <strong>2193</strong> Sqft
                    </h2>
                    <h3 className="text-sm text-gray-300">
                      <strong className="text-gray-900">18</strong> of 25 shares
                      avi.
                    </h3>
                    <h4 className="text-xl flex items-start text-[#116A7B]">
                      <FiMapPin className="inline-flex mt-1 mr-1"/> Berlin, Germany
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination */}
      <div
        id="swiper-pagination"
        className="flex flex-row justify-center "
      ></div>
    </div>
  );
};

export default SwiperComponent;
