import Image from "next/image";
import React, { useState } from "react";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateMessageByActions } from "@/app/redux/features/conversationSlice";

const MessageComponent = ({ message, participants }) => {
  const dispatch = useDispatch();
  function handleViewer() {
    const username = JSON.parse(localStorage.getItem("userDetails")).username;
    const isViewer = participants[0].username === username;

    return isViewer ? 1 : 0;
  }

  const [showActions, setShowActions] = useState(false);

  const handleMessageActions = async (action, id, recipient) => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const data = {
        id: id,
        action: action,
        username: username,
        recipient: recipient,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/update-message-actions`,
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
        dispatch(updateMessageByActions(response.body));
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
      className={`message flex flex-row items-center ${
        message?.sender?.username === participants[handleViewer()]?.username
          ? "self-start text-left justify-start"
          : "self-end text-right justify-end"
      } mb-4`}
      onMouseOver={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {message?.sender?.username === participants[handleViewer()]?.username && (
        <Image
          width={1000}
          height={1000}
          src={
            participants[handleViewer()].userProfile.profilePicURL.length > 0
              ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                  participants[handleViewer()].userProfile.profilePicURL
                }profile-pic.png`
              : "/dummy-image.png"
          }
          className="w-10 h-10 object-contain object-center rounded-full mr-3"
          alt="user profile pic"
        />
      )}
      {message?.sender?.username ===
        participants[handleViewer() === 1 ? 0 : 1]?.username &&
        message?.isLiked && <FaHeart className="text-red-300 mx-3" />}
      <div
        className={`inline-flex px-4 py-2 rounded-xl ${
          message?.sender?.username === participants[handleViewer()]?.username
            ? "bg-gray-200 text-black rounded-bl-none"
            : "bg-green-500 text-white rounded-br-none"
        }`}
      >
        {message.text}
        <div className="w-4 flex flex-col justify-end">
          {message?.sender?.username ===
            participants[handleViewer() === 1 ? 0 : 1]?.username &&
            !message.isOpened && (
              <IoCheckmark className="text-sm mt-2 ml-2 text-gray-600" />
            )}
          {message?.sender?.username ===
            participants[handleViewer() === 1 ? 0 : 1]?.username &&
            message.isOpened && (
              <IoCheckmarkDone className="text-sm mt-2 ml-2 text-blue-600" />
            )}
        </div>
      </div>
      {message?.sender?.username === participants[handleViewer()]?.username &&
        message?.isLiked && (
          <button
            type="button"
            onClick={() =>
              handleMessageActions(
                "Like",
                message?.messageID,
                message?.sender?.username
              )
            }
          >
            {" "}
            <FaHeart className="text-red-300 mx-3" />
          </button>
        )}
      {message?.sender?.username === participants[handleViewer()]?.username &&
        showActions &&
        !message?.isLiked && (
          <button
            type="button"
            onClick={() =>
              handleMessageActions(
                "Like",
                message?.messageID,
                message?.sender?.username
              )
            }
          >
            {" "}
            <FaRegHeart className="text-red-300 mx-3" />
          </button>
        )}
      {message?.sender?.username ===
        participants[handleViewer() === 1 ? 0 : 1]?.username && (
        <Image
          width={1000}
          height={1000}
          src={
            participants[handleViewer() === 1 ? 0 : 1].userProfile.profilePicURL
              .length > 0
              ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                  participants[handleViewer() === 1 ? 0 : 1].userProfile
                    .profilePicURL
                }profile-pic.png`
              : "/dummy-image.png"
          }
          className="w-10 h-10 object-contain object-center rounded-full ml-3"
          alt="user profile pic"
        />
      )}
    </div>
  );
};

export default MessageComponent;
