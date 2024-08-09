"use client";
import {
  updateActiveTab,
  updateUserRole,
} from "@/app/redux/features/dashboardSlice";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropertyManagement from "@/components/user/addProperty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserManagement from "@/components/user/userManagement";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarLogo,
  updateNavbarTextColor,
} from "@/app/redux/features/navbarSlice";
import Offers from "@/components/user/offers";
import Favourites from "@/components/user/favourites";
import WishList from "@/components/user/wishlist";
import Inspections from "@/components/user/inspections";
import BuybackRequests from "@/components/user/buybackRequests";
import RaiseRequest from "@/components/user/raiseRequest";

const Page = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    dispatch(
      updateUserRole(JSON.parse(localStorage.getItem("userDetails"))?.role)
    );

    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );

    dispatch(
      updateCurrentPageValue({
        tag: "Dashboard",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );

    dispatch(updateBgColor("bg-[#116A7B]"));
    dispatch(updateNavbarLogo("/logo-bbh.png"));
    setName(JSON.parse(localStorage.getItem("userDetails"))?.name);
    setUsername(JSON.parse(localStorage.getItem("userDetails"))?.username);
    fetchSettings();
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-default-settings/${
          JSON.parse(localStorage.getItem("userDetails"))?.username
        }`
      );
      const response = await res.json();
      if (!response.success) {
        throw new Error(response.message);
      }
      const body = response.body;
      localStorage.setItem(
        "userSettings",
        JSON.stringify({
          currency: body.currencyChoosen,
          lang: body.languageChoosen,
          profileUpdated: body.profileUpdated,
          paymentMethodAdded: body.paymentMethodAdded,
          areaUnit: body.areaUnit,
        })
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const activeTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeTab
  );
  const userRole = useSelector(
    (state) => state.userDashboardSliceReducer.userRole
  );
  const profilePicURL = useSelector(
    (state) => state.adminSliceReducer.profilePicURL
  );

  const handleUpdateActiveTab = (e, tab) => {
    e.preventDefault();
    dispatch(updateActiveTab(tab));
  };

  const options = [
    { name: "Statistics", roles: ["admin"] },
    { name: "Shares in Properties", roles: ["shareholder"] },
    { name: "Offers", roles: ["admin", "shareholder", "user"] },
    { name: "Wishlist", roles: ["shareholder", "user"] },
    { name: "Favourites", roles: ["shareholder", "user"] },
    { name: "Inspections", roles: ["admin", "shareholder", "user"] },
    {
      name: "Modification & Maintenance",
      roles: ["admin", "shareholder", "user"],
    },
    { name: "Reservations", roles: ["shareholder", "user"] },
    { name: "Bills and Payment", roles: ["admin", "shareholder", "user"] },
    { name: "Property Management", roles: ["admin", "shareholder", "user"] },
    { name: "Blocked Users", roles: ["shareholder", "user"] },
    { name: "Buyback Requests", roles: ["admin", "shareholder"] },
    { name: "Share Transfer", roles: ["admin"] },
    { name: "Restricted Users", roles: ["admin"] },
  ];

  const panelRef = useRef();
  const [panelIsOpen, setPanelIsOpen] = useState(true);

  const handleDashPanel = (e) => {
    e.preventDefault();
    setPanelIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="w-full flex flex-row items-start">
        <div
          ref={panelRef}
          className={`${
            panelIsOpen ? "-translate-x-[0%]" : "-translate-x-[100%]"
          } absolute xl:w-1/5 lg:w-[23%] xxl:h-[90vh] xl:h-[93vh] lg:h-[93vh] md:h-[93vh] max-h-[93vh] z-20 transition-transform bg-[#015A6B] duration-500`}
        >
          <div
            onClick={(event) => handleUpdateActiveTab(event, "Profile")}
            className={`relative flex flex-row items-center px-10 py-5 border-b border-b-[#D9D9D9] ${
              activeTab === "Profile" ? "bg-[#8E9B9D]" : ""
            } cursor-pointer`}
          >
            <Image
              width={1000}
              height={1000}
              src={
                profilePicURL.length > 0
                  ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${profilePicURL}profile-pic.png`
                  : "/dummy-image.png"
              }
              className="w-12 h-12 object-contain object-center rounded-full"
              alt="user profile pic"
            />
            <h1 className="text-white leading-5 pl-4">
              {" "}
              <strong className="text-xl ">{name}</strong>
              <br />
              {username}
            </h1>
            {panelIsOpen ? (
              <FaChevronLeft
                onClick={(e) => {
                  e.stopPropagation();
                  handleDashPanel(e);
                }}
                className="text-white ml-auto text-4xl p-2 cursor-pointer ease-in-out"
              />
            ) : (
              <FaChevronRight
                onClick={(e) => {
                  e.stopPropagation();
                  handleDashPanel(e);
                }}
                className="absolute -right-10 bg-[#116A7B] text-white ml-auto text-4xl p-2 rounded-full cursor-pointer ease-in-out"
              />
            )}
          </div>
          <ul>
            {options.map(
              (option, index) =>
                option.roles.includes(userRole) && (
                  <li
                    key={index}
                    className={`text-base text-white font-medium  ${
                      activeTab === option.name ? "bg-[#8E9B9D]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(event) =>
                        handleUpdateActiveTab(event, option.name)
                      }
                      className="w-full px-10 py-5 hover:bg-[#8E9B9D] flex flex-row justify-start"
                    >
                      {" "}
                      {option.name}
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
        <div
          className={`${
            panelIsOpen ? "xl:w-[20%] lg:w-[23%]" : "w-0"
          } xxl:h-[90vh] xl:h-[93vh] lg:h-[93vh] lg:block hidden duration-700 ease-in-out`}
        ></div>
        <div
          className={`${
            panelIsOpen ? "xl:w-4/5 lg:w-[77%] md:w-full" : "w-full"
          } duration-700 ease-in-out`}
        >
          {activeTab === "Property Management" && <PropertyManagement />}
          {activeTab === "Profile" && <UserManagement />}
          {activeTab === "Offers" && <Offers />}
          {activeTab === "Favourites" && <Favourites />}
          {activeTab === "Wishlist" && <WishList />}
          {activeTab === "Inspections" && <Inspections />}
          {activeTab === "Buyback Requests" && <BuybackRequests />}
          {activeTab === "Modification & Maintenance" && <RaiseRequest/>}
        </div>
      </div>
    </div>
  );
};

export default Page;
