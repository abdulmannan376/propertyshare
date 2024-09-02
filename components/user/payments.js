import { updateActivePaymentTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Payments = () => {
    const dispatch = useDispatch()
  const [payments, setPayments] = useState([]);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);

  const activePaymentsTab = useSelector(
    (state) => state.userDashboardSliceReducer.activePaymentsTab
  );

  useEffect(() => {
    // Fetch payment data from the server
    const fetchPayments = async () => {
      try {
        setIsPaymentsLoading(true);
        const username = JSON.parse(
          localStorage.getItem("userDetails")
        ).username;
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

    fetchPayments();
  }, []);
  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Bills And Payments</h1>
      </div>
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
    </div>
  );
};

export default Payments;
