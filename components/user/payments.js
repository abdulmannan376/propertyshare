import { updateActivePaymentTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Payments = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);

  const activePaymentsTab = useSelector(
    (state) => state.userDashboardSliceReducer.activePaymentsTab
  );

  const fetchPayments = async () => {
    try {
      setIsPaymentsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/payment/get-payments-by-user/?username=${username}`
      );

      const response = await res.json();
      setIsPaymentsLoading(false);
      setPayments(response.body);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    if (activePaymentsTab === "My Payments") fetchPayments();
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
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Payment For
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
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.paymentID}>
                          <td className="border border-gray-300 px-4 py-2">
                            {payment.paymentID}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {payment.userDocID.username}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {payment.userDocID.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {payment.purpose}
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
        <div className="w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
          {/* Input field for username query */}
          <div className="flex flex-row items-center pt-1 px-14">
            <input
              type="text"
              placeholder="Search for a username..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
            />
          </div>

          {/* Dropdown to show results from usersList */}
          {usersList.length > 0 && (
            <div className="absolute z-10 w-[620px] bg-white border border-gray-300 rounded-md mt-1 mx-14">
              {usersList.map((user) => (
                <div
                  key={user._id}
                  //   onClick={() => handleUserSelect(user.username)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Payments;
