import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#app-body");

const RejectionModal = ({
  isOpen,
  onClose,
  fetchThreads,
  shareID,
  actionBody,
  setSelection,
}) => {
  const [comment, setComment] = useState("");

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "inherit"; // Reset the height so the scrollHeight measurement is correct
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;

      // Update border-radius dynamically
      const currentHeight = textRef.current.scrollHeight;
      const borderRadius = currentHeight < 40 ? "100%" : "20px"; // Adjust values as needed
      textRef.current.style.borderRadius = borderRadius;
    }
  }, [comment]); // Adjust height whenever text changes

  const handleThreadSubmit = async (shareID) => {
    try {
      const data = {
        shareID: shareID,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        body: comment,
        category: "Inspection",
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
        setComment("");
        fetchThreads(shareID, "Inspection");
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

  const handleInspectionAction = async () => {
    try {
      const data = {
        requestID: actionBody.requestID,
        username: actionBody.ownerUsername,
        occurence: actionBody.occurence,
        action: actionBody.action,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-raise-request-action`,
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
        setSelection(response.body);
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
          Rejection Comment
        </h1>
        <div className="flex flex-col mx-14 mb-5">
          <label htmlFor="Comment" className="text-[#676767]">
            Comment
          </label>
          <textarea
            rows={1}
            ref={textRef}
            name="Comment"
            required={true}
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            style={{ overflow: "hidden", resize: "none" }}
            className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
          />
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <button
            type="button"
            disabled={comment.length === 0}
            onClick={() => {
              onClose();
              handleInspectionAction();
              handleThreadSubmit(shareID);
            }}
            className="text-white bg-[#116A7B] disabled:opacity-35 px-5 py-3 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectionModal;
