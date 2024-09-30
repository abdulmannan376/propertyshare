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
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";

const NextArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowRight
      className={`${className} text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full`}
      style={{
        ...style,
        display: "block",
        color: "white",
        backgroundColor: "#116A7B",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowLeft
      className={`${className} text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full`}
      style={{
        ...style,
        display: "block",
        color: "white",
        backgroundColor: "#116A7B",
      }}
      onClick={onClick}
    />
  );
};

const Page = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const dispatch = useDispatch();
  const router = useRouter(); // Using Next.js router for navigation

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
        tag: "How It Works",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
  }, []);

  const navigateToFAQs = () => {
    router.push("/faqs"); // Navigate to FAQs page
  };

  return (
    <>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="container min-h-[90vh] xxl:px-24 xl:px-16 lg:px-10 md:px-5 xs:px-3 px-1 md:my-10 my-5">
        <h1 className="text-3xl font-bold mb-5 text-center">How It Works</h1>

        {/* YouTube Video */}
        <div className="flex justify-center mb-10">
          <Slider
            {...settings}
            // modules={[Pagination, Navigation]}
            // slidesPerView={1}
            // navigation={{
            //   nextEl: ".swiper-button-next", // Define next button class
            //   prevEl: ".swiper-button-prev", // Define prev button class
            // }}
            // pagination={{
            //   clickable: true,
            //   el: "#swiper-pagination",
            //   type: "bullets",
            //   bulletActiveClass: "swiper-pagination-bullet-active",
            //   bulletClass: "swiper-pagination-bullet",
            // }}
            style={{ width: "800px", height: "70%" }}
            className="mb-5"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="outline-none">
                <iframe
                  width="800"
                  height="450"
                  src="https://www.youtube.com/embed/ewyIqEIU9zw" // Replace with your video URL
                  title="How It Works"
                  // frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            ))}
          </Slider>
        </div>

        {/* Navigation Button to FAQs */}
        <div className="flex justify-center">
          <button
            onClick={navigateToFAQs}
            className="bg-[#116A7B] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#0d5e6c] focus:outline-none transition duration-300"
          >
            Go to FAQs
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
