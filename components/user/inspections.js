import { updateActiveInspectionTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InspectionCard from "./inspectionCard";

const Inspections = () => {
  const dispatch = useDispatch();

  const activeInspectionTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeInspectionTab
  );

  const [isLoading, setIsLoading] = useState(false);

  const [inspectionsList, setInspectionsList] = useState([]);

  const fetchInspections = async (category) => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-inspections-by-user/${username}/${category}`
      );

      const response = await res.json();

      if (response.success) {
        setIsLoading(false);
        setInspectionsList(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setInspectionsList(false);
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
    if (activeInspectionTab === "My Inspections") {
      fetchInspections("my");
    } else if (activeInspectionTab === "All Inspections") {
      fetchInspections("all");
    } else {
      setInspectionsList([]);
    }
  }, [activeInspectionTab]);

  const [selectedInspection, setSelectedInspection] = useState(null);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Inspections</h1>
      </div>

      <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
        <button
          onClick={() => {
            dispatch(updateActiveInspectionTab("My Inspections"));
          }}
        >
          <h1
            className={`flex ${
              activeInspectionTab === "My Inspections"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            My Inspections
          </h1>
        </button>
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() => {
            dispatch(updateActiveInspectionTab("All Inspections"));
          }}
        >
          <h2
            className={`flex ${
              activeInspectionTab === "All Inspections"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            All Inspections
          </h2>
        </button>

        {/* </Link> */}
      </div>

      {activeInspectionTab === "My Inspections" && (
        <div>
          {!isLoading ? (
            <div className="mx-14 flex flex-row flex-wrap items-center">
              {inspectionsList.length > 0 ? (
                inspectionsList.map((inspection, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setSelectedInspection(inspection)}
                  >
                    <InspectionCard card={inspection} />
                  </div>
                ))
              ) : (
                <div>No Inspections</div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </div>
      )}
      {activeInspectionTab === "All Inspections" && (
        <div>
          {!isLoading ? (
            <div className="mx-14 flex flex-row flex-wrap items-center">
              {inspectionsList.length > 0 ? (
                inspectionsList.map((inspection, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setSelectedInspection(inspection)}
                  >
                    <InspectionCard card={inspection} />
                  </div>
                ))
              ) : (
                <div>No Inspections</div>
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

export default Inspections;
