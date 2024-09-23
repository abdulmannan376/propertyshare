import { updateActivePaymentTab } from "@/app/redux/features/dashboardSlice";
import { errorAlert, successAlert } from "@/utils/alert";
import React, { useEffect, useRef, useState } from "react";
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

  const fetchMyRecievings = async () => {
    try {
      setIsPaymentsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/get-payments-by-reciever/?username=${username}`
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
    else if (activePaymentsTab === "My Recievings") fetchMyRecievings();
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

  const [selectedPayment, setSelectedPayment] = useState({});
  const [payingAmount, setPayingAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPaymentModal = async () => setIsModalOpen(true);
  const handleClosePaymentModal = async () => setIsModalOpen(false);

  const myPaymentsRef = useRef(null);
  const pendingPaymentsRef = useRef(null);
  const myRecievingsRef = useRef(null);

  const handleScrollIntoView = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth", // Adds a smooth scroll effect
      block: "nearest", // Ensures the element is scrolled to the nearest visible area
      inline: "center", // Keeps the element centered in the view horizontally
    });
  };

  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-user-data`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setUserData(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert(error.message, "");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center justify-between border-b border-b-[#D9D9D9] pt-1 pb-7 sm:px-14 pl-14 pr-5">
        <h1 className="text-2xl font-medium">Bills And Payments</h1>
        {JSON.parse(localStorage.getItem("userDetails")).role === "admin" && (
          <div>
            {isGenPayment ? (
              <button
                type="button"
                onClick={() => setIsGenPayment(false)}
                className="sm:w-52 w-32 bg-[#116A7B] text-white sm:text-lg text-sm ml-auto mx-1 sm:px-5 px-3 py-1 rounded-full"
              >
                {" "}
                Back{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsGenPayment(true)}
                className="sm:w-52 w-32 bg-[#116A7B] text-white sm:text-lg text-sm ml-auto mx-1 sm:px-5 px-3 py-1 rounded-full"
              >
                {" "}
                Generate New{" "}
              </button>
            )}
          </div>
        )}
      </div>
      {!isGenPayment && (
        <div className="max-w-screen overflow-x-auto flex items-center justify-start md:space-x-20 space-x-14 my-3 md:px-14 px-5 text-white text-2xl font-semibold">
          <button
            onClick={() => {
              dispatch(updateActivePaymentTab("My Payments"));
              handleScrollIntoView(myPaymentsRef);
            }}
            ref={myPaymentsRef}
          >
            <h1
              className={`flex w-44 whitespace-nowrap ${
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
              handleScrollIntoView(pendingPaymentsRef);
            }}
            ref={pendingPaymentsRef}
          >
            <h2
              className={`flex w-56 whitespace-nowrap ${
                activePaymentsTab === "Pending Payments"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              Pending Payments
            </h2>
          </button>
          <button
            onClick={() => {
              dispatch(updateActivePaymentTab("My Recievings"));
              handleScrollIntoView(myRecievingsRef);
            }}
            ref={myRecievingsRef}
          >
            <h2
              className={`flex w-44 whitespace-nowrap ${
                activePaymentsTab === "My Recievings"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              My Recievings
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
                <div className="md:px-14 px-5 py-6 max-w-screen overflow-x-auto">
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
                payment={selectedPayment}
              />
              {!isPaymentsLoading ? (
                <div className="md:px-14 px-5 py-6 max-w-screen overflow-x-auto">
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
                                  setPayingAmount(payment.payingAmount);
                                  setSelectedPayment(payment);
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
          {activePaymentsTab === "My Recievings" && (
            <div>
              {!isPaymentsLoading ? (
                <div className="md:px-14 px-5 py-6 max-w-screen overflow-x-auto">
                  {JSON.parse(localStorage.getItem("userDetails")).role !==
                    "admin" && (
                    <div className=" my-5">
                      <h2 className="text-2xl text-[#116A7B]">
                        Available Balance:{" "}
                        <strong>${userData.availBalnc}</strong>
                      </h2>
                    </div>
                  )}
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
        </>
      )}
      {isGenPayment && (
        <>
          <div className="w-full flex flex-row flex-wrap my-6 md:px-14 px-5">
            {/* Input field for username query */}
            <div className="relative md:mx-6">
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
                  className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              {/* Dropdown to show results from usersList */}
              {usersList.length > 0 && (
                <div className="absolute z-10 sm:w-[620px] xs:w-[420px] w-[320px] max-h-[44rem] overflow-y-auto bg-white border border-gray-300 rounded-md mt-1">
                  {usersList.map((user) => (
                    <button
                      key={user._id}
                      onMouseDown={(e) => {
                        e.stopPropagation();
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
            <div className="flex flex-col sm:mx-6 mb-5">
              <label htmlFor="propertyImages" className="text-[#676767]">
                Total Amount
              </label>
              <input
                type="number"
                placeholder="Required"
                inputMode="numeric"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
            </div>
            <div className="flex flex-col sm:mx-6 mb-5">
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
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-xl"
              />
            </div>
            <div className="relative mb-6 sm:ml-6 flex flex-col">
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
                  className="inline-flex xs:mx-10 mx-2 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
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
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
              {/* <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
              *
            </span>  */}
            </div>
            {selectedDiscountType !== "no discount" && (
              <div className="flex flex-col sm:mx-6 mb-5">
                <label htmlFor="propertyImages" className="text-[#676767]">
                  Discount
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={discountValue}
                  readOnly={selectedDiscountType === "no discount"}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
            )}
          </div>
          <div className="sm:px-20 px-5 my-5 space-y-5 text-[#116A7B]">
            <h2 className="text-2xl">
              <strong> Discount: {discountAmount}</strong>{" "}
            </h2>
            <h2 className="text-2xl">
              <strong> Subtotal: {subtotal}</strong>{" "}
            </h2>
          </div>
          <div className="mt-5 sm:mx-20 mx-5">
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
