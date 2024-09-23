import { errorAlert, successAlert } from "@/utils/alert";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#app-body");
const NewMessageModal = ({ isOpen, onClose, recipient }) => {
  const [text, setText] = useState("");
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

  const handleSendNewMessage = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const data = {
        // conversationID: selectedConversation.conversationID,
        text: text,
        sender: username,
        reciever: recipient,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/add-new-message`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      setText("");
      if (response.success) {
        onClose()
        successAlert("Success", response.message)
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message)
    }
  };
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
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "15px",
          outline: "none",
          padding: "5px",
          width: "fit",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="py-10 px-5">
        <h1 className="text-2xl text-center text-[#116A7B] font-semibold mb-5">
          New Message to <strong>{recipient}</strong>
        </h1>
        <div className="px-5 py-2 bg-white border-t border-[#D9D9D9] flex items-center">
          {/* <IoAttach className="text-gray-500 mx-2 cursor-pointer" size={24} /> */}
          {/* <IoHappy className="text-gray-500 mx-2 cursor-pointer" size={24} /> */}
          <textarea
            ref={textRef}
            // rows={1}
            type="text"
            placeholder="Type a message..."
            style={{
              resize: "none",
              overflow: "auto",
              maxHeight: "150px",
              minHeight: "28px",
            }}
            value={text}
            onChange={({ target }) => setText(target.value)}
            className="w-[75%] px-4 pt-1 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-green-500"
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === "Enter") {
                handleSendNewMessage();
              }
            }}
          />
          {/* <IoMic className="text-gray-500 mx-2 cursor-pointer" size={24} /> */}
          <button
            type="button"
            onClick={handleSendNewMessage}
            disabled={text.length === 0}
            className="disabled:opacity-30"
            title="Press Ctrl + Enter to send"
          >
            <IoSend className="text-green-500 mx-5 cursor-pointer" size={24} />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewMessageModal;
