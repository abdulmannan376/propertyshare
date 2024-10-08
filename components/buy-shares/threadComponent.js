import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import NewThread from "../modals/newThread";
import { useSelector } from "react-redux";
import Image from "next/image";
import { MdOutlineMessage } from "react-icons/md";
import MakeOffer from "../modals/makeOffer";
import NewMessageModal from "../modals/newMessageModal";
import { errorAlert, successAlert } from "@/utils/alert";

const Thread = ({
  thread,
  isFirstLevel,
  threadIndex,
  threadCategory,
  shareOwner,
  threadLevel,
  propertyID,
  startDate,
  endDate,
  shareID,
}) => {
  const [isMakeOfferModalOpen, setIsMakeOfferModalOpen] = useState(false);

  const handleCloseMakeOfferModal = () => setIsMakeOfferModalOpen(false);
  const handleOpenMakeOfferModal = () => setIsMakeOfferModalOpen(true);

  const [fetchChildren, setFetchChildren] = useState(false);
  const [children, setChildren] = useState([]);
  const handleFetchChildren = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-childern-by-parent/${thread.threadID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setChildren(response.body);

        if (!response.body) {
          successAlert("Success", response.body);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  useEffect(() => {
    if (fetchChildren) {
      handleFetchChildren();
      setFetchChildren(false);
    }
  }, [fetchChildren]);

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
        category: threadCategory,
        threadLevel: `${threadLevel + 1}`,
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
        setFetchChildren(true);
        successAlert("Success", response.message);
        setText("");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  const handleNewMessageModalOpen = () => setIsNewMessageModalOpen(true);
  const handleNewMessageModalClose = () => setIsNewMessageModalOpen(false);

  return (
    <div
      className={`${isFirstLevel ? "" : "pl-4 border-l border-gray-600 ml-0"}`}
    >
      <MakeOffer
        isOpen={isMakeOfferModalOpen}
        onClose={handleCloseMakeOfferModal}
        username={thread?.author?.username}
        category={threadCategory}
        propertyID={propertyID}
        startDate={startDate}
        endDate={endDate}
        shareID={shareID}
      />
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={handleNewMessageModalClose}
        recipient={thread?.author?.username}
      />
      <div className="my-2 mx-5">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row">
            <Image
              width={500}
              height={500}
              src={"/dummy-image.png"}
              className="w-10 h-10"
              alt="profile picture"
            />
            <div className="my-2">
              <div className="bg-white px-2 mb-2 rounded-md text-xl text-[#116A7B] font-semibold">
                {thread?.author?.name}{" "}
                <strong className="text-sm">
                  {thread?.author?.username === shareOwner ? "share owner" : ""}
                </strong>
              </div>
              {thread.title?.length > 0 && (
                <div className="bg-white text-xl p-2 rounded-md shadow-sm">
                  {thread?.title}
                </div>
              )}

              <div className="bg-white px-2 rounded-md ">{thread.body}</div>
              {threadLevel < 2 && (
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
                    onClick={() => {
                      if (children?.length > 0) {
                        setChildren([]);
                      } else {
                        setFetchChildren(true);
                      }
                    }}
                    type="button"
                    className="text-[#116A7B] text-sm font-semibold px-2"
                  >
                    {children && children?.length > 0
                      ? "Hide replies"
                      : "Show replies"}
                  </button>
                </div>
              )}
            </div>
          </div>
          {thread?.author?.username !==
            JSON.parse(localStorage.getItem("userDetails")).username && (
            <div className="flex flex-row items-center space-x-3">
              <button type="button" onClick={handleNewMessageModalOpen}>
                <MdOutlineMessage className="text-xl text-[#A2B0B2] " />
              </button>
            </div>
          )}
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
              onKeyDown={(event) => {
                if (event.ctrlKey && event.key === "Enter") {
                  handleReplySubmit(thread.threadID);
                  event.preventDefault();
                }
              }}
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

        {children &&
          children.map((child, index) => (
            <Thread
              key={child.id}
              thread={child}
              isFirstLevel={false}
              threadCategory={threadCategory}
              threadIndex={threadIndex}
              childIndex={index}
              threadLevel={parseInt(child.threadLevel)}
              propertyID={propertyID}
              startDate={startDate}
              endDate={endDate}
              shareID={shareID}
            />
          ))}
      </div>
    </div>
  );
};

const ThreadDisplay = ({ propertyID, propertyDocID, category }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [threadCategory, setThreadCategory] = useState(category);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [threads, setThreads] = useState([]);

  const userRole = useSelector((state) => state.adminSliceReducer.userRole);

  const fetchThreads = async (shareID) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-root-threads/${shareID}/${category}`,
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
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-category/${propertyID}/${category}`,
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

  const handleFetchChildren = async (threadID, threadIndex, threadLevel) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-childern-by-parent/${threadID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        if (threadLevel === 1) {
          setThreads((prevData) => {
            const newData = [...prevData];
            newData[threadIndex].children[childIndex] = response.body;
            return newData;
          });
        } else {
          setThreads((prevData) => {
            const newData = [...prevData];
            newData[threadIndex].children = response.body;
            return newData;
          });
        }

        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const [selectedThread, setSelectedThread] = useState(-1);

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
        threadLevel: "0",
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
        successAlert("Success", response.message);
        setText("");
        fetchThreads(shareID);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const handleSubmit = async (e, shareID, price) => {
    e.preventDefault();

    try {
      const data = {
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        shareID: shareID,
        category: category,
        price: price,
      };
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
        setNewThreadSubmitted(true);
        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const handleMakeOffer = async (e, price, shareID) => {
    e.preventDefault();
    try {
      if (price === 0) {
        throw new Error("Price cannot be 0");
      }
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const data = {
        username: username,
        shareID: shareID,
        price: price,
        category: category,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/gen-new-offer`,
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
        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  return (
    <>
      {userRole === "shareholder" && (
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
      )}
      {userRole === "admin" && (
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
      )}
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
                <div>
                  <h2 className="text-xl">
                    Share Owner:{" "}
                    <strong>{share.currentOwnerDocID.username}</strong>
                  </h2>
                  <h2 className="text-xl">
                    Price:{" "}
                    <strong>
                      {share.priceByCategory
                        ? `$${share.priceByCategory}`
                        : "-"}
                    </strong>
                  </h2>
                  <h1>
                    <strong
                      className={`text-2xl ${
                        selectedThread === index
                          ? "text-white"
                          : "text-[#ABB5B7]"
                      }  font-normal`}
                    >
                      {" "}
                      Duration:
                    </strong>{" "}
                    <br />{" "}
                    {processDate(
                      share.availableInDuration.startDateString
                    )} - {processDate(share.availableInDuration.endDateString)}
                  </h1>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const username = JSON.parse(
                        localStorage.getItem("userDetails")
                      ).username;
                      if (share.currentOwnerDocID.username === username) {
                        handleSubmit(e, share.shareID, share.priceByCategory);
                      } else {
                        handleMakeOffer(
                          e,
                          share.priceByCategory,
                          share.shareID
                        );
                      }
                    }}
                    className={` text-xl font-semibold p-1 rounded-full cursor-pointer`}
                  >
                    {share.currentOwnerDocID.username ===
                    JSON.parse(localStorage.getItem("userDetails")).username
                      ? "CLOSE"
                      : "REQUEST"}
                  </button>
                </div>
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
                        shareOwner={share.currentOwnerDocID.username}
                        thread={thread}
                        isFirstLevel={true}
                        threadIndex={index}
                        handleFetchChildren={handleFetchChildren}
                        threadCategory={thread.category}
                        threadLevel={parseInt(thread.threadLevel)}
                        propertyID={propertyID}
                        startDate={processDate(
                          share.availableInDuration.startDateString
                        )}
                        endDate={processDate(
                          share.availableInDuration.endDateString
                        )}
                        shareID={share.shareID}
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
                    onKeyDown={(event) => {
                      if (event.ctrlKey && event.key === "Enter") {
                        handleThreadSubmit(share.shareID);
                        event.preventDefault();
                      }
                    }}
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
