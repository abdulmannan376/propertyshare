"use client";
import {
  updateOfferCategoryTab,
  updateOffersTab,
} from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OfferCard from "./offersCard";
import NewSwapOfferModal from "../modals/newSwapOffer";

const Offers = () => {
  const [mySentOffers, setMySentOffers] = useState([]);
  const [myReceivedOffers, setMyReceivedOffers] = useState([]);

  const activeOffersTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeOffersTab
  );
  const activeOfferCategoryTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeOfferCategoryTab
  );

  const [isSentOffersLoading, setIsSentOffersLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const fetchMySentOffers = async () => {
    try {
      setIsSentOffersLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-sent-offers-by-category/${username}/${activeOfferCategoryTab}/?showHistory=${showHistory}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsSentOffersLoading(false);
        setMySentOffers(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsSentOffersLoading(false);
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

  const [isReceivedOffersLoading, setIsReceivedOffersLoading] = useState(false);

  const fetchMyReceivedOffers = async () => {
    setIsReceivedOffersLoading(true);
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/share/get-received-offers-by-category/${username}/${
          activeOfferCategoryTab === "Buy" ? "Sell" : activeOfferCategoryTab
        }/?showHistory=${showHistory}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setMyReceivedOffers(response.body);
        setIsReceivedOffersLoading(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsReceivedOffersLoading(false);
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

  const dispatch = useDispatch();

  const fetchData = () => {
    if (activeOffersTab === "Sent") {
      fetchMySentOffers();
    } else {
      fetchMyReceivedOffers();
    }
  };
  useEffect(() => {
    fetchData();
  }, [activeOffersTab, activeOfferCategoryTab, showHistory]);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Offers</h1>
      </div>
      <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
        <button
          onClick={() => {
            dispatch(updateOffersTab("Sent"));
            if (activeOfferCategoryTab === "Buy") {
              dispatch(updateOfferCategoryTab("Sell"));
            }
          }}
        >
          <h1
            className={`flex ${
              activeOffersTab === "Sent"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Sent
          </h1>
        </button>
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() => {
            dispatch(updateOffersTab("Received"));
            if (activeOfferCategoryTab === "Sell") {
              dispatch(updateOfferCategoryTab("Buy"));
            }
          }}
        >
          <h2
            className={`flex ${
              activeOffersTab === "Received"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Received
          </h2>
        </button>

        {/* </Link> */}
      </div>
      <div className="flex flex-row items-center justify-between mr-2">
        <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-xl font-semibold mt-5">
          <button onClick={() => dispatch(updateOfferCategoryTab("Rent"))}>
            <h1
              className={`flex ${
                activeOfferCategoryTab === "Rent"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              Rent
            </h1>
          </button>
          {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
          {activeOffersTab === "Sent" ? (
            <button
              onClick={() => {
                dispatch(updateOfferCategoryTab("Sell"));
              }}
            >
              <h2
                className={`flex ${
                  activeOfferCategoryTab === "Sell"
                    ? "underline-text"
                    : "hover-underline-animation"
                } `}
              >
                Sell
              </h2>
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(updateOfferCategoryTab("Buy"));
              }}
            >
              <h2
                className={`flex ${
                  activeOfferCategoryTab === "Buy"
                    ? "underline-text"
                    : "hover-underline-animation"
                } `}
              >
                Buy
              </h2>
            </button>
          )}

          {/* </Link> */}
          <button
            onClick={() => {
              dispatch(updateOfferCategoryTab("Swap"));
            }}
          >
            <h2
              className={`flex ${
                activeOfferCategoryTab === "Swap"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              Swap
            </h2>
          </button>
        </div>
        <div className="flex flex-row space-x-3">
          <input
            type="checkbox"
            name="showHistory"
            checked={showHistory}
            onChange={({ target }) => {
              setShowHistory(target.checked);
            }}
          />
          <h2>Show History</h2>
        </div>
      </div>
      {activeOffersTab === "Sent" && (
        <div>
          {!isSentOffersLoading ? (
            <div className="mx-14 flex flex-row flex-wrap">
              {mySentOffers.length > 0 ? (
                mySentOffers.map((card, cardIndex) => (
                  <OfferCard
                    card={card}
                    key={cardIndex}
                    fetchData={fetchData}
                  />
                ))
              ) : (
                <div>No Offers Sent for {activeOfferCategoryTab}</div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </div>
      )}
      {activeOffersTab === "Received" && (
        <div>
          {!isReceivedOffersLoading ? (
            <div className="mx-14 flex flex-row flex-wrap">
              {myReceivedOffers.length > 0 ? (
                myReceivedOffers.map((card, cardIndex) => (
                  <OfferCard
                    card={card}
                    key={cardIndex}
                    fetchData={fetchData}
                  />
                ))
              ) : (
                <div>No Offers Received for {activeOfferCategoryTab}</div>
              )}
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

export default Offers;
