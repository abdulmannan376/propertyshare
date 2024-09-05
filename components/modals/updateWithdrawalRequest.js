import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DropIn from "braintree-web-drop-in";
import { errorAlert, successAlert } from "@/utils/alert";

Modal.setAppElement("#app-body");

const WithdrawalUpdateModal = ({ isOpen, onClose, withdrawal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState(null);

  // Handle payment submission
  const handleWithdrawalRequest = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      //   const purpose = `Buy Share of Property: ${propertyID}`;

      const formData = new FormData();

      formData.append("withdrawalID", withdrawal?.withdrawalID);
      formData.append("action", "dispatched");

      for (const file of files) formData.append("imageFile", file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/update-withdrawal/`,
        {
          method: "PUT",
          body: formData
        }
      );

      const response = await res.json();

      setIsLoading(false);
      if (response.success) {
        successAlert(response.message, "");
        onClose();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      onClose();
      errorAlert("Error", error.message);
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
          width: "40vw",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="p-10 ">
        <h1 className="text-2xl font-semibold text-[#116A7B] text-center">
          Withdrawal Update
        </h1>
        <h2 className="text-xl text-[#116A7B] mt-5 text-center">
          Amount: <strong>${withdrawal?.amount}</strong>
        </h2>
        <div className="flex flex-col mt-6">
          <label
            htmlFor="propertyImages"
            className="text-[#676767] text-center"
          >
            Reciept
          </label>
          <input
            type="file"
            accept="image/png"
            required={true}
            onChange={({ target }) => setFiles(target.files)}
            className="w-full text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
          />
        </div>
        <div className="mt-4 flex flex-row justify-center">
          <button
            onClick={handleWithdrawalRequest}
            className="w-32 bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
          >
            {!isLoading && "Submit"}
            {isLoading && (
              <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalUpdateModal;
