import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const UserManagement = () => {
  const [myDetails, setMyDetails] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Set a minimum display time for the loader of 2 seconds
    const timeoutId = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    };
  }, [myDetails]);

  const fetchMyData = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-user-detail/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        setMyDetails(response.body);
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
    fetchMyData();
  }, []);

  const profilePicURL = useSelector(
    (state) => state.adminSliceReducer.profilePicURL
  );

  const router = useRouter();

  return (
    <>
      {!pageLoading ? (
        <div className="bg-white w-full my-6 lg:h-[85vh] md:h-[88vh] lg:max-h-[85vh] max-h-[88vh] overflow-y-auto">
          <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
            <h1 className="text-2xl font-medium">
              {myDetails?.role?.toUpperCase()}
            </h1>
            <button
              onClick={(e) => router.push("/user/profile-setting")}
              type="button"
              className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
            >
              Edit Profile
              {/* <FaPlus className="inline-flex text-sm ml-2 mb-1" /> */}
            </button>
          </div>
          <div className="my-5 px-14">
            {myDetails?.userProfile?.profilePicURl?.length > 0 ? (
              ""
            ) : (
              <Image
                width={1000}
                height={1000}
                src={
                  profilePicURL.length > 0
                    ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${profilePicURL}profile-pic.png`
                    : "/assets/user/profile/no-image.png"
                }
                className="w-40 h-40 object-contain rounded-full"
              />
            )}
          </div>
          <div className="w-full flex flex-col flex-wrap px-14 my-10 space-y-4">
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">Fullname </h1>
              <textarea
                rows="1"
                value={myDetails?.name}
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">Username </h1>
              <textarea
                rows="1"
                value={myDetails?.username}
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">Email Address </h1>
              <textarea
                rows="1"
                value={myDetails?.email}
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
              {myDetails?.emailVerified ? (
                <div className="bg-transparent text-green-600 p-1 ">
                  <TiTick />
                </div>
              ) : (
                <div className="bg-transparent text-red-600 p-1 ">
                  <MdClose />
                </div>
              )}
            </div>
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">NIC Number </h1>
              <textarea
                rows="1"
                value={
                  myDetails?.userProfile?.nicNumber.length > 0
                    ? myDetails?.userProfile?.nicNumber
                    : "--"
                }
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">Date of Birth </h1>
              <textarea
                rows="1"
                value={
                  myDetails?.userProfile?.dobString.length > 0
                    ? myDetails?.userProfile?.dobString
                    : "--"
                }
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">Nationality </h1>
              <textarea
                rows="1"
                value={
                  myDetails?.userProfile?.nationality.length > 0
                    ? myDetails?.userProfile?.nationality
                    : "--"
                }
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="flex flex-row text-2xl">
              <h1 className="w-80 font-bold text-[#666666]">Gender </h1>
              <textarea
                rows="1"
                value={
                  myDetails?.userProfile?.gender
                    ? myDetails?.userProfile?.gender
                    : "--"
                }
                readOnly
                className="w-80 outline-none"
                style={{ resize: "none" }}
              ></textarea>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
          <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default UserManagement;
