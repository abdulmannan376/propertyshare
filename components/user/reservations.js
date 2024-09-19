import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myShareReservations, setMyShareReservations] = useState([]);

  const fetchMyReservations = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-reservations-by-username/${username}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoading(false);
        setMyShareReservations(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchMyReservations();
  }, []);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Reservations</h1>
      </div>
      {isLoading ? (
        <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
          <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
        </div>
      ) : (
        <div>
          {myShareReservations.length > 0 ? (
            myShareReservations.map((share, index) => (
              <Link
                key={index}
                href={`/buy-shares/property/${share.propertyDetails.propertyID}`}
                className="w-full flex flex-row flex-wrap border border-[#D9D9D9] px-14 mb-5 cursor-pointer"
              >
                {share.propertyDetails.imageCount === 0 ? (
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
                    src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${share.propertyDetails.imageDirURL}/image-1.png`}
                    className="xl:w-64 lg:w-52 w-52 h-60 xl:h-60 lg:h-56 object-cover object-center"
                  />
                )}
                <div className="md:ml-10 sm:ml-5 space-y-4 my-5">
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Property Title:{" "}
                    </h1>
                    <p className="xl:ml-44 lg:ml-20">
                      {share.propertyDetails.title}
                    </p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Property ID:{" "}
                    </h1>
                    <p className="xl:ml-44 lg:ml-20">
                      {share.propertyDetails.propertyID}
                    </p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      My Reservations:{" "}
                    </h1>
                    <p className="xl:ml-44 lg:ml-20">
                      {
                        myShareReservations.filter(
                          (entry) =>
                            entry.propertyID ===
                            share.propertyDetails.propertyID
                        )[0]?.count
                      }
                    </p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Total Shares:{" "}
                    </h1>
                    <p className="xl:ml-44 lg:ml-20">
                      {share.propertyDetails.totalStakes}
                    </p>
                  </div>
                  <div className="flex flex-row sm:text-xl text-base text-start text-[#09363F]">
                    <h1 className="xl:w-80 lg:w-60 md:w-60 sm:w-44 w-36 sm:text-xl text-base text-start font-medium">
                      Available Shares:{" "}
                    </h1>
                    <p className="xl:ml-44 lg:ml-20">
                      {share.propertyDetails.totalStakes -
                        share.propertyDetails.stakesOccupied}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h1 className="text-2xl text-[#116A7B] font-semibold px-14">
              No Reservations Yet.
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservations;
