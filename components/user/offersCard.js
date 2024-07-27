import compCities from "countrycitystatejson";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { VscEye } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { MdCancel, MdOutlinePending, MdPending } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const OfferCard = ({ card, fetchData }) => {
  const activeOffersTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeOffersTab
  );
  const activeOfferCategoryTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeOfferCategoryTab
  );

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

  function processDate(dateString) {
    if (dateString && dateString.length > 0) {
      const date = new Date(dateString);

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dateOfMonth = date.getDate();
      const commutedDateString = `${getDaySuffix(dateOfMonth)} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;

      return commutedDateString;
    }
  }

  function getDaySuffix(dateOfMonth) {
    const j = dateOfMonth % 10,
      k = dateOfMonth % 100;
    if (j === 1 && k !== 11) {
      return `${dateOfMonth}st`;
    }
    if (j === 2 && k !== 12) {
      return `${dateOfMonth}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${dateOfMonth}rd`;
    }
    return `${dateOfMonth}th`;
  }

  const handleRentOfferAction = async (action, offerID) => {
    try {
      const data = {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        offerID: offerID,
        action: action,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/update-share-rent-offer`,
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
        fetchData();
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

  const handleSellOfferAction = async (action, offerID) => {
    try {
      const data = {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        offerID: offerID,
        action: action,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/update-share-sell-offer`,
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
        fetchData();
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

  const handleSwapOfferAction = async (action, offerID) => {
    try {
      const data = {
        offerID: offerID,
        action: action,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/update-share-swap-offer`,
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
        fetchData();
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
    // <Link
    //   href={`/rent-shares/property/${card.shareDocID.propertyDocID.propertyID}`}
    //   className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl mr-20 mt-5"
    // >
    <div className="w-[20rem] bg-white border-2 border-[#D9D9D9] rounded-xl mr-20 mt-5">
      <div className="p-2 relative">
        <Image
          width={1000}
          height={1000}
          src={
            card.shareDocID.propertyDocID.imageCount > 0
              ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/${
                  card.shareDocID.propertyDocID.propertyID
                }/image-${
                  card.shareDocID.propertyDocID.pinnedImageIndex === -1
                    ? "1"
                    : `${card.shareDocID.propertyDocID.pinnedImageIndex}`
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
        {/* <span className="absolute text-xs inset-y-5 right-0 px-5 text-[#116A7B] font-semibold focus:outline-none cursor-pointer">
          {" "}
          <VscEye className="inline-flex mb-[1px] mr-1 text-base" />
          {card.viewedCount}{" "}
        </span> */}
      </div>
      <div className="p-2 space-y-2">
        <TruncatingH1 text={card.shareDocID.propertyDocID.title} />
        {/* <h3 className="text-[#116A7B] font-semibold">{card.propertyType}</h3> */}
        <h2 className="text-sm text-[#116A7B]">
          <strong>
            {card?.shareDocID.propertyDocID.amenities?.roomDetails?.inputs?.beds
              ? card?.shareDocID.propertyDocID.amenities?.roomDetails?.inputs
                  ?.beds
              : "-"}
          </strong>{" "}
          bd{" "}
          <strong>
            {card?.shareDocID.propertyDocID.amenities?.roomDetails?.inputs
              ?.baths
              ? card?.shareDocID.propertyDocID.amenities?.roomDetails?.inputs
                  ?.baths
              : "-"}
          </strong>{" "}
          ba <strong>{card.shareDocID.propertyDocID.area}</strong> Sqft
        </h2>
        <h3 className="text-sm text-[#116A7B]">
          {activeOfferCategoryTab === "Swap" ? "Swap To" : "Duration"}:{" "}
          {processDate(card.shareDocID.availableInDuration.startDate)} -{" "}
          {processDate(card.shareDocID.availableInDuration.endDate)}
        </h3>
        {activeOfferCategoryTab !== "Swap" && (
          <h5 className="text-sm text-[#116A7B]">
            {activeOfferCategoryTab}: ${card.price}
          </h5>
        )}
        {activeOfferCategoryTab === "Swap" && (
          <h3 className="text-sm text-[#116A7B]">
            Swap with:{" "}
            {processDate(card.offeredShareDocID?.availableInDuration.startDate)}{" "}
            - {processDate(card.offeredShareDocID?.availableInDuration.endDate)}
          </h3>
        )}
        {activeOffersTab === "Sent" && activeOfferCategoryTab !== "Swap" && (
          <h5 className="text-sm text-[#116A7B]">
            User: <strong>{card.userDocID.username}</strong>
          </h5>
        )}
        {activeOffersTab === "Sent" && activeOfferCategoryTab === "Swap" && (
          <h5 className="text-sm text-[#116A7B]">
            Shareholder: <strong>{card.shareholderDocID.username}</strong>
          </h5>
        )}
        {activeOffersTab === "Received" &&
          activeOfferCategoryTab !== "Swap" && (
            <h5 className="text-sm text-[#116A7B]">
              Shareholder: <strong>{card.shareholderDocID.username}</strong>
            </h5>
          )}
        {activeOffersTab === "Received" &&
          activeOfferCategoryTab === "Swap" && (
            <h5 className="text-sm text-[#116A7B]">
              Shareholder: <strong>{card.userDocID.username}</strong>
            </h5>
          )}
        <h4 className="text-xl flex items-start text-[#116A7B]">
          <FiMapPin className="inline-flex mt-1 mr-1" />{" "}
          {card.shareDocID.propertyDocID.addressOfProperty.city
            ? card.shareDocID.propertyDocID.addressOfProperty.city
            : ""}
          ,{" "}
          {card.shareDocID.propertyDocID.addressOfProperty.country
            ? compCities.getCountryByShort(
                card.shareDocID.propertyDocID.addressOfProperty.country
              ).name
            : ""}
        </h4>
        {activeOffersTab === "Sent" && (
          <div className="flex flex-row items-center">
            {card.status === "pending" && (
              <>
                <MdPending className="text-xl text-yellow-500" />{" "}
                <p className="mx-2 text-yellow-500">Pending</p>
              </>
            )}
            {card.status === "rejected" && (
              <>
                <IoMdCloseCircle className="text-xl text-red-500" />{" "}
                <p className="mx-2 text-red-500">Rejected</p>
              </>
            )}
            {card.status === "accepted" && (
              <>
                <FaCheckCircle className="text-xl text-green-500" />{" "}
                <p className="mx-2 text-green-500">Accepted</p>
              </>
            )}
            {card.status === "cancelled" && (
              <>
                <MdCancel className="text-xl text-gray-500" />{" "}
                <p className="mx-2 text-gray-500">Cancelled</p>
              </>
            )}
          </div>
        )}
        {activeOffersTab === "Sent" &&
          card.status !== "cancelled" &&
          card.status === "pending" && (
            <button
              type="button"
              onClick={() => {
                if (activeOfferCategoryTab === "Rent") {
                  handleRentOfferAction("cancelled", card.shareOfferID);
                } else if (activeOfferCategoryTab === "Sell") {
                  handleSellOfferAction("cancelled", card.shareOfferID);
                } else if (activeOfferCategoryTab === "Swap") {
                  handleSwapOfferAction("cancelled", card.shareOfferID);
                }
              }}
              className="flex flex-row items-center justify-center"
            >
              <p className="mx-2 text-gray-500 underline">Cancel</p>
            </button>
          )}
        {activeOffersTab === "Received" && (
          <div className="flex flex-row items-center">
            {card.status === "pending" && (
              <div className="w-full flex flex-row items-center justify-around">
                <button
                  type="button"
                  onClick={() => {
                    if (activeOfferCategoryTab === "Rent") {
                      handleRentOfferAction("rejected", card.shareOfferID);
                    } else if (activeOfferCategoryTab === "Buy") {
                      handleSellOfferAction("rejected", card.shareOfferID);
                    } else if (activeOfferCategoryTab === "Swap") {
                      handleSwapOfferAction("rejected", card.shareOfferID);
                    }
                  }}
                  className="flex flex-row items-center justify-center"
                >
                  <IoMdCloseCircle className="text-xl text-gray-500" />{" "}
                  <p className="mx-2 text-gray-500 underline">Ignore</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (activeOfferCategoryTab === "Rent") {
                      handleRentOfferAction("accepted", card.shareOfferID);
                    } else if (activeOfferCategoryTab === "Buy") {
                      handleSellOfferAction("accepted", card.shareOfferID);
                    } else if (activeOfferCategoryTab === "Swap") {
                      handleSwapOfferAction("accepted", card.shareOfferID);
                    }
                  }}
                  className="flex flex-row items-center justify-center"
                >
                  <FaCheckCircle className="text-xl text-[#116A7B]" />{" "}
                  <p className="mx-2 text-[#116A7B] underline">Accept</p>
                </button>
              </div>
            )}
            {card.status === "rejected" && (
              <>
                <IoMdCloseCircle className="text-xl text-red-500" />{" "}
                <p className="mx-2 text-red-500">Rejected</p>
              </>
            )}
            {card.status === "accepted" && (
              <>
                <FaCheckCircle className="text-xl text-green-500" />{" "}
                <p className="mx-2 text-green-500">Accepted</p>
              </>
            )}
            {card.status === "cancelled" && (
              <>
                <MdCancel className="text-xl text-gray-500" />{" "}
                <p className="mx-2 text-gray-500">Cancelled</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
    // </Link>
  );
};

export default OfferCard;
