"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNavbarTextColor } from "../redux/features/navbarSlice";
import SearchBar from "@/components/buy-shares/searchBar";
import FilterComponent from "@/components/buy-shares/filterComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { VscEye } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import compCities from "countrycitystatejson";
import Link from "next/link";

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

  const handleFetchRecentlyAddedProperty = async () => {
    try {
      setIsRecentlyAddedLoading(true);
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
      if (response.success) {
        setIsRecentlyAddedLoading(false);
        setRecentlyAddedProperties(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsRecentlyAddedLoading(false);
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

  useEffect(() => {
    handleFetchFeaturedProperty();
    handleFetchMostViewedProperty();
    handleFetchRecentlyAddedProperty();
  }, []);

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
      {featuredProperties.length > 0 && (
        <div className="my-10 ">
          <h1 className="xl:text-[40px] text-4xl mb-5 text-center text-[#116A7B] font-semibold ">
            Featured Properties
          </h1>
          {!isFeaturedPropertyLoading ? (
            <div className="xl:mx-24 mx-16 flex flex-row flex-wrap space-x-20">
              {featuredProperties.map((card, cardIndex) => (
                <Link
                  href={`/buy-shares/property?id=${card.propertyID}&slug=${card.slug}`}
                  key={cardIndex}
                  className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl"
                >
                  <div className="p-2 relative">
                    <Image
                      width={1000}
                      height={1000}
                      src={
                        card.imageCount > 0
                          ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${card.propertyID}/image-1.png`
                          : "/assets/user/property-management/no-image.jpg"
                      }
                      className="w-[20rem] h-auto object-cover object-center rounded-md overflow-hidden"
                      // alt={`${}`}
                    />
                    <span
                      // onClick={() =>
                      //   handleFavouriteList(
                      //     slideIndex,
                      //     cardIndex,
                      //     !favourites[slideIndex][cardIndex]?.status
                      //   )
                      // }
                      className="absolute inset-y-5 left-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer"
                    >
                      {/* {favourites[slideIndex][cardIndex]?.status ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )} */}
                    </span>
                    <span className="absolute text-xs inset-y-5 right-0 px-5 text-[#116A7B] font-semibold focus:outline-none cursor-pointer">
                      {" "}
                      <VscEye className="inline-flex mb-[1px] mr-1 text-base" />
                      {card.viewedCount}{" "}
                    </span>
                  </div>
                  <div className="p-2 space-y-1">
                    <h1 className="text-xl text-[#116A7B]">
                      {card.propertyType}
                    </h1>
                    <h2 className="text-sm text-[#116A7B]">
                      <strong>
                        {card?.amenities?.roomDetails?.inputs?.beds
                          ? card?.amenities?.roomDetails?.inputs?.beds
                          : "-"}
                      </strong>{" "}
                      bd{" "}
                      <strong>
                        {card?.amenities?.roomDetails?.inputs?.baths
                          ? card?.amenities?.roomDetails?.inputs?.baths
                          : "-"}
                      </strong>{" "}
                      ba <strong>{card.area}</strong> Sqft
                    </h2>
                    <h3 className="text-sm text-gray-300">
                      <strong className="text-gray-900">
                        {card.totalStakes - card.stakesOccupied}
                      </strong>{" "}
                      of {card.totalStakes} shares avi.
                    </h3>
                    <h4 className="text-xl flex items-start text-[#116A7B]">
                      <FiMapPin className="inline-flex mt-1 mr-1" />{" "}
                      {card.addressOfProperty.state},{" "}
                      {
                        compCities.getCountryByShort(
                          card.addressOfProperty.country
                        ).name
                      }
                    </h4>
                  </div>
                </Link>
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
            <div className="xl:mx-24 mx-16 flex flex-row flex-wrap space-x-20">
              {mostViewedProperties.map((card, cardIndex) => (
                <Link
                  href={`/buy-shares/property?id=${card.propertyID}&slug=${card.slug}`}
                  key={cardIndex}
                  className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl"
                >
                  <div className="p-2 relative">
                    <Image
                      width={1000}
                      height={1000}
                      src={
                        card.imageCount > 0
                          ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${card.propertyID}/image-0.png`
                          : "/assets/user/property-management/no-image.jpg"
                      }
                      className="w-[20rem] h-auto object-cover object-center rounded-md overflow-hidden"
                      // alt={`${}`}
                    />
                    <span
                      // onClick={() =>
                      //   handleFavouriteList(
                      //     slideIndex,
                      //     cardIndex,
                      //     !favourites[slideIndex][cardIndex]?.status
                      //   )
                      // }
                      className="absolute inset-y-5 left-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer"
                    >
                      {/* {favourites[slideIndex][cardIndex]?.status ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )} */}
                    </span>
                    <span className="absolute text-xs inset-y-5 right-0 px-5 text-[#116A7B] font-semibold focus:outline-none cursor-pointer">
                      {" "}
                      <VscEye className="inline-flex mb-[1px] mr-1 text-base" />
                      {card.viewedCount}{" "}
                    </span>
                  </div>
                  <div className="p-2 space-y-1">
                    <h1 className="text-xl text-[#116A7B]">
                      {card.propertyType}
                    </h1>
                    <h2 className="text-sm text-[#116A7B]">
                      <strong>
                        {card?.amenities?.roomDetails?.inputs?.beds
                          ? card?.amenities?.roomDetails?.inputs?.beds
                          : "-"}
                      </strong>{" "}
                      bd{" "}
                      <strong>
                        {card?.amenities?.roomDetails?.inputs?.baths
                          ? card?.amenities?.roomDetails?.inputs?.baths
                          : "-"}
                      </strong>{" "}
                      ba <strong>{card.area}</strong> Sqft
                    </h2>
                    <h3 className="text-sm text-gray-300">
                      <strong className="text-gray-900">
                        {card.totalStakes - card.stakesOccupied}
                      </strong>{" "}
                      of {card.totalStakes} shares avi.
                    </h3>
                    <h4 className="text-xl flex items-start text-[#116A7B]">
                      <FiMapPin className="inline-flex mt-1 mr-1" />{" "}
                      {card.addressOfProperty.state},{" "}
                      {
                        compCities.getCountryByShort(
                          card.addressOfProperty.country
                        ).name
                      }
                    </h4>
                  </div>
                </Link>
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
            <div className="xl:mx-24 mx-16 flex flex-row flex-wrap space-x-20">
              {recentlyAddedProperties.map((card, cardIndex) => (
                <Link
                  href={`/buy-shares/property?id=${card.propertyID}&slug=${card.slug}`}
                  key={cardIndex}
                  className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl"
                >
                  <div className="p-2 relative">
                    <Image
                      width={1000}
                      height={1000}
                      src={
                        card.imageCount > 0
                          ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${card.propertyID}/image-0.png`
                          : "/assets/user/property-management/no-image.jpg"
                      }
                      className="w-[20rem] h-auto object-cover object-center rounded-md overflow-hidden"
                      // alt={`${}`}
                    />
                    <span
                      // onClick={() =>
                      //   handleFavouriteList(
                      //     slideIndex,
                      //     cardIndex,
                      //     !favourites[slideIndex][cardIndex]?.status
                      //   )
                      // }
                      className="absolute inset-y-5 left-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer"
                    >
                      {/* {favourites[slideIndex][cardIndex]?.status ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )} */}
                    </span>
                    <span className="absolute text-xs inset-y-5 right-0 px-5 text-[#116A7B] font-semibold focus:outline-none cursor-pointer">
                      {" "}
                      <VscEye className="inline-flex mb-[1px] mr-1 text-base" />
                      {card.viewedCount}{" "}
                    </span>
                  </div>
                  <div className="p-2 space-y-1">
                    <h1 className="text-xl text-[#116A7B]">
                      {card.propertyType}
                    </h1>
                    <h2 className="text-sm text-[#116A7B]">
                      <strong>
                        {card?.amenities?.roomDetails?.inputs?.beds
                          ? card?.amenities?.roomDetails?.inputs?.beds
                          : "-"}
                      </strong>{" "}
                      bd{" "}
                      <strong>
                        {card?.amenities?.roomDetails?.inputs?.baths
                          ? card?.amenities?.roomDetails?.inputs?.baths
                          : "-"}
                      </strong>{" "}
                      ba <strong>{card.area}</strong> Sqft
                    </h2>
                    <h3 className="text-sm text-gray-300">
                      <strong className="text-gray-900">
                        {card.totalStakes - card.stakesOccupied}
                      </strong>{" "}
                      of {card.totalStakes} shares avi.
                    </h3>
                    <h4 className="text-xl flex items-start text-[#116A7B]">
                      <FiMapPin className="inline-flex mt-1 mr-1" />{" "}
                      {card.addressOfProperty.state},{" "}
                      {
                        compCities.getCountryByShort(
                          card.addressOfProperty.country
                        ).name
                      }
                    </h4>
                  </div>
                </Link>
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
          <div className="my-20">
            <h1 className="xl:text-[4rem] text-4xl text-center text-[#116A7B] font-semibold">
              No properties yet.
            </h1>
          </div>
        )}
    </>
  );
};

export default Page;
