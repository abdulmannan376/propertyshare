import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [myDetails, setMyDetails] = useState({});

  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  

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

  return (
    <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">
          {myDetails?.role?.toUpperCase()}
        </h1>
        <button
          // onClick={(e) => handleClickToAdd(e, "new")}
          type="button"
          className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
        >
          Edit Profile
          {/* <FaPlus className="inline-flex text-sm ml-2 mb-1" /> */}
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
