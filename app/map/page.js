import dynamic from "next/dynamic";
import React from "react";
const MapPage = dynamic(() => import("../../components/map/map-page"), {
  ssr: false,
});

const Page = () => {
  return <MapPage />;
};

export default Page;
