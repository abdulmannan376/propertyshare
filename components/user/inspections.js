import { updateActiveInspectionTab } from "@/app/redux/features/dashboardSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InspectionCard from "./inspectionCard";
import { MdClose } from "react-icons/md";
import Image from "next/image";

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

  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Inspections</h1>
      </div>

      <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
        <button
          onClick={() => {
            dispatch(updateActiveInspectionTab("My Inspections"));
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

        {/* </Link> */}
      </div>

      {activeInspectionTab === "My Inspections" && (
        <div>
          {!isLoading ? (
            !selectedInspection && (
              <div className="mx-14 flex flex-row flex-wrap items-center">
                {inspectionsList.length > 0 ? (
                  inspectionsList.map((inspection, index) => (
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
          {selectedInspection?.status !== "Pending Submission" && selectedInspection && (
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
            </>
          )}
        </div>
      )}
      {activeInspectionTab === "All Inspections" && (
        <div>
          {!isLoading ? (
            <div className="mx-14 flex flex-row flex-wrap items-center">
              {inspectionsList.length > 0 ? (
                inspectionsList.map((inspection, index) => (
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
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Inspections;
