import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import NewThread from "../modals/newThread";
import { useSelector } from "react-redux";
import Image from "next/image";

const Thread = ({
  thread,
  isFirstLevel,
  threadIndex,
  handleFetchChildren,
  category,
}) => {
  const [replyForThreadID, setReplyForThreadID] = useState("");
  const [text, setText] = useState("");

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "inherit"; // Reset the height so the scrollHeight measurement is correct
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [text]); // Adjust height whenever text changes

  const handleReplySubmit = async (threadID) => {
    try {
      const data = {
        threadID: threadID,
        threadBody: text,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        category: category,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/add-child-thread`,
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
        setReplyForThreadID("");
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
        setText("");
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
            <div className="bg-white px-2 mb-2 rounded-md text-xl text-[#116A7B] font-semibold">
              {thread.author.name}
            </div>
            {thread.title.length > 0 && (
              <div className="bg-white text-xl p-2 rounded-md shadow-sm">
                {thread.title}
              </div>
            )}

            <div className="bg-white px-2 rounded-md ">{thread.body}</div>
            <div className="flex flex-row mt-5">
              <button
                type="button"
                onClick={() => {
                  if (replyForThreadID === thread.threadID) {
                    setReplyForThreadID("");
                  } else {
                    setReplyForThreadID(thread.threadID);
                  }
                }}
                className="text-[#116A7B] text-sm font-semibold px-2"
              >
                {replyForThreadID === thread.threadID ? "Cancel" : "Reply"}
              </button>
              <button
                onClick={() =>
                  handleFetchChildren(thread.threadID, threadIndex)
                }
                type="button"
                className="text-[#116A7B] text-sm font-semibold px-2"
              >
                Show replies
              </button>
            </div>
          </div>
        </div>
        {replyForThreadID === thread.threadID && (
          <div className="bg-[#FCFBF5] flex flex-row border border-[#D9D9D9] px-5 py-3 mb-5 rounded-full">
            <textarea
              ref={textRef}
              rows="1"
              className="w-full p-1 outline-none text-lg"
              style={{ backgroundColor: "transparent", resize: "none" }}
              value={text}
              required={true}
              onChange={({ target }) => setText(target.value)}
            ></textarea>
            <button
              type="button"
              onClick={() => {
                handleReplySubmit(thread.threadID);
              }}
              className="text-lg font-semibold text-[#116A7B] p-1"
            >
              POST
            </button>
          </div>
        )}

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

  const fetchThreads = async (shareID) => {
    console.log(shareID);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-root-threads/${shareID}`,
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

  const [text, setText] = useState("");

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "inherit"; // Reset the height so the scrollHeight measurement is correct
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [text]); // Adjust height whenever text changes

  const handleThreadSubmit = async (shareID) => {
    try {
      const data = {
        shareID: shareID,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        body: text,
        category: category,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/add-root-thread`,
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
        setText("");
        fetchThreads(shareID);
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
                    setThreads([]);
                  } else {
                    setSelectedThread(index);
                    fetchThreads(share.shareID);
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
              {selectedThread === index && threads.length > 0
                ? threads.map((thread) => (
                    <div key={thread.threadID} className="">
                      <Thread
                        key={thread.threadID}
                        thread={thread}
                        isFirstLevel={true}
                        threadIndex={index}
                        handleFetchChildren={handleFetchChildren}
                        category={category}
                      />
                    </div>
                  ))
                : selectedThread === index && (
                    <div className="text-[32px] font-semibold text-[#116A7B]">
                      <h1 className="text-center">No Threads Yet.</h1>
                    </div>
                  )}

              {selectedThread === index && (
                <div className="bg-[#FCFBF5] flex flex-row border border-[#D9D9D9] px-5 py-3 rounded-full">
                  <textarea
                    ref={textRef}
                    rows="1"
                    className="w-full p-1 outline-none text-lg"
                    style={{ backgroundColor: "transparent", resize: "none" }}
                    value={text}
                    required={true}
                    onChange={({ target }) => setText(target.value)}
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => {
                      handleThreadSubmit(share.shareID);
                    }}
                    className="text-lg font-semibold text-[#116A7B] p-1"
                  >
                    POST
                  </button>
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
