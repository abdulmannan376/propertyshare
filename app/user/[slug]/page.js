"use client";
import {
  updateActiveTab,
  updateUserRole,
} from "@/app/redux/features/dashboardSlice";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddProperty from "@/components/user/addProperty";

const Page = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    dispatch(
      updateUserRole(JSON.parse(localStorage.getItem("userDetails")).role)
    );
    setName(JSON.parse(localStorage.getItem("userDetails")).name);
    setUsername(JSON.parse(localStorage.getItem("userDetails")).username);
  });

  const activeTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeTab
  );
  const userRole = useSelector(
    (state) => state.userDashboardSliceReducer.userRole
  );

  const handleUpdateActiveTab = (e, tab) => {
    e.preventDefault();
    dispatch(updateActiveTab(tab));
  };

  const options = [
    { name: "Shares in Properties", roles: ["shareholder"] },
    { name: "Offers", roles: ["shareholder", "user"] },
    { name: "Wishlist", roles: ["shareholder", "user"] },
    { name: "Favourites", roles: ["shareholder", "user"] },
    { name: "Inspection", roles: ["admin", "shareholder", "user"] },
    {
      name: "Modification & Maintenance",
      roles: ["admin", "shareholder", "user"],
    },
    { name: "Reservations", roles: ["shareholder", "user"] },
    { name: "Bills and Payment", roles: ["admin", "shareholder", "user"] },
    { name: "Property Management", roles: ["admin", "shareholder", "user"] },
    { name: "Blocked Users", roles: ["shareholder", "user"] },
  ];

  const panelRef = useRef();
  const [panelIsOpen, setPanelIsOpen] = useState(true);

  const handleDashPanel = (e) => {
    e.preventDefault();
    setPanelIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="w-full flex flex-row items-start">
        <div
          ref={panelRef}
          className={`${
            panelIsOpen ? "-translate-x-[0%]" : "-translate-x-[100%]"
          } absolute w-1/5 h-[44rem] z-20 transition-transform bg-[#015A6B] duration-500`}
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
              src={"/dummy-image.png"}
              className="w-12 h-12 object-contain object-center "
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
                    className={`text-xl text-white font-medium  ${
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
        <div className={`w-${panelIsOpen ? "1/5" : "0"} h-[44rem] duration-700 ease-in-out`}></div>
        <div className={`w-${panelIsOpen ? "4/5" : "full"} px-14`}>
          {activeTab === "Property Management" && <AddProperty />}
        </div>
      </div>
    </div>
  );
};

export default Page;
