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
  updateUserDetails,
} from "@/app/redux/features/userSlice";
import AccountSetting from "@/components/user/setting-components/accountSetting";
import Image from "next/image";
import React, { act, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import { errorAlert, successAlert } from "@/utils/alert";
import {
  primaryDetailsSchema,
  contactDetailsSchema,
  nextOfKinSchema,
  imageUploadSchema,
  idCardUploadSchema,
} from "../../../lib/validations/authentications";
import { isEmpty } from "lodash";
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
  const [nextOfKinDetails, setNextOfKinDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [withdrawalDetails, setWithdrawalDetails] = useState(null);
// console.log("userDetails==>",userDetails);

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
        if (response.body.userProfile.nextOfKinDetails) {
          setNextOfKinDetails(response.body.userProfile.nextOfKinDetails);
        } else {
          setNextOfKinDetails({
            fullName: "",
            relation: "",
            email: "",
            contact: "",
            nicNumber: "",
            dobString: "",
          });
        }
        if (response.body.userProfile.paymentDetails) {
          setPaymentDetails(response.body.userProfile.paymentDetails);
          handleCardInput(response.body.userProfile.paymentDetails.cardNumber);
        } else {
          setPaymentDetails({
            nameOnCard: "",
            cardNumber: "",
            cardExpiryMonth: "",
            cardExpiryYear: "",
            cardCVV: "",
          });
        }
        if (response.body.userProfile.withdrawalDetails) {
          setWithdrawalDetails(response.body.userProfile.withdrawalDetails);
        } else {
          setWithdrawalDetails({
            accountTitle: "",
            ibanNumber: "",
            branchCode: "",
            swiftCode: "",
          });
        }
        const user = response.body;
        const userDetails = {
          role: user.role,
          username: user.username,
          email: user.email,
          profilePicURL: user.userProfile.profilePicURL,
          isProfileCompleted: user.isProfileCompleted,
        };
        dispatch(updateUserDetails(userDetails));
        userDetails.name = user.name;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "", // Clear the error for the specific field
    }));
    setErrorsContact((prevErrors) => ({
      ...prevErrors,
      [field]: "", // Clear the error for the specific field
    }));
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
  const relationList = [
    "Parent",
    "Child",
    "Sibling",
    "Spouse",
    "Partner",
    "Grandparent",
    "Grandchild",
    "Aunt",
    "Uncle",
    "Cousin",
    "Niece",
    "Nephew",
    "Friend",
    "Colleague",
    "Acquaintance",
    "Other",
  ];

  const [files, setFiles] = useState(null);
  const [isLoadingProfilePic, setIsLoadingProfilePic] = useState(false);
  const initailErrorsImageUpload = {
    imageFile: "",
  };
  const [errorsImageUpload, setErrorsImageUpload] = useState(
    initailErrorsImageUpload
  );
  const initailErrorsIDCardPic = {
    imageFile: "",
  };
  const [errorsIDCardPic, setErrorsIDCardPic] = useState(
    initailErrorsIDCardPic
  );
  const handleUploadProfilePic = async () => {
    try {
      setIsLoadingProfilePic(true);
      // await imageUploadSchema.validate({ imageFile: files });
      let fieldErrors;

      // Validate using Yup
      await imageUploadSchema
        .validate({ imageFile: files }, { abortEarly: false })
        .catch((error) => {
          fieldErrors = error.inner.reduce((acc, err) => {
            return {
              ...acc,
              [err.path]: err.message,
            };
          }, {});

          setErrorsImageUpload(fieldErrors);
        });
      if (!isEmpty(fieldErrors)) {
        throw new Error(
          "Unsupported file format. Only JPG, JPEG, PNG, and GIF are allowed."
        );
      }

      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const formData = new FormData();

      formData.append("username", username);
      for (const file of files) formData.append("imageFile", file);

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

        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoadingProfilePic(false);
      errorAlert("Error", error.message);
    }
  };

  const [selectedIDCardFace, setSelectedIDCardFace] = useState("");
  const [idCardFiles, setIdCardFiles] = useState(null);
  const [isLoadingIDCardPic, setIsLoadingIDCardPic] = useState(false);

  const handleUploadIDCardPic = async () => {
    try {
      let fieldErrors;
      for (const file of idCardFiles)
        await idCardUploadSchema
          .validate({ imageFile: file }, { abortEarly: false })
          .catch((error) => {
            fieldErrors = error.inner.reduce((acc, err) => {
              return {
                ...acc,
                [err.path]: err.message,
              };
            }, {});
            setErrorsIDCardPic(fieldErrors);
          });
      if (!isEmpty(fieldErrors)) {
        throw new Error(
          "Unsupported file format. Only JPG, JPEG, PNG, and GIF are allowed."
        );
      }
      setIsLoadingIDCardPic(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;

      const formData = new FormData();

      formData.append("username", username);
      formData.append("cardFace", selectedIDCardFace);
      for (const file of idCardFiles) formData.append("imageFile", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/upload-id-card-pics`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const response = await res.json();

      if (response.success) {
        if (selectedIDCardFace === "Front") {
          setUserDetails((prevDetails) => {
            const newDetails = { ...prevDetails };
            newDetails["userProfile"] = {
              ...newDetails["userProfile"],
              ["idCardFrontAdded"]: true,
              ["idCardPicsDir"]: response.body,
            };
            return newDetails;
          });
          successAlert("Success", `Front Side ${response.message}`);
        } else if (selectedIDCardFace === "Back") {
          setUserDetails((prevDetails) => {
            const newDetails = { ...prevDetails };
            newDetails["userProfile"] = {
              ...newDetails["userProfile"],
              ["idCardBackAdded"]: true,
              ["idCardPicsDir"]: response.body,
            };
            return newDetails;
          });
          successAlert("Success", `Back Side ${response.message}`);
        }
      }
    } catch (error) {
      errorAlert("Error", error.message);
    } finally {
      setIsLoadingIDCardPic(false);
    }
  };

  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const initialErrors = {
    name: "",
    gender: "",
    dobString: "",
    nicNumber: "",
    nationality: "",
    religion: "",
    bloodGroup: "",
  };
  const initailErrorsContact = {
    contact: "",
    permanentAddress: "",
  };
  const initailErrorsNextOfKin = {
    fullName: "",
    relation: "",
    email: "",
    contact: "",
    nicNumber: "",
    dobString: "",
  };
  const [errors, setErrors] = useState(initialErrors);
  const [errorsContact, setErrorsContact] = useState(initailErrorsContact);
  const [errorsNextOfKin, setErrorsNextOfKin] = useState(
    initailErrorsNextOfKin
  );
  const handleUserProfileUpdate = async () => {
    try {
      setIsLoadingSubmission(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const action = profileSettingActiveTab;
      let body = {};
      if (action === "Primary Details") {
        const primaryDetailsToValidate = {
          ...userDetails.userProfile,
          name: userDetails.name, // Include name here
        };
        let fieldErrors;
        // Validate using Yup
        await primaryDetailsSchema
          .validate(primaryDetailsToValidate, { abortEarly: false })
          .catch((error) => {
            fieldErrors = error.inner.reduce((acc, err) => {
              return {
                ...acc,
                [err.path]: err.message,
              };
            }, {});

            setErrors(fieldErrors);
          });
        if (!isEmpty(fieldErrors)) {
          throw new Error("Missing Fields");
        }

        // if (
        //   userDetails.name.length === 0 ||
        //   userDetails.userProfile.gender.length === 0 ||
        //   userDetails.userProfile.dobString.length === 0 ||
        //   userDetails.userProfile.nicNumber.length === 0 ||
        //   userDetails.userProfile.nationality.length === 0 ||
        //   userDetails.userProfile.religion.length === 0
        // )
        //   throw new Error("Missing Fields");
        body.name = userDetails.name;
        body.gender = userDetails.userProfile.gender;
        body.dobString = userDetails.userProfile.dobString;
        body.nicNumber = userDetails.userProfile.nicNumber;
        body.nationality = userDetails.userProfile.nationality;
        body.religion = userDetails.userProfile.religion;
        body.bloodGroup = userDetails.userProfile.bloodGroup;
      } else if (action === "Contact Details") {
        let fieldErrors;
        const primaryDetailsToValidate = {
          contact: userDetails.contact,
          permanentAddress: userDetails.userProfile.permanentAddress,
        };
        // Validate using Yup
        await contactDetailsSchema
          .validate(primaryDetailsToValidate, { abortEarly: false })
          .catch((error) => {
            fieldErrors = error.inner.reduce((acc, err) => {
              return {
                ...acc,
                [err.path]: err.message,
              };
            }, {});

            setErrorsContact(fieldErrors);
          });
        if (!isEmpty(fieldErrors)) {
          throw new Error("Missing Fields");
        }
        // if (
        //   `${userDetails.contact}`.length === 0 ||
        //   userDetails.userProfile.permanentAddress.length === 0
        // ) {
        //   throw new Error("Missing Fields");
        // }
        (body.contact = userDetails.contact),
          (body.permanentAddress = userDetails.userProfile.permanentAddress);
      } else if (action === "Next of Kin") {
        let fieldErrors;

        // Validate using Yup
        await nextOfKinSchema
          .validate(nextOfKinDetails, { abortEarly: false })
          .catch((error) => {
            fieldErrors = error.inner.reduce((acc, err) => {
              return {
                ...acc,
                [err.path]: err.message,
              };
            }, {});

            setErrorsNextOfKin(fieldErrors);
          });
        if (!isEmpty(fieldErrors)) {
          throw new Error("Missing Fields");
        }
        // if (
        //   nextOfKinDetails.fullName.length === 0 ||
        //   nextOfKinDetails.relation.length === 0 ||
        //   nextOfKinDetails.email.length === 0 ||
        //   `${nextOfKinDetails.contact}`.length === 0 ||
        //   `${nextOfKinDetails.nicNumber}`.length === 0 ||
        //   nextOfKinDetails.dobString.length === 0
        // )
        //   throw new Error("Missing Fields");
        body.nextOfKinDetails = {
          fullName: nextOfKinDetails.fullName,
          relation: nextOfKinDetails.relation,
          email: nextOfKinDetails.email,
          contact: nextOfKinDetails.contact,
          nicNumber: nextOfKinDetails.nicNumber,
          dobString: nextOfKinDetails.dobString,
        };
      }
      // } else if (action === "Payment Details") {
      //   if (
      //     paymentDetails.nameOnCard &&
      //     paymentDetails.cardNumber &&
      //     paymentDetails.cardExpiryMonth &&
      //     paymentDetails.cardExpiryYear &&
      //     paymentDetails.cardCVV
      //   )
      //     body.paymentDetails = paymentDetails;
      //   else throw new Error("missing fields.");
      // } else if (action === "Withdrawal Details") {
      //   if (
      //     withdrawalDetails.accountTitle &&
      //     withdrawalDetails.ibanNumber &&
      //     withdrawalDetails.branchCode &&
      //     withdrawalDetails.swiftCode
      //   )
      //     body.withdrawalDetails = withdrawalDetails;
      //   else throw new Error("missing fields.");
      // }
      else {
        throw new Error("wrong action");
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
        } else if (action === "Contact Details") {
          dispatch(handleUserProfileSettingNavigation("Next of Kin"));
        } else if (action === "Next of Kin") {
          dispatch(handleUserProfileSettingNavigation("Primary Details"));
          // dispatch(handleUserProfileSettingNavigation("Payment Details"));
        }
        // } else if (action === "Payment Details") {
        //   dispatch(handleUserProfileSettingNavigation("Withdrawal Details"));
        // } else if (action === "Withdrawal Details") {
        //   dispatch(handleUserProfileSettingNavigation("Primary Details"));
        // }

        fetchUserDetails();
        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoadingSubmission(false);
      errorAlert("Error", error.message);
    }
  };

  const [cardIcon, setCardIcon] = useState(null);

  // Function to format card number and set card type
  const handleCardInput = (value) => {
    const formattedValue = formatCardNumber(value);
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      cardNumber: formattedValue,
    }));
    detectCardType(formattedValue);
  };

  // Function to format card number
  function formatCardNumber(value) {
    return value
      .replace(/\D/g, "") // Remove any non-numeric characters
      .replace(/(.{4})/g, "$1 ") // Add space every four digits
      .trim() // Remove trailing space
      .substring(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
  }

  // Function to detect card type
  function detectCardType(number) {
    const num = number.replace(/\s+/g, ""); // Remove spaces
    if (num.startsWith("4")) {
      setCardIcon(<FaCcVisa className="text-blue-600 text-2xl" />);
    } else if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) {
      setCardIcon(<FaCcMastercard className="text-red-600 text-2xl" />);
    } else {
      setCardIcon(null);
    }
  }

  const primaryDetailsRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const nextOfKinRef = useRef(null);

  const handleScrollIntoView = (ref) => {
    const innerWidth = window.innerWidth;

    if (innerWidth < 720) {
      ref.current?.scrollIntoView({
        behavior: "smooth", // Adds a smooth scroll effect
        block: "nearest", // Ensures the element is scrolled to the nearest visible area
        inline: "center", // Keeps the element centered in the view horizontally
      });
    }
  };

  return (
    <div
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="w-screen flex flex-row max-w-screen overflow-x-auto items-center justify-start xxl:mx-24 xl:mx-16 lg:mx-10 px-5 md:space-x-20 space-x-14 my-3 text-white text-2xl font-semibold">
        <button
          onClick={() =>
            dispatch(handleUserSettingNavigation("Profile Setting"))
          }
        >
          <h1
            className={`flex w-[10rem] whitespace-nowrap ${
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
            className={`flex w-[12rem] whitespace-nowrap ${
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
          <div className="flex flex-row max-w-screen items-center justify-start overflow-x-auto space-x-5 xxl:mx-24 xl:mx-16 lg:mx-10 mx-5 my-16 text-xl">
            <button
              type="button"
              onClick={() => {
                handleScrollIntoView(primaryDetailsRef);
                dispatch(handleUserProfileSettingNavigation("Primary Details"));
              }}
              ref={primaryDetailsRef}
              className={`${
                profileSettingActiveTab === "Primary Details"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] w-[25rem] font-semibold whitespace-nowrap`}
            >
              Primary Details
            </button>
            <button
              type="button"
              onClick={() => {
                handleScrollIntoView(contactDetailsRef);
                dispatch(handleUserProfileSettingNavigation("Contact Details"));
              }}
              ref={contactDetailsRef}
              className={`${
                profileSettingActiveTab === "Contact Details"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] w-[25rem] font-semibold whitespace-nowrap`}
            >
              Contact Details
            </button>
            <button
              type="button"
              onClick={() => {
                handleScrollIntoView(nextOfKinRef);
                dispatch(handleUserProfileSettingNavigation("Next of Kin"));
              }}
              ref={nextOfKinRef}
              className={`${
                profileSettingActiveTab === "Next of Kin"
                  ? "opacity-100"
                  : "opacity-70"
              } text-[#09363F] w-[25rem] font-semibold whitespace-nowrap`}
            >
              Next of Kin
            </button>
            {/* <button
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
            </button> */}
          </div>
          <div>
            <div
              className={`w-[200px] ${
                userDetails?.userProfile?.profileCompletePercentage === 100
                  ? "border-green-500"
                  : "border-[#116A7B]"
              } border rounded-full overflow-hidden xxl:mx-24 xl:mx-16 lg:mx-10 mx-5 `}
            >
              <div
                className={`${
                  userDetails?.userProfile?.profileCompletePercentage === 100
                    ? "bg-green-500"
                    : "bg-[#116A7B]"
                }  text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full`}
                style={{
                  width: `${userDetails?.userProfile?.profileCompletePercentage}%`,
                }}
              >
                {userDetails?.userProfile?.profileCompletePercentage === 100
                  ? "Completed"
                  : `${userDetails?.userProfile?.profileCompletePercentage}%`}
              </div>
            </div>
          </div>
          <div className="xxl:mx-24 xl:mx-16 lg:mx-10 mx-5 my-16">
            {profileSettingActiveTab === "Primary Details" && (
              <>
                <div className="flex flex-row flex-wrap">
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errors.name && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errors.gender && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      max={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 18)
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-6 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errors.dobString && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.dobString}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errors.nicNumber && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.nicNumber}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                        className="inline-flex xs:mx-10 xs:mt-0 mt-1 mx-0 xs:w-fit w-[310px] border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errors.nationality && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.nationality}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errors.religion && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.religion}
                      </div>
                    )}
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
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
                      onChange={({ target }) => {
                        setFiles(target.files);
                        setErrorsImageUpload((prevErrors) => ({
                          ...prevErrors,
                          imageFile: "", // Clear the error for this field
                        }));
                      }}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] file:border-0 file:bg-violet-50 file:rounded-full file:text-violet-700
                               hover:file:bg-violet-100 text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    {errorsImageUpload.imageFile && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsImageUpload.imageFile}
                      </div>
                    )}
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
                  <div className="flex flex-col mr-6 sm:w-[620px] xs:w-[370px] w-[320px]">
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
                  <div className="flex flex-col mr-6">
                    <div>
                      <label htmlFor="bloodGroup" className="text-[#676767]">
                        ID Card
                      </label>
                      <select
                        name="bloodGroup"
                        value={selectedIDCardFace}
                        onChange={({ target }) => {
                          if (target.value === "Select") {
                            setSelectedIDCardFace("");
                          } else {
                            setSelectedIDCardFace(target.value);
                          }
                        }}
                        className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                      >
                        <option value="Select">Select</option>
                        <option value="Front">Front</option>
                        <option value="Back">Back</option>
                      </select>
                    </div>
                    <input
                      type="file"
                      accept="image/png"
                      disabled={selectedIDCardFace === ""}
                      required={true}
                      onChange={({ target }) => {
                        setIdCardFiles(target.files);
                        setErrorsIDCardPic((prevErrors) => ({
                          ...prevErrors,
                          imageFile: "", // Clear the error for this field
                        }));
                      }}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] file:border-0 file:bg-violet-50 file:rounded-full file:text-violet-700
                               hover:file:bg-violet-100 file:disabled:opacity-40 file:opacity-100 text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    {errorsIDCardPic.imageFile && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsIDCardPic.imageFile}
                      </div>
                    )}
                    {selectedIDCardFace === "Front" && (
                      <div className="my-5">
                        {userDetails?.userProfile.idCardFrontAdded ? (
                          <Image
                            width={1000}
                            height={1000}
                            src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${userDetails?.userProfile.idCardPicsDir}Front.png`}
                            className="w-32 h-32 object-cover object-center"
                          />
                        ) : (
                          <Image
                            width={1000}
                            height={1000}
                            src={`/no-image.jpg`}
                            className="w-32 h-32 object-cover object-center rounded-full"
                          />
                        )}
                      </div>
                    )}
                    {selectedIDCardFace === "Back" && (
                      <div className="my-5">
                        {userDetails?.userProfile.idCardBackAdded ? (
                          <Image
                            width={1000}
                            height={1000}
                            src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${userDetails?.userProfile.idCardPicsDir}Back.png`}
                            className="w-32 h-32 object-cover object-center"
                          />
                        ) : (
                          <Image
                            width={1000}
                            height={1000}
                            src={`/no-image.jpg`}
                            className="w-32 h-32 object-cover object-center rounded-full"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mr-6 sm:w-[620px] xs:w-[370px] w-[320px]">
                    <label htmlFor="propertyImages" className="text-[#676767]">
                      &nbsp;
                    </label>
                    <button
                      type="button"
                      onClick={(e) => handleUploadIDCardPic()}
                      disabled={selectedIDCardFace === ""}
                      className="w-40 disabled:opacity-40 bg-[#116A7B] text-white text-lg font-medium px-7 py-3 mt-2 rounded-full"
                    >
                      {!isLoadingIDCardPic && `Upload`}
                      {isLoadingIDCardPic && (
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
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
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
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsContact.contact && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsContact.contact}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <label
                      htmlFor="permanentAddress"
                      className="text-[#676767]"
                    >
                      Permanent Address
                    </label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={userDetails?.userProfile?.permanentAddress}
                      required={true}
                      onChange={({ target }) =>
                        handleUserProfileUpdates(
                          "permanentAddress",
                          target.value,
                          true
                        )
                      }
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsContact.permanentAddress && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsContact.permanentAddress}
                      </div>
                    )}
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
              <>
                <div className="flex flex-row flex-wrap">
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <label htmlFor="fullNameNOK" className="text-[#676767]">
                      Fullname
                    </label>
                    <input
                      type="text"
                      name="fullNameNOK"
                      value={nextOfKinDetails?.fullName}
                      required={true}
                      onChange={({ target }) => {
                        setNextOfKinDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["fullName"] = target.value;
                          return newDetails;
                        });

                        // Reset the specific field's error
                        setErrorsNextOfKin((prevErrors) => ({
                          ...prevErrors,
                          fullName: "", // Clear the error for this field
                        }));
                      }}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsNextOfKin.fullName && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsNextOfKin.fullName}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <div>
                      <label htmlFor="relationNOK" className="text-[#676767]">
                        Relationship
                      </label>
                      <select
                        name="relationNOK"
                        value={nextOfKinDetails?.relation}
                        onChange={({ target }) => {
                          if (target.value !== "Select") {
                            setNextOfKinDetails((prevDetails) => {
                              const newDetails = { ...prevDetails };
                              newDetails["relation"] = target.value;
                              return newDetails;
                            });
                            setErrorsNextOfKin((prevErrors) => ({
                              ...prevErrors,
                              relation: "", // Clear the error for this field
                            }));
                          } else {
                            setNextOfKinDetails((prevDetails) => {
                              const newDetails = { ...prevDetails };
                              newDetails["relation"] = "";
                              return newDetails;
                            });
                          }
                        }}
                        className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                      >
                        <option value="Select">Select</option>
                        {relationList.map((relation, index) => (
                          <option key={index} value={relation}>
                            {relation}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      name="relationNOK"
                      value={nextOfKinDetails?.relation}
                      required={true}
                      readOnly={true}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsNextOfKin.relation && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsNextOfKin.relation}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <label htmlFor="emailNOK" className="text-[#676767]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="fullNameNOK"
                      value={nextOfKinDetails?.email}
                      required={true}
                      onChange={({ target }) => {
                        setNextOfKinDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["email"] = target.value;
                          return newDetails;
                        });
                        setErrorsNextOfKin((prevErrors) => ({
                          ...prevErrors,
                          email: "", // Clear the error for this field
                        }));
                      }}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsNextOfKin.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsNextOfKin.email}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <label htmlFor="contactNOK" className="text-[#676767]">
                      Contact
                    </label>
                    <input
                      type="number"
                      name="contactNOK"
                      value={nextOfKinDetails?.contact}
                      required={true}
                      onChange={({ target }) => {
                        setNextOfKinDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["contact"] = target.value;
                          return newDetails;
                        });
                        setErrorsNextOfKin((prevErrors) => ({
                          ...prevErrors,
                          contact: "", // Clear the error for this field
                        }));
                      }}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsNextOfKin.contact && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsNextOfKin.contact}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <label htmlFor="nicNumberNOK" className="text-[#676767]">
                      NIC Number
                    </label>
                    <input
                      type="number"
                      name="nicNumberNOK"
                      value={nextOfKinDetails?.nicNumber}
                      required={true}
                      onChange={({ target }) => {
                        setNextOfKinDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["nicNumber"] = target.value;
                          return newDetails;
                        });
                        setErrorsNextOfKin((prevErrors) => ({
                          ...prevErrors,
                          nicNumber: "", // Clear the error for this field
                        }));
                      }}
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-0 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsNextOfKin.nicNumber && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsNextOfKin.nicNumber}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6 mr-6 flex flex-col">
                    <label htmlFor="dobNOK" className="text-[#676767]">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dobNOK"
                      value={nextOfKinDetails?.dobString}
                      required={true}
                      onChange={({ target }) => {
                        const date = new Date(target.value);
                        setNextOfKinDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["dobString"] = date
                            .toISOString()
                            .split("T")[0];
                          return newDetails;
                        });
                        setErrorsNextOfKin((prevErrors) => ({
                          ...prevErrors,
                          dobString: "", // Clear the error for this field
                        }));
                      }}
                      max={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 18)
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                    <span className="absolute inset-y-12 right-6 px-5 text-red-600 font-semibold focus:outline-none cursor-pointer">
                      *
                    </span>
                    {errorsNextOfKin.dobString && (
                      <div className="text-red-500 text-xs mt-1">
                        {errorsNextOfKin.dobString}
                      </div>
                    )}
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
            {profileSettingActiveTab === "Payment Details" && (
              <>
                <div className="flex flex-row flex-wrap">
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="fullNamePD" className="text-[#676767]">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="fullNamePD"
                      value={paymentDetails?.nameOnCard}
                      required={true}
                      onChange={({ target }) =>
                        setPaymentDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["nameOnCard"] = target.value;
                          return newDetails;
                        })
                      }
                      className="sm:w-[620px] xs:w-[370px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="cardNumberPD" className="text-[#676767]">
                      Card Number
                    </label>
                    <div className="w-[620px] flex items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                      <input
                        type="text"
                        name="cardNumberPD"
                        inputMode="numeric"
                        maxLength="19"
                        value={paymentDetails?.cardNumber}
                        required={true}
                        onChange={({ target }) => handleCardInput(target.value)}
                        className="flex-grow text-xl text-[#676767] font-normal outline-none bg-transparent"
                      />
                      {cardIcon}
                    </div>
                  </div>
                  {/* Card Expiry Date - Month and Year */}
                  <div className="flex flex-col mb-6 mr-6">
                    <label htmlFor="expiryYear" className="text-[#676767]">
                      Card Expiry
                    </label>
                    <div className="flex flex-row w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full">
                      <input
                        type="text"
                        name="expiryMonth"
                        inputMode="numeric"
                        maxLength="2" // Length for MM
                        placeholder="MM"
                        value={paymentDetails?.cardExpiryMonth}
                        required={true}
                        onKeyDown={(event) => {
                          if (event.key === "Backspace")
                            setPaymentDetails((prevDetails) => {
                              const newDetails = { ...prevDetails };
                              newDetails["cardExpiryMonth"] = "";
                              return newDetails;
                            });
                        }}
                        onChange={({ target }) => {
                          const value = target.value;
                          if (value <= 12 && value >= 1)
                            setPaymentDetails((prevDetails) => {
                              const newDetails = { ...prevDetails };
                              newDetails["cardExpiryMonth"] = value;
                              return newDetails;
                            });
                        }}
                        onBlur={() => {
                          // Format the month when focus is lost
                          setPaymentDetails((prevDetails) => {
                            const newDetails = { ...prevDetails };
                            let month = newDetails["cardExpiryMonth"];
                            // Pad the month value with zero if it's a single digit
                            newDetails["cardExpiryMonth"] = month.padStart(
                              2,
                              "0"
                            );
                            return newDetails;
                          });
                        }}
                        className="w-20 text-xl text-[#676767] font-normal outline-none rounded-full"
                      />
                      <input
                        type="text"
                        name="expiryYear"
                        inputMode="numeric"
                        maxLength="4" // Length for YYYY
                        placeholder="YYYY"
                        value={paymentDetails?.cardExpiryYear}
                        required={true}
                        onKeyDown={(event) => {
                          if (event.key === "Backspace")
                            setPaymentDetails((prevDetails) => {
                              const newDetails = { ...prevDetails };
                              newDetails["cardExpiryYear"] = "";
                              return newDetails;
                            });
                        }}
                        onChange={({ target }) => {
                          const value = target.value;
                          const date = new Date();
                          const dateYearString = `${date.getFullYear()}`;
                          if (value[0] >= dateYearString[0])
                            setPaymentDetails((prevDetails) => {
                              const newDetails = { ...prevDetails };
                              newDetails["cardExpiryYear"] = value;
                              return newDetails;
                            });
                        }}
                        className="w-32 text-xl text-[#676767] font-normal outline-none rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="cardCVVPD" className="text-[#676767]">
                      CVV
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      maxLength={3}
                      name="cardCVVPD"
                      value={paymentDetails?.cardCVV}
                      required={true}
                      onKeyDown={(event) => {
                        // Prevent non-numeric characters
                        if (event.key === "Backspace") {
                          setPaymentDetails((prevDetails) => {
                            const newDetails = { ...prevDetails };
                            newDetails["cardCVV"] = "";
                            return newDetails;
                          });
                        } else if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={({ target }) => {
                        setPaymentDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["cardCVV"] = target.value.slice(0, 3);
                          return newDetails;
                        });
                      }}
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
            {profileSettingActiveTab === "Withdrawal Details" && (
              <>
                <div className="flex flex-row flex-wrap">
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="fullNameWD" className="text-[#676767]">
                      Account Title
                    </label>
                    <input
                      type="text"
                      name="fullNameWD"
                      value={withdrawalDetails?.accountTitle}
                      required={true}
                      placeholder="Required"
                      onChange={({ target }) =>
                        setWithdrawalDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["accountTitle"] = target.value;
                          return newDetails;
                        })
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="ibanNumberWD" className="text-[#676767]">
                      IBAN Number
                    </label>
                    <input
                      type="text"
                      name="ibanNumberWD"
                      value={withdrawalDetails?.ibanNumber}
                      required={true}
                      placeholder="Required"
                      onChange={({ target }) =>
                        setWithdrawalDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["ibanNumber"] = target.value;
                          return newDetails;
                        })
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="branchCodeWD" className="text-[#676767]">
                      Branch Code
                    </label>
                    <input
                      type="text"
                      name="branchCodeWD"
                      value={withdrawalDetails?.branchCode}
                      required={true}
                      placeholder="Required"
                      onChange={({ target }) =>
                        setWithdrawalDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["branchCode"] = target.value;
                          return newDetails;
                        })
                      }
                      className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                  <div className="mb-6 mr-6 flex flex-col">
                    <label htmlFor="swiftCodeWD" className="text-[#676767]">
                      Swift Code
                    </label>
                    <input
                      type="text"
                      name="swiftCodeWD"
                      value={withdrawalDetails?.swiftCode}
                      required={true}
                      placeholder="Required"
                      onChange={({ target }) =>
                        setWithdrawalDetails((prevDetails) => {
                          const newDetails = { ...prevDetails };
                          newDetails["swiftCode"] = target.value;
                          return newDetails;
                        })
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
          </div>
        </>
      )}
      {settingActiveTab === "Account Setting" && <AccountSetting />}
    </div>
  );
};

export default Page;
