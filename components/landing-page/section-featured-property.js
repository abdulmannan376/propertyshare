import React from "react";
import SwiperComponent from "./slider";

const SectionFeaturedProperty = () => {
  return (
    <div className="bg-[#CDC2AE] bg-opacity-5">
      <div className="px-14 pt-14">
        <h1 className="xl:text-[40px] text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          Featured property around the globe
        </h1>
        {/* <h1 className="text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          Featured property <i className="text-[#CDC2AE]"> around </i> the globe
        </h1> */}
        {/* <h1 className="text-4xl text-center uppercase font-semibold text-[#116A7B] ">
          Featured property around the<i className="text-[#CDC2AE]"> globe </i>
        </h1> */}
      </div>

      <div className="px-14 py-14">
        <SwiperComponent />
      </div>
    </div>
  );
};

export default SectionFeaturedProperty;
