import { errorAlert, successAlert } from "@/utils/alert";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedManagement = () => {
  const [isNewFeatureProperty, setIsNewFeatureProperty] = useState(false);

  const [query, setQuery] = useState("");
  const [propertyFound, setPropertyFound] = useState(null);
  const [isPropertyLoading, setIsPropertyLoading] = useState(false);
  const findProperty = async () => {
    setIsPropertyLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-property-by-id/${query}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      setIsPropertyLoading(false);
      if (response.success) {
        setPropertyFound(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsPropertyLoading(false);
      errorAlert(error.message, "");
    }
  };

  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const handlePropertyFeature = async () => {
    setIsStatusLoading(true);
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/property/update-property-status/?id=${
          propertyFound.propertyID
        }&action=${true}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setQuery("");
        setPropertyFound(null);
        successAlert(response.message, "");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert(error.message, "");
    } finally {
      setIsStatusLoading(false);
    }
  };

  const [propertiesList, setPropertiesList] = useState([]);
  const fetchProperties = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-properties/?filter=Featured`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setPropertiesList(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert(error.message, "");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center justify-between border-b border-b-[#D9D9D9] pt-1 pb-7 sm:px-14 pr-5 pl-14">
        <h1 className="text-2xl font-medium">Featured Management</h1>
        <div>
          {isNewFeatureProperty ? (
            <button
              type="button"
              onClick={() => setIsNewFeatureProperty(false)}
              className="sm:w-52 w-28 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
            >
              {" "}
              Back{" "}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsNewFeatureProperty(true)}
              className="sm:w-52 w-28 bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
            >
              {" "}
              New{" "}
            </button>
          )}
        </div>
      </div>
      {isNewFeatureProperty && (
        <>
          <div className="w-full my-6 md:px-14 px-5">
            {/* Input field for username query */}
            <div className="relative flex md:flex-row flex-col md:items-end">
              <div
                // onBlur={() => setTimeout(() => set([]), 200)}
                className="flex flex-col pt-1 "
              >
                <label htmlFor="recipient" className="text-[#676767]">
                  Find Property
                </label>
                <input
                  type="text"
                  placeholder="Enter PropertyID"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="md:my-1 md:mx-5 my-3">
                <button
                  onClick={findProperty}
                  disabled={query.length < 16}
                  className="w-40 disabled:bg-opacity-30 bg-[#116A7B] text-white py-2 px-4 rounded-full  transition duration-150"
                >
                  {!isPropertyLoading && "Search"}
                  {isPropertyLoading && (
                    <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                  )}
                </button>
              </div>
            </div>
            {propertyFound ? (
              <div className="w-full flex flex-col space-y-5 my-5 mx-2">
                <div className="flex flex-row">
                  <h1 className="xs:w-56 w-36 font-semibold sm:text-xl text-base">Property Title</h1>
                  <h2 className="sm:text-xl text-base">{propertyFound.title}</h2>
                </div>
                <div className="flex flex-row">
                  <h1 className="xs:w-56 w-36 font-semibold sm:text-xl text-base">PropertyID</h1>
                  <h2 className="sm:text-xl text-base">{propertyFound.propertyID}</h2>
                </div>
                <div className="flex flex-row">
                  <h1 className="xs:w-56 w-36 font-semibold sm:text-xl text-base">
                    Property Status
                  </h1>
                  <h2 className="sm:text-xl text-base">{propertyFound.status}</h2>
                </div>
                <div className="flex flex-row">
                  <h1 className="xs:w-56 w-36 font-semibold sm:text-xl text-base">
                    Property Shares
                  </h1>
                  <h2 className="sm:text-xl text-base">{propertyFound.totalStakes - 1}</h2>
                </div>
                <div className="flex flex-row">
                  <h1 className="xs:w-56 w-36 font-semibold sm:text-xl text-base">
                    Property Share Value
                  </h1>
                  <h2 className="sm:text-xl text-base">${propertyFound.valuePerShare}</h2>
                </div>
                <div className="">
                  <button
                    onClick={handlePropertyFeature}
                    disabled={propertyFound?.status !== "Non-Featured"}
                    className="w-40 disabled:bg-opacity-30 bg-[#116A7B] text-white py-2 px-4 rounded  transition duration-150"
                  >
                    {!isStatusLoading && "Feature"}
                    {isStatusLoading && (
                      <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-20">
                <h1 className="text-2xl font-semibold text-[#116A7B] text-center">
                  No Property Selected.
                </h1>
              </div>
            )}
          </div>
        </>
      )}
      {!isNewFeatureProperty && (
        <div>
          {propertiesList.length > 0 ? (
            propertiesList.map((property, index) => (
              <Link
                key={index}
                href={`/buy-shares/property/${property.propertyID}`}
                className="w-full flex flex-row flex-wrap border border-[#D9D9D9] sm:px-14 px-5 mb-5 cursor-pointer"
              >
                {property.imageCount === 0 ? (
                  <Image
                    width={1000}
                    height={1000}
                    src={"/assets/user/property-management/no-image.jpg"}
                    className="xl:w-64 lg:w-52 w-52 h-60 xl:h-60 lg:h-56 object-cover object-center"
                  />
                ) : (
                  <Image
                    width={1000}
                    height={1000}
                    src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${property.imageDirURL}image-1.png`}
                    className="xl:w-64 lg:w-52 w-52 h-60 xl:h-60 lg:h-56 object-cover object-center"
                  />
                )}
                <div className="md:ml-10 sm:ml-5 space-y-4 my-5">
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Property Title:{" "}
                    </h1>
                    <p className="">{property.title}</p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      PropertyID:{" "}
                    </h1>
                    <p className="">{property.propertyID}</p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Total Shares:{" "}
                    </h1>
                    <p className="">{property.totalStakes - 1}</p>
                  </div>

                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Available Shares:{" "}
                    </h1>
                    <p className="">
                      {property.totalStakes - property.stakesOccupied}
                    </p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Featured Ending Date
                    </h1>
                    <p className="">{property.featuredEndDate?.dateString}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="my-20">
              <h1 className="text-2xl font-semibold text-[#116A7B] text-center">
                No Properties Featured.
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedManagement;
