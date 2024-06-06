"use client"
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNavbarLogo, updateNavbarTextColor } from "../redux/features/navbarSlice";
const MapPage = dynamic(() => import("../../components/map/map-page"), {
  ssr: false,
});

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-[#116A7B]",
        hoverTextColor: "text-[#116A7B]",
      })
    );
    dispatch(updateNavbarLogo("/logo-bbh.png"));
  }, []);

  return <MapPage />;
};

export default Page;
