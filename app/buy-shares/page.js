"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "../redux/features/navbarSlice";
import SearchBar from "@/components/buy-shares/searchBar";
import FilterComponent from "@/components/buy-shares/filterComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { VscEye } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import compCities from "countrycitystatejson";
import Link from "next/link";
import { handleAllDropdownsActivity } from "../redux/features/buyShareSlice";
import PropertyCard from "@/components/buy-shares/propertyCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { errorAlert } from "@/utils/alert";

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
        tag: "Buy Shares",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
  }, []);

  const coordinates = useSelector(
    (state) => state.buyShareSliceReducer.coordinates
  );

  const numberOfBeds = useSelector(
    (state) => state.buyShareSliceReducer.numberOfBeds
  );
  const propertyType = useSelector(
    (state) => state.buyShareSliceReducer.propertyType
  );
  const areaRange = useSelector(
    (state) => state.buyShareSliceReducer.areaRange
  );
  const priceRange = useSelector(
    (state) => state.buyShareSliceReducer.priceRange
  );

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [isFeaturedPropertyLoading, setIsFeaturedPropertyLoading] =
    useState(true);

  const [featuredPageNumber, setFeaturedPageNumber] = useState(1);
  const [totalFeaturedPages, setTotalFeaturedPages] = useState(1);
  const handleFetchFeaturedProperty = async (pageNumber) => {
    try {
      setIsFeaturedPropertyLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/property/get-featured-property/${JSON.stringify({
          coordinates: coordinates,
          propertyType: propertyType,
          beds: numberOfBeds,
          area: areaRange,
          priceRange: priceRange,
          page: pageNumber,
        })}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsFeaturedPropertyLoading(false);
        setFeaturedProperties(response.body);
        setFeaturedPageNumber(response.page);
        setTotalFeaturedPages(response.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsFeaturedPropertyLoading(false);

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

  const [mostViewedProperties, setMostViewedProperties] = useState([]);
  const [isMostViewedLoading, setIsMostViewedLoading] = useState(true);

  const [mostViewedPageNumber, setMostViewedPageNumber] = useState(1);
  const [totalMostViewedPages, setTotalMostViewedPages] = useState(1);

  const handleFetchMostViewedProperty = async (pageNumber) => {
    try {
      setIsMostViewedLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/property/get-most-viewed-property/${JSON.stringify({
          coordinates: coordinates,
          propertyType: propertyType,
          beds: numberOfBeds,
          area: areaRange,
          priceRange: priceRange,
          page: pageNumber,
        })}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsMostViewedLoading(false);
        setMostViewedProperties(response.body);
        setMostViewedPageNumber(response.page);
        setTotalMostViewedPages(response.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsMostViewedLoading(false);
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

  const [recentlyAddedProperties, setRecentlyAddedProperties] = useState([]);
  const [isRecentlyAddedLoading, setIsRecentlyAddedLoading] = useState(true);

  const [recentlyAddedPageNumber, setRecentlyAddedPageNumber] = useState(1);
  const [totalRecentlyAddedPages, setTotalRecentlyAddedPages] = useState(1);

  const handleFetchRecentlyAddedProperty = async (pageNumber) => {
    try {
      setIsRecentlyAddedLoading(true);
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/property/get-recently-added-property/${JSON.stringify({
          coordinates: coordinates,
          propertyType: propertyType,
          beds: numberOfBeds,
          area: areaRange,
          priceRange: priceRange,
          page: pageNumber,
        })}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsRecentlyAddedLoading(false);
        setRecentlyAddedProperties(response.body);
        setRecentlyAddedPageNumber(response.page);
        setTotalRecentlyAddedPages(response.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsRecentlyAddedLoading(false);
      errorAlert("Error", error.message)
    }
  };

  const [isFilterUpdated, setIsFilterUpdated] = useState(false);

  const applyBtnRef = useRef();
  useEffect(() => {
    console.log("in page useEffect");
    if (!isFilterUpdated) {
      applyBtnRef.current.classList.remove("-translate-y-0");
      applyBtnRef.current.classList.remove("z-0");
      applyBtnRef.current.classList.add("-translate-y-16");
      applyBtnRef.current.classList.add("-z-50");
    } else {
      applyBtnRef.current.classList.remove("-translate-y-16");
      applyBtnRef.current.classList.remove("-z-50");
      applyBtnRef.current.classList.add("-translate-y-0");
      applyBtnRef.current.classList.add("z-0");
    }
  }, [isFilterUpdated]);

  useEffect(() => {
    handleFetchFeaturedProperty(1);
    handleFetchMostViewedProperty(1);
    handleFetchRecentlyAddedProperty(1);
  }, []);

  const TruncatingH1 = ({ text }) => {
    const h1Ref = useRef(null);
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
      const checkAndTruncateText = () => {
        const current = h1Ref.current;
        if (!current) return;

        // Reset the display text to the original text first
        setDisplayText(text);

        // Using a timeout to allow the browser to render and calculate sizes
        setTimeout(() => {
          const lineHeight = parseInt(
            window.getComputedStyle(current).lineHeight
          );
          const height = current.clientHeight;

          if (height > lineHeight) {
            // Content is more than one line
            let truncatedText = text;
            while (
              current.clientHeight > lineHeight &&
              truncatedText.length > 0
            ) {
              truncatedText = truncatedText.slice(0, -1);
              current.innerText = truncatedText + "...";
            }
          }
        }, 0);
      };

      checkAndTruncateText();

      // Optional: Re-run when the text changes
      // window.addEventListener('resize', checkAndTruncateText); // To handle resizing for responsive designs

      // Cleanup the effect
      return () => {
        // window.removeEventListener('resize', checkAndTruncateText);
      };
    }, [text]); // Dependency array ensures effect runs only if text changes

    return (
      <h1
        ref={h1Ref}
        style={{ lineHeight: "1.5em", overflow: "hidden" }}
        className="text-xl text-[#116A7B]"
      >
        {displayText}
      </h1>
    );
  };

  const showAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "This is a success alert with SweetAlert2.",
      icon: "warning",
      timer: 2000, // Auto-close after 2 seconds (2000 milliseconds)
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
        popup: "bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4",
      },
      showConfirmButton: false,
      buttonsStyling: false, // To apply TailwindCSS classes
      toast: true,
    });
  };

  return (
    <div
      onClick={() => {
        dispatch(handleAllDropdownsActivity(false));
        dispatch(updateDropdrownStatus({ field: "close all" }));
      }}
    >
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
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="xxl:mx-24 xl:mx-16 lg:mx-10 sm:mx-5  relative mb-20">
        <div className="">
          <SearchBar setIsFilterUpdated={setIsFilterUpdated} />
        </div>

        <button
          type="button"
          ref={applyBtnRef}
          onClick={() => {
            setIsFilterUpdated(false);
            handleFetchFeaturedProperty(1);
            handleFetchMostViewedProperty(1);
            handleFetchRecentlyAddedProperty(1);
            // showAlert()
          }}
          className="absolute bg-[#116A7B] w-40 text-white transition-transform -translate-y-16 -z-50 px-3 py-2 rounded-lg "
        >
          Apply Changes
        </button>
      </div>
      {featuredProperties.length > 0 && (
        <div className="my-10 ">
          <h1 className="xl:text-[40px] text-4xl mb-5 text-center text-[#116A7B] font-semibold ">
            Featured Properties
          </h1>
          {!isFeaturedPropertyLoading ? (
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 sm:mx-5 flex flex-row flex-wrap items-center justify-center ">
              {featuredProperties.map((card, cardIndex) => (
                <PropertyCard card={card} key={cardIndex} />
              ))}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          <div className="mt-10 flex flex-row items-center justify-center">
            <button
              type="button"
              disabled={featuredPageNumber <= totalFeaturedPages}
              onClick={() =>
                handleFetchFeaturedProperty(featuredPageNumber - 1)
              }
              className="bg-[#116A7B] rounded-full mx-5 disabled:bg-opacity-30"
            >
              <FaArrowLeft className="text-white m-1" />
            </button>
            <h2 className="text-center">
              {featuredPageNumber} of {totalFeaturedPages}
            </h2>
            <button
              type="button"
              disabled={featuredPageNumber >= totalFeaturedPages}
              onClick={() =>
                handleFetchFeaturedProperty(featuredPageNumber + 1)
              }
              className="bg-[#116A7B] rounded-full mx-5 disabled:bg-opacity-30"
            >
              <FaArrowRight className="text-white m-1" />
            </button>
          </div>
        </div>
      )}
      {mostViewedProperties.length > 0 && (
        <div className="py-10 bg-[#116A7B]">
          <h1 className="xl:text-[40px] text-4xl mb-16 text-center text-white font-semibold ">
            Most Viewed Properties
          </h1>
          {!isMostViewedLoading ? (
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 flex flex-row flex-wrap items-center justify-center ">
              {mostViewedProperties.map((card, cardIndex) => (
                <PropertyCard card={card} key={cardIndex} />
              ))}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          <div className="mt-10 flex flex-row items-center justify-center">
            <button
              type="button"
              disabled={mostViewedPageNumber <= totalMostViewedPages}
              onClick={() =>
                handleFetchMostViewedProperty(mostViewedPageNumber - 1)
              }
              className="bg-white rounded-full mx-5 disabled:bg-opacity-30"
            >
              <FaArrowLeft className="text-[#116A7B] m-1" />
            </button>
            <h2 className="text-center text-white">
              {mostViewedPageNumber} of {totalMostViewedPages}
            </h2>
            <button
              type="button"
              disabled={mostViewedPageNumber >= totalMostViewedPages}
              onClick={() =>
                handleFetchMostViewedProperty(mostViewedPageNumber + 1)
              }
              className="bg-white rounded-full mx-5 disabled:bg-opacity-30"
            >
              <FaArrowRight className="text-[#116A7B] m-1" />
            </button>
          </div>
        </div>
      )}
      {recentlyAddedProperties.length > 0 && (
        <div className="my-10 ">
          <h1 className="xl:text-[40px] text-4xl mb-16 text-center text-[#116A7B] font-semibold ">
            Recently Added Properties
          </h1>
          {!isRecentlyAddedLoading ? (
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 flex flex-row flex-wrap items-center justify-center ">
              {recentlyAddedProperties.map((card, cardIndex) => (
                <PropertyCard card={card} key={cardIndex} />
              ))}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          <div className="mt-10 flex flex-row items-center justify-center">
            <button
              type="button"
              disabled={recentlyAddedPageNumber <= totalRecentlyAddedPages}
              onClick={() =>
                handleFetchRecentlyAddedProperty(recentlyAddedPageNumber - 1)
              }
              className="bg-[#116A7B] rounded-full mx-5 disabled:bg-opacity-30"
            >
              <FaArrowLeft className="text-white m-1" />
            </button>
            <h2 className="text-center">
              {recentlyAddedPageNumber} of {totalRecentlyAddedPages}
            </h2>
            <button
              type="button"
              disabled={recentlyAddedPageNumber >= totalRecentlyAddedPages}
              onClick={() =>
                handleFetchRecentlyAddedProperty(recentlyAddedPageNumber + 1)
              }
              className="bg-[#116A7B] rounded-full mx-5 disabled:bg-opacity-30"
            >
              <FaArrowRight className="text-white m-1" />
            </button>
          </div>
        </div>
      )}

      {featuredProperties.length === 0 &&
        mostViewedProperties.length === 0 &&
        recentlyAddedProperties.length === 0 && (
          <div className="my-20 h-screen">
            <h1 className="xl:text-[4rem] text-4xl text-center text-[#116A7B] font-semibold">
              No properties yet.
            </h1>
          </div>
        )}
    </div>
  );
};

export default Page;
