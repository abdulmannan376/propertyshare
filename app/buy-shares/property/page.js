"use client";
import { updateNavbarTextColor } from "@/app/redux/features/navbarSlice";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-[#116A7B]",
        hoverTextColor: "text-[#116A7B]",
      })
    );
  }, []);

  const searchParams = useSearchParams();
  const [propertyID, setPropertyID] = useState("");
  const [property, setProperty] = useState({});
  const [idProvided, setIdProvided] = useState(true);

  useEffect(() => {
    if (searchParams.get("id")) {
      setPropertyID(searchParams.get("id"));
    } else {
      setIdProvided(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-property-by-id/${propertyID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        setProperty(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
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
    if (propertyID.length > 0) {
      fetchData();
    }
  }, [propertyID]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full h-20 bg-white"></div>
      {property && (
        <div className="xl:mx-24 mx-16 ">
          <div>
            {property.imageCount > 0 ? (
              <div className="h-[44rem]"></div>
            ) : (
              <div className="h-[44rem]">
                <Image
                  width={1000}
                  height={1000}
                  src={"/assets/user/property-management/no-image.jpg"}
                  className="w-full h-full object-scale-down object-center"
                  alt={`${property.slug}-noimage`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
