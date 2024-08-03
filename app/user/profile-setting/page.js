"use client";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarTextColor,
} from "@/app/redux/features/navbarSlice";
import {
  handleUserProfileSettingNavigation,
  handleUserSettingNavigation,
} from "@/app/redux/features/userSlice";
import AccountSetting from "@/components/user/setting-components/accountSetting";
import Image from "next/image";
import React, { act, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(
      updateCurrentPageValue({
        tag: "Settings",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
    dispatch(updateBgColor("bg-[#116A7B]"));
  }, []);

  const settingActiveTab = useSelector(
    (state) => state.adminSliceReducer.settingActiveTab
  );

  const profileSettingActiveTab = useSelector(
    (state) => state.adminSliceReducer.profileSettingActiveTab
  );

  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-user-profile-details/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        setUserDetails(response.body);
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
    fetchUserDetails();
  }, [profileSettingActiveTab]);

  const handleUserProfileUpdates = (field, value, isUserProfileAttribute) => {
    if (isUserProfileAttribute) {
      setUserDetails((prevDetails) => {
        const newDetails = { ...prevDetails };
        newDetails["userProfile"] = {
          ...newDetails["userProfile"],
          [field]: value,
        };
        return newDetails;
      });
    } else {
      setUserDetails((prevDetails) => {
        const newDetails = { ...prevDetails };
        newDetails[field] = value;
        return newDetails;
      });
    }
  };

  const genderList = ["Male", "Female", "Other"];
  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Barbudans",
    "Batswana",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "I-Kiribati",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian and Nevisian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivan",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian or Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean",
  ];

  const religionList = [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Sikhism",
    "Judaism",
    "Baha'i",
    "Jainism",
    "Shinto",
    "Taoism",
    "Zoroastrianism",
    "Confucianism",
    "Folk Religion",
    "Other",
  ];

  const bloodGroupList = ["O+", "O-", "A+", "A-", "AB+", "AB-", "B+", "B-"];

  const [files, setFiles] = useState(null);
  const [isLoadingProfilePic, setIsLoadingProfilePic] = useState(false);

  const handleUploadProfilePic = async () => {
    try {
      setIsLoadingProfilePic(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const formData = new FormData();

      console.log(files);
      formData.append("username", username);
      for (const file of files) formData.append("imageFile", file);

      console.log(formData.get("imageFile"));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/upload-profile-pic`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoadingProfilePic(false);
        setUserDetails((prevDetails) => {
          const newDetails = { ...prevDetails };
          newDetails["userProfile"] = {
            ...newDetails["userProfile"],
            ["profilePicURL"]: response.body,
          };
          return newDetails;
        });
        toast.success(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoadingProfilePic(false);
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

  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);

  const handleUserProfileUpdate = async () => {
    try {
      setIsLoadingSubmission(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const action = profileSettingActiveTab;
      let body = {};
      if (action === "Primary Details") {
        body.name = userDetails.name;
        body.gender = userDetails.userProfile.gender;
        body.dobString = userDetails.userProfile.dobString;
        body.nicNumber = userDetails.userProfile.nicNumber;
        body.nationality = userDetails.userProfile.nationality;
        body.religion = userDetails.userProfile.religion;
        body.bloodGroup = userDetails.userProfile.bloodGroup;
      } else if(action === "Contact Details") {
        body.contact = userDetails.contact,
        body.permanentAddress = userDetails.userProfile.permanentAddress
      }

      const data = {
        username: username,
        action: action,
        body: body,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/update-user-profile`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoadingSubmission(false);

        if (action === "Primary Details") {
          dispatch(handleUserProfileSettingNavigation("Contact Details"));
        }

        fetchUserDetails();
        toast.success(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoadingSubmission(false);
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

  return (
    <div
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="w-screen flex items-center justify-start xxl:mx-24 xl:mx-16 lg:mx-10 md:mx-5 md:space-x-20 space-x-14 my-3 text-white text-2xl font-semibold">
        <button
          onClick={() =>
            dispatch(handleUserSettingNavigation("Profile Setting"))
          }
        >
          <h1
            className={`flex ${
              settingActiveTab === "Profile Setting"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Profile Setting
          </h1>
        </button>
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() =>
            dispatch(handleUserSettingNavigation("Account Setting"))
          }
        >
          <h2
            className={`flex ${
              settingActiveTab === "Account Setting"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Account Setting
          </h2>
        </button>
        {/* </Link> */}
      </div>
      {settingActiveTab === "Profile Setting" && (
        <>
          <div className="flex flex-row flex-wrap space-x-5 xxl:mx-24 xl:mx-16 lg:mx-10 md:mx-5 my-16 text-xl">
            <button
              type="button"
              onClick={() =>
                dispatch(handleUserProfileSettingNavigation("Primary Details"))
              }
              className={`${
                profileSettingActiveTab === "Primary Details"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] font-semibold`}
            >
              Primary Details
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch(handleUserProfileSettingNavigation("Contact Details"))
              }
              className={`${
                profileSettingActiveTab === "Contact Details"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] font-semibold`}
            >
              Contact Details
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch(handleUserProfileSettingNavigation("Next of Kin"))
              }
              className={`${
                profileSettingActiveTab === "Next of Kin"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] font-semibold`}
            >
              Next of Kin
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch(handleUserProfileSettingNavigation("Payment Details"))
              }
              className={`${
                profileSettingActiveTab === "Payment Details"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] font-semibold`}
            >
              Payment Details
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  handleUserProfileSettingNavigation("Withdrawal Details")
                )
              }
              className={`${
                profileSettingActiveTab === "Withdrawal Details"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] font-semibold`}
            >
              Withdrawal Details
            </button>
          </div>
          <div className="xxl:mx-24 xl:mx-16 lg:mx-10 md:mx-5 my-16">
            {profileSettingActiveTab === "Primary Details" && (
              <>
                <div className="flex flex-row flex-wrap">
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="fullName" className="text-[#676767]">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={userDetails?.name}
                      required={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates("name", target.value, false)
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="username" className="text-[#676767]">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={userDetails?.username}
                      required={true}
                      readOnly={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates(
                          "username",
                          target.value,
                          false
                        )
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <div>
                      <label htmlFor="Gender" className="text-[#676767]">
                        Gender
                      </label>
                      <select
                        name="Gender"
                        value={userDetails?.userProfile.gender}
                        onChange={({ target }) => {
                          if (target.value !== "Select") {
                            handleUserProfileUpdates(
                              "gender",
                              target.value,
                              true
                            );
                          } else {
                            handleUserProfileUpdates("gender", "", true);
                          }
                        }}
                        className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                      >
                        <option value="Select">Select</option>
                        {genderList.map((gender, index) => (
                          <option key={index} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      name="Gender"
                      value={userDetails?.userProfile.gender}
                      required={true}
                      readOnly={true}
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="dob" className="text-[#676767]">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={userDetails?.userProfile.dobString}
                      required={true}
                      onChange={({ target }) => {
                        const date = new Date(target.value);
                        handleUserProfileUpdates(
                          "dobString",
                          date.toISOString().split("T")[0],
                          true
                        );
                        handleUserProfileUpdates("dob", date, true);
                      }}
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="nicNumber" className="text-[#676767]">
                      NIC Number
                    </label>
                    <input
                      type="number"
                      name="nicNumber"
                      value={userDetails?.userProfile.nicNumber}
                      required={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates(
                          "nicNumber",
                          target.value,
                          true
                        )
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <div>
                      <label htmlFor="nationality" className="text-[#676767]">
                        Nationality
                      </label>
                      <select
                        name="nationality"
                        value={userDetails?.userProfile.nationality}
                        onChange={({ target }) => {
                          if (target.value !== "Select") {
                            handleUserProfileUpdates(
                              "nationality",
                              target.value,
                              true
                            );
                          } else {
                            handleUserProfileUpdates("nationality", "", true);
                          }
                        }}
                        className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                      >
                        <option value="Select">Select</option>
                        {nationalities.map((nationality, index) => (
                          <option key={index} value={nationality}>
                            {nationality}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      name="nationality"
                      value={userDetails?.userProfile.nationality}
                      required={true}
                      readOnly={true}
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <div>
                      <label htmlFor="religion" className="text-[#676767]">
                        Religion
                      </label>
                      <select
                        name="religion"
                        value={userDetails?.userProfile.religion}
                        onChange={({ target }) => {
                          if (target.value !== "Select") {
                            handleUserProfileUpdates(
                              "religion",
                              target.value,
                              true
                            );
                          } else {
                            handleUserProfileUpdates("religion", "", true);
                          }
                        }}
                        className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                      >
                        <option value="Select">Select</option>
                        {religionList.map((religion, index) => (
                          <option key={index} value={religion}>
                            {religion}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      name="religion"
                      value={userDetails?.userProfile.religion}
                      required={true}
                      readOnly={true}
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <div>
                      <label htmlFor="bloodGroup" className="text-[#676767]">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={userDetails?.userProfile.bloodGroup}
                        onChange={({ target }) => {
                          if (target.value !== "Select") {
                            handleUserProfileUpdates(
                              "bloodGroup",
                              target.value,
                              true
                            );
                          } else {
                            handleUserProfileUpdates("bloodGroup", "", true);
                          }
                        }}
                        className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                      >
                        <option value="Select">Select</option>
                        {bloodGroupList.map((bloodGroup, index) => (
                          <option key={index} value={bloodGroup}>
                            {bloodGroup}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={userDetails?.userProfile.bloodGroup}
                      required={true}
                      readOnly={true}
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col mr-6">
                    <label htmlFor="propertyImages" className="text-[#676767]">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/png"
                      required={true}
                      onChange={({ target }) => setFiles(target.files)}
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    {userDetails?.userProfile.profilePicURL.length > 0 && (
                      <div className="my-5">
                        <Image
                          width={1000}
                          height={1000}
                          src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${userDetails?.userProfile.profilePicURL}profile-pic.png`}
                          className="w-32 h-32 object-cover object-center rounded-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mr-6">
                    <label htmlFor="propertyImages" className="text-[#676767]">
                      &nbsp;
                    </label>
                    <button
                      type="button"
                      onClick={(e) => handleUploadProfilePic()}
                      className="w-40 bg-[#116A7B] text-white text-lg font-medium px-7 py-3 mt-2 rounded-full"
                    >
                      {!isLoadingProfilePic && `Upload`}
                      {isLoadingProfilePic && (
                        <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={(e) => handleUserProfileUpdate()}
                    className="w-72 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
                  >
                    {!isLoadingSubmission && `Save and next`}
                    {isLoadingSubmission && (
                      <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                    )}
                  </button>
                </div>
              </>
            )}
            {profileSettingActiveTab === "Contact Details" && (
              <>
                <div className="flex flex-row flex-wrap">
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="email" className="text-[#676767]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails?.email}
                      required={true}
                      readOnly={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates("email", target.value, false)
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="contact" className="text-[#676767]">
                      Contact
                    </label>
                    <input
                      type="number"
                      name="contact"
                      value={userDetails?.contact}
                      required={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates("contact", target.value, false)
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label
                      htmlFor="permanentAddress"
                      className="text-[#676767]"
                    >
                      Permanent Address
                    </label>
                    <input
                      type="number"
                      name="permanentAddress"
                      value={userDetails?.permanentAddress}
                      required={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates(
                          "permanentAddress",
                          target.value,
                          true
                        )
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={(e) => handleUserProfileUpdate()}
                    className="w-72 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
                  >
                    {!isLoadingSubmission && `Save and next`}
                    {isLoadingSubmission && (
                      <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                    )}
                  </button>
                </div>
              </>
            )}
            {profileSettingActiveTab === "Next of Kin" && (
              <div>Next of Kin Details</div>
            )}
            {profileSettingActiveTab === "Payment Details" && (
              <div>Payment Details</div>
            )}
            {profileSettingActiveTab === "Withdrawal Details" && (
              <div>Withdrawal Details</div>
            )}
          </div>
        </>
      )}
      {settingActiveTab === "Account Setting" && <AccountSetting />}
    </div>
  );
};

export default Page;
