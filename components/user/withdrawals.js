import { updateActiveWithdrawalTab } from "@/app/redux/features/dashboardSlice";
import { errorAlert } from "@/utils/alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WithdrawalRequestModal from "../modals/withdrawalRequest";
import WithdrawalUpdateModal from "../modals/updateWithdrawalRequest";
import ViewImageModal from "../modals/viewImage";

const WithdrawalManagement = () => {
  const dispatch = useDispatch();
  const activeWithdrawalsTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeWithdrawalsTab
  );
  const [userData, setUserData] = useState({});
  const [myWithdrawals, setMyWithdrawals] = useState([]);
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

  const [disptachWithdrawal, setDisptachWithdrawal] = useState(false);
  const [requestWithdrawal, setRequestWithdrawal] = useState(false);

  const handleOpenRequestModal = () => setRequestWithdrawal(true);
  const handleCloseRequestModal = () => setRequestWithdrawal(false);

  const [isWithdrawalsLoading, setIsWithdrawalsLoading] = useState(false);

  const fetchWithdrawals = async (filter) => {
    try {
      setIsWithdrawalsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const isAdmin =
        JSON.parse(localStorage.getItem("userDetails")).role === "admin"
          ? true
          : false;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-user-withdrawals/?username=${username}&filter=${filter}&isAdmin=${isAdmin}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      setIsWithdrawalsLoading(false);
      if (response.success) {
        setMyWithdrawals(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsWithdrawalsLoading(false);
      errorAlert(error.message, "");
    }
  };

  useEffect(() => {
    if (activeWithdrawalsTab === "My Withdrawals") {
      fetchWithdrawals("all");
    } else if (activeWithdrawalsTab === "Pending Withdrawals") {
      fetchWithdrawals("Pending");
    } else if (activeWithdrawalsTab === "Dispatched Withdrawals") {
      fetchWithdrawals("Dispatched");
    }
  }, [activeWithdrawalsTab]);

  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [updateWithdrawal, setUpdateWithdrawal] = useState(false);

  const handleOpenUpdateWithdrawalModal = () => setUpdateWithdrawal(true);
  const handleCloseUpdateWithdrawalModal = () => setUpdateWithdrawal(false);

  const handleWithdrawalUpdate = async (withdrawalID, action) => {
    try {
      const data = {
        withdrawalID,
        action,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/update-withdrawal`,
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
        fetchWithdrawals("Pending");
        fetchUserData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert(error.message, "");
    }
  };

  const [viewImage, setViewImage] = useState(false);

  const handleOpenViewImageModal = () => setViewImage(true);
  const handleCloseViewImage = () => setViewImage(false);

  const [viewImageSrc, setViewImageSrc] = useState("");

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center justify-between border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Withdrawal Management</h1>
        {JSON.parse(localStorage.getItem("userDetails")).role !== "admin" && (
          <div>
            {requestWithdrawal ? (
              <button
                type="button"
                onClick={() => setRequestWithdrawal(false)}
                className="w-52 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
              >
                {" "}
                Back{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenRequestModal}
                className="w-52 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
              >
                {" "}
                New Request{" "}
              </button>
            )}
          </div>
        )}
      </div>
      {JSON.parse(localStorage.getItem("userDetails")).role !== "admin" && (
        <div className="mx-14 my-5">
          <h2 className="text-2xl text-[#116A7B]">
            Available Balance: <strong>${userData.availBalnc}</strong>
          </h2>
        </div>
      )}
      <WithdrawalRequestModal
        isOpen={requestWithdrawal}
        onClose={handleCloseRequestModal}
        fetchWithdrawals={fetchWithdrawals}
        fetchUserData={fetchUserData}
      />
      <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
        {JSON.parse(localStorage.getItem("userDetails")).role !== "admin" && (
          <button
            onClick={() => {
              dispatch(updateActiveWithdrawalTab("My Withdrawals"));
            }}
          >
            <h1
              className={`flex ${
                activeWithdrawalsTab === "My Withdrawals"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              My Withdrawals
            </h1>
          </button>
        )}
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() => {
            dispatch(updateActiveWithdrawalTab("Pending Withdrawals"));
          }}
        >
          <h2
            className={`flex ${
              activeWithdrawalsTab === "Pending Withdrawals"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Pending Withdrawals
          </h2>
        </button>
        {JSON.parse(localStorage.getItem("userDetails")).role === "admin" && (
          <button
            onClick={() => {
              dispatch(updateActiveWithdrawalTab("Dispatched Withdrawals"));
            }}
          >
            <h2
              className={`flex ${
                activeWithdrawalsTab === "Dispatched Withdrawals"
                  ? "underline-text"
                  : "hover-underline-animation"
              } `}
            >
              Dispatched Withdrawals
            </h2>
          </button>
        )}

        {/* </Link> */}
      </div>

      <div>
        {activeWithdrawalsTab === "My Withdrawals" && (
          <div>
            <ViewImageModal
              isOpen={viewImage}
              onClose={handleCloseViewImage}
              imageSrc={viewImageSrc}
            />
            {!isWithdrawalsLoading ? (
              <div className="px-14 py-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Withdrawal ID
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Username
                      </th>
                      {/* <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th> */}

                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Amount
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
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Reciept
                      </th>
                    </tr>
                  </thead>
                  {myWithdrawals.length > 0 ? (
                    <tbody>
                      {myWithdrawals.map((withdrawal) => (
                        <tr key={withdrawal.withdrawalID} className="text-sm">
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.withdrawalID}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.userDocID.username}
                          </td>
                          {/* <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.userDocID.name}
                          </td> */}

                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.amount}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(
                              withdrawal.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(
                              withdrawal.createdAt
                            ).toLocaleTimeString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.status}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.status === "Dispatched" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setViewImageSrc(`${process.env.NEXT_PUBLIC_SERVER_HOST}/${withdrawal.imageDir}reciept.png`);
                                  handleOpenViewImageModal();
                                }}
                                className="text-blue-500 uppercase underline"
                              >
                                View
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <h1 className="w-full text-center text-xl p-5">
                      No Withdrawals
                    </h1>
                  )}
                </table>
              </div>
            ) : (
              <div className="bg-white w-full my-6 h-[20rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
              </div>
            )}
          </div>
        )}
        {activeWithdrawalsTab === "Pending Withdrawals" && (
          <div>
            <WithdrawalUpdateModal
              isOpen={updateWithdrawal}
              onClose={handleCloseUpdateWithdrawalModal}
              withdrawal={selectedWithdrawal}
            />
            {!isWithdrawalsLoading ? (
              <div className="px-14 py-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Withdrawal ID
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Username
                      </th>
                      {/* <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th> */}

                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Amount
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Date
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Time
                      </th>
                      {JSON.parse(localStorage.getItem("userDetails")).role !==
                        "admin" && (
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Status
                        </th>
                      )}
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {myWithdrawals.length > 0 ? (
                    <tbody>
                      {myWithdrawals.map((withdrawal) => (
                        <tr key={withdrawal.withdrawalID} className="text-sm">
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.withdrawalID}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.userDocID.username}
                          </td>
                          {/* <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.userDocID.name}
                          </td> */}

                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.amount}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(
                              withdrawal.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(
                              withdrawal.createdAt
                            ).toLocaleTimeString()}
                          </td>
                          {JSON.parse(localStorage.getItem("userDetails"))
                            .role !== "admin" && (
                            <td className="border border-gray-300 px-4 py-2">
                              {withdrawal.status}
                            </td>
                          )}
                          {JSON.parse(localStorage.getItem("userDetails"))
                            .role === "admin" && (
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedWithdrawal(withdrawal);
                                  handleOpenUpdateWithdrawalModal();
                                }}
                                className="text-blue-500 underline uppercase"
                              >
                                update
                              </button>
                            </td>
                          )}
                          {JSON.parse(localStorage.getItem("userDetails"))
                            .role !== "admin" && (
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                type="button"
                                onClick={() => {
                                  handleWithdrawalUpdate(
                                    withdrawal.withdrawalID,
                                    "cancel"
                                  );
                                }}
                                className="text-blue-500 underline uppercase"
                              >
                                cancel
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <h1 className="w-full text-center text-xl p-5">
                      No Withdrawals
                    </h1>
                  )}
                </table>
              </div>
            ) : (
              <div className="bg-white w-full my-6 h-[20rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
              </div>
            )}
          </div>
        )}
        {activeWithdrawalsTab === "Dispatched Withdrawals" && (
          <div>
            {!isWithdrawalsLoading ? (
              <div className="px-14 py-6">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Withdrawal ID
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Username
                      </th>
                      {/* <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th> */}

                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Amount
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
                  {myWithdrawals.length > 0 ? (
                    <tbody>
                      {myWithdrawals.map((withdrawal) => (
                        <tr key={withdrawal.withdrawalID} className="text-sm">
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.withdrawalID}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.userDocID.username}
                          </td>
                          {/* <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.userDocID.name}
                          </td> */}

                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.amount}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(
                              withdrawal.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(
                              withdrawal.createdAt
                            ).toLocaleTimeString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {withdrawal.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <h1 className="w-full text-center text-xl p-5">
                      No Withdrawals
                    </h1>
                  )}
                </table>
              </div>
            ) : (
              <div className="bg-white w-full my-6 h-[20rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalManagement;