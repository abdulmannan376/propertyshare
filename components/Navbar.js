"use client";
import { updateUserDetails } from "@/app/redux/features/userSlice";
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

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const textColor = useSelector((state) => state.navbarSliceReducer.textColor);
  const hoverTextColor = useSelector(
    (state) => state.navbarSliceReducer.hoverTextColor
  );
  const logoURL = useSelector((state) => state.navbarSliceReducer.logoURL);
  const notificationIconColor = useSelector(
    (state) => state.navbarSliceReducer.notificationIconColor
  );

  const currentPage = useSelector(
    (state) => state.navbarSliceReducer.currentPage
  );

  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropDowns, setShowDropDowns] = useState({
    user: false,
    notification: false,
  });

  const userEmail = useSelector((state) => state.adminSliceReducer.userEmail);

  const [notificationsCount, setNotificationsCount] = useState(0);

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
        setNotificationsCount(response.body.notificationsCount);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.length > 0) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      dispatch(updateUserDetails(userDetails));
      setLoggedIn(true);
      fetchNotifications();
    } else {
      setLoggedIn(false);
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
        console.log("reponse: ", response);
        toast.success(response.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        setTimeout(() => {
          router.refresh();
          router.push("/");
        }, 2000);
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

  const handleShowDropdown = (field, value) => {
    setShowDropDowns((prevDetails) => {
      const newDetails = { ...prevDetails };
      newDetails[field] = value;
      return newDetails;
    });
  };

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
        className={`absolute top-0 w-full ${textColor} body-font z-[1000]`}
      >
        <div className="xl:mx-24 mx-16 flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex flex-col title-font font-medium items-center justify-center text-gray-900 mb-4 md:mb-0"
          >
            <Image
              width={1000}
              height={1000}
              src={logoURL}
              alt="Logo"
              className="w-auto h-10 object-contain object-center"
            />
          </Link>
          <nav className="md:ml-12 md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "Home"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Home
            </Link>
            <Link
              href={"/map"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "Map"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Map
            </Link>
            <Link
              href={"/buy-shares"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "Buy Shares"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Buy Shares
            </Link>
            <Link
              href={"/under-development"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "Rent Shares"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Rent Shares
            </Link>
            {/* <Link href={"/"} className={`mr-12 hover:${hoverTextColor}`}>
            Rent
          </Link> */}
            <Link
              href={"/contactus"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "Contact"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Contact
            </Link>
            <Link
              href={"/under-development"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "About"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              About
            </Link>
            <Link
              href={"/privacy-policy"}
              className={`mr-12 hover:${hoverTextColor} ${
                currentPage.tag === "Privacy"
                  ? `${currentPage.bgColor} ${currentPage.textColor}`
                  : "bg-transparent"
              } px-3`}
            >
              Privacy
            </Link>
          </nav>
          {loggedIn ? (
            <div className="flex flex-row items-start">
              <div className="relative mr-5 mt-1">
                <FaBell className={`text-3xl ${notificationIconColor}`} />
                {notificationsCount > 0 && (
                  <span className="absolute w-5 h-5 -inset-y-2 right-0 px-0 bg-red-400 text-white text-sm text-center font-semibold focus:outline-none cursor-pointer rounded-full">
                    {notificationsCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    handleShowDropdown("user", !showDropDowns["user"])
                  }
                  className=""
                >
                  {" "}
                  <Image
                    width={500}
                    height={500}
                    src={"/dummy-image.png"}
                    alt={
                      JSON.parse(localStorage.getItem("userDetails"))?.username
                    }
                    className="w-9 h-9 object-scale-down object-center rounded-full"
                  />{" "}
                </button>
                {showDropDowns["user"] && (
                  <ul className="absolute w-48 -right-0 bg-white border border-[#116A7B] mt-0 rounded-xl">
                    <li className="border-b border-[#116A7B] py-3 px-5">
                      <Link
                        href={`/user/${
                          JSON.parse(localStorage.getItem("userDetails"))
                            .username
                        }`}
                        onClick={() =>
                          handleShowDropdown("user", !showDropDowns["user"])
                        }
                        className="w-full flex flex-row items-center space-x-3 text-[#116A7B] mt-1"
                      >
                        <Image
                          width={500}
                          height={500}
                          src={"/dummy-image.png"}
                          className="w-8 h-8 object-scale-down object-center rounded-full"
                        />
                        <p className="text-lg">
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
                        onClick={() =>
                          handleShowDropdown("user", !showDropDowns["user"])
                        }
                        className="w-full flex flex-row items-center space-x-3 text-[#116A7B] mt-1"
                      >
                        <CiSettings className="text-3xl" />
                        <p className="text-lg">Settings</p>
                      </Link>
                    </li>
                    <li className=" border-[#116A7B] py-3 px-5">
                      <button
                        type="button"
                        onClick={(e) => {
                          handleShowDropdown("user", !showDropDowns["user"]);
                          handleLogout(e);
                        }}
                        className="w-full flex flex-row items-center space-x-3 text-[#116A7B] mt-1"
                      >
                        <IoMdLogOut className="text-3xl" />
                        <p className="text-lg">Sign Out</p>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <Link
              href={"/login"}
              className="inline-flex items-center bg-[#116A7B] text-white border-0 py-1 px-3 focus:outline-none hover:bg-[#0C4A56] rounded text-base mt-4 md:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
