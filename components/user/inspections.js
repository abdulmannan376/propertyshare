import { updateActiveInspectionTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InspectionCard from "./inspectionCard";
import { MdClose } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import Image from "next/image";
// Import Swiper React components and Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Thread from "./threadComponent";
import RejectionModal from "../modals/inspectionRejectionModal";

const Inspections = () => {
  const dispatch = useDispatch();

  const activeInspectionTab = useSelector(
    (state) => state.userDashboardSliceReducer.activeInspectionTab
  );

  const [isLoading, setIsLoading] = useState(false);

  const [inspectionsList, setInspectionsList] = useState([]);

  const fetchInspections = async (category) => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-inspections-by-user/${username}/${category}`
      );

      const response = await res.json();

      if (response.success) {
        setIsLoading(false);
        setInspectionsList(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setInspectionsList(false);
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
    if (activeInspectionTab === "My Inspections") {
      fetchInspections("my");
    } else if (activeInspectionTab === "All Inspections") {
      fetchInspections("all");
    } else if (activeInspectionTab === "Pending Approvals") {
      fetchInspections("pending_approvals");
    } else {
      setInspectionsList([]);
    }
  }, [activeInspectionTab]);

  const [selectedInspection, setSelectedInspection] = useState(null);

  const [deleteImageList, setDeleteImageList] = useState([]);

  const [files, setFiles] = useState(null);
  const [comment, setComment] = useState("");

  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);

  const handleInspectionSubmit = async (
    e,
    propertyID,
    propertyTitle,
    shareID,
    inspectionID
  ) => {
    e.preventDefault();
    try {
      setIsLoadingSubmission(true);
      const formData = new FormData();

      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      formData.append("propertyID", propertyID);
      formData.append("userName", userDetails.name);
      formData.append("username", userDetails.username);
      formData.append("propertyTitle", propertyTitle);
      formData.append("shareID", shareID);
      formData.append("comment", comment);
      formData.append("inspectionID", inspectionID);
      // formData.append("deleteImageList", deleteImageList);

      deleteImageList.map((entry, index) => {
        formData.append(`deleteImageList[${index}]`, entry);
      });

      for (const file of files) {
        formData.append("imageFiles", file);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-inspection`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoadingSubmission(false);
        setSelectedInspection(null);
        if (activeInspectionTab === "My Inspections") {
          fetchInspections("my");
        } else if (activeInspectionTab === "All Inspections") {
          fetchInspections("all");
        }
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

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "inherit"; // Reset the height so the scrollHeight measurement is correct
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;

      // Update border-radius dynamically
      const currentHeight = textRef.current.scrollHeight;
      const borderRadius = currentHeight < 40 ? "100%" : "20px"; // Adjust values as needed
      textRef.current.style.borderRadius = borderRadius;
    }
  }, [comment]); // Adjust height whenever text changes

  const [sharesList, setSharesList] = useState([]);

  const fetchInspectionDetail = async (inspectionID) => {
    try {
      console.log("in fetchInspectionDetail");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-inspection-detail/${inspectionID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      console.log(response);
      if (response.success) {
        // setSelectedInspection(response.body.inspection);
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

  useEffect(() => {
    console.log("in useEffect");
    if (selectedInspection) {
      fetchInspectionDetail(selectedInspection.inspectionID);
    }
  }, [selectedInspection]);

  function processApprovedPercentage() {
    if (selectedInspection) {
      const answer =
        selectedInspection.approvedByUsersList.length / sharesList.length;
      const percentage = Math.round(answer * 100);
      return `${percentage}%`;
    }
    return "";
  }

  const [editAction, setEditAction] = useState(true);

  function checkUseNumOfShares(username) {
    let count = 0;

    sharesList.map((share) => {
      if (share.currentOwnerDocID?.username === username) {
        count += 1;
      }
    });

    return count;
  }

  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);

  const handleRejectionModalOpen = () => setIsRejectionModalOpen(true);
  const handleRejectionModalClose = () => {
    setSelectedShareID("");
    setIsRejectionModalOpen(false);
    setInspectionActionBody(null);
  };

  const handleInspectionAction = async (inspectionID, username, action) => {
    try {
      const data = {
        inspectionID: inspectionID,
        username: username,
        occurence: checkUseNumOfShares(username),
        action: action,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-inspection-action`,
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
        setSelectedInspection(response.body);
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

  const [showThreadsByShare, setShowThreadsByShare] = useState("");
  const [threads, setThreads] = useState([]);

  const fetchThreads = async (shareID, category) => {
    console.log(shareID, category);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-root-threads/${shareID}/${category}`,
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

  const handleThreadSubmit = async (shareID) => {
    try {
      const data = {
        shareID: shareID,
        username: JSON.parse(localStorage.getItem("userDetails")).username,
        body: threadBody,
        category: "Inspection",
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
        setThreadBody("");
        fetchThreads(shareID, "Inspection");
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

  const [selectedShareID, setSelectedShareID] = useState("");
  const [inspectionActionBody, setInspectionActionBody] = useState(null);

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Inspections</h1>
      </div>

      <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
        <button
          onClick={() => {
            dispatch(updateActiveInspectionTab("My Inspections"));
            setSelectedInspection(null);
          }}
        >
          <h1
            className={`flex ${
              activeInspectionTab === "My Inspections"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            My Inspections
          </h1>
        </button>
        {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
        <button
          onClick={() => {
            dispatch(updateActiveInspectionTab("All Inspections"));
            setSelectedInspection(null);
          }}
        >
          <h2
            className={`flex ${
              activeInspectionTab === "All Inspections"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            All Inspections
          </h2>
        </button>
        <button
          onClick={() => {
            dispatch(updateActiveInspectionTab("Pending Approvals"));
            setSelectedInspection(null);
          }}
        >
          <h2
            className={`flex ${
              activeInspectionTab === "Pending Approvals"
                ? "underline-text"
                : "hover-underline-animation"
            } `}
          >
            Pending Approvals
          </h2>
        </button>

        {/* </Link> */}
      </div>
      <RejectionModal
        isOpen={isRejectionModalOpen}
        onClose={handleRejectionModalClose}
        shareID={selectedShareID}
        fetchThreads={fetchThreads}
        inspectionActionBody={inspectionActionBody}
        setSelectedInspection={setSelectedInspection}
      />
      {activeInspectionTab === "My Inspections" && (
        <div>
          {!isLoading ? (
            !selectedInspection && (
              <div className="mx-14 flex flex-row flex-wrap items-center">
                {inspectionsList?.length > 0 ? (
                  inspectionsList?.map((inspection, index) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setSelectedInspection(inspection)}
                    >
                      <InspectionCard card={inspection} />
                    </div>
                  ))
                ) : (
                  <div>No Inspections</div>
                )}
              </div>
            )
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          {selectedInspection?.status === "Pending Submission" && (
            <>
              <div className="w-full flex flex-row items-center pt-1 pb-7 px-14 mt-5">
                <h1 className="text-2xl font-medium">Submit Inspection</h1>
                <button
                  onClick={(e) => setSelectedInspection(null)}
                  type="button"
                  className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                >
                  Back
                </button>
              </div>
              <div className="flex flex-col mx-14">
                <label htmlFor="propertyImages" className="text-[#676767]">
                  Max 10, {`supported formats: .png`}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/png"
                  required={true}
                  onChange={({ target }) => setFiles(target.files)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              {selectedInspection?.imageCount > 0 ? (
                <div
                  className="relative flex flex-row gap-x-3 overflow-y-visible overflow-x-auto my-5"
                  style={{ maxWidth: "fit" }}
                >
                  {Array.from(
                    { length: selectedInspection?.imageCount },
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          if (pinnedImage === index) {
                            setPinnedImage(-1);
                          } else {
                            if (!deleteImageList.includes(index))
                              setPinnedImage(index);
                          }
                        }}
                        className="relative h-40"
                      >
                        <Image
                          key={index}
                          width={1000}
                          height={1000}
                          src={`${
                            process.env.NEXT_PUBLIC_SERVER_HOST
                          }/uploads/Inspections/${
                            selectedInspection?.propertyDocID.propertyID
                          }/${selectedInspection?.shareDocID.shareID}/${
                            selectedInspection?.inspectionID
                          }image-${index + 1}.png`}
                          className="w-60 h-32  object-fit rounded-xl overflow-hidden "
                          alt={`Property Image ${index + 1}`} // Always include an alt for accessibility
                        />
                        {deleteImageList.includes(index) && (
                          <div className="absolute inset-y-4 w-60 h-32 bg-gray-700 opacity-60 rounded-xl"></div>
                        )}
                        <span className="absolute inset-y-2 right-0 px-1 text-white font-semibold focus:outline-none cursor-pointer">
                          {" "}
                          <MdClose
                            onClick={(event) => {
                              event.stopPropagation();
                              if (deleteImageList.includes(index)) {
                                const newList = deleteImageList.filter(
                                  (item) => item !== index
                                );
                                setDeleteImageList(newList);
                              } else {
                                const newList = [...deleteImageList];
                                newList.push(index);
                                setDeleteImageList(newList);
                              }
                            }}
                            className="bg-[#116A7B] rounded-full text-xl p-[2px]"
                          />
                        </span>
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div></div>
              )}
              <div className="space-y-2 my-5">
                <h2 className="mx-14">
                  Date:{" "}
                  {(() => {
                    const newDate = new Date(selectedInspection.createdAt);
                    return newDate.toDateString();
                  })()}{" "}
                  {/* Immediately invoke the function */}
                </h2>
                <h2 className="mx-14">
                  Time:{" "}
                  {(() => {
                    const newDate = new Date(selectedInspection.createdAt);
                    return newDate.toLocaleTimeString();
                  })()}{" "}
                  {/* Immediately invoke the function */}
                </h2>
              </div>
              <div className="flex flex-col mx-14">
                <label htmlFor="Comment" className="text-[#676767]">
                  Comment
                </label>
                <textarea
                  rows={1}
                  ref={textRef}
                  name="Comment"
                  required={true}
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                  style={{ overflow: "hidden", resize: "none" }}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mx-14 my-5">
                <button
                  type="button"
                  onClick={(e) =>
                    handleInspectionSubmit(
                      e,
                      selectedInspection.propertyDocID.propertyID,
                      selectedInspection.propertyDocID.title,
                      selectedInspection.shareDocID.shareID,
                      selectedInspection.inspectionID
                    )
                  }
                  className="w-52 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
                >
                  {!isLoadingSubmission && `Submit`}
                  {isLoadingSubmission && (
                    <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                  )}
                </button>
              </div>
            </>
          )}
          {selectedInspection?.status !== "Pending Submission" &&
            selectedInspection && (
              <>
                <div className="w-full flex flex-row items-center pt-1 pb-7 px-14 mt-5">
                  <h1 className="text-2xl font-medium">Inspection Details</h1>
                  <button
                    onClick={(e) => setSelectedInspection(null)}
                    type="button"
                    className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                  >
                    Back
                  </button>
                </div>
                <div className="mx-14 ">
                  {selectedInspection?.imageCount > 0 ? (
                    <div className="swiper-container">
                      {/* Swiper component */}
                      <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        // navigation={{
                        //   nextEl: ".swiper-button-next", // Define next button class
                        //   prevEl: ".swiper-button-prev", // Define prev button class
                        // }}
                        pagination={{
                          clickable: true,
                          el: "#swiper-pagination",
                          type: "bullets",
                          bulletActiveClass: "swiper-pagination-bullet-active",
                          bulletClass: "swiper-pagination-bullet",
                        }}
                        style={{ width: "100%", height: "70%" }}
                        className="mb-5"
                      >
                        {Array.from(
                          { length: selectedInspection?.imageCount },
                          (_, index) => (
                            <SwiperSlide key={index}>
                              <div>
                                <Image
                                  width={2000}
                                  height={2000}
                                  src={`${
                                    process.env.NEXT_PUBLIC_SERVER_HOST
                                  }/${selectedInspection.imageDirURL}/image-${
                                    index + 1
                                  }.png`}
                                  className="w-full h-[22rem] object-contain object-center"
                                  alt={`Image ${index + 1}`}
                                />
                              </div>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>

                      {/* Custom navigation buttons */}
                      {/* <div className="swiper-button-prev custom-prev"></div>
                      <div className="swiper-button-next custom-next"></div> */}
                      {/* Custom pagination */}
                      <div
                        id="swiper-pagination"
                        className="flex flex-row justify-center "
                      ></div>
                    </div>
                  ) : (
                    <div className="h-[44rem]">
                      <Image
                        width={1000}
                        height={1000}
                        src={"/assets/user/property-management/no-image.jpg"}
                        className="w-full h-full object-scale-down object-center"
                        alt={`Inspection-noimage`}
                      />
                    </div>
                  )}
                  <h2 className="text-xl text-[#A2B0B2] ">
                    {" "}
                    <strong className="text-[#676767]">
                      {" "}
                      {selectedInspection?.shareholderDocID?.userID?.name}
                    </strong>{" "}
                    <br /> {selectedInspection?.commentsByShareholder}
                  </h2>
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
                              {share.currentOwnerDocID?.username}{" "}
                              &nbsp;&nbsp;&nbsp;
                              {share.currentOwnerDocID?.username ===
                                JSON.parse(localStorage.getItem("userDetails"))
                                  .username && "(You)"}
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
                                    fetchThreads(share.shareID, "Inspection");
                                    setShowThreadsByShare(share.shareID);
                                  }
                                }}
                                className="p-1"
                              >
                                <AiFillMessage className="text-[#116A7B] text-2xl" />
                              </button>
                              {!selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) &&
                                !selectedInspection?.rejectedUsersList?.includes(
                                  share.currentOwnerDocID?.username
                                ) &&
                                share.currentOwnerDocID?.username ===
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && (
                                  <div className="flex flex-row items-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleInspectionAction(
                                          selectedInspection.inspectionID,
                                          share.currentOwnerDocID?.username,
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
                                        setInspectionActionBody({
                                          inspectionID:
                                            selectedInspection.inspectionID,
                                          ownerUsername:
                                            share.currentOwnerDocID?.username,
                                          action: "rejected",
                                          occurence: checkUseNumOfShares(
                                            share.currentOwnerDocID?.username
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
                              {!selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) &&
                                !selectedInspection?.rejectedUsersList?.includes(
                                  share.currentOwnerDocID?.username
                                ) &&
                                share.currentOwnerDocID?.username !==
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && <h4>Pending Response</h4>}
                              {selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) && <h4>Approved</h4>}
                              {selectedInspection?.rejectedUsersList?.includes(
                                share.currentOwnerDocID?.username
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
                                      share.currentOwnerDocID?.username
                                    }
                                    thread={thread}
                                    isFirstLevel={true}
                                    threadIndex={index}
                                    // handleFetchChildren={handleFetchChildren}
                                    threadCategory={thread.category}
                                    threadLevel={parseInt(thread.threadLevel)}
                                    // propertyID={propertyID}
                                    startDate={processDate(
                                      share.availableInDuration.startDateString
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
                                      handleThreadSubmit(share.shareID);
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
      {activeInspectionTab === "All Inspections" && (
        <div>
          {!isLoading ? (
            !selectedInspection && (
              <div className="mx-14 flex flex-row flex-wrap items-center">
                {inspectionsList?.length > 0 ? (
                  inspectionsList?.map((inspection, index) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        if (inspection.status !== "Pending Submission")
                          setSelectedInspection(inspection);
                      }}
                    >
                      <InspectionCard card={inspection} />
                    </div>
                  ))
                ) : (
                  <div>No Inspections</div>
                )}
              </div>
            )
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          {selectedInspection?.status !== "Pending Submission" &&
            selectedInspection && (
              <>
                <div className="w-full flex flex-row items-center pt-1 pb-7 px-14 mt-5">
                  <h1 className="text-2xl font-medium">Inspection Details</h1>
                  <button
                    onClick={(e) => setSelectedInspection(null)}
                    type="button"
                    className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                  >
                    Back
                  </button>
                </div>
                <div className="mx-14 ">
                  {selectedInspection?.imageCount > 0 ? (
                    <div className="swiper-container">
                      {/* Swiper component */}
                      <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        // navigation={{
                        //   nextEl: ".swiper-button-next", // Define next button class
                        //   prevEl: ".swiper-button-prev", // Define prev button class
                        // }}
                        pagination={{
                          clickable: true,
                          el: "#swiper-pagination",
                          type: "bullets",
                          bulletActiveClass: "swiper-pagination-bullet-active",
                          bulletClass: "swiper-pagination-bullet",
                        }}
                        style={{ width: "100%", height: "70%" }}
                        className="mb-5"
                      >
                        {Array.from(
                          { length: selectedInspection?.imageCount },
                          (_, index) => (
                            <SwiperSlide key={index}>
                              <div>
                                <Image
                                  width={2000}
                                  height={2000}
                                  src={`${
                                    process.env.NEXT_PUBLIC_SERVER_HOST
                                  }/${selectedInspection.imageDirURL}/image-${
                                    index + 1
                                  }.png`}
                                  className="w-full h-[22rem] object-contain object-center"
                                  alt={`Image ${index + 1}`}
                                />
                              </div>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>

                      {/* Custom navigation buttons */}
                      {/* <div className="swiper-button-prev custom-prev"></div>
                      <div className="swiper-button-next custom-next"></div> */}
                      {/* Custom pagination */}
                      <div
                        id="swiper-pagination"
                        className="flex flex-row justify-center "
                      ></div>
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
                      {selectedInspection?.shareholderDocID?.userID?.name}
                    </strong>{" "}
                    <br /> {selectedInspection?.commentsByShareholder}
                  </h2>
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
                              {share.currentOwnerDocID?.username}{" "}
                              &nbsp;&nbsp;&nbsp;
                              {share.currentOwnerDocID?.username ===
                                JSON.parse(localStorage.getItem("userDetails"))
                                  .username && "(You)"}
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
                                    fetchThreads(share.shareID, "Inspection");
                                    setShowThreadsByShare(share.shareID);
                                  }
                                }}
                                className="p-1"
                              >
                                <AiFillMessage className="text-[#116A7B] text-2xl" />
                              </button>
                              {!selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) &&
                                !selectedInspection?.rejectedUsersList?.includes(
                                  share.currentOwnerDocID?.username
                                ) &&
                                share.currentOwnerDocID?.username ===
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && (
                                  <div className="flex flex-row items-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleInspectionAction(
                                          selectedInspection.inspectionID,
                                          share.currentOwnerDocID?.username,
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
                                        setInspectionActionBody({
                                          inspectionID:
                                            selectedInspection.inspectionID,
                                          ownerUsername:
                                            share.currentOwnerDocID?.username,
                                          action: "rejected",
                                          occurence: checkUseNumOfShares(
                                            share.currentOwnerDocID?.username
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
                              {!selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) &&
                                !selectedInspection?.rejectedUsersList?.includes(
                                  share.currentOwnerDocID?.username
                                ) &&
                                share.currentOwnerDocID?.username !==
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && <h4>Pending Response</h4>}
                              {selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) && <h4>Approved</h4>}
                              {selectedInspection?.rejectedUsersList?.includes(
                                share.currentOwnerDocID?.username
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
                                      share.currentOwnerDocID?.username
                                    }
                                    thread={thread}
                                    isFirstLevel={true}
                                    threadIndex={index}
                                    // handleFetchChildren={handleFetchChildren}
                                    threadCategory={thread.category}
                                    threadLevel={parseInt(thread.threadLevel)}
                                    // propertyID={propertyID}
                                    startDate={processDate(
                                      share.availableInDuration.startDateString
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
                                      handleThreadSubmit(share.shareID);
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
      {activeInspectionTab === "Pending Approvals" && (
        <div>
          {!isLoading ? (
            !selectedInspection && (
              <div className="mx-14 flex flex-row flex-wrap items-center">
                {inspectionsList?.length > 0 ? (
                  inspectionsList?.map((inspection, index) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        if (inspection.status !== "Pending Submission")
                          setSelectedInspection(inspection);
                      }}
                    >
                      <InspectionCard card={inspection} sharesList={sharesList} fetchInspections={fetchInspections}/>
                    </div>
                  ))
                ) : (
                  <div>No Inspections for approval</div>
                )}
              </div>
            )
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          {selectedInspection?.status !== "Pending Submission" &&
            selectedInspection && (
              <>
                <div className="w-full flex flex-row items-center pt-1 pb-7 px-14 mt-5">
                  <h1 className="text-2xl font-medium">Inspection Details</h1>
                  <button
                    onClick={(e) => setSelectedInspection(null)}
                    type="button"
                    className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
                  >
                    Back
                  </button>
                </div>
                <div className="mx-14 ">
                  {selectedInspection?.imageCount > 0 ? (
                    <div className="swiper-container">
                      {/* Swiper component */}
                      <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        // navigation={{
                        //   nextEl: ".swiper-button-next", // Define next button class
                        //   prevEl: ".swiper-button-prev", // Define prev button class
                        // }}
                        pagination={{
                          clickable: true,
                          el: "#swiper-pagination",
                          type: "bullets",
                          bulletActiveClass: "swiper-pagination-bullet-active",
                          bulletClass: "swiper-pagination-bullet",
                        }}
                        style={{ width: "100%", height: "70%" }}
                        className="mb-5"
                      >
                        {Array.from(
                          { length: selectedInspection?.imageCount },
                          (_, index) => (
                            <SwiperSlide key={index}>
                              <div>
                                <Image
                                  width={2000}
                                  height={2000}
                                  src={`${
                                    process.env.NEXT_PUBLIC_SERVER_HOST
                                  }/${selectedInspection.imageDirURL}/image-${
                                    index + 1
                                  }.png`}
                                  className="w-full h-[22rem] object-contain object-center"
                                  alt={`Image ${index + 1}`}
                                />
                              </div>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>

                      {/* Custom navigation buttons */}
                      {/* <div className="swiper-button-prev custom-prev"></div>
                      <div className="swiper-button-next custom-next"></div> */}
                      {/* Custom pagination */}
                      <div
                        id="swiper-pagination"
                        className="flex flex-row justify-center "
                      ></div>
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
                      {selectedInspection?.shareholderDocID?.userID?.name}
                    </strong>{" "}
                    <br /> {selectedInspection?.commentsByShareholder}
                  </h2>
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
                              {share.currentOwnerDocID?.username}{" "}
                              &nbsp;&nbsp;&nbsp;
                              {share.currentOwnerDocID?.username ===
                                JSON.parse(localStorage.getItem("userDetails"))
                                  .username && "(You)"}
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
                                    fetchThreads(share.shareID, "Inspection");
                                    setShowThreadsByShare(share.shareID);
                                  }
                                }}
                                className="p-1"
                              >
                                <AiFillMessage className="text-[#116A7B] text-2xl" />
                              </button>
                              {!selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) &&
                                !selectedInspection?.rejectedUsersList?.includes(
                                  share.currentOwnerDocID?.username
                                ) &&
                                share.currentOwnerDocID?.username ===
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && (
                                  <div className="flex flex-row items-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleInspectionAction(
                                          selectedInspection.inspectionID,
                                          share.currentOwnerDocID?.username,
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
                                        setInspectionActionBody({
                                          inspectionID:
                                            selectedInspection.inspectionID,
                                          ownerUsername:
                                            share.currentOwnerDocID?.username,
                                          action: "rejected",
                                          occurence: checkUseNumOfShares(
                                            share.currentOwnerDocID?.username
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
                              {!selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) &&
                                !selectedInspection?.rejectedUsersList?.includes(
                                  share.currentOwnerDocID?.username
                                ) &&
                                share.currentOwnerDocID?.username !==
                                  JSON.parse(
                                    localStorage.getItem("userDetails")
                                  ).username && <h4>Pending Response</h4>}
                              {selectedInspection?.approvedByUsersList?.includes(
                                share.currentOwnerDocID?.username
                              ) && <h4>Approved</h4>}
                              {selectedInspection?.rejectedUsersList?.includes(
                                share.currentOwnerDocID?.username
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
                                      share.currentOwnerDocID?.username
                                    }
                                    thread={thread}
                                    isFirstLevel={true}
                                    threadIndex={index}
                                    // handleFetchChildren={handleFetchChildren}
                                    threadCategory={thread.category}
                                    threadLevel={parseInt(thread.threadLevel)}
                                    // propertyID={propertyID}
                                    startDate={processDate(
                                      share.availableInDuration.startDateString
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
                                      handleThreadSubmit(share.shareID);
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
    </div>
  );
};

export default Inspections;
