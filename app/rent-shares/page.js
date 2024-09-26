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
import { ToastContainer, toast } from "react-toastify";
import PropertyCard from "@/components/rent-shares/propertyCard";
import SearchBar from "@/components/buy-shares/searchBar";
import { handleAllDropdownsActivity } from "../redux/features/buyShareSlice";
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
        tag: "Rent Shares",
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

  const handleFetchFeaturedProperty = async () => {
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
          page: 1,
          category: "rent",
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
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsFeaturedPropertyLoading(false);

      errorAlert("Error", error.message);
    }
  };

  const [mostViewedProperties, setMostViewedProperties] = useState([]);
  const [isMostViewedLoading, setIsMostViewedLoading] = useState(true);

  const handleFetchMostViewedProperty = async () => {
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
          page: 1,
          category: "rent",
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
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsMostViewedLoading(false);
      errorAlert("Error", error.message);
    }
  };

  const [recentlyAddedProperties, setRecentlyAddedProperties] = useState([]);
  const [isRecentlyAddedLoading, setIsRecentlyAddedLoading] = useState(true);

  const handleFetchRecentlyAddedProperty = async () => {
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
          page: 1,
          category: "rent",
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
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsRecentlyAddedLoading(false);
      errorAlert("Error", error.message);
    }
  };

  const [isFilterUpdated, setIsFilterUpdated] = useState(false);

  const applyBtnRef = useRef();
  const applyBtnInMobRef = useRef();
  useEffect(() => {
    if (!isFilterUpdated) {
      applyBtnRef.current.classList.remove("-translate-y-0");
      applyBtnRef.current.classList.remove("z-0");
      applyBtnRef.current.classList.add("-translate-y-16");
      applyBtnRef.current.classList.add("-z-50");

      applyBtnInMobRef.current.classList.remove("translate-y-3");
      applyBtnInMobRef.current.classList.remove("z-0");
      applyBtnInMobRef.current.classList.add("-translate-y-28");
      applyBtnInMobRef.current.classList.add("-z-50");
    } else {
      applyBtnRef.current.classList.remove("-translate-y-16");
      applyBtnRef.current.classList.remove("-z-50");
      applyBtnRef.current.classList.add("-translate-y-0");
      applyBtnRef.current.classList.add("z-0");

      applyBtnInMobRef.current.classList.remove("-translate-y-28");
      applyBtnInMobRef.current.classList.remove("-z-50");
      applyBtnInMobRef.current.classList.add("translate-y-3");
      applyBtnInMobRef.current.classList.add("z-0");
    }
  }, [isFilterUpdated]);

  useEffect(() => {
    handleFetchFeaturedProperty();
    handleFetchMostViewedProperty();
    handleFetchRecentlyAddedProperty();
  }, []);
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
      <div className="xxl:mx-24 xl:mx-16 lg:mx-10 mx-5 relative mb-20">
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
          className="absolute bg-[#116A7B] w-40 text-white sm:block hidden transition-transform -translate-y-16 -z-50 px-3 py-2 rounded-lg "
        >
          Apply Changes
        </button>

        <button
          type="button"
          ref={applyBtnInMobRef}
          onClick={() => {
            setIsFilterUpdated(false);
            handleFetchFeaturedProperty(1);
            handleFetchMostViewedProperty(1);
            handleFetchRecentlyAddedProperty(1);
            // showAlert()
          }}
          className="absolute bg-[#116A7B] w-40 text-white sm:hidden block transition-transform -translate-y-28 -z-50 px-3 py-2 rounded-lg "
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
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 sm:mx-5 flex flex-row flex-wrap items-center justify-center">
              {featuredProperties.map((card, cardIndex) => (
                <PropertyCard card={card} key={cardIndex} />
              ))}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </div>
      )}
      {mostViewedProperties.length > 0 && (
        <div className="py-10 bg-[#116A7B]">
          <h1 className="xl:text-[40px] text-4xl mb-16 text-center text-white font-semibold ">
            Most Viewed Properties
          </h1>
          {!isMostViewedLoading ? (
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 sm:mx-5 flex flex-row flex-wrap items-center justify-center">
              {mostViewedProperties.map((card, cardIndex) => (
                <PropertyCard card={card} key={cardIndex} />
              ))}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </div>
      )}
      {recentlyAddedProperties.length > 0 && (
        <div className="my-10 ">
          <h1 className="xl:text-[40px] text-4xl mb-16 text-center text-[#116A7B] font-semibold ">
            Recently Added Properties
          </h1>
          {!isRecentlyAddedLoading ? (
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 sm:mx-5 flex flex-row flex-wrap items-center justify-center">
              {recentlyAddedProperties.map((card, cardIndex) => (
                <PropertyCard card={card} key={cardIndex} />
              ))}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
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
