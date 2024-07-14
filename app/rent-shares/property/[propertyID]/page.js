"use client";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "@/app/redux/features/navbarSlice";
import { updateActiveRentShareNavBtn } from "@/app/redux/features/propertyPageSlice";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { IoIosPricetag, IoIosBed } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { CgMenuRound } from "react-icons/cg";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { IoCalendar } from "react-icons/io5";
import { FaStairs, FaPlane } from "react-icons/fa6";
import { TbParkingCircle, TbBath } from "react-icons/tb";
import { PiElevatorDuotone } from "react-icons/pi";
import { MdOutlineMeetingRoom } from "react-icons/md";
import compCities from "countrycitystatejson";
import GetPropertyID from "@/components/buy-shares/getPropertyID";

// Import Swiper React components and Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BuyShare from "@/components/modals/buyShare";
import BuyShareModal from "@/components/modals/buyShare";
import ThreadDisplay from "@/components/buy-shares/threadComponent";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );

    dispatch(updateNotificationIconColor("text-white"));
    dispatch(updateBgColor("bg-[#116A7B]"));
    dispatch(
      updateCurrentPageValue({
        tag: "Rent Shares",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
  }, []);

  const activeNavBtn = useSelector(
    (state) => state.propertyPageSliceReducer.navBtnRentShareActive
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // function useValidateQuery() {
  //   const searchParams = useSearchParams();
  //   if (searchParams.get("id")) {
  //     return searchParams.get("id");
  //   } else {
  //     return false;
  //   }
  // }

  const params = useParams();
  console.log("params: ", params);

  const [propertyID, setPropertyID] = useState(params.propertyID || null);
  const [property, setProperty] = useState({});
  const [propertyFetched, setPropertyFetched] = useState(false);
  const [idProvided, setIdProvided] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-property-by-id/${propertyID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        setProperty(response.body);
        setPropertyFetched(true);
      } else {
        throw new Error(response.message);
      }
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

  useEffect(() => {
    if (propertyID?.length > 0) {
      fetchData();
    }
  }, [propertyID]);

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
      <div className="w-full h-20 bg-white"></div>
      {propertyFetched && (
        <div className="xl:mx-24 mx-16 " onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}>
          <div className="my-10">
            {property.imageCount > 0 ? (
              <div className="swiper-container">
                {/* Swiper component */}
                <Swiper
                  modules={[Pagination, Navigation]}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next", // Define next button class
                    prevEl: ".swiper-button-prev", // Define prev button class
                  }}
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
                  {Array.from({ length: property.imageCount }, (_, index) => (
                    <SwiperSlide key={index}>
                      <div>
                        <Image
                          width={2000}
                          height={2000}
                          src={`http:89.22.120.46:9000/${
                            property.imageDirURL
                          }/image-${index + 1}.png`}
                          className="w-full h-[44rem] object-contain object-center"
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom navigation buttons */}
                <div className="swiper-button-prev custom-prev"></div>
                <div className="swiper-button-next custom-next"></div>
                {/* Custom pagination */}
                <div
                  id="swiper-pagination"
                  className="flex flex-row justify-center "
                ></div>
              </div>
            ) : (
              <div className="h-[44rem]">
                <Image
                  width={1000}
                  height={1000}
                  src={"/assets/user/property-management/no-image.jpg"}
                  className="w-full h-full object-scale-down object-center"
                  alt={`${property.slug}-noimage`}
                />
              </div>
            )}

            <div className="w-screen flex items-center justify-start md:space-x-20 space-x-14 my-3 text-white text-2xl font-semibold">
              <button
                onClick={() => dispatch(updateActiveRentShareNavBtn("Property Details"))}
              >
                <h1
                  className={`flex ${
                    activeNavBtn === "Property Details"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  Property Details
                </h1>
              </button>
              {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
              <button onClick={() => dispatch(updateActiveRentShareNavBtn("Rent"))}>
                <h2
                  className={`flex ${
                    activeNavBtn === "Rent"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  Rent
                </h2>
              </button>
              <button onClick={() => dispatch(updateActiveRentShareNavBtn("Sell"))}>
                <h2
                  className={`flex ${
                    activeNavBtn === "Sell"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  Sell
                </h2>
              </button>
              <button onClick={() => dispatch(updateActiveRentShareNavBtn("Swap"))}>
                <h2
                  className={`flex ${
                    activeNavBtn === "Swap"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  Swap
                </h2>
              </button>
              {/* </Link> */}
            </div>
            {activeNavBtn === "Property Details" && (
              <>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Title
                  </h1>
                  <p className="text-2xl text-[#116A7B]">{property.title}</p>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Overview
                  </h1>
                  <p className="text-2xl text-[#116A7B]">{property.detail}</p>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    General Details
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                      <IoIosPricetag className="inline-flex mx-2" />
                      <strong>Share Price:</strong>{" "}
                      <strong className="text-[#6E6E6E]">
                        $
                        {Math.round(
                          property.valueOfProperty / property.totalStakes
                        )}
                      </strong>
                      <text className="text-[#6E6E6E]">/share</text>
                    </div>
                    <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                      <IoIosPricetag className="inline-flex mx-2" />
                      <strong>Shares Sold:</strong>{" "}
                      <strong className="text-[#6E6E6E]">
                        {property?.stakesOccupied}
                      </strong>
                      <text className="text-[#6E6E6E] mr-2">
                        /{property?.totalStakes}
                      </text>
                    </div>
                    <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                      <FiMapPin className="inline-flex mx-2" />
                      <strong>location:</strong>{" "}
                      <strong className="text-[#6E6E6E]">
                        {property?.addressOfProperty?.state}
                      </strong>
                      <text className="text-[#6E6E6E] mr-2">
                        ,{" "}
                        {
                          compCities.getCountryByShort(
                            property?.addressOfProperty?.country
                          )?.name
                        }
                      </text>
                    </div>
                    <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                      <CgMenuRound className="inline-flex mx-2" />
                      <strong>Property Type:</strong>{" "}
                      <strong className="text-[#6E6E6E]">
                        {property?.propertyType}
                      </strong>
                      {/* <text className="text-[#6E6E6E] mr-2">, {compCities.getCountryByShort(property?.addressOfProperty.country).name}</text> */}
                    </div>
                    <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                      <LiaRulerCombinedSolid className="inline-flex mx-2" />
                      <strong>Area Size:</strong>{" "}
                      <strong className="text-[#6E6E6E]">
                        {property?.area}
                      </strong>
                      {/* <text className="text-[#6E6E6E] mr-2">, {compCities.getCountryByShort(property?.addressOfProperty.country).name}</text> */}
                    </div>
                  </div>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Main Features
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    {property?.amenitiesID?.mainFeatures?.inputs?.yearBuilt && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <IoCalendar className="text-xl mb-1 inline-flex mx-2" />
                        <strong>Year Built:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {
                            property?.amenitiesID?.mainFeatures?.inputs
                              ?.yearBuilt
                          }
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.mainFeatures?.inputs
                      ?.floorCount && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <FaStairs className="text-xl mb-1 inline-flex mx-2" />
                        <strong>Floor Count:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {
                            property?.amenitiesID?.mainFeatures?.inputs
                              ?.floorCount
                          }
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.mainFeatures?.inputs
                      ?.parkingSpace && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <TbParkingCircle className="inline-flex mx-2 mb-1" />
                        <strong>Parking Space:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {
                            property?.amenitiesID?.mainFeatures?.inputs
                              ?.parkingSpace
                          }
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.mainFeatures?.inputs?.elevators && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <PiElevatorDuotone className="inline-flex mx-2 mb-1" />
                        <strong>Elevators:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {
                            property?.amenitiesID?.mainFeatures?.inputs
                              ?.elevators
                          }
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.mainFeatures?.tags.map(
                      (tag, index) => {
                        const words = tag.replace(/([A-Z])/g, " $1").trim(); // Add space before each capital letter
                        const tagInString =
                          words.charAt(0).toUpperCase() + words.slice(1);
                        return (
                          <div
                            key={index}
                            className="border border-[#116A7B] text-2xl text-[#00262D] px-4 py-2 rounded-lg"
                          >
                            {/* <PiElevatorDuotone className="inline-flex mx-2 mb-1" /> */}
                            <strong>{tagInString}</strong>{" "}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Room Details
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    {property?.amenitiesID?.roomDetails?.inputs.beds && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <IoIosBed className="text-xl mb-1 inline-flex mx-2" />
                        <strong>Beds:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {property?.amenitiesID?.roomDetails?.inputs.beds}
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.roomDetails?.inputs.baths && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <TbBath className="text-xl mb-1 inline-flex mx-2" />
                        <strong>Baths:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {property?.amenitiesID?.roomDetails?.inputs.baths}
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.roomDetails?.inputs
                      .servantQuater && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <MdOutlineMeetingRoom className="inline-flex mx-2 mb-1" />
                        <strong>Servant Quater:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {
                            property?.amenitiesID?.roomDetails?.inputs
                              .servantQuater
                          }
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.roomDetails?.inputs.kitchen && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <MdOutlineMeetingRoom className="inline-flex mx-2 mb-1" />
                        <strong>Kitchen:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {property?.amenitiesID?.roomDetails?.inputs.kitchen}
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.roomDetails?.tags.map(
                      (tag, index) => {
                        const words = tag.replace(/([A-Z])/g, " $1").trim(); // Add space before each capital letter
                        const tagInString =
                          words.charAt(0).toUpperCase() + words.slice(1);
                        return (
                          <div
                            key={index}
                            className="border border-[#116A7B] text-2xl text-[#00262D] px-4 py-2 rounded-lg"
                          >
                            {/* <PiElevatorDuotone className="inline-flex mx-2 mb-1" /> */}
                            <strong>{tagInString}</strong>{" "}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Business and Communication
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    {property?.amenitiesID?.business?.tags.map((tag, index) => {
                      const words = tag.replace(/([A-Z])/g, " $1").trim(); // Add space before each capital letter
                      const tagInString =
                        words.charAt(0).toUpperCase() + words.slice(1);
                      return (
                        <div
                          key={index}
                          className="border border-[#116A7B] text-2xl text-[#00262D] px-4 py-2 rounded-lg"
                        >
                          {/* <PiElevatorDuotone className="inline-flex mx-2 mb-1" /> */}
                          <strong>{tagInString}</strong>{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Community Features
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    {property?.amenitiesID?.community?.tags.map(
                      (tag, index) => {
                        const words = tag.replace(/([A-Z])/g, " $1").trim(); // Add space before each capital letter
                        const tagInString =
                          words.charAt(0).toUpperCase() + words.slice(1);
                        return (
                          <div
                            key={index}
                            className="border border-[#116A7B] text-2xl text-[#00262D] px-4 py-2 rounded-lg"
                          >
                            {/* <PiElevatorDuotone className="inline-flex mx-2 mb-1" /> */}
                            <strong>{tagInString}</strong>{" "}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Healthcare and Recreational
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    {property?.amenitiesID?.healthAndRecreational?.tags.map(
                      (tag, index) => {
                        const words = tag.replace(/([A-Z])/g, " $1").trim(); // Add space before each capital letter
                        const tagInString =
                          words.charAt(0).toUpperCase() + words.slice(1);
                        return (
                          <div
                            key={index}
                            className="border border-[#116A7B] text-2xl text-[#00262D] px-4 py-2 rounded-lg"
                          >
                            {/* <PiElevatorDuotone className="inline-flex mx-2 mb-1" /> */}
                            <strong>{tagInString}</strong>{" "}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="my-16">
                  <h1 className="text-4xl text-[#116A7B] font-semibold">
                    Nearby Facilities and Locations
                  </h1>
                  <div className="flex flex-row flex-wrap gap-x-14 gap-y-7 mt-5">
                    {property?.amenitiesID?.nearbyFacilitiesAndLocations?.inputs
                      .distanceFromAirport && (
                      <div className="border border-[#116A7B] text-2xl  text-[#00262D] p-2 rounded-lg">
                        <FaPlane className="inline-flex mx-2 mb-1" />
                        <strong>Distance From Airport:</strong>{" "}
                        <strong className="text-[#6E6E6E]">
                          {
                            property?.amenitiesID?.nearbyFacilitiesAndLocations
                              ?.inputs.distanceFromAirport
                          }
                          km
                        </strong>
                      </div>
                    )}
                    {property?.amenitiesID?.nearbyFacilitiesAndLocations?.tags.map(
                      (tag, index) => {
                        const words = tag.replace(/([A-Z])/g, " $1").trim(); // Add space before each capital letter
                        const tagInString =
                          words.charAt(0).toUpperCase() + words.slice(1);
                        return (
                          <div
                            key={index}
                            className="border border-[#116A7B] text-2xl text-[#00262D] px-4 py-2 rounded-lg"
                          >
                            {/* <PiElevatorDuotone className="inline-flex mx-2 mb-1" /> */}
                            <strong>{tagInString}</strong>{" "}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="my-16">
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="bg-[#116A7B] text-2xl text-white font-semibold px-5 py-3 rounded-xl"
                  >
                    Buy Share: $
                    {Math.round(
                      Math.round(
                        property.valueOfProperty / property.totalStakes
                      )
                    )}
                  </button>
                </div>
                <BuyShareModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  propertyDocID={property._id}
                  propertyID={property.propertyID}
                  price={Math.round(
                    property.valueOfProperty / property.totalStakes
                  )}
                />
              </>
            )}
            {activeNavBtn === "Rent" && (
              <ThreadDisplay
                propertyID={propertyID}
                propertyDocID={property._id}
                category={"Rent"}
              />
            )}
            {activeNavBtn === "Sell" && (
              <ThreadDisplay
                propertyID={propertyID}
                propertyDocID={property._id}
                category={"Sell"}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
