import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import dayjs from "dayjs";

Modal.setAppElement("#app-body");

const Calendar = ({ propertyDuration, isShareholder, shareList }) => {
  const monthsList = [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 },
  ];

  const getDayColor = (day, month, year) => {
    const occupiedShare = propertyDuration.find(
      (share) =>
        share.month === month &&
        share.year === year &&
        share.daysList.find((d) => d.date === day)
    );
    return occupiedShare ? occupiedShare.color : "bg-white";
  };

  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [hoveredShareID, setHoveredShareID] = useState("");

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Handle mouse move to update the cursor position
  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const [hoveredOwner, setHoveredOwner] = useState(null);

  const handleMouseEnter = (dayDetails, e) => {
    // handleBgColor(dayDetails);
    if (dayDetails) {
      const owner = shareList.find(
        (share) => share.shareID === dayDetails.shareID
      );
      console.log("owner: ", owner);
      setHoveredOwner(owner);
      handleMouseMove(e); // Update cursor position when hovering starts
    } else {
      setHoveredOwner(null);
    }
  };

  useEffect(() => {
    if (hoveredOwner) {
      window.addEventListener("mousemove", handleMouseMove);
      //   console.log("in useEffect: ", hoveredOwner);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredOwner]);

  const [bgColor, setBgColor] = useState("bg-white");
  const [lightBgColor, setLightBgColor] = useState("bg-opacity-10");

  const handleBgColor = (details) => {
    if (!details || !details.shareID) {
      setHoveredShareID("");
      setBgColor("bg-white");
      setLightBgColor("bg-opacity-10"); // Default light background when not hovered
      return;
    }

    // console.log("in handleBgColor: ", isShareholder, details);

    const owner = shareList.find((share) => share.shareID === details.shareID);

    if (isShareholder) {
      setHoveredShareID(details.shareID);
      if (owner && owner.currentOwnerDocID) {
        setBgColor(details.color);
        setLightBgColor(`${details.color} bg-opacity-50`); // Light version of the background
      } else {
        setBgColor("bg-gray-500");
        setLightBgColor("bg-gray-500 bg-opacity-50"); // Light gray for non-owners
      }
    } else {
      setHoveredShareID(details.shareID);
    }
  };

  const handleMouseLeave = () => {
    setHoveredOwner(null);
    setHoveredShareID("");
    setBgColor("bg-white");
    setLightBgColor("bg-opacity-10"); // Revert to default light background
  };
  return (
    <div className="flex">
      <div className="px-20 py-4 max-h-[50vh] overflow-y-auto">
        {propertyDuration.map((month, monthIndex) => {
          const firstDayOfMonth = dayjs(
            `${month.year}-${month.monthNumber + 1}-01`
          ).day(); // Get the day of the week for the 1st of the month
          return (
            <div key={month.month} className="mb-4">
              <h2 className="text-lg font-bold mb-2">
                {month.month} {month.year}
              </h2>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayList.map((day, dayIndex) => (
                  <div
                    key={dayIndex + 1}
                    className={`w-10 h-10 flex items-center justify-center border bg-white
                }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {isShareholder ? (
                <div className="grid grid-cols-7 gap-2">
                  {/* Add empty cells before the first day of the month */}
                  {Array.from({ length: firstDayOfMonth }, (_, emptyIndex) => (
                    <div
                      key={`empty-${emptyIndex}`}
                      className="w-10 h-10"
                    ></div>
                  ))}
                  {Array.from(
                    { length: monthsList[month.monthNumber].days },
                    (_, dayIndex) => {
                      const dayDetails = month.daysList.find(
                        (day) => day.date === dayIndex + 1
                      );

                      let owner;
                      let permanentBgColor = "bg-white";
                      if (dayDetails) {
                        owner = shareList.find(
                          (share) => share.shareID === dayDetails.shareID
                        );
                        if (owner) {
                          permanentBgColor = owner.currentOwnerDocID
                            ? dayDetails.color
                            : "bg-gray-500";
                        }
                      }

                      return (
                        <div
                          key={dayIndex + 1}
                          className={`w-10 h-10 flex items-center justify-center border cursor-pointer rounded-full ${
                            hoveredShareID === dayDetails?.shareID
                              ? bgColor
                              : `${permanentBgColor} bg-opacity-30`
                          }`}
                          onMouseEnter={(e) => {
                            handleBgColor(dayDetails);
                            handleMouseEnter(dayDetails, e);
                          }}
                          onMouseLeave={handleMouseLeave}
                        >
                          {dayIndex + 1}
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-2">
                  {/* Add empty cells before the first day of the month */}
                  {Array.from({ length: firstDayOfMonth }, (_, emptyIndex) => (
                    <div
                      key={`empty-${emptyIndex}`}
                      className="w-10 h-10"
                    ></div>
                  ))}
                  {Array.from(
                    { length: monthsList[month.monthNumber].days },
                    (_, dayIndex) => {
                      const dayDetails = month.daysList.find(
                        (day) => day.date === dayIndex + 1
                      );

                      return (
                        <div
                          key={dayIndex + 1}
                          className={`w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer ${
                            hoveredShareID === dayDetails?.shareID
                              ? "bg-gray-500"
                              : "bg-white"
                          }`}
                          onMouseOver={() =>
                            setHoveredShareID(
                              dayDetails ? dayDetails.shareID : ""
                            )
                          }
                          onMouseOut={() => setHoveredShareID("")}
                        >
                          {dayIndex + 1}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Floating Owner Details */}
      {hoveredOwner && (
        <div
          className="absolute pointer-events-none bg-white text-gray-700 p-2 border rounded shadow-lg"
          style={{
            top: cursorPosition.y - 200,
            left: cursorPosition.x - 600,
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          {hoveredOwner?.currentOwnerDocID
            ? `Owner: ${hoveredOwner?.currentOwnerDocID?.username}`
            : "Available for sale"}
        </div>
      )}
    </div>
  );
};

const CalendarModal = ({
  isOpen,
  onClose,
  fetchThreads,
  shareID,
  actionBody,
  setSelection,
  propertyID,
  setPropertyID,
  fetchProperties,
}) => {
  const [property, setProperty] = useState(null);
  const fetchPropertyShare = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-property-shares/?propertyID=${propertyID}`,
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
    if (property) {
      checkUserStatus();
      calPropertyDuration();
    } else {
      fetchPropertyShare();
    }
  }, [property]);

  const [propertyDuration, setPropertyDuration] = useState([]);

  const monthsList = [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 },
  ];

  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const colorList = [
    "bg-red-500", // 1. Red
    "bg-orange-500", // 2. Orange
    "bg-yellow-500", // 3. Yellow
    "bg-green-500", // 4. Green
    "bg-teal-500", // 5. Teal
    "bg-blue-500", // 6. Blue
    "bg-pink-500", // 9. Pink
    "bg-purple-500", // 8. Purple
    "bg-rose-500", // 10. Rose
    "bg-indigo-500", // 7. Indigo
    "bg-amber-500", // 11. Amber
    "bg-lime-500", // 12. Lime
    "bg-violet-500", // 16. Violet
    "bg-emerald-500", // 13. Emerald
    "bg-cyan-500", // 14. Cyan
    "bg-rose-400", // 18. Rose (Lighter)
    "bg-sky-500", // 15. Sky
    "bg-fuchsia-500", // 17. Fuchsia
    "bg-amber-400", // 19. Amber (Lighter)
    "bg-lime-400", // 20. Lime (Lighter)
    "bg-emerald-400", // 21. Emerald (Lighter)
    "bg-cyan-400", // 22. Cyan (Lighter)
    "bg-sky-400", // 23. Sky (Lighter)
    "bg-violet-400", // 24. Violet (Lighter)
    "bg-fuchsia-400", // 25. Fuchsia (Lighter)
  ];

  function calPropertyDuration() {
    const durationList = [];

    property.shareDocIDList.forEach((share, index) => {
      const startDuration = new Date(share.availableInDuration.startDateString);
      const endDuration = new Date(share.availableInDuration.endDateString);

      let currentDate = startDuration;

      while (currentDate <= endDuration) {
        const currentMonthIndex = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        let monthData = durationList.find(
          (item) =>
            item.month === monthsList[currentMonthIndex].month &&
            item.year === currentDate.getFullYear()
        );

        if (!monthData) {
          monthData = {
            month: monthsList[currentMonthIndex].month,
            year: currentDate.getFullYear(),
            monthNumber: currentMonthIndex,
            daysList: [],
          };
          durationList.push(monthData);
        }

        monthData.daysList.push({
          day: dayList[currentDay],
          date: currentDay,
          color: colorList[index],
          shareID: share.shareID,
        });
        console.log("monthData: ", monthData);
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    });

    setPropertyDuration(durationList);
  }

  const [isShareholderInProperty, setIsShareholderInProperty] = useState(false);

  function checkUserStatus() {
    const username = JSON.parse(localStorage.getItem("userDetails")).username;
    property.shareDocIDList.map((share) => {
      if (
        share.currentOwnerDocID &&
        share.currentOwnerDocID.username === username
      ) {
        setIsShareholderInProperty(true);
      }
    });
  }

  const daysInMonth = 30; // Assuming a month with 30 days for simplicity
  const occupiedDays = [3, 5, 12, 18, 22]; // Arbitrary data to mark occupied days

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ccc",
          background: "#fff",
          borderRadius: "15px",
          outline: "none",
          padding: "5px",
          width: "fit",
        },
      }}
    >
      <div className="py-10 px-5">
        {propertyDuration.length > 0 ? (
          <Calendar
            propertyDuration={propertyDuration}
            isShareholder={isShareholderInProperty}
            shareList={property?.shareDocIDList}
          />
        ) : (
          <div>Fetching Details</div>
        )}
        {/* <div className="w-full max-w-md mx-auto mt-10">
          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`h-8 w-8 flex items-center justify-center rounded-full ${
                  occupiedDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Modal>
  );
};

export default CalendarModal;
