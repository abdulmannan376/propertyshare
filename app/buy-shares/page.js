"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNavbarTextColor } from "../redux/features/navbarSlice";
import SearchBar from "@/components/buy-shares/searchBar";
import FilterComponent from "@/components/buy-shares/filterComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
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

  const handleFetchFeaturedProperty = async () => {
    try {
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
        })}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      console.log("response: ", response);
    } catch (error) {
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

  const handleFetchMostViewedProperty = async () => {
    try {
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
        })}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      console.log("response: ", response);
    } catch (error) {
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

  const handleFetchRecentlyAddedProperty = async () => {
    try {
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
        })}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      console.log("response: ", response);
    } catch (error) {
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

  return (
    <>
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
      <div className="xl:mx-24 mx-16 relative mb-20">
        <div className="">
          <SearchBar setIsFilterUpdated={setIsFilterUpdated} />
        </div>

        <button
          type="button"
          ref={applyBtnRef}
          onClick={() => {
            setIsFilterUpdated(false);
            handleFetchFeaturedProperty();
            handleFetchMostViewedProperty();
            handleFetchRecentlyAddedProperty();
          }}
          className="absolute bg-[#116A7B] w-40 text-white transition-transform -translate-y-16 -z-50 px-3 py-2 rounded-lg "
        >
          Apply Changes
        </button>
      </div>
      ;
    </>
  );
};

export default Page;
