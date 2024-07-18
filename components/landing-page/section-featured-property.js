"use client";
import React, { useEffect, useRef, useState } from "react";
import SwiperComponent from "./slider";
import compCities from "countrycitystatejson";
import { toast } from "react-toastify";
import Link from "next/link";
import { VscEye } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";

const SectionFeaturedProperty = () => {
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
          coordinates: [],
          propertyType: [],
          beds: [],
          area: ["0", "ANY"],
          priceRange: ["0", "ANY"],
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

  useEffect(() => {
    handleFetchFeaturedProperty();
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
  return (
    <div className="bg-[#CDC2AE] bg-opacity-5">
      <div className="px-14 pt-14">
        <h1 className="xl:text-[40px] text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          Featured property around the globe
        </h1>
        {/* <h1 className="text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          Featured property <i className="text-[#CDC2AE]"> around </i> the globe
        </h1> */}
        {/* <h1 className="text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          Featured property around the<i className="text-[#CDC2AE]"> globe </i>
        </h1> */}
      </div>

      {/* <div className="px-14 py-14">
        <SwiperComponent />
      </div> */}
      {featuredProperties.length > 0 && (
        <div className="my-10 ">
          {/* <h1 className="xl:text-[40px] text-4xl mb-5 text-center text-[#116A7B] font-semibold ">
            Featured Properties
          </h1> */}
          {!isFeaturedPropertyLoading ? (
            <div className="xxl:mx-24 xl:mx-16 lg:mx-10 md:mx-5 mx-16 flex flex-row flex-wrap items-center justify-center">
              {featuredProperties.map((card, cardIndex) => (
                <Link
                  href={`/buy-shares/property/${card.propertyID}`}
                  key={cardIndex}
                  className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl mx-10 mt-20"
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
                      className={`w-[20rem] h-[19rem] object-contain object-center rounded-md overflow-hidden`}
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
                    <TruncatingH1 text={card.title} />
                    <h3 className="text-[#116A7B] font-semibold">
                      {card.propertyType}
                    </h3>
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
    </div>
  );
};

export default SectionFeaturedProperty;
