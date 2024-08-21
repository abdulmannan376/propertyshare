import { addNewMessage } from "@/app/redux/features/conversationSlice";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  IoSend,
  IoCheckmark,
  IoCheckmarkDone,
  IoAttach,
  IoHappy,
  IoMic,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ChatComponent({ selectedConversation }) {

    const dispatch = useDispatch()
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "inherit"; // Reset the height so the scrollHeight measurement is correct
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;

      // Ensure height doesn't exceed maxHeight
      if (textRef.current.scrollHeight > 150) {
        textRef.current.style.height = "150px"; // Match maxHeight
      }

      // Update border-radius dynamically
      const currentHeight = textRef.current.scrollHeight;
      const borderRadius = currentHeight < 40 ? "100%" : "20px"; // Adjust values as needed
      textRef.current.style.borderRadius = borderRadius;
    }
  }, [text]); // Adjust height whenever text changes

  function handleViewer() {
    const username = JSON.parse(localStorage.getItem("userDetails")).username;
    const isViewer = selectedConversation.participants[0].username === username;

    return isViewer ? 1 : 0;
  }

  const handleSendNewMessage = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const data = {
        conversationID: selectedConversation.conversationID,
        text: text,
        sender: username,
        reciever:
          selectedConversation.participants[0].username === username
            ? selectedConversation.participants[1].username
            : selectedConversation.participants[0].username,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/add-new-message`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const response = await res.json()
      if(response.success) {
        dispatch(addNewMessage(response.body))
      } else {
        throw new Error(response.message)
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
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-b from-green-200 to-white w-full mt-6 lg:h-[85vh] md:h-[89vh] lg:max-h-[85vh] max-h-[93vh] rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex flex-row items-center border-b border-b-[#D9D9D9] pb-5 px-14 bg-white">
          <h1 className="text-2xl font-semibold text-green-800">
            {selectedConversation?.participants?.length > 0
              ? selectedConversation?.participants[handleViewer()]?.name
              : ""}
          </h1>
        </div>

        {/* Messages */}
        <div className="px-14 py-5 h-[75dvh] max-h-[75dvh] overflow-y-auto">
          {selectedConversation.messages?.map((message, index) => (
            <div
              key={index}
              className={`message flex flex-row items-center ${
                message?.sender?.username ===
                selectedConversation.participants[handleViewer()]?.username
                  ? "self-start text-left justify-start"
                  : "self-end text-right justify-end"
              } mb-4`}
            >
              {message?.sender?.username ===
                selectedConversation.participants[handleViewer()]?.username && (
                <Image
                  width={1000}
                  height={1000}
                  src={
                    selectedConversation.participants[handleViewer()]
                      .userProfile.profilePicURL.length > 0
                      ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                          selectedConversation.participants[handleViewer()]
                            .userProfile.profilePicURL
                        }profile-pic.png`
                      : "/dummy-image.png"
                  }
                  className="w-10 h-10 object-contain object-center rounded-full mr-3"
                  alt="user profile pic"
                />
              )}

              <div
                className={`inline-flex px-4 py-2 rounded-xl ${
                  message?.sender?.username ===
                  selectedConversation.participants[handleViewer()]?.username
                    ? "bg-gray-200 text-black rounded-bl-none"
                    : "bg-green-500 text-white rounded-br-none"
                }`}
              >
                {message.text}
                <div className="w-4 flex flex-col justify-end">
                  {message?.sender?.username ===
                    selectedConversation.participants[
                      handleViewer() === 1 ? 0 : 1
                    ]?.username &&
                    !message.isOpened && (
                      <IoCheckmark className="text-sm mt-2 ml-2 text-gray-600" />
                    )}
                  {message?.sender?.username ===
                    selectedConversation.participants[
                      handleViewer() === 1 ? 0 : 1
                    ]?.username &&
                    message.isOpened && (
                      <IoCheckmarkDone className="text-sm mt-2 ml-2 text-blue-600" />
                    )}
                </div>
              </div>
              {message?.sender?.username ===
                selectedConversation.participants[handleViewer() === 1 ? 0 : 1]
                  ?.username && (
                <Image
                  width={1000}
                  height={1000}
                  src={
                    selectedConversation.participants[
                      handleViewer() === 1 ? 0 : 1
                    ].userProfile.profilePicURL.length > 0
                      ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                          selectedConversation.participants[
                            handleViewer() === 1 ? 0 : 1
                          ].userProfile.profilePicURL
                        }profile-pic.png`
                      : "/dummy-image.png"
                  }
                  className="w-10 h-10 object-contain object-center rounded-full ml-3"
                  alt="user profile pic"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="fixed bottom-0 w-full px-5 py-2 bg-white border-t border-[#D9D9D9] flex items-center">
          {/* <IoAttach className="text-gray-500 mx-2 cursor-pointer" size={24} /> */}
          {/* <IoHappy className="text-gray-500 mx-2 cursor-pointer" size={24} /> */}
          <textarea
            ref={textRef}
            // rows={1}
            type="text"
            placeholder="Type a message..."
            style={{ resize: "none", overflow: "auto", maxHeight: "150px" }}
            value={text}
            onChange={({ target }) => setText(target.value)}
            className="w-[77%] px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-500"
          />
          {/* <IoMic className="text-gray-500 mx-2 cursor-pointer" size={24} /> */}
          <button
            type="button"
            onClick={handleSendNewMessage}
            disabled={text.length === 0}
            className="disabled:opacity-30"
          >
            <IoSend className="text-green-500 mx-2 cursor-pointer" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
