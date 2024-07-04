import compCities from "countrycitystatejson";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { VscEye } from "react-icons/vsc";

const PropertyCard = ({ card }) => {
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
    <Link
      href={`/buy-shares/property/${card.propertyID}`}
      className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl mr-20 mt-20"
    >
      <div className="p-2 relative">
        <Image
          width={1000}
          height={1000}
          src={
            card.imageCount > 0
              ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${
                  card.propertyID
                }/image-${
                  card.pinnedImageIndex === -1
                    ? "1"
                    : `${card.pinnedImageIndex}`
                }.png`
              : "/assets/user/property-management/no-image.jpg"
          }
          className={`w-[20rem] h-[19rem] object-cover object-center rounded-md overflow-hidden`}
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
        <h3 className="text-[#116A7B] font-semibold">{card.propertyType}</h3>
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
          {card.addressOfProperty.city ? card.addressOfProperty.city : ""},{" "}
          {card.addressOfProperty.country
            ? compCities.getCountryByShort(card.addressOfProperty.country).name
            : ""}
        </h4>
      </div>
    </Link>
  );
};

export default PropertyCard;
