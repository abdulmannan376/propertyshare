import { updateActiveRaiseRequestTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RaiseRequestCard from "./raiseRequestCard";

const RaiseRequest = () => {
  const dispatch = useDispatch();

  const activeRaiseRequestTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeRaiseRequestTab
  );

  const [requestType, setRequestType] = useState("Modification");
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRaiseRequests = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-raise-request-by-username/${username}/${requestType}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoading(false)
        setRequestsList(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
        setIsLoading(false)
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
    if (activeRaiseRequestTab === "My Requests") fetchRaiseRequests();
    else setRequestsList([]);
  }, [activeRaiseRequestTab, requestType]);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">
          Modification and Maintenance Requests
        </h1>
      </div>
      <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
        <button
          onClick={() => {
            dispatch(updateActiveRaiseRequestTab("My Requests"));
            // setSelectedInspection(null);
          }}
        >
          <h1
            className={`flex ${
              activeRaiseRequestTab === "My Requests"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            My Requests
          </h1>
        </button>
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() => {
            dispatch(updateActiveRaiseRequestTab("All Requests"));
            // setSelectedInspection(null);
          }}
        >
          <h2
            className={`flex ${
              activeRaiseRequestTab === "All Requests"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            All Requests
          </h2>
        </button>
        <button
          onClick={() => {
            dispatch(updateActiveRaiseRequestTab("Pending Approvals"));
            // setSelectedInspection(null);
          }}
        >
          <h2
            className={`flex ${
              activeRaiseRequestTab === "Pending Approvals"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Pending Approvals
          </h2>
        </button>

        {/* </Link> */}
      </div>
      <div className="my-5 mx-3">
        <select
          name="Gender"
          value={requestType}
          onChange={({ target }) => {
            setRequestType(target.value);
          }}
          className="inline-flex mx-10 bg-[#D9D9D9] text-xl font-semibold border border-[#116A7B30] rounded px-3 py-1 focus:border-[#116A7B] outline-none"
        >
          <option value="Modification">Modification</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>
      {activeRaiseRequestTab === "My Requests" && (
        <div>
          {!isLoading ? (
            // requestsList.length > 0 && (
              <div className="mx-14 flex flex-col">
                {requestsList?.length > 0 ? (
                  requestsList?.map((request, index) => (
                    <div
                      key={index}
                      className="cursor-pointer flex flex-row"
                    //   onClick={() => setSelectedInspection(inspection)}
                    >
                      <RaiseRequestCard card={request} />
                      {/* <div>
                        <div className="flex flex-row">
                            
                        <h2 className="w-20">Title: </h2>
                        <h2>{request.title}</h2>
                        </div>
                      </div> */}
                    </div>
                  ))
                ) : (
                  <div>No Requests</div>
                )}
              </div>
            // )
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

export default RaiseRequest;
