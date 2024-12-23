import { updateActiveRaiseRequestTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RaiseRequestCard from "./raiseRequestCard";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AiFillMessage } from "react-icons/ai";
import Image from "next/image";
import Thread from "./threadComponent";
import RejectionModal from "../modals/raiseRequestRejectionModal";
import Link from "next/link";
import Slider from "react-slick";
import { TiArrowRightThick } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { errorAlert, successAlert } from "@/utils/alert";
import { MdPending } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { isEmpty } from "lodash";
import { raiseRequestSchema } from "../../lib/validations/authentications";

const NextArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowRight
      className={`${className} text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full`}
      style={{
        ...style,
        display: "block",
        color: "white",
        backgroundColor: "#116A7B",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowLeft
      className={`${className} text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full`}
      style={{
        ...style,
        display: "block",
        color: "white",
        backgroundColor: "#116A7B",
      }}
      onClick={onClick}
    />
  );
};

const RaiseRequest = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const dispatch = useDispatch();

  const activeRaiseRequestTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeRaiseRequestTab
  );

  const [isAddNewClicked, setIsAddNewClicked] = useState(false);

  const [requestType, setRequestType] = useState("Modification");
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [sharesList, setSharesList] = useState([]);
  const initialErrors = {
    selectedProperty: "",
    selectedRequestType: "",
    title: "",
    details: "",
    estimatedPrice: "",
    urlsList: "",
  };
  const [errors, setErrors] = useState(initialErrors);

  const fetchRaiseRequests = async (tag) => {
    try {
      setIsLoading(true);

      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-raise-request-by-username/${username}/${requestType}/${tag}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoading(false);
        setRequestsList(response.body);
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
    if (activeRaiseRequestTab === "My Requests") fetchRaiseRequests("my");
    else if (activeRaiseRequestTab === "All Requests")
      fetchRaiseRequests("all");
    else if (activeRaiseRequestTab === "Pending Approvals")
      fetchRaiseRequests("pending_approval");
    else setRequestsList([]);
  }, [activeRaiseRequestTab, requestType]);

  const [myPropertyList, setMyPropertyList] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedRequestType, setSelectedRequestType] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [urlsList, setUrlsList] = useState("");
  const [files, setFiles] = useState(null);

  const fetchMyProperties = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-username/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const response = await res.json();
      if (response.success) {
        setMyPropertyList(response.body.sharesPerProperty);
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

  function validateURLs(urlsList) {
    const regex = /^(https?:\/\/[^\s,]+)(,[^\s,]+)*$/;
    return regex.test(urlsList);
  }

  const handleRequestSubmit = async () => {
    try {
      // if (selectedProperty.length === 0) {
      //   throw new Error("Select a property");
      // } else if (selectedRequestType.length === 0) {
      //   throw new Error("Select a request type");
      // } else if (
      //   title.length === 0 ||
      //   details.length === 0 ||
      //   parseInt(estimatedPrice) === 0
      // ) {
      //   throw new Error("Missing fields");
      // } else if (urlsList.length > 0) {
      //   if (!validateURLs(urlsList)) {
      //     throw new Error("Urls added incorrectly");
      //   }
      // }

      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const formValues = {
        selectedProperty,
        selectedRequestType,
        title,
        details,
        estimatedPrice,
        urlsList,
      };
      // Reset errors before validation
      setErrors(initialErrors);
      let fieldErrors ;
      await raiseRequestSchema
        .validate(formValues, { abortEarly: false })
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

      const urlsArray = urlsList.split(",");

      const formData = new FormData();

      formData.append("propertyID", selectedProperty);
      formData.append("username", username);
      formData.append("title", title);
      formData.append("details", details);
      formData.append("price", estimatedPrice);
      formData.append("type", selectedRequestType);
      urlsArray.map((url, index) => {
        formData.append(`URLsList[${index}]`, url);
      });

      if (files)
        for (const file of files) {
          formData.append("imageFiles", file);
        }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/gen-raise-request`,
        {
          method: "POST",
          body: formData,
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsAddNewClicked(false);
        setSelectedProperty("");
        setSelectedRequestType("");
        setTitle("");
        setDetails("");
        setEstimatedPrice("");
        setUrlsList("");
        setFiles(null);
        fetchRaiseRequests();
        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const fetchRaiseRequestDetail = async (requestID) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-raise-request-detail/${requestID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setSelectedRequest(response.body.raiseRequest);
        setSharesList(response.body.sharesList);
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

  function processApprovedPercentage() {
    if (selectedRequest) {
      const answer =
        selectedRequest.approvedByUsersList.length / sharesList.length;
      const percentage = Math.round(answer * 100);
      return `${percentage}%`;
    }
    return "";
  }

  function processDate(dateString) {
    if (dateString && dateString.length > 0) {
      const date = new Date(dateString);

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dateOfMonth = date.getDate();
      const commutedDateString = `${getDaySuffix(dateOfMonth)} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;

      return commutedDateString;
    }
  }

  function getDaySuffix(dateOfMonth) {
    const j = dateOfMonth % 10,
      k = dateOfMonth % 100;
    if (j === 1 && k !== 11) {
      return `${dateOfMonth}st`;
    }
    if (j === 2 && k !== 12) {
      return `${dateOfMonth}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${dateOfMonth}rd`;
    }
    return `${dateOfMonth}th`;
  }

  function checkUseNumOfShares(username) {
    let count = 0;

    sharesList.map((share) => {
      if (share.currentOwnerDocID.username === username) {
        count += 1;
      }
    });

    return count;
  }

  const handleRaiseRequestAction = async (requestID, username, action) => {
    try {
      const data = {
        requestID: requestID,
        username: username,
        occurence: checkUseNumOfShares(username),
        action: action,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-raise-request-action`,
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
        setSelectedRequest(response.body);
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

  const [showThreadsByShare, setShowThreadsByShare] = useState("");
  const [threads, setThreads] = useState([]);

  const fetchThreads = async (shareID, category, requestID) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-root-threads/${shareID}/${category}/?requestID=${requestID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setThreads(response.body);
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

  const [threadBody, setThreadBody] = useState("");

  const threadBodyRef = useRef(null);
  useEffect(() => {
    if (threadBodyRef.current) {
      threadBodyRef.current.style.height = "inherit"; // Reset the height so the scrollHeight measurement is correct
      threadBodyRef.current.style.height = `${threadBodyRef.current.scrollHeight}px`;
    }
  }, [threadBody]); // Adjust height whenever text changes

  const handleThreadSubmit = async (shareID, requestID) => {
    try {
      const data = {
        shareID: shareID,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        body: threadBody,
        category: requestType,
        requestID: requestID,
        threadLevel: "0",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/add-root-thread`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      if (response.success) {
        successAlert("Success", response.message);
        setThreadBody("");
        fetchThreads(shareID, requestType, requestID);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const [selectedShareID, setSelectedShareID] = useState("");
  const [raiseRequestActionBody, setRaiseRequestActionBody] = useState(null);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);

  const handleRejectionModalOpen = () => setIsRejectionModalOpen(true);
  const handleRejectionModalClose = () => {
    setSelectedShareID("");
    setIsRejectionModalOpen(false);
    setRaiseRequestActionBody(null);
  };

  const handleRaiseRequestApproveByPropertyOwner = async () => {
    try {
      const usernameList = [];
      sharesList.map((share) => {
        if (!usernameList.includes(share.currentOwnerDocID.username)) {
          usernameList.push(share.currentOwnerDocID.username);
        }
      });

      const data = {
        requestID: selectedRequest.raisedRequestID,
        usernameList: usernameList,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-raise-request-action-by-PO`,
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
        fetchRequests("pending_approval");
        successAlert("Success", response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }
  };

  const myRequestsRef = useRef(null);
  const allRequestsRef = useRef(null);
  const pendingApprovalsRef = useRef(null);

  const handleScrollIntoView = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth", // Adds a smooth scroll effect
      block: "nearest", // Ensures the element is scrolled to the nearest visible area
      inline: "center", // Keeps the element centered in the view horizontally
    });
  };

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      {isAddNewClicked ? (
        <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pb-7 sm:px-14 pl-14 pr-5">
          <h1 className="text-2xl font-medium">
            Modification and Maintenance Requests
          </h1>
          <button
            onClick={() => {
              setIsAddNewClicked(false);
              //   setFormPhase(1);
            }}
            type="button"
            className="sm:w-52 w-20 bg-[#116A7B] text-white sm:text-lg text-sm ml-auto mx-1 sm:px-5 px-3 py-1 rounded-full"
          >
            Back
            {/* <FaPlus className="inline-flex text-sm ml-2 mb-1" /> */}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pb-7 sm:px-14 pl-14 pr-5">
          <h1 className="text-2xl font-medium">
            Modification and Maintenance Requests
          </h1>
          <button
            onClick={(e) => {
              fetchMyProperties();
              setIsAddNewClicked(true);
            }}
            type="button"
            className="sm:w-52 w-20 bg-[#116A7B] text-white sm:text-lg text-sm ml-auto mx-1 sm:px-5 px-3 py-1 rounded-full"
          >
            <h3 className="sm:inline-flex hidden ">New Request</h3>
            <FaPlus className="sm:hidden inline-flex text-sm mb-1" />
          </button>
        </div>
      )}
      {isAddNewClicked ? (
        <div className="sm:mx-14 mx-5">
          <div className="my-5">
            <select
              name="myProperties"
              value={selectedProperty}
              onChange={({ target }) => {
                if (target.value === "My Properties") {
                  setSelectedProperty("");
                } else {
                  setSelectedProperty(target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    selectedProperty: "", // Clear the error for this field
                  }));
                }
              }}
              className="inline-flex bg-[#D9D9D9] text-xl font-semibold border border-[#116A7B30] rounded px-3 py-1 focus:border-[#116A7B] outline-none"
            >
              <option value="My Properties">My Properties</option>
              {myPropertyList?.map((myProperty, index) => (
                <option
                  className="border-b border-black"
                  value={myProperty.propertyID}
                  key={index}
                >
                  {myProperty.propertyDetails.title}
                </option>
              ))}
            </select>
            {errors.selectedProperty && (
              <div className="text-red-500 text-xs mt-1">
                {errors.selectedProperty}
              </div>
            )}
          </div>
          <div className="my-5">
            <select
              name="selectedRequestType"
              value={selectedRequestType}
              onChange={({ target }) => {
                if (target.value === "Request Type") {
                  setSelectedRequestType("");
                } else {
                  setSelectedRequestType(target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    selectedRequestType: "", // Clear the error for this field
                  }));
                }
              }}
              className="inline-flex bg-[#D9D9D9] text-xl font-semibold border border-[#116A7B30] rounded px-3 py-1 focus:border-[#116A7B] outline-none"
            >
              <option value="Request Type">Request Type</option>
              <option value="Modification">Modification</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            {errors.selectedRequestType && (
              <div className="text-red-500 text-xs mt-1">
                {errors.selectedRequestType}
              </div>
            )}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mb-6 mr-6 flex flex-col">
              <label htmlFor="requestTitle" className="text-[#676767]">
                Title
              </label>
              <input
                type="text"
                name="requestTitle"
                value={title}
                required={true}
                placeholder="Required"
                onChange={({ target }) => {setTitle(target.value)
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    title: "", // Clear the error for this field
                  }));
                }}
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
                {errors.title && (
              <div className="text-red-500 text-xs mt-1">
                {errors.title}
              </div>
            )}
            </div>
            <div className="mb-6 mr-6 flex flex-col">
              <label htmlFor="requestDetails" className="text-[#676767]">
                Details
              </label>
              <input
                type="text"
                name="requestDetails"
                value={details}
                required={true}
                placeholder="Required"
                onChange={({ target }) =>{ setDetails(target.value)
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    details: "", // Clear the error for this field
                  }));
                }}
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
                {errors.details && (
              <div className="text-red-500 text-xs mt-1">
                {errors.details}
              </div>
            )}
            </div>
            <div className="mb-6 mr-6 flex flex-col">
              <label htmlFor="requestEstimatedPrice" className="text-[#676767]">
                Estimated Price
              </label>
              <input
                type="number"
                inputMode="numeric"
                name="requestEstimatedPrice"
                value={estimatedPrice}
                required={true}
                placeholder="Required"
                onChange={({ target }) => {setEstimatedPrice(target.value)
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    estimatedPrice: "", // Clear the error for this field
                  }));
                }}
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
                {errors.estimatedPrice && (
              <div className="text-red-500 text-xs mt-1">
                {errors.estimatedPrice}
              </div>
            )}
            </div>
            <div className="mb-6 mr-6 flex flex-col">
              <label htmlFor="propertyImages" className="text-[#676767]">
                Max 10, {`supported formats: .png`}
              </label>
              <input
                type="file"
                multiple
                accept="image/png"
                required={true}
                onChange={({ target }) => setFiles(target.files)}
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
              />
            </div>
            <div className="mb-6 mr-6 flex flex-col">
              <label htmlFor="requestUrlsList" className="text-[#676767]">
                Attach Links <br className="xs:hidden" />
                (separate each link with a comma ,)
              </label>
              <textarea
                rows={5}
                name="requestUrlsList"
                value={urlsList}
                required={true}
                onChange={({ target }) => {setUrlsList(target.value)
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    urlsList: "", // Clear the error for this field
                  }));
                }}
                style={{ resize: "none" }}
                className="sm:w-[620px] xs:w-[420px] w-[320px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded"
              />
                {errors.urlsList && (
              <div className="text-red-500 text-xs mt-1">
                {errors.urlsList}
              </div>
            )}
            </div>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={(e) => handleRequestSubmit()}
              className="w-72 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
            >
              Submit
              {/* {!isLoadingSubmission && `Save and next`}
              {isLoadingSubmission && (
                <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
              )} */}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {!selectedRequest && (
            <div className="max-w-screen overflow-auto flex items-center justify-start md:space-x-20 space-x-14 my-3 sm:px-14 px-5 text-white text-2xl font-semibold">
              <button
                onClick={() => {
                  dispatch(updateActiveRaiseRequestTab("My Requests"));
                  // setSelectedInspection(null);
                  setSelectedRequest(null);
                  setThreads([]);
                  setThreadBody("");
                  handleScrollIntoView(myRequestsRef);
                }}
                ref={myRequestsRef}
              >
                <h1
                  className={`flex w-40 whitespace-nowrap ${
                    activeRaiseRequestTab === "My Requests"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  My Requests
                </h1>
              </button>
              {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
              <button
                onClick={() => {
                  dispatch(updateActiveRaiseRequestTab("All Requests"));
                  // setSelectedInspection(null);
                  setSelectedRequest(null);
                  setThreads([]);
                  setThreadBody("");
                  handleScrollIntoView(allRequestsRef);
                }}
                ref={allRequestsRef}
              >
                <h2
                  className={`flex w-40 whitespace-nowrap ${
                    activeRaiseRequestTab === "All Requests"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  All Requests
                </h2>
              </button>
              <button
                onClick={() => {
                  dispatch(updateActiveRaiseRequestTab("Pending Approvals"));
                  // setSelectedInspection(null);
                  setSelectedRequest(null);
                  setThreads([]);
                  setThreadBody("");
                  handleScrollIntoView(pendingApprovalsRef);
                }}
                ref={pendingApprovalsRef}
              >
                <h2
                  className={`flex w-56 whitespace-nowrap ${
                    activeRaiseRequestTab === "Pending Approvals"
                      ? "underline-text"
                      : "hover-underline-animation"
                  } `}
                >
                  Pending Approvals
                </h2>
              </button>

              {/* </Link> */}
            </div>
          )}
          {!selectedRequest && (
            <div className="my-5 sm:mx-3 mx-5">
              <select
                name="requestType"
                value={requestType}
                onChange={({ target }) => {
                  setRequestType(target.value);
                }}
                className="inline-flex sm:mx-10 bg-[#D9D9D9] text-xl font-semibold border border-[#116A7B30] rounded px-3 py-1 focus:border-[#116A7B] outline-none"
              >
                <option value="Modification">Modification</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          )}
          <RejectionModal
            isOpen={isRejectionModalOpen}
            onClose={handleRejectionModalClose}
            shareID={selectedShareID}
            fetchThreads={fetchThreads}
            category={requestType}
            actionBody={raiseRequestActionBody}
            setSelection={setSelectedRequest}
          />
          {activeRaiseRequestTab === "My Requests" && (
            <div>
              {!isLoading ? (
                !selectedRequest && (
                  <div className="sm:mx-14 mx-5 flex flex-col">
                    {requestsList?.length > 0 ? (
                      requestsList?.map((request, index) => (
                        <div
                          key={index}
                          className="cursor-pointer flex flex-row"
                          onClick={() => {
                            if (request.status !== "Payment Pending") {
                              fetchRaiseRequestDetail(request.raisedRequestID);
                              setSelectedRequest(request);
                            }
                          }}
                        >
                          <RaiseRequestCard card={request} />
                        </div>
                      ))
                    ) : (
                      <div>No Requests</div>
                    )}
                  </div>
                )
              ) : (
                <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                  <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
                </div>
              )}
              {selectedRequest && (
                <>
                  <div className="w-full flex flex-row items-center pt-1 pb-7 md:px-14 px-5 mt-5">
                    <h1 className="text-2xl font-medium">Request Details</h1>
                    <button
                      onClick={(e) => setSelectedRequest(null)}
                      type="button"
                      className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                    >
                      Back
                    </button>
                  </div>
                  <div className="md:mx-14 mx-5">
                    {selectedRequest?.imageCount > 0 ? (
                      <div>
                        {/* Swiper component */}
                        {selectedRequest?.imageCount > 1 ? (
                          <Slider
                            {...settings}
                            // modules={[Pagination]}
                            // slidesPerView={1}
                            // // navigation={{
                            // //   nextEl: ".swiper-button-next", // Define next button class
                            // //   prevEl: ".swiper-button-prev", // Define prev button class
                            // // }}
                            // pagination={{
                            //   clickable: true,
                            //   el: "#swiper-pagination",
                            //   type: "bullets",
                            //   bulletActiveClass:
                            //     "swiper-pagination-bullet-active",
                            //   bulletClass: "swiper-pagination-bullet",
                            // }}
                            style={{ width: "100%", height: "70%" }}
                            className="mb-5"
                          >
                            {Array.from(
                              { length: selectedRequest?.imageCount },
                              (_, index) => (
                                <div key={index}>
                                  <Image
                                    width={2000}
                                    height={2000}
                                    src={`${
                                      process.env.NEXT_PUBLIC_SERVER_HOST
                                    }/${selectedRequest.imageDir}/image-${
                                      index + 1
                                    }.png`}
                                    className="w-full h-[22rem] object-contain object-center"
                                    alt={`Image ${index + 1}`}
                                  />
                                </div>
                              )
                            )}
                          </Slider>
                        ) : (
                          <div>
                            <Image
                              width={2000}
                              height={2000}
                              src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${selectedRequest.imageDir}/image-1.png`}
                              className="w-full h-[22rem] object-contain object-center"
                              alt={`Image 1`}
                            />
                          </div>
                        )}

                        {/* Custom navigation buttons */}
                        {/* <div className="swiper-button-prev custom-prev"></div>
                      <div className="swiper-button-next custom-next"></div> */}
                        {/* Custom pagination */}
                        {/* <div
                          id="swiper-pagination"
                          className="flex flex-row justify-center "
                        ></div> */}
                      </div>
                    ) : (
                      <div className="h-[44rem]">
                        <Image
                          width={1000}
                          height={1000}
                          src={"/assets/user/property-management/no-image.jpg"}
                          className="w-full h-full object-scale-down object-center"
                          alt={`${selectedRequest.title}-noimage`}
                        />
                      </div>
                    )}
                    <h2 className="text-xl text-[#A2B0B2] ">
                      {" "}
                      <strong className="text-[#676767]">
                        {" "}
                        {selectedRequest?.shareholderDocID?.userID?.name}
                      </strong>{" "}
                      <br /> {selectedRequest?.details}
                    </h2>
                    {selectedRequest.attachedURLsList.length > 0 && (
                      <ul className="my-5 w-fit">
                        {selectedRequest.attachedURLsList.map((url, i) => (
                          <Link href={url} key={i}>
                            <li>
                              <h5 className="text-blue-400 hover:text-blue-600 underline">
                                {url}
                              </h5>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                    <div className="my-10">
                      <h2 className="text-end p-5">
                        {" "}
                        <strong className="text-[#09363F]">
                          {processApprovedPercentage()} Approved
                        </strong>{" "}
                        <br /> (need 80% or more to complete)
                      </h2>
                      <div className="bg-[#FCFBF5] border border-[#D9D9D9] divide-y-2 divide-[#D9D9D9]">
                        {sharesList.map((share, index) => (
                          <div key={index}>
                            <div className="flex flex-row items-center justify-between sm:p-10 xs:p-5 p-2">
                              <h3 className="sm:text-xl xs:text-base text-sm text-[#09363F] font-semibold">
                                {share.currentOwnerDocID.username}{" "}
                                &nbsp;&nbsp;&nbsp;
                                {share.currentOwnerDocID.username ===
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && "(You)"}
                                <br />
                                <p className="sm:text-sm xs:text-xs text-[9px] font-normal">
                                  {processDate(
                                    share.availableInDuration.startDateString
                                  )}{" "}
                                  -{" "}
                                  {processDate(
                                    share.availableInDuration.endDateString
                                  )}
                                </p>
                              </h3>
                              <div className="flex flex-row items-center justify-center sm:space-x-5 xs:space-x-2 space-x-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setThreadBody("");
                                    if (showThreadsByShare === share.shareID)
                                      setShowThreadsByShare("");
                                    else {
                                      fetchThreads(
                                        share.shareID,
                                        requestType,
                                        selectedRequest.raisedRequestID
                                      );
                                      setShowThreadsByShare(share.shareID);
                                    }
                                  }}
                                  className="p-1"
                                >
                                  <AiFillMessage className="text-[#116A7B] sm:text-2xl text-base" />
                                </button>
                                {!selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) &&
                                  !selectedRequest?.rejectedByUsersList?.includes(
                                    share.currentOwnerDocID.username
                                  ) &&
                                  share.currentOwnerDocID.username ===
                                    JSON.parse(
                                      localStorage.getItem("userDetails")
                                    ).username && (
                                    <div className="flex flex-row items-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRaiseRequestAction(
                                            selectedRequest.raisedRequestID,
                                            share.currentOwnerDocID.username,
                                            "approved"
                                          )
                                        }
                                        className="sm:w-32 xs:w-16 w-14 sm:px-5 xs:px-3 px-1 py-1 sm:py-3 bg-[#116A7B] text-white sm:text-base xs:text-xs text-[9px] rounded mr-1 font-semibold"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedShareID(share.shareID);
                                          setRaiseRequestActionBody({
                                            requestID:
                                              selectedRequest.raisedRequestID,
                                            ownerUsername:
                                              share.currentOwnerDocID.username,
                                            action: "rejected",
                                            occurence: checkUseNumOfShares(
                                              share.currentOwnerDocID.username
                                            ),
                                          });
                                          handleRejectionModalOpen();
                                        }}
                                        className="sm:w-32 xs:w-16 w-14 sm:px-5 xs:px-3 px-1 py-1 sm:py-3 bg-[#116A7B] text-white sm:text-base xs:text-xs text-[9px] rounded mr-1 font-semibold"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  )}
                                {!selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) &&
                                  !selectedRequest?.rejectedByUsersList?.includes(
                                    share.currentOwnerDocID.username
                                  ) &&
                                  share.currentOwnerDocID.username !==
                                    JSON.parse(
                                      localStorage.getItem("userDetails")
                                    ).username && (
                                    <>
                                      <h4 className="text-base xs:block hidden">
                                        Pending Response
                                      </h4>
                                      <MdPending
                                        title="Pending Response"
                                        className="text-lg xs:hidden block text-yellow-500"
                                      />
                                    </>
                                  )}
                                {selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) && (
                                  <>
                                    <h4 className="text-base xs:block hidden">
                                      Approved
                                    </h4>
                                    <FaCheckCircle
                                      title="Approved"
                                      className="text-base xs:hidden block text-green-500"
                                    />
                                  </>
                                )}
                                {selectedRequest?.rejectedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) && (
                                  <>
                                    <h4 className="text-base xs:block hidden">
                                      Rejected
                                    </h4>
                                    <IoCloseCircle
                                      title="Rejected"
                                      className="text-lg xs:hidden block text-red-500"
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                            {showThreadsByShare === share.shareID &&
                            threads.length > 0
                              ? threads.map((thread) => (
                                  <div key={thread.threadID} className="">
                                    <Thread
                                      key={thread.threadID}
                                      shareOwner={
                                        share.currentOwnerDocID.username
                                      }
                                      thread={thread}
                                      isFirstLevel={true}
                                      threadIndex={index}
                                      // handleFetchChildren={handleFetchChildren}
                                      threadCategory={thread.category}
                                      threadLevel={parseInt(thread.threadLevel)}
                                      // propertyID={propertyID}
                                      startDate={processDate(
                                        share.availableInDuration
                                          .startDateString
                                      )}
                                      endDate={processDate(
                                        share.availableInDuration.endDateString
                                      )}
                                      shareID={share.shareID}
                                    />
                                  </div>
                                ))
                              : showThreadsByShare === share.shareID && (
                                  <div className="sm:text-[20px] text-base font-semibold text-[#116A7B]">
                                    <h1 className="text-center">
                                      No Threads Yet.
                                    </h1>
                                  </div>
                                )}
                            {showThreadsByShare === share.shareID && (
                              <div className="bg-[#FCFBF5] flex flex-row border border-[#D9D9D9] sm:px-5 px-3 py-1 sm:py-3 sm:mx-10 mx-5 my-5 rounded-full">
                                <textarea
                                  ref={threadBodyRef}
                                  rows="1"
                                  className="w-full p-1 outline-none sm:text-lg text-base"
                                  style={{
                                    backgroundColor: "transparent",
                                    resize: "none",
                                  }}
                                  value={threadBody}
                                  required={true}
                                  onChange={({ target }) =>
                                    setThreadBody(target.value)
                                  }
                                  onKeyDown={(event) => {
                                    if (threadBody.length > 0) {
                                      if (
                                        event.ctrlKey &&
                                        event.key === "Enter"
                                      ) {
                                        handleThreadSubmit(
                                          share.shareID,
                                          selectedRequest.raisedRequestID
                                        );
                                        event.preventDefault();
                                      }
                                    }
                                  }}
                                ></textarea>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleThreadSubmit(share.shareID);
                                  }}
                                  disabled={threadBody.length === 0}
                                  className="disabled:opacity-35 text-lg font-semibold text-[#116A7B] p-1"
                                >
                                  POST
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {activeRaiseRequestTab === "All Requests" && (
            <div>
              {!isLoading ? (
                !selectedRequest && (
                  <div className="sm:mx-14 mx-5 flex flex-row flex-wrap items-center">
                    {requestsList?.length > 0 ? (
                      requestsList?.map((request, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onClick={() => {
                            if (
                              request.status !== "Expired" &&
                              request.status !== "Payment Pending"
                            ) {
                              fetchRaiseRequestDetail(request.raisedRequestID);
                              setSelectedRequest(request);
                            }
                          }}
                        >
                          <RaiseRequestCard card={request} />
                        </div>
                      ))
                    ) : (
                      <div>No Requests</div>
                    )}
                  </div>
                )
              ) : (
                <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                  <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
                </div>
              )}
              {selectedRequest && (
                <>
                  <div className="w-full flex flex-row items-center pt-1 pb-7 px-14 mt-5">
                    <h1 className="text-2xl font-medium">Request Details</h1>
                    <button
                      onClick={(e) => setSelectedRequest(null)}
                      type="button"
                      className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                    >
                      Back
                    </button>
                  </div>
                  <div className="mx-14 ">
                    {selectedRequest?.imageCount > 0 ? (
                      <div>
                        {/* Swiper component */}
                        {selectedRequest?.imageCount > 1 ? (
                          <Slider
                            // modules={[Pagination]}
                            // slidesPerView={1}
                            // // navigation={{
                            // //   nextEl: ".swiper-button-next", // Define next button class
                            // //   prevEl: ".swiper-button-prev", // Define prev button class
                            // // }}
                            // pagination={{
                            //   clickable: true,
                            //   el: "#swiper-pagination",
                            //   type: "bullets",
                            //   bulletActiveClass:
                            //     "swiper-pagination-bullet-active",
                            //   bulletClass: "swiper-pagination-bullet",
                            // }}
                            style={{ width: "100%", height: "70%" }}
                            className="mb-5"
                          >
                            {Array.from(
                              { length: selectedRequest?.imageCount },
                              (_, index) => (
                                <div key={index}>
                                  <Image
                                    width={2000}
                                    height={2000}
                                    src={`${
                                      process.env.NEXT_PUBLIC_SERVER_HOST
                                    }/${selectedRequest.imageDir}/image-${
                                      index + 1
                                    }.png`}
                                    className="w-full h-[22rem] object-contain object-center"
                                    alt={`Image ${index + 1}`}
                                  />
                                </div>
                              )
                            )}
                          </Slider>
                        ) : (
                          <div>
                            <Image
                              width={2000}
                              height={2000}
                              src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${selectedRequest.imageDir}/image-1.png`}
                              className="w-full h-[22rem] object-contain object-center"
                              alt={`Image 1`}
                            />
                          </div>
                        )}

                        {/* Custom navigation buttons */}
                        {/* <div className="swiper-button-prev custom-prev"></div>
                      <div className="swiper-button-next custom-next"></div> */}
                        {/* Custom pagination */}
                        {/* <div
                          id="swiper-pagination"
                          className="flex flex-row justify-center "
                        ></div> */}
                      </div>
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
                    <h2 className="text-xl text-[#A2B0B2] ">
                      {" "}
                      <strong className="text-[#676767]">
                        {" "}
                        {selectedRequest?.shareholderDocID?.userID?.name}
                      </strong>{" "}
                      <br /> {selectedRequest?.details}
                    </h2>
                    {selectedRequest.attachedURLsList.length > 0 && (
                      <ul className="my-5 w-fit">
                        {selectedRequest.attachedURLsList.map((url, i) => (
                          <Link href={url} key={i}>
                            <li>
                              <h5 className="text-blue-400 hover:text-blue-600 underline">
                                {url}
                              </h5>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                    <div className="my-10">
                      <h2 className="text-end p-5">
                        {" "}
                        <strong className="text-[#09363F]">
                          {processApprovedPercentage()} Approved
                        </strong>{" "}
                        <br /> (need 80% or more to complete)
                      </h2>
                      <div className="bg-[#FCFBF5] border border-[#D9D9D9] divide-y-2 divide-[#D9D9D9]">
                        {sharesList.map((share, index) => (
                          <div key={index}>
                            <div className="flex flex-row items-center justify-between p-10">
                              <h3 className="text-xl text-[#09363F] font-semibold">
                                {share.currentOwnerDocID.username}{" "}
                                &nbsp;&nbsp;&nbsp;
                                {share.currentOwnerDocID.username ===
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && "(You)"}
                                <br />
                                <p className="text-sm">
                                  {processDate(
                                    share.availableInDuration.startDateString
                                  )}{" "}
                                  -{" "}
                                  {processDate(
                                    share.availableInDuration.endDateString
                                  )}
                                </p>
                              </h3>
                              <div className="flex flex-row items-center justify-center space-x-5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setThreadBody("");
                                    if (showThreadsByShare === share.shareID)
                                      setShowThreadsByShare("");
                                    else {
                                      fetchThreads(
                                        share.shareID,
                                        requestType,
                                        selectedRequest.raisedRequestID
                                      );
                                      setShowThreadsByShare(share.shareID);
                                    }
                                  }}
                                  className="p-1"
                                >
                                  <AiFillMessage className="text-[#116A7B] text-2xl" />
                                </button>
                                {!selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) &&
                                  !selectedRequest?.rejectedByUsersList?.includes(
                                    share.currentOwnerDocID.username
                                  ) &&
                                  share.currentOwnerDocID.username ===
                                    JSON.parse(
                                      localStorage.getItem("userDetails")
                                    ).username && (
                                    <div className="flex flex-row items-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRaiseRequestAction(
                                            selectedRequest.raisedRequestID,
                                            share.currentOwnerDocID.username,
                                            "approved"
                                          )
                                        }
                                        className="w-32 px-5 py-3 bg-[#116A7B] text-white rounded mx-2 font-semibold"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedShareID(share.shareID);
                                          setRaiseRequestActionBody({
                                            requestID:
                                              selectedRequest.raisedRequestID,
                                            ownerUsername:
                                              share.currentOwnerDocID.username,
                                            action: "rejected",
                                            occurence: checkUseNumOfShares(
                                              share.currentOwnerDocID.username
                                            ),
                                          });
                                          handleRejectionModalOpen();
                                        }}
                                        className="w-32 px-5 py-3 bg-[#116A7B] text-white rounded mx-2 font-semibold"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  )}
                                {!selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) &&
                                  !selectedRequest?.rejectedByUsersList?.includes(
                                    share.currentOwnerDocID.username
                                  ) &&
                                  share.currentOwnerDocID.username !==
                                    JSON.parse(
                                      localStorage.getItem("userDetails")
                                    ).username && <h4>Pending Response</h4>}
                                {selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) && <h4>Approved</h4>}
                                {selectedRequest?.rejectedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) && <h4>Rejected</h4>}
                              </div>
                            </div>
                            {showThreadsByShare === share.shareID &&
                            threads.length > 0
                              ? threads.map((thread) => (
                                  <div key={thread.threadID} className="">
                                    <Thread
                                      key={thread.threadID}
                                      shareOwner={
                                        share.currentOwnerDocID.username
                                      }
                                      thread={thread}
                                      isFirstLevel={true}
                                      threadIndex={index}
                                      // handleFetchChildren={handleFetchChildren}
                                      threadCategory={thread.category}
                                      threadLevel={parseInt(thread.threadLevel)}
                                      // propertyID={propertyID}
                                      startDate={processDate(
                                        share.availableInDuration
                                          .startDateString
                                      )}
                                      endDate={processDate(
                                        share.availableInDuration.endDateString
                                      )}
                                      shareID={share.shareID}
                                    />
                                  </div>
                                ))
                              : showThreadsByShare === share.shareID && (
                                  <div className="text-[20px] font-semibold text-[#116A7B]">
                                    <h1 className="text-center">
                                      No Threads Yet.
                                    </h1>
                                  </div>
                                )}
                            {showThreadsByShare === share.shareID && (
                              <div className="bg-[#FCFBF5] flex flex-row border border-[#D9D9D9] px-5 py-3 mx-10 my-5 rounded-full">
                                <textarea
                                  ref={threadBodyRef}
                                  rows="1"
                                  className="w-full p-1 outline-none text-lg"
                                  style={{
                                    backgroundColor: "transparent",
                                    resize: "none",
                                  }}
                                  value={threadBody}
                                  required={true}
                                  onChange={({ target }) =>
                                    setThreadBody(target.value)
                                  }
                                  onKeyDown={(event) => {
                                    if (threadBody.length > 0) {
                                      if (
                                        event.ctrlKey &&
                                        event.key === "Enter"
                                      ) {
                                        handleThreadSubmit(
                                          share.shareID,
                                          selectedRequest.raisedRequestID
                                        );
                                        event.preventDefault();
                                      }
                                    }
                                  }}
                                ></textarea>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleThreadSubmit(
                                      share.shareID,
                                      selectedRequest.raisedRequestID
                                    );
                                  }}
                                  disabled={threadBody.length === 0}
                                  className="disabled:opacity-35 text-lg font-semibold text-[#116A7B] p-1"
                                >
                                  POST
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {activeRaiseRequestTab === "Pending Approvals" && (
            <div>
              {!isLoading ? (
                !selectedRequest && (
                  <div className="sm:mx-14 mx-5 flex flex-row flex-wrap items-center">
                    {requestsList?.length > 0 ? (
                      requestsList?.map((request, index) => (
                        <div
                          key={index}
                          className="cursor-pointer"
                          onClick={() => {
                            if (
                              request.status !== "Expired" &&
                              request.status !== "Payment Pending"
                            ) {
                              fetchRaiseRequestDetail(request.raisedRequestID);
                              setSelectedRequest(request);
                            }
                          }}
                        >
                          <RaiseRequestCard
                            card={request}
                            fetchRequests={fetchRaiseRequests}
                            sharesList={sharesList}
                          />
                        </div>
                      ))
                    ) : (
                      <div>No Requests</div>
                    )}
                  </div>
                )
              ) : (
                <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
                  <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
                </div>
              )}
              {selectedRequest && (
                <>
                  <div className="w-full flex flex-row items-center pt-1 pb-7 px-14 mt-5">
                    <h1 className="text-2xl font-medium">Request Details</h1>
                    <button
                      onClick={(e) => setSelectedRequest(null)}
                      type="button"
                      className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                    >
                      Back
                    </button>
                  </div>
                  <div className="mx-14 ">
                    {selectedRequest?.imageCount > 0 ? (
                      <div>
                        {/* Swiper component */}
                        {selectedRequest?.imageCount > 1 ? (
                          <Slider
                            {...settings}
                            // modules={[Pagination]}
                            // slidesPerView={1}
                            // // navigation={{
                            // //   nextEl: ".swiper-button-next", // Define next button class
                            // //   prevEl: ".swiper-button-prev", // Define prev button class
                            // // }}
                            // pagination={{
                            //   clickable: true,
                            //   el: "#swiper-pagination",
                            //   type: "bullets",
                            //   bulletActiveClass:
                            //     "swiper-pagination-bullet-active",
                            //   bulletClass: "swiper-pagination-bullet",
                            // }}
                            style={{ width: "100%", height: "70%" }}
                            className="mb-5"
                          >
                            {Array.from(
                              { length: selectedRequest?.imageCount },
                              (_, index) => (
                                <div key={index}>
                                  <Image
                                    width={2000}
                                    height={2000}
                                    src={`${
                                      process.env.NEXT_PUBLIC_SERVER_HOST
                                    }/${selectedRequest.imageDir}/image-${
                                      index + 1
                                    }.png`}
                                    className="w-full h-[22rem] object-contain object-center"
                                    alt={`Image ${index + 1}`}
                                  />
                                </div>
                              )
                            )}
                          </Slider>
                        ) : (
                          <div>
                            <Image
                              width={2000}
                              height={2000}
                              src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${selectedRequest.imageDir}/image-1.png`}
                              className="w-full h-[22rem] object-contain object-center"
                              alt={`Image 1`}
                            />
                          </div>
                        )}

                        {/* Custom navigation buttons */}
                        {/* <div className="swiper-button-prev custom-prev"></div>
                      <div className="swiper-button-next custom-next"></div> */}
                        {/* Custom pagination */}
                        {/* <div
                          id="swiper-pagination"
                          className="flex flex-row justify-center "
                        ></div> */}
                      </div>
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
                    <h2 className="text-xl text-[#A2B0B2] ">
                      {" "}
                      <strong className="text-[#676767]">
                        {" "}
                        {selectedRequest?.shareholderDocID?.userID?.name}
                      </strong>{" "}
                      <br /> {selectedRequest?.details}
                    </h2>
                    {selectedRequest.attachedURLsList.length > 0 && (
                      <ul className="my-5 w-fit">
                        {selectedRequest.attachedURLsList.map((url, i) => (
                          <Link href={url} key={i}>
                            <li>
                              <h5 className="text-blue-400 hover:text-blue-600 underline">
                                {url}
                              </h5>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                    <div className="my-10">
                      <div
                        className={`flex flex-row items-center ${
                          selectedRequest?.status ===
                            "Property Owner Approval Pending" ||
                          selectedRequest?.status === "Decision Pending"
                            ? "justify-between"
                            : "justify-end"
                        } `}
                      >
                        {selectedRequest?.status ===
                          "Property Owner Approval Pending" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRaiseRequestApproveByPropertyOwner()
                            }
                            className="w-32 px-5 py-3 bg-[#116A7B] text-white rounded font-semibold"
                          >
                            Approve
                          </button>
                        )}
                        {selectedRequest?.status === "Decision Pending" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRaiseRequestApproveByPropertyOwner()
                            }
                            className="w-32 px-5 py-3 bg-[#116A7B] text-white rounded font-semibold"
                          >
                            Approve
                          </button>
                        )}
                        <div>
                          <h2 className="text-end p-5">
                            {" "}
                            <strong className="text-[#09363F]">
                              {processApprovedPercentage()} Approved
                            </strong>{" "}
                            <br /> (need 80% or more to complete)
                          </h2>
                        </div>
                      </div>
                      <div className="bg-[#FCFBF5] border border-[#D9D9D9] divide-y-2 divide-[#D9D9D9]">
                        {sharesList.map((share, index) => (
                          <div key={index}>
                            <div className="flex flex-row items-center justify-between p-10">
                              <h3 className="text-xl text-[#09363F] font-semibold">
                                {share.currentOwnerDocID.username}{" "}
                                &nbsp;&nbsp;&nbsp;
                                {share.currentOwnerDocID.username ===
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && "(You)"}
                                <br />
                                <p className="text-sm">
                                  {processDate(
                                    share.availableInDuration.startDateString
                                  )}{" "}
                                  -{" "}
                                  {processDate(
                                    share.availableInDuration.endDateString
                                  )}
                                </p>
                              </h3>
                              <div className="flex flex-row items-center justify-center space-x-5">
                                <button
                                  type="button"
                                  title="View Threads"
                                  onClick={() => {
                                    setThreadBody("");
                                    if (showThreadsByShare === share.shareID)
                                      setShowThreadsByShare("");
                                    else {
                                      fetchThreads(
                                        share.shareID,
                                        requestType,
                                        selectedRequest.raisedRequestID
                                      );
                                      setShowThreadsByShare(share.shareID);
                                    }
                                  }}
                                  className="p-1"
                                >
                                  <AiFillMessage className="text-[#116A7B] text-2xl" />
                                </button>
                                {!selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) &&
                                  !selectedRequest?.rejectedByUsersList?.includes(
                                    share.currentOwnerDocID.username
                                  ) &&
                                  share.currentOwnerDocID.username ===
                                    JSON.parse(
                                      localStorage.getItem("userDetails")
                                    ).username && (
                                    <div className="flex flex-row items-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRaiseRequestAction(
                                            selectedRequest.raisedRequestID,
                                            share.currentOwnerDocID.username,
                                            "approved"
                                          )
                                        }
                                        className="w-32 px-5 py-3 bg-[#116A7B] text-white rounded mx-2 font-semibold"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedShareID(share.shareID);
                                          setRaiseRequestActionBody({
                                            requestID:
                                              selectedRequest.raisedRequestID,
                                            ownerUsername:
                                              share.currentOwnerDocID.username,
                                            action: "rejected",
                                            occurence: checkUseNumOfShares(
                                              share.currentOwnerDocID.username
                                            ),
                                          });
                                          handleRejectionModalOpen();
                                        }}
                                        className="w-32 px-5 py-3 bg-[#116A7B] text-white rounded mx-2 font-semibold"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  )}
                                {!selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) &&
                                  !selectedRequest?.rejectedByUsersList?.includes(
                                    share.currentOwnerDocID.username
                                  ) &&
                                  share.currentOwnerDocID.username !==
                                    JSON.parse(
                                      localStorage.getItem("userDetails")
                                    ).username && <h4>Pending Response</h4>}
                                {selectedRequest?.approvedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) && <h4>Approved</h4>}
                                {selectedRequest?.rejectedByUsersList?.includes(
                                  share.currentOwnerDocID.username
                                ) && <h4>Rejected</h4>}
                              </div>
                            </div>
                            {showThreadsByShare === share.shareID &&
                            threads.length > 0
                              ? threads.map((thread) => (
                                  <div key={thread.threadID} className="">
                                    <Thread
                                      key={thread.threadID}
                                      shareOwner={
                                        share.currentOwnerDocID.username
                                      }
                                      thread={thread}
                                      isFirstLevel={true}
                                      threadIndex={index}
                                      // handleFetchChildren={handleFetchChildren}
                                      threadCategory={thread.category}
                                      threadLevel={parseInt(thread.threadLevel)}
                                      // propertyID={propertyID}
                                      startDate={processDate(
                                        share.availableInDuration
                                          .startDateString
                                      )}
                                      endDate={processDate(
                                        share.availableInDuration.endDateString
                                      )}
                                      shareID={share.shareID}
                                    />
                                  </div>
                                ))
                              : showThreadsByShare === share.shareID && (
                                  <div className="text-[20px] font-semibold text-[#116A7B]">
                                    <h1 className="text-center">
                                      No Threads Yet.
                                    </h1>
                                  </div>
                                )}
                            {showThreadsByShare === share.shareID && (
                              <div className="bg-[#FCFBF5] flex flex-row border border-[#D9D9D9] px-5 py-3 mx-10 my-5 rounded-full">
                                <textarea
                                  ref={threadBodyRef}
                                  rows="1"
                                  className="w-full p-1 outline-none text-lg"
                                  style={{
                                    backgroundColor: "transparent",
                                    resize: "none",
                                  }}
                                  value={threadBody}
                                  required={true}
                                  onChange={({ target }) =>
                                    setThreadBody(target.value)
                                  }
                                  onKeyDown={(event) => {
                                    if (threadBody.length > 0) {
                                      if (
                                        event.ctrlKey &&
                                        event.key === "Enter"
                                      ) {
                                        handleThreadSubmit(
                                          share.shareID,
                                          selectedRequest.raisedRequestID
                                        );
                                        event.preventDefault();
                                      }
                                    }
                                  }}
                                ></textarea>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleThreadSubmit(
                                      share.shareID,
                                      selectedRequest.raisedRequestID
                                    );
                                  }}
                                  disabled={threadBody.length === 0}
                                  className="disabled:opacity-35 text-lg font-semibold text-[#116A7B] p-1"
                                >
                                  POST
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaiseRequest;
