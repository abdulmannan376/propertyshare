import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DropIn from "braintree-web-drop-in";
import { errorAlert, successAlert } from "@/utils/alert";
import { useSelector } from "react-redux";

Modal.setAppElement("#app-body");

const WithdrawalRequestModal = ({
  isOpen,
  onClose,
  payment,
  fetchWithdrawals,
  fetchUserData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [amount, setAmount] = useState(0);
  const activeWithdrawalsTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeWithdrawalsTab
  );

  // Handle payment submission
  const handleWithdrawalRequest = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      //   const purpose = `Buy Share of Property: ${propertyID}`;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/gen-withdrawal/?username=${username}&amount=${amount}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await res.json();

      setIsLoading(false);
      if (response.success) {
        if (activeWithdrawalsTab === "My Withdrawals") {
          fetchWithdrawals("all");
        } else if (activeWithdrawalsTab === "Pending Withdrawals") {
          fetchWithdrawals("Pending");
        } else if (activeWithdrawalsTab === "Dispatched Withdrawals") {
          fetchWithdrawals("Dispatched");
        }
        fetchUserData()
        setAmount(0)
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
          // border: "1px solid #ccc",
          background: "transparent",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "15px",
          outline: "none",
          padding: "5px",
          width: "full",
          maxHeight: "80vh",
        },
      }}
    >
      <div className="sm:p-10 p-5 lg:w-[30vw] md:w-[50vw] sm:w-[70vw] w-[95vw] bg-white rounded-2xl">
        <h1 className="text-2xl font-semibold text-[#116A7B] text-center">
          Withdrawal Request
        </h1>
        <div className="flex flex-col my-5">
          <label
            htmlFor="Withdrawal Amount"
            className="text-[#676767] text-center"
          >
            Amount
          </label>
          <input
            type="number"
            inputMode="numeric"
            name="Withdrawal Amount"
            required={true}
            value={amount}
            placeholder="Enter amount..."
            onChange={({ target }) => setAmount(target.value)}
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

export default WithdrawalRequestModal;
