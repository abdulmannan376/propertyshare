import { updateActivePaymentTab } from "@/app/redux/features/dashboardSlice";
import { errorAlert, successAlert } from "@/utils/alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "../modals/paymentModal";

const Payments = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);

  const activePaymentsTab = useSelector(
    (state) => state.userDashboardSliceReducer.activePaymentsTab
  );

  const fetchPayments = async (status) => {
    try {
      setIsPaymentsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/get-payments-by-user/?username=${username}&status=${status}`
      );

      const response = await res.json();
      setIsPaymentsLoading(false);
      setPayments(response.body);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    if (activePaymentsTab === "My Payments") fetchPayments("all");
    else if (activePaymentsTab === "Pending Payments") fetchPayments("Pending");
  }, [activePaymentsTab]);

  const [isGenPayment, setIsGenPayment] = useState(false);

  const [query, setQuery] = useState("");
  const [usersList, setUsersList] = useState([]);
  const searchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/search-users/?username=${query}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      setUsersList(response.users);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    searchUsers();
  }, [query]);

  const [recipient, setRecipient] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDiscountType, setSelectedDiscountType] =
    useState("no discount");

  const discountTypes = ["no discount", "percentage", "currency"];

  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [purpose, setPurpose] = useState("");

  // Function to calculate discount by percentage
  function calDiscountByPercentage() {
    const discount = (totalAmount * discountValue) / 100;
    setDiscountAmount(discount);
    setSubtotal(totalAmount - discount);
  }

  // Function to calculate discount by currency value
  function calDiscountByCurrency() {
    setDiscountAmount(discountValue);
    setSubtotal(totalAmount - discountValue);
  }

  useEffect(() => {
    if (selectedDiscountType !== "no discount" && totalAmount > 0) {
      if (selectedDiscountType === "percentage") {
        calDiscountByPercentage();
      } else if (selectedDiscountType === "currency") {
        calDiscountByCurrency();
      }
    } else {
      setDiscountAmount(0);
      setDiscountValue(0);
      setSubtotal(totalAmount);
    }
  }, [selectedDiscountType, totalAmount, discountValue]);

  const [isLoading, setIsLoading] = useState(false);

  const handleGenPayment = async () => {
    try {
      setIsLoading(true);
      const data = {
        recipient,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        purpose,
        amount: totalAmount,
        discountType: selectedDiscountType,
        discountValue,
      };

      console.log(data);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/generate-payment`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      setIsLoading(false);
      if (response.success) {
        successAlert("Success", "Payment sent to user.");
        setRecipient("");
        setQuery("");
        setTotalAmount(0);
        setSubtotal(0);
        setSelectedDiscountType("no discount");
        setDiscountValue(0);
        setDiscountAmount(0);
        setPurpose("");
        setIsGenPayment(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      errorAlert("Error", error.message);
    }
  };

  const [selectedPaymentID, setSelectedPaymentID] = useState("");
  const [payingAmount, setPayingAmount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPaymentModal = async () => setIsModalOpen(true);
  const handleClosePaymentModal = async () => setIsModalOpen(false);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center justify-between border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Bills And Payments</h1>
        {JSON.parse(localStorage.getItem("userDetails")).role === "admin" && (
          <div>
            {isGenPayment ? (
              <button
                type="button"
                onClick={() => setIsGenPayment(false)}
                className="w-52 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
              >
                {" "}
                Back{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsGenPayment(true)}
                className="w-52 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
              >
                {" "}
                Generate New{" "}
              </button>
            )}
          </div>
        )}
      </div>
      {!isGenPayment && (
        <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
          <button
            onClick={() => {
              dispatch(updateActivePaymentTab("My Payments"));
            }}
          >
            <h1
              className={`flex ${
                activePaymentsTab === "My Payments"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              My Payments
            </h1>
          </button>
          {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
          <button
            onClick={() => {
              dispatch(updateActivePaymentTab("Pending Payments"));
            }}
          >
            <h2
              className={`flex ${
                activePaymentsTab === "Pending Payments"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              Pending Payments
            </h2>
          </button>

          {/* </Link> */}
        </div>
      )}
      {!isGenPayment && (
        <>
          {activePaymentsTab === "My Payments" && (
            <div>
              {!isPaymentsLoading ? (
                <div className="px-14 py-6">
                  <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Payment ID
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Username
                        </th>
                        {/* <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th> */}
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Payment For
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Total Amount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Discount type
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Discount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Subtotal Amount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Time
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Status
                        </th>
                      </tr>
                    </thead>
                    {payments.length > 0 ? (
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.paymentID} className="text-sm">
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.paymentID}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.userDocID.username}
                            </td>
                            {/* <td className="border border-gray-300 px-4 py-2">
                            {payment.userDocID.name}
                          </td> */}
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.purpose}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.totalAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.discountType}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.discountAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.payingAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {new Date(payment.createdAt).toLocaleTimeString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <h1 className="w-full text-center text-xl p-5">
                        No Payments
                      </h1>
                    )}
                  </table>
                </div>
              ) : (
                <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                  <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
                </div>
              )}
            </div>
          )}
          {activePaymentsTab === "Pending Payments" && (
            <div>
              <PaymentModal
                isOpen={isModalOpen}
                onClose={handleClosePaymentModal}
                paymentID={selectedPaymentID}
                amount={payingAmount}
              />
              {!isPaymentsLoading ? (
                <div className="px-14 py-6">
                  <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Payment ID
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Username
                        </th>
                        {/* <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th> */}
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Payment For
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Total Amount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Discount type
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Discount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Subtotal Amount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Time
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {payments.length > 0 ? (
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.paymentID} className="text-sm">
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.paymentID}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.userDocID.username}
                            </td>
                            {/* <td className="border border-gray-300 px-4 py-2">
                            {payment.userDocID.name}
                          </td> */}
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.purpose}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.totalAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.discountType}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.discountAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {payment.payingAmount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {new Date(payment.createdAt).toLocaleTimeString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPaymentID(payment.paymentID);
                                  setPayingAmount(payment.payingAmount)
                                  handleOpenPaymentModal();
                                }}
                                className="text-[#116A7B] underline uppercase"
                              >
                                Pay
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <h1 className="w-full text-center text-xl p-5">
                        No Payments
                      </h1>
                    )}
                  </table>
                </div>
              ) : (
                <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                  <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {isGenPayment && (
        <>
          <div className="w-full flex flex-row flex-wrap my-6 px-14">
            {/* Input field for username query */}
            <div className="relative mx-6  ">
              <div
                onBlur={() => setTimeout(() => setUsersList([]), 200)}
                className="flex flex-col pt-1 "
              >
                <label htmlFor="recipient" className="text-[#676767]">
                  Recipient Username
                </label>
                <input
                  type="text"
                  placeholder="Required"
                  value={query}
                  onChange={(e) => {
                    setRecipient("");
                    setQuery(e.target.value);
                  }}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              {/* Dropdown to show results from usersList */}
              {usersList.length > 0 && (
                <div className="absolute z-10 w-[620px] max-h-[44rem] overflow-y-auto bg-white border border-gray-300 rounded-md mt-1">
                  {usersList.map((user) => (
                    <button
                      key={user._id}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        console.log("onclick");
                        setQuery(user.username);
                        setRecipient(user.username);
                      }}
                      className="w-full text-start px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {user.username}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col mx-6  mb-5">
              <label htmlFor="propertyImages" className="text-[#676767]">
                Total Amount
              </label>
              <input
                type="number"
                placeholder="Required"
                inputMode="numeric"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
            </div>
            <div className="flex flex-col mx-6 mb-5">
              <label htmlFor="propertyImages" className="text-[#676767]">
                Purpose Of Payment (min 20 characters)
              </label>
              <textarea
                type="text"
                rows={5}
                placeholder="Required"
                style={{ resize: "none", overflow: "hidden" }}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-xl"
              />
            </div>
            <div className="relative mb-6 ml-6 flex flex-col">
              <div>
                <label htmlFor="discountType" className="text-[#676767]">
                  Discount Type
                </label>
                <select
                  name="discountType"
                  value={selectedDiscountType}
                  onChange={({ target }) => {
                    setSelectedDiscountType(target.value);
                    if (target.value === "no discount") {
                      setDiscountValue("");
                    }
                  }}
                  className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                >
                  {discountTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="discountType"
                value={selectedDiscountType}
                required={true}
                readOnly={true}
                className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
              {/* <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
              *
            </span>  */}
            </div>
            {selectedDiscountType !== "no discount" && (
              <div className="flex flex-col mx-6  mb-5">
                <label htmlFor="propertyImages" className="text-[#676767]">
                  Discount
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={discountValue}
                  readOnly={selectedDiscountType === "no discount"}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
            )}
          </div>
          <div className="px-20 my-5 space-y-5 text-[#116A7B]">
            <h2 className="text-2xl">
              <strong> Discount: {discountAmount}</strong>{" "}
            </h2>
            <h2 className="text-2xl">
              <strong> Subtotal: {subtotal}</strong>{" "}
            </h2>
          </div>
          <div className="mt-5 mx-20">
            <button
              onClick={handleGenPayment}
              disabled={
                recipient.length === 0 ||
                totalAmount === 0 ||
                purpose.length < 20 ||
                subtotal < 0
              }
              className="w-40 disabled:bg-opacity-30 bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
            >
              {!isLoading && "Generate"}
              {isLoading && (
                <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Payments;
