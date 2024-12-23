"use client";
import {
  addNewNotification,
  handleNotificationRead,
  updateFavoritesList,
  updateNewMessageFlag,
  updateNewNotificationFlag,
  updateNotificationsList,
  updateUserDetails,
  updateWishList,
} from "@/app/redux/features/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSettings } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { MdMessage } from "react-icons/md";
import { updateDropdrownStatus } from "@/app/redux/features/navbarSlice";
import { useSocket } from "@/hooks/useSocket";
import { errorAlert, successAlert } from "@/utils/alert";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("getNewNotification", (message) => {
        dispatch(addNewNotification(message));
        dispatch(updateNewNotificationFlag(true));
        successAlert(message.subject, "");
      });

      socket.on("newMessage", (message) => {
        dispatch(updateNewMessageFlag(true));
      });
      return () => {
        socket.off("getNewNotification");
      };
    }
  }, [socket]);

  const textColor = useSelector((state) => state.navbarSliceReducer.textColor);
  const hoverTextColor = useSelector(
    (state) => state.navbarSliceReducer.hoverTextColor
  );
  const logoURL = useSelector((state) => state.navbarSliceReducer.logoURL);
  const notificationIconColor = useSelector(
    (state) => state.navbarSliceReducer.notificationIconColor
  );

  const menuIconColor = useSelector(
    (state) => state.navbarSliceReducer.menuIconColor
  );

  const currentPage = useSelector(
    (state) => state.navbarSliceReducer.currentPage
  );

  const bgColor = useSelector((state) => state.navbarSliceReducer.bgColor);

  const [loggedIn, setLoggedIn] = useState(false);
  const showDropDowns = useSelector(
    (state) => state.navbarSliceReducer.showDropdowns
  );

  const userEmail = useSelector((state) => state.adminSliceReducer.userEmail);
  const profilePicURL = useSelector(
    (state) => state.adminSliceReducer.profilePicURL
  );

  const [isMobView, setIsMobView] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobView(true);
    } else {
      setIsMobView(false);
    }
  }, []);

  // const [notificationsCount, setNotificationsCount] = useState(0);
  // const [notificationsList, setNotificationsList] = useState([]);

  const notificationsList = useSelector(
    (state) => state.adminSliceReducer.notificationsList
  );

  const isNewNotificationAdded = useSelector(
    (state) => state.adminSliceReducer.isNewNotificationAdded
  );

  const isNewMessageRecieved = useSelector(
    (state) => state.adminSliceReducer.isNewMessageRecieved
  );

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/notification/get-website-notifications/${
          JSON.parse(localStorage.getItem("userDetails")).username
        }`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        dispatch(updateNotificationsList(response.body.notificationList));
        if (response.body.notificationsCount > 0) {
          dispatch(updateNewNotificationFlag(true));
        } else {
          dispatch(updateNewNotificationFlag(false));
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
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
          const user = response.body;
          // console.log("checking isProfileCompleted",user.isProfileCompleted);
          
          const userDetails = {
            role: user.role,
            username: user.username,
            email: user.email,
            profilePicURL: user.userProfile.profilePicURL,
            isProfileCompleted: user.isProfileCompleted
          };
          dispatch(updateUserDetails(userDetails));
          userDetails.name = user.name;
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          socket?.emit("login", { username: user.username });
          dispatch(
            updateFavoritesList({
              action: "all",
              body: user.userProfile.favouriteList,
            })
          );
          dispatch(
            updateWishList({
              action: "all",
              body: user.userProfile.favouriteList,
            })
          );
          setLoggedIn(true);
          fetchNotifications();
        } else {
          setLoggedIn(false);
          if (response.action && response.action === "login")
            localStorage.removeItem("token");
          localStorage.removeItem("userDetails");
          setTimeout(() => {
            router.push("/login");
          }, 2000);

          throw new Error(response.message);
        }
      } catch (error) {
        errorAlert("Error", error.message);
      }
    }
  };

  useEffect(() => {
    if (pathname != "/login" && pathname != "/signup") {
      fetchUserDetails();
    }
  }, [pathname]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/user-logout`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const response = await res.json();
      if (response.success) {
        const username = JSON.parse(
          localStorage.getItem("userDetails")
        ).username;
        socket?.emit("logout", { username: username });
        successAlert("Success", response.message);
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        setTimeout(() => {
          router.refresh();
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      errorAlert("Error", error.message);
    }
  };

  const handleShowDropdown = (field, value) => {
    dispatch(updateDropdrownStatus({ field: field, value: value }));
  };

  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleUnreadNotificationSelect = async (index, all) => {
    try {
      const username = JSON.parse(
        localStorage.getItem("userDetails")
      )?.username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/notification/mark-notification-read/?key=${notificationsList[index]?.notificationID}&all=${all}&username=${username}`,
        {
          method: "PUT",
        }
      );

      const response = await res.json();
      if (response.success) {
        if (all) {
          fetchNotifications();
        } else {
          setSelectedNotification(notificationsList[index]);
          dispatch(handleNotificationRead(index));
        }
      } else {
        setSelectedNotification(null);
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const [isMobNavOpen, setIsMobNavOpen] = useState(false);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header
        className={`fixed top-0 w-full ${textColor} ${bgColor} body-font z-[5000]`}
        onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
      >
        <div className="xxl:mx-24 xl:mx-16 lg:mx-10 md:mx-5 xs:mx-3 mx-1 flex flex-wrap p-5 flex-row items-center lg:justify-normal justify-between">
          {isMobView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobNavOpen(!isMobNavOpen);
              }}
              className="mb-1 mr-5"
            >
              <TiThMenu
                className={`sm:text-3xl xs:text-2xl text-xl ${menuIconColor}`}
              />
            </button>
          )}
          <Link
            href={"/"}
            className="flex flex-col title-font font-medium items-center justify-center text-gray-900 mb-0 md:mb-0"
          >
            <Image
              width={1000}
              height={1000}
              src={logoURL}
              alt="Logo"
              className="w-auto h-10 object-contain object-center"
            />
          </Link>
          <nav className="md:ml-12 md:mr-auto lg:flex hidden flex-wrap items-center lg:text-base md:text-sm justify-center">
            <Link
              href={"/"}
              className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                currentPage.tag === "Home"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Home
            </Link>
            <Link
              href={"/map"}
              className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                currentPage.tag === "Map"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Map
            </Link>
            <Link
              href={"/buy-shares"}
              className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                currentPage.tag === "Buy Shares"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Buy Shares
            </Link>
            <Link
              href={"/rent-shares"}
              className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                currentPage.tag === "Rent Shares"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Rent Shares
            </Link>
            {/* <Link href={"/"} className={`lg:mr-12 mr-5 hover:${hoverTextColor}`}>
            Rent
          </Link> */}
            <Link
              href={"/contactus"}
              className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                currentPage.tag === "Contact"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Contact
            </Link>
            <Link
              href={"/aboutus"}
              className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                currentPage.tag === "About"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              About
            </Link>
          </nav>
          <div className="flex flex-row items-center">
            {loggedIn ? (
              <div className="flex flex-row items-start">
                <div className="relative mr-5 mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleShowDropdown(
                      //   "notification",
                      //   !showDropDowns["notification"]
                      // );
                      const username = JSON.parse(
                        localStorage.getItem("userDetails")
                      ).username;
                      router.push(`/messages/${username}`);
                      dispatch(updateNewMessageFlag(false));
                    }}
                    className="relative"
                  >
                    <MdMessage
                      className={`sm:text-3xl xs:text-2xl text-xl ${notificationIconColor}`}
                    />
                    {isNewMessageRecieved && (
                      <span className="absolute w-5 h-5 -inset-y-2 right-0 px-0 bg-red-400 text-white text-sm text-center font-semibold focus:outline-none cursor-pointer rounded-full"></span>
                    )}
                  </button>
                </div>
                <div className="relative mr-5 mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowDropdown(
                        "notification",
                        !showDropDowns["notification"]
                      );
                      dispatch(updateNewNotificationFlag(false));
                      setIsMobNavOpen(false)
                    }}
                    className="relative"
                  >
                    <FaBell
                      className={`sm:text-3xl xs:text-2xl text-xl ${notificationIconColor}`}
                    />
                    {isNewNotificationAdded && (
                      <span className="absolute w-5 h-5 -inset-y-2 right-0 px-0 bg-red-400 text-white text-sm text-center font-semibold focus:outline-none cursor-pointer rounded-full"></span>
                    )}
                  </button>
                  {showDropDowns["notification"] && !selectedNotification && (
                    <div className="absolute xs:w-96 w-72 -right-0 rounded-xl bg-white border border-[#116A7B] p-2">
                      <ul className=" text-gray-800 h-[34rem] max-h-[34rem] overflow-y-auto ">
                        <li>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnreadNotificationSelect(0, true);
                            }}
                            className="m-2 px-2 py-1 text-xs rounded bg-gray-300 text-gray-800 font-bold"
                          >
                            Read all
                          </button>
                        </li>
                        {notificationsList.map((notification, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (notification.inAppStatus === "unread") {
                                  handleUnreadNotificationSelect(index);
                                } else {
                                  setSelectedNotification(notification);
                                }
                              }}
                              className="w-full text-start px-3 py-5 hover:bg-[#116A7B20] "
                            >
                              <div className="flex flex-row items-center justify-between">
                                <h2 className={`font-semibold`}>
                                  {notification.subject}
                                </h2>
                                {notification.inAppStatus === "unread" && (
                                  <span className="w-3 h-3 bg-[#116A7B] rounded-full xs:mr-5 mr-0 mb-2"></span>
                                )}
                              </div>
                              <p>
                                Date: {notification.createdAt.split("T")[0]}
                              </p>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {showDropDowns["notification"] && selectedNotification && (
                    <div className="absolute xs:w-96 w-72 -right-0 bg-white text-gray-800 border border-[#116A7B] rounded-xl mt-0 p-5 space-y-5 h-[34rem] max-h-[34rem] overflow-y-auto">
                      <FaAngleLeft
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNotification(null);
                        }}
                        className="cursor-pointer"
                      />
                      <h2 className="text-xl text-start font-semibold">
                        {selectedNotification?.subject}
                      </h2>
                      <textarea
                        readOnly
                        value={selectedNotification?.body}
                        rows={15}
                        className="w-full focus:outline-none"
                        style={{ resize: "none" }}
                      >
                        {selectedNotification?.body}
                      </textarea>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowDropdown("user", !showDropDowns["user"]);
                    }}
                    className=""
                  >
                    {" "}
                    <Image
                      width={500}
                      height={500}
                      src={
                        profilePicURL.length > 0
                          ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${profilePicURL}profile-pic.png`
                          : "/dummy-image.png"
                      }
                      alt={
                        JSON.parse(localStorage.getItem("userDetails"))
                          ?.username
                      }
                      className="sm:w-9 sm:h-9 xs:w-7 xs:h-7 w-6 h-6 object-scale-down object-center rounded-full"
                    />{" "}
                  </button>
                  {showDropDowns["user"] && (
                    <ul className="absolute w-52 -right-0 bg-white border border-[#116A7B] mt-0 rounded-xl">
                      <li className="border-b border-[#116A7B] py-3 px-5">
                        <Link
                          href={`/user/${
                            JSON.parse(localStorage.getItem("userDetails"))
                              .username
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDropdown("user", !showDropDowns["user"]);
                          }}
                          className="w-full flex flex-row items-center space-x-3 text-[#116A7B] mt-1"
                        >
                          <Image
                            width={500}
                            height={500}
                            src={
                              profilePicURL.length > 0
                                ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${profilePicURL}profile-pic.png`
                                : "/dummy-image.png"
                            }
                            className="w-8 h-8 object-scale-down object-center rounded-full"
                          />
                          <p className="text-base">
                            {
                              JSON.parse(localStorage.getItem("userDetails"))
                                .username
                            }
                          </p>
                        </Link>
                      </li>
                      <li className="border-b border-[#116A7B] py-3 px-5">
                        <Link
                          href={"/user/profile-setting"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDropdown("user", !showDropDowns["user"]);
                          }}
                          className="w-full flex flex-row items-center space-x-3 text-[#116A7B] mt-1"
                        >
                          <CiSettings className="text-3xl" />
                          <p className="text-base">Settings</p>
                        </Link>
                      </li>
                      <li className=" border-[#116A7B] py-3 px-5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDropdown("user", !showDropDowns["user"]);
                            handleLogout(e);
                          }}
                          className="w-full flex flex-row items-center space-x-3 text-[#116A7B] mt-1"
                        >
                          <IoMdLogOut className="text-3xl" />
                          <p className="text-base">Sign Out</p>
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href={"/login"}
                className="inline-flex items-center bg-[#116A7B] text-white border-0 py-1 px-3 focus:outline-none hover:bg-[#0C4A56] rounded text-base md:mt-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div
          className={`absolute w-screen h-fit py-10 bg-[#116A7B] text-white ${
            isMobNavOpen ? "translate-x-0" : "-translate-x-[150%]"
          } duration-700 ease-in-out`}
        >
          <div className="md:hidden flex flex-col">
            <nav className="md:ml-12 md:mr-auto flex flex-col flex-wrap items-center space-y-10 my-10 sm:text-xl justify-center">
              <Link href={"/"}>
                <span
                  className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                    currentPage.tag === "Home"
                      ? `bg-white text-[#116A7B]`
                      : "bg-transparent"
                  } px-3`}
                  onClick={() => setIsMobNavOpen(!isMobNavOpen)}
                >
                  Home
                </span>
              </Link>
              <Link href={"/map"}>
                <span
                  className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                    currentPage.tag === "Map"
                      ? `bg-white text-[#116A7B]`
                      : "bg-transparent"
                  } px-3`}
                  onClick={() => setIsMobNavOpen(!isMobNavOpen)}
                >
                  Map
                </span>
              </Link>
              <Link href={"/buy-shares"}>
                <span
                  className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                    currentPage.tag === "Buy Shares"
                      ? `bg-white text-[#116A7B]`
                      : "bg-transparent"
                  } px-3`}
                  onClick={() => setIsMobNavOpen(!isMobNavOpen)}
                >
                  Buy Shares
                </span>
              </Link>
              <Link href={"/rent-shares"}>
                <span
                  className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                    currentPage.tag === "Rent Shares"
                      ? `bg-white text-[#116A7B]`
                      : "bg-transparent"
                  } px-3`}
                  onClick={() => setIsMobNavOpen(!isMobNavOpen)}
                >
                  Rent Shares
                </span>
              </Link>
              {/* <Link href={"/"} className={`lg:mr-12 mr-5 hover:${hoverTextColor}`}>
            Rent
          </Link> */}
              <Link href="/contactus" className="lg:mr-12 mr-5">
                <span
                  className={`hover:${hoverTextColor} ${
                    currentPage.tag === "Contact"
                      ? `bg-white text-[#116A7B]`
                      : "bg-transparent"
                  } px-3`}
                  onClick={() => setIsMobNavOpen(!isMobNavOpen)}
                >
                  Contact
                </span>
              </Link>
              <Link href={"/aboutus"}>
                <span
                  className={`lg:mr-12 mr-5 hover:${hoverTextColor} ${
                    currentPage.tag === "About"
                      ? `bg-white text-[#116A7B]`
                      : "bg-transparent"
                  } px-3`}
                  onClick={() => setIsMobNavOpen(!isMobNavOpen)}
                >
                  About
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
