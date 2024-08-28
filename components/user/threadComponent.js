import { errorAlert, successAlert } from "@/utils/alert";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Thread = ({
  thread,
  isFirstLevel,
  threadIndex,
  threadCategory,
  shareOwner,
  threadLevel,

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
      console.log(response);
      if (response.success) {
        setChildren(response.body);

        if (!response.body) {
          successAlert("Success", response.message)
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message)
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
      console.log("threadLevel: ", threadLevel);
      const data = {
        threadID: threadID,
        threadBody: text,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        category: threadCategory,
        threadLevel: `${threadLevel + 1}`,
      };

      console.log("reply submit: ", data);

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
        successAlert("Success", )
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

  const profilePicURL = useSelector(
    (state) => state.adminSliceReducer.profilePicURL
  );
  return (
    <div
      className={`${isFirstLevel ? "" : "pl-4 border-l border-gray-600 ml-0"}`}
    >
      {/* <MakeOffer
        isOpen={isMakeOfferModalOpen}
        onClose={handleCloseMakeOfferModal}
        username={thread?.author?.username}
        category={threadCategory}
        startDate={startDate}
        endDate={endDate}
        shareID={shareID}
      /> */}
      <div className="my-2 mx-5">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row">
            <Image
              width={500}
              height={500}
              src={
                thread.author.userProfile.profilePicURL.length > 0
                  ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${thread.author.userProfile.profilePicURL}profile-pic.png`
                  : "/assets/user/profile/no-image.png"
              }
              className="w-10 h-10 rounded-full"
              alt="profile picture"
            />
            <div className="my-2">
              <div className="bg-white px-2 mb-2 rounded-md text-base text-[#116A7B] font-semibold">
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

              <div className="bg-white px-2 rounded-md text-sm">
                {thread.body}
              </div>
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
                      console.log("in onclick");
                      if (children?.length > 0) {
                        console.log("in if");
                        setChildren([]);
                      } else {
                        console.log("in else");
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
          {thread?.author?.username !== shareOwner &&
            JSON.parse(localStorage.getItem("userDetails")).username ===
              shareOwner && (
              <div className="flex flex-row items-center space-x-3">
                <button type="button">
                  <MdOutlineMessage className="text-xl text-[#A2B0B2] " />
                </button>
              </div>
            )}
        </div>
        {replyForThreadID === thread.threadID && (
          <div className="bg-[#FCFBF5] flex flex-row border border-[#D9D9D9] px-5 py-3 mx-10 mb-5 rounded-full">
            <textarea
              ref={textRef}
              rows="1"
              className="w-full p-1 outline-none text-lg"
              style={{ backgroundColor: "transparent", resize: "none" }}
              value={text}
              required={true}
              onChange={({ target }) => setText(target.value)}
              onKeyDown={(event) => {
                if (text.length > 0) {
                  if (event.ctrlKey && event.key === "Enter") {
                    handleReplySubmit(thread.threadID);
                    event.preventDefault();
                  }
                }
              }}
            ></textarea>
            <button
              type="button"
              onClick={() => {
                handleReplySubmit(thread.threadID);
              }}
              disabled={text.length === 0}
              className="disabled:opacity-35 text-lg font-semibold text-[#116A7B] p-1"
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
              startDate={startDate}
              endDate={endDate}
              shareID={shareID}
            />
          ))}
      </div>
    </div>
  );
};

export default Thread;
