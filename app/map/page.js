"use client"
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBgColor, updateCurrentPageValue, updateNavbarLogo, updateNavbarTextColor } from "../redux/features/navbarSlice";
const MapPage = dynamic(() => import("../../components/map/map-page"), {
  ssr: false,
});

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(updateNavbarLogo("/logo-bbh.png"));
    dispatch(
      updateCurrentPageValue({
        tag: "Map",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
    dispatch(updateBgColor("bg-[#116A7B]"));
  }, []);

  return <MapPage />;
};

export default Page;
