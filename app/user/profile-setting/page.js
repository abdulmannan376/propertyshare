"use client";
import { updateNavbarTextColor } from "@/app/redux/features/navbarSlice";
import {
  handleUserProfileSettingNavigation,
  handleUserSettingNavigation,
} from "@/app/redux/features/userSlice";
import AccountSetting from "@/components/user/setting-components/accountSetting";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(updateBgColor("bg-[#116A7B]"));
  }, []);

  const settingActiveTab = useSelector(
    (state) => state.adminSliceReducer.settingActiveTab
  );

  const profileSettingActiveTab = useSelector(
    (state) => state.adminSliceReducer.profileSettingActiveTab
  );
  return (
    <div>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="w-screen flex items-center justify-start xl:mx-24 mx-16 md:space-x-20 space-x-14 my-3 text-white text-2xl font-semibold">
        <button
          onClick={() =>
            dispatch(handleUserSettingNavigation("Profile Setting"))
          }
        >
          <h1
            className={`flex ${
              settingActiveTab === "Profile Setting"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Profile Setting
          </h1>
        </button>
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() =>
            dispatch(handleUserSettingNavigation("Account Setting"))
          }
        >
          <h2
            className={`flex ${
              settingActiveTab === "Account Setting"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Account Setting
          </h2>
        </button>
        {/* </Link> */}
      </div>
      {settingActiveTab === "Profile Setting" && (
        <div className="flex flex-row flex-wrap space-x-5 xl:mx-24 mx-16 my-16 text-xl">
          <button
            type="button"
            onClick={() =>
              dispatch(handleUserProfileSettingNavigation("Primary Details"))
            }
            className={`${
              profileSettingActiveTab === "Primary Details"
                ? "opacity-100"
                : "opacity-70"
            } text-[#09363F] font-semibold`}
          >
            Primary Details
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch(handleUserProfileSettingNavigation("Contact Details"))
            }
            className={`${
              profileSettingActiveTab === "Contact Details"
                ? "opacity-100"
                : "opacity-70"
            } text-[#09363F] font-semibold`}
          >
            Contact Details
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch(handleUserProfileSettingNavigation("Next of Kin"))
            }
            className={`${
              profileSettingActiveTab === "Next of Kin"
                ? "opacity-100"
                : "opacity-70"
            } text-[#09363F] font-semibold`}
          >
            Next of Kin
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch(handleUserProfileSettingNavigation("Payment Details"))
            }
            className={`${
              profileSettingActiveTab === "Payment Details"
                ? "opacity-100"
                : "opacity-70"
            } text-[#09363F] font-semibold`}
          >
            Payment Details
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch(handleUserProfileSettingNavigation("Withdrawal Details"))
            }
            className={`${
              profileSettingActiveTab === "Withdrawal Details"
                ? "opacity-100"
                : "opacity-70"
            } text-[#09363F] font-semibold`}
          >
            Withdrawal Details
          </button>
        </div>
      )}
      {settingActiveTab === "Account Setting" && <AccountSetting />}
    </div>
  );
};

export default Page;
