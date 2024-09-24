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

const Page = () => {
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
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/Mgwd_3k3pOw?list=RDQMHYGSpa2FLZY" // Replace with your video URL
            title="How It Works"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
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
