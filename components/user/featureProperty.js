import React, { useState } from "react";

const FeaturedManagement = () => {
  const [isNewFeatureProperty, setIsNewFeatureProperty] = useState(false);
  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center justify-between border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Featured Management</h1>
        <div>
          {isNewFeatureProperty ? (
            <button
              type="button"
              onClick={() => setIsNewFeatureProperty(false)}
              className="w-52 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
            >
              {" "}
              Back{" "}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsNewFeatureProperty(true)}
              className="w-52 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
            >
              {" "}
              New{" "}
            </button>
          )}
        </div>
      </div>
      {isNewFeatureProperty && <></>}
    </div>
  );
};

export default FeaturedManagement;
