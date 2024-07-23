import { updateActiveSwapNavBtn } from "@/app/redux/features/propertyPageSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SwapShareComponent = ({ propertyID, propertyDocID, category }) => {
  const dispatch = useDispatch();

  const activeNavBtn = useSelector(
    (state) => state.propertyPageSliceReducer.navBtnSwapShareActive
  );

  const [isLoading, setIsLoading] = useState(false);

  const [myShareList, setMyShareList] = useState([]);

  const fetchMyShares = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-all-shares-by-username/${username}/${propertyID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      console.log(response);
      console.log(response);
      if (response.success) {
        setIsLoading(false);
        setMyShareList(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
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

  const [forSwapShareList, setForSwapShareList] = useState([]);

  const fetchForSwapShares = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-category/${propertyID}/${category}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();

      console.log(response);
      if (response.success) {
        setIsLoading(false);
        setForSwapShareList(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
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

  function processDate(dateString) {
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

    let commutedDateString = "";
    const dateOfMonth = date.getDate();
    if (dateOfMonth % 10 === 1) {
      commutedDateString += "1st";
    } else if (dateOfMonth % 10 === 2) {
      commutedDateString += "2nd";
    } else if (dateOfMonth % 10 === 3) {
      commutedDateString += "3rd";
    } else {
      commutedDateString += `${dateOfMonth}th`;
    }

    commutedDateString += ` ${months[date.getMonth()]}`;

    return commutedDateString;
  }

  const handleOpenShareForSwap = async (shareID) => {
    try {
      const data = {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        shareID: shareID,
        category: category,
      };

      console.log("data: ", data);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/open-share-by-category`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      if (response.success) {
        fetchMyShares();
        toast.success(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
    <div>
      <div className="w-screen flex items-center justify-start md:space-x-20 space-x-14 my-3 text-white text-lg font-semibold">
        <button
          onClick={() => {
            fetchMyShares();
            dispatch(updateActiveSwapNavBtn("My Shares"));
          }}
        >
          <h2
            className={`flex ${
              activeNavBtn === "My Shares"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            My Shares
          </h2>
        </button>
        <button
          onClick={() => {
            fetchForSwapShares();
            dispatch(updateActiveSwapNavBtn("Open Offers"));
          }}
        >
          <h2
            className={`flex ${
              activeNavBtn === "Open Offers"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Open Offers
          </h2>
        </button>
        {/* </Link> */}
      </div>

      {activeNavBtn === "My Shares" && (
        <>
          {!isLoading ? (
            <div>
              {myShareList.length > 0 ? (
                myShareList.map((share, index) => {
                  if (!share.onRent && !share.onSale)
                    return (
                      <div
                        key={index}
                        className={`flex flex-row items-center justify-between bg-[#FCFBF5] text-[#116A7B] border border-[#D9D9D9] space-y-3 px-5 py-7 my-5`}
                      >
                        <div>
                          <h1>
                            <strong className={` text-[#ABB5B7] font-normal`}>
                              {" "}
                              Title:
                            </strong>{" "}
                            {share.propertyDocID.title}
                          </h1>
                          <h1>
                            <strong
                              className={`text-2xl text-[#ABB5B7]  font-normal`}
                            >
                              {" "}
                              Duration:
                            </strong>{" "}
                            <br />{" "}
                            {processDate(
                              share.availableInDuration.startDate
                            )} -{" "}
                            {processDate(share.availableInDuration.endDate)}
                          </h1>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenShareForSwap(share.shareID)
                            }
                            className={`w-[3.5rem] h-7 ${
                              share.onSwap ? "bg-[#116A7B]" : "bg-[#D9D9D9]"
                            } p-1 rounded-full cursor-pointer`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform duration-700 ease-in-out ${
                                share.onSwap ? "translate-x-7" : "translate-x-0"
                              }`}
                            ></div>
                          </button>
                        </div>
                      </div>
                    );
                  else {
                    return (
                      <div className="text-[32px] font-semibold text-[#116A7B]">
                        <h1 className="text-center">No Shares to Swap.</h1>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="text-[32px] font-semibold text-[#116A7B]">
                  <h1 className="text-center">No Shares to Swap.</h1>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full h-[10rem] m-6 overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </>
      )}
      {activeNavBtn === "Open Offers" && (
        <>
          {!isLoading ? (
            <div>
              {forSwapShareList.length > 0 ? (
                forSwapShareList.map((share, index) => (
                  <div
                    key={index}
                    className={`flex flex-row items-center justify-between bg-[#FCFBF5] text-[#116A7B] border border-[#D9D9D9] space-y-3 px-5 py-7 my-5 cursor-pointer`}
                  >
                    <div>
                      <h1>
                        <strong className={` text-[#ABB5B7] font-normal`}>
                          {" "}
                          Owner:
                        </strong>{" "}
                        {share.currentOwnerDocID.username}
                      </h1>
                      <h1>
                        <strong
                          className={`text-2xl text-[#ABB5B7]  font-normal`}
                        >
                          {" "}
                          Duration:
                        </strong>{" "}
                        <br />{" "}
                        {processDate(
                          share.availableInDuration.startDate
                        )} - {processDate(share.availableInDuration.endDate)}
                      </h1>
                    </div>
                    <button
                      type="button"
                      className="p-1 text-base text-[#116A7B] uppercase font-bold"
                    >
                      request
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-[32px] font-semibold text-[#116A7B]">
                  <h1 className="text-center">No Openings Yet.</h1>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full h-[10rem] m-6 overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SwapShareComponent;
