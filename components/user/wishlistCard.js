import { updateFavoritesList, updateWishList } from "@/app/redux/features/userSlice";
import compCities from "countrycitystatejson";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { VscEye } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const WishlistCard = ({ card }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const favouriteList = useSelector(
    (state) => state.adminSliceReducer.favouriteList
  );

  const handleFavouriteListRequest = async (action) => {
    console.log("action: ", action);
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const data = {
        username: username,
        propertyID: card.propertyID,
        action: action,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/update-user-favourites`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      if (response.success) {
        dispatch(updateFavoritesList({ action: "all", body: response.body }));
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

  const wishList = useSelector((state) => state.adminSliceReducer.wishList);

  const handleWishListRequest = async (action, propertyID) => {
    console.log("action: ", action);
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const data = {
        username: username,
        propertyID: propertyID,
        action: action,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/update-user-wishlist`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      if (response.success) {
        dispatch(updateWishList({ action: "all", body: response.body }));
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
  return (
    <div
      onClick={() => router.push(`/buy-shares/property/${card.propertyID}`)}
      className="w-[20rem] flex flex-col bg-white border-2 border-[#D9D9D9] rounded-xl md:mx-10 mx-1 mt-20 cursor-pointer"
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
          onClick={(e) => {
            e.stopPropagation();
            if (favouriteList.includes(card.propertyID)) {
              handleFavouriteListRequest("remove");
            } else {
              handleFavouriteListRequest("add");
            }
          }}
          className="absolute inset-y-5 left-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer"
        >
          {favouriteList.includes(card.propertyID) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
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
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (wishList.includes(card.propertyID)) {
            handleWishListRequest("remove", card.propertyID);
          } else {
            handleWishListRequest("add", card.propertyID);
          }
        }}
        className="flex flex-row items-center justify-start my-1"
      >
        <p className="mx-2 text-gray-500 underline">Remove</p>
      </button>
    </div>
  );
};

export default WishlistCard;
