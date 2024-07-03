import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import NewThread from "../modals/newThread";
import { useSelector } from "react-redux";
import Image from "next/image";

const Thread = ({ thread, isFirstLevel, threadIndex, handleFetchChildren }) => {
  return (
    <div
      className={`${isFirstLevel ? "" : "pl-4 border-l border-gray-600 ml-0"}`}
    >
      <div className="my-2 mx-5">
        <div className="flex flex-row">
          <Image
            width={500}
            height={500}
            src={"/dummy-image.png"}
            className="w-10 h-10"
          />
          <div className="my-2">
            <div className="bg-white px-2 rounded-md text-xl text-[#116A7B] font-semibold">
              {thread.author.name}
            </div>
            {thread.title.length > 0 && (
              <div className="bg-white text-xl p-2 rounded-md shadow-sm">
                {thread.title}
              </div>
            )}
            {/* {isFirstLevel && (
          <div className="bg-white px-2 rounded-md shadow-sm">
          Duration: {thread.shareDocID.availableInDuration.startDate} -{" "}
          {thread.shareDocID.availableInDuration.endDate}
          </div>
          )} */}

            <div className="bg-white px-2 rounded-md ">{thread.body}</div>
            <div className="flex flex-row mt-5">
              <button
                type="button"
                className="text-[#116A7B] font-semibold px-2"
              >
                Reply
              </button>
              <button
                onClick={() =>
                  handleFetchChildren(thread.threadID, threadIndex)
                }
                type="button"
                className="text-[#116A7B] font-semibold px-2"
              >
                Show replies
              </button>
            </div>
          </div>
        </div>

        {thread.children &&
          thread.children.map((child) => (
            <Thread key={child.id} thread={child} isFirstLevel={false} />
          ))}
      </div>
    </div>
  );
};

const ThreadDisplay = ({ propertyID, propertyDocID, category }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [threads, setThreads] = useState([]);

  const userRole = useSelector((state) => state.adminSliceReducer.userRole);

  const fetchThreads = async () => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/thread/get-all-by-property/${JSON.stringify({
          propertyID: propertyID,
          category: category,
        })}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setThreads(response.body);
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

  const [newThreadSubmitted, setNewThreadSubmitted] = useState(true);

  const [rentShareList, setRentShareList] = useState([]);

  const fetchRentShares = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-rent-shares-by-property/${propertyDocID}/${category}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();

      if (response.success) {
        setRentShareList(response.body);
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
    if (newThreadSubmitted) {
      fetchRentShares();
      setNewThreadSubmitted(false);
    }
  }, [newThreadSubmitted]);

  const handleFetchChildren = async (threadID, threadIndex) => {
    console.log("role: ", userRole, typeof userRole, userRole === "admin");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-childern-by-parent/${threadID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setThreads((prevData) => {
          const newData = [...prevData];
          newData[threadIndex].children = response.body;
          return newData;
        });

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

  const [selectedThread, setSelectedThread] = useState(-1);

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

    if (date.getDate() === 1) {
      commutedDateString += "1st";
    } else if (date.getDate() === 2) {
      commutedDateString += "2nd";
    } else if (date.getDate() === 3) {
      commutedDateString += "3rd";
    } else {
      commutedDateString += `${date.getDate()}th`;
    }

    commutedDateString += ` ${months[date.getMonth()]}`;

    return commutedDateString;
  }

  return (
    <>
      {userRole === "shareholder" ||
        (userRole === "admin" && (
          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="text-3xl flex flex-row items-center px-3 py-1 border border-[#116A7B] text-[#116A7B] rounded-full"
            >
              {" "}
              New <FaPlus className="text-xl ml-5" />
            </button>
          </div>
        ))}
      <NewThread
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        propertyDocID={propertyDocID}
        propertyID={propertyID}
        category={category}
        setNewThreadSubmitted={setNewThreadSubmitted}
      />
      <>
        {rentShareList.length > 0 ? (
          rentShareList.map((share, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => {
                  if (selectedThread === index) {
                    setSelectedThread(-1);
                  } else {
                    setSelectedThread(index);
                  }
                }}
                className={`flex flex-row items-center justify-between ${
                  selectedThread === index
                    ? "bg-[#116A7B] text-white"
                    : "bg-[#FCFBF5] text-[#116A7B]"
                } border border-[#D9D9D9] px-5 py-7 my-5 cursor-pointer`}
              >
                <h1>
                  <strong
                    className={`text-2xl ${
                      selectedThread === index ? "text-white" : "text-[#ABB5B7]"
                    }  font-normal`}
                  >
                    {" "}
                    Duration:
                  </strong>{" "}
                  <br /> {processDate(
                    share.availableInDuration.startDate
                  )} - {processDate(share.availableInDuration.endDate)}
                </h1>
                {/* <h2
                className={`${
                  selectedThread === index ? "text-white" : "text-[#ABB5B7]"
                }  text-2xl font-semibold`}
              >
                {thread.childrenCount} responses
              </h2> */}
              </div>
              {selectedThread === index && (
                <div className="">
                  {/* <Thread
                  key={thread.threadID}
                  thread={thread}
                  isFirstLevel={true}
                  threadIndex={index}
                  handleFetchChildren={handleFetchChildren}
                /> */}
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="text-[32px] font-semibold text-[#116A7B]">
            <h1 className="text-center">No Openings Yet.</h1>
          </div>
        )}
      </>
      {/* <div className="p-4">
        {threads.length > 0 ? (
          threads?.map((thread, index) => (
            <Thread
              key={thread.threadID}
              thread={thread}
              isFirstLevel={true}
              threadIndex={index}
              handleFetchChildren={handleFetchChildren}
            />
          ))
        ) : (
          <div className="text-[32px] font-semibold text-[#116A7B]">
            <h1 className="text-center">No Threads Yet.</h1>
          </div>
        )}
      </div> */}
    </>
  );
};

export default ThreadDisplay;
