"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNavbarTextColor } from "../redux/features/navbarSlice";
import SearchBar from "@/components/buy-shares/searchBar";
import FilterComponent from "@/components/buy-shares/filterComponent";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
  }, []);
  return (
    <>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="xl:mx-24 mx-16 ">
        <div>
          <SearchBar />
          <FilterComponent />
        </div>
      </div>
      ;
    </>
  );
};

export default Page;
