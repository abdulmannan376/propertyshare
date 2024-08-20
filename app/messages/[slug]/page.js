"use client";
import {
  addConversationList,
  addNewMessage,
  handleMessagesOpenStatus,
  updateMessagesForSelectedConversation,
  updateSelectedConversation,
  updateSelectedConversationID,
} from "@/app/redux/features/conversationSlice";
import { updateUserRole } from "@/app/redux/features/dashboardSlice";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateDropdrownStatus,
  updateNavbarLogo,
  updateNavbarTextColor,
} from "@/app/redux/features/navbarSlice";
import { useSocket } from "@/hooks/useSocket";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();

  const panelRef = useRef();
  const [panelIsOpen, setPanelIsOpen] = useState(true);

  const handleDashPanel = (e) => {
    e.preventDefault();
    setPanelIsOpen((prevOpen) => !prevOpen);
  };

  // const [selectedConversationID, setSelectedConversationID] = useState("");
  // const [conversations, setConversations] = useState([]);
  // const [selectedConversation, setSelectedConversation] = useState({});

  const conversations = useSelector(
    (state) => state.conversationSliceReducer.conversationList
  );

  const selectedConversationID = useSelector(
    (state) => state.conversationSliceReducer.selectedConversationID
  );

  const selectedConversation = useSelector(
    (state) => state.conversationSliceReducer.selectedConversation
  );

  const fetchConversations = async () => {
    console.log("in fetchConversations");
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/get-conversations-by-username/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        dispatch(addConversationList(response.body));
      } else {
        throw new Error(response.body);
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

  const TruncatingH1 = ({ text }) => {
    const h1Ref = useRef(null);
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
      const current = h1Ref.current;
      if (!current) return;

      current.innerText = text; // Set the full text initially

      // Wait for the next browser paint to ensure styles are calculated
      requestAnimationFrame(() => {
        const lineHeight = parseInt(
          window.getComputedStyle(current).lineHeight,
          10
        );
        const height = current.clientHeight;

        if (height > lineHeight) {
          // Text exceeds one line
          let truncatedText = text;
          while (
            current.clientHeight > lineHeight &&
            truncatedText.length > 0
          ) {
            truncatedText = truncatedText.slice(0, -1); // Remove one char at a time
            current.innerText = truncatedText + "...";
          }
          setDisplayText(current.innerText); // Update state only if truncation is needed
        }
      });

      // Cleanup function to handle component unmounting or text changes
      return () => {
        current.innerText = text; // Reset when the component or text changes
      };
    }, [text]); // Depend only on text

    return (
      <h1
        ref={h1Ref}
        style={{ lineHeight: "1.5em", overflow: "hidden" }}
        className="text-sm text-[#D9D9D9]"
      >
        {displayText}
      </h1>
    );
  };

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const socket = useSocket();

  const conversationRef = useRef(selectedConversation);

  useEffect(() => {
    conversationRef.current = selectedConversation;
  }, [selectedConversation]);

  function handleAddNewMessage(msg, id) {
    console.log("selectedConversation: ", conversationRef.current);
    const currentConversation = conversationRef.current;
    if (currentConversation.conversationID === id) {
      console.log("in handleAddNewMessage", msg, id);
      dispatch(addNewMessage(msg));
    }
  }

  useEffect(() => {
    // console.log("selectedConversationID: ", selectedConversationID);

    socket?.on("newMessage", (data) => {
      fetchConversations();
      handleAddNewMessage(data.message, data.conversationID);
    });

    socket?.on("seenMessages", (message) => {
      console.log("seen messages: ", message);
      const currentConversation = conversationRef.current;
      if (
        currentConversation &&
        currentConversation.conversationID === message.conversationID
      ) {
        dispatch(handleMessagesOpenStatus({ messageIDs: message.messageIDs }));
      }
      // setConversations((prevDetails) => {
      //   return prevDetails.map((convo) => {
      //     if (message.messageIDs.includes(convo.lastMessage.messageID)) {
      //       return {
      //         ...convo,
      //         lastMessage: {
      //           ...convo.lastMessage,
      //           isOpened: true,
      //         },
      //       };
      //     }
      //     return convo;
      //   });
      // });
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("seenMessages");
    };
  }, [socket]);

  useEffect(() => {
    dispatch(
      updateUserRole(JSON.parse(localStorage.getItem("userDetails"))?.role)
    );

    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );

    dispatch(
      updateCurrentPageValue({
        tag: "Messages",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );

    dispatch(updateBgColor("bg-[#116A7B]"));
    dispatch(updateNavbarLogo("/logo-bbh.png"));
    setName(JSON.parse(localStorage.getItem("userDetails"))?.name);
    setUsername(JSON.parse(localStorage.getItem("userDetails"))?.username);
    fetchConversations();
    // fetchSettings();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const [isConversationLoading, setIsConversationLoading] = useState(false);

  const fetchSelectedConversation = async (id) => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      setIsConversationLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/conversation/get-conversation-by-id/${id}/${username}/?page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();

      if (response.success) {
        // if (response.currentPage > 1) {
        //   setSelectedConversation((prevDetails) => {
        //     const newDetails = { ...prevDetails };
        //     const prevMessages = [...newDetails.messages];
        //     newDetails.messages = prevMessages.concat(response.body);
        //     return newDetails;
        //   });
        // } else {
        dispatch(updateMessagesForSelectedConversation(response.body));
        // }
        setIsConversationLoading(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsConversationLoading(false);
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

  function handleViewer() {
    const username = JSON.parse(localStorage.getItem("userDetails")).username;
    const isViewer = selectedConversation.participants[0].username === username;

    return isViewer ? 1 : 0;
  }
  

  return (
    <div
      onClick={() => dispatch(updateDropdrownStatus({ field: "close all" }))}
    >
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
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="w-full flex flex-row items-start">
        <div
          ref={panelRef}
          className={`${
            panelIsOpen ? "-translate-x-[0%]" : "-translate-x-[100%]"
          } absolute xl:w-1/5 lg:w-[23%] xxl:h-[90vh] xl:h-[93vh] lg:h-[93vh] md:h-[93vh] max-h-[93vh] z-20 transition-transform bg-[#015A6B] duration-500`}
        >
          <div
            // onClick={(event) => handleUpdateActiveTab(event, "Profile")}
            className={`relative flex flex-row items-center px-10 py-5 border-b border-b-[#D9D9D9] cursor-pointer`}
          >
            Messages
            {panelIsOpen ? (
              <FaChevronLeft
                onClick={(e) => {
                  e.stopPropagation();
                  handleDashPanel(e);
                }}
                className="text-white ml-auto text-4xl p-2 cursor-pointer ease-in-out"
              />
            ) : (
              <FaChevronRight
                onClick={(e) => {
                  e.stopPropagation();
                  handleDashPanel(e);
                }}
                className="absolute -right-10 bg-[#116A7B] text-white ml-auto text-4xl p-2 rounded-full cursor-pointer ease-in-out"
              />
            )}
          </div>
          <ul>
            {conversations.map((conversation, index) => {
              const username = JSON.parse(
                localStorage.getItem("userDetails")
              ).username;
              const isViewer =
                conversation.participants[0].username === username;
              return (
                <li
                  key={index}
                  className={`text-base text-white font-medium  ${
                    selectedConversationID === conversation.conversationID
                      ? "bg-[#8E9B9D]"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      dispatch(
                        updateSelectedConversationID(
                          conversation.conversationID
                        )
                      );
                      dispatch(updateSelectedConversation(conversation));
                      fetchSelectedConversation(conversation.conversationID);
                    }}
                    className="w-full px-10 py-5 hover:bg-[#8E9B9D] flex flex-row justify-start"
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={
                        conversation.participants[isViewer ? 1 : 0].userProfile
                          .profilePicURL.length > 0
                          ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                              conversation.participants[isViewer ? 1 : 0]
                                .userProfile.profilePicURL
                            }profile-pic.png`
                          : "/dummy-image.png"
                      }
                      className="w-12 h-12 object-contain object-center rounded-full"
                      alt="user profile pic"
                    />
                    <div className="flex flex-col items-start pl-4">
                      <h1 className="text-white text-start leading-5 ">
                        {" "}
                        <strong className="text-xl ">
                          {conversation.participants[isViewer ? 1 : 0].name}
                        </strong>
                        <br />
                      </h1>
                      <div className="flex flex-row items-center">
                        {conversation.lastMessage.isOpened
                          ? conversation.lastMessage.sender.username ===
                              JSON.parse(localStorage.getItem("userDetails"))
                                .username && <IoCheckmarkDone />
                          : conversation.lastMessage.sender.username ===
                              JSON.parse(localStorage.getItem("userDetails"))
                                .username && <IoCheckmark />}

                        <TruncatingH1 text={conversation.lastMessage.text} />
                      </div>
                    </div>
                    {!conversation.lastMessage.isOpened &&
                      conversation.lastMessage.sender.username !==
                        JSON.parse(localStorage.getItem("userDetails"))
                          .username && (
                        <span className="inline-flex w-5 h-5 mt-1 ml-auto px-0 bg-white text-white text-sm text-center font-semibold focus:outline-none cursor-pointer rounded-full"></span>
                      )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`${
            panelIsOpen ? "xl:w-[20%] lg:w-[23%]" : "w-0"
          } xxl:h-[90vh] xl:h-[93vh] lg:h-[93vh] lg:block hidden duration-700 ease-in-out`}
        ></div>
        <div
          className={`${
            panelIsOpen ? "xl:w-4/5 lg:w-[77%] md:w-full" : "w-full"
          } duration-700 ease-in-out`}
        >
          {!isConversationLoading ? (
            <div>
              {selectedConversation && (
                <div className="bg-white w-full my-6 lg:h-[85vh] md:h-[89vh] lg:max-h-[85vh] max-h-[93vh] overflow-y-auto">
                  <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pb-5 px-14">
                    <h1 className="text-2xl font-medium">
                      {selectedConversation?.participants?.length > 0
                        ? selectedConversation?.participants[handleViewer()]
                            ?.name
                        : ""}
                    </h1>
                  </div>
                  <div className="px-14 py-5">
                    {selectedConversation.messages?.map((message, index) => (
                      <div
                        key={index}
                        className={`message flex flex-row items-center ${
                          message?.sender?.username ===
                          selectedConversation.participants[handleViewer()]
                            ?.username
                            ? "self-start text-left justify-start"
                            : "self-end text-right justify-end"
                        } mb-4`}
                      >
                        {message?.sender?.username ===
                          selectedConversation.participants[handleViewer()]
                            ?.username && (
                          <Image
                            width={1000}
                            height={1000}
                            src={
                              selectedConversation.participants[handleViewer()]
                                .userProfile.profilePicURL.length > 0
                                ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                                    selectedConversation.participants[
                                      handleViewer()
                                    ].userProfile.profilePicURL
                                  }profile-pic.png`
                                : "/dummy-image.png"
                            }
                            className="w-10 h-10 object-contain object-center rounded-full mr-3"
                            alt="user profile pic"
                          />
                        )}
                        <div
                          className={`inline-flex px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                            message?.sender?.username ===
                            selectedConversation.participants[handleViewer()]
                              ?.username
                              ? "bg-gray-200 text-black"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {message.text}
                          <div className="w-4 flex flex-col justify-end">
                            {message?.sender?.username ===
                              selectedConversation.participants[
                                handleViewer() === 1 ? 0 : 1
                              ]?.username &&
                              !message.isOpened && (
                                <IoCheckmark className="text-sm mt-2 ml-2" />
                              )}
                            {message?.sender?.username ===
                              selectedConversation.participants[
                                handleViewer() === 1 ? 0 : 1
                              ]?.username &&
                              message.isOpened && (
                                <IoCheckmarkDone className="text-sm mt-2 ml-2" />
                              )}
                          </div>
                        </div>
                        {message?.sender?.username ===
                          selectedConversation.participants[
                            handleViewer() === 1 ? 0 : 1
                          ]?.username && (
                          <Image
                            width={1000}
                            height={1000}
                            src={
                              selectedConversation.participants[
                                handleViewer() === 1 ? 0 : 1
                              ].userProfile.profilePicURL.length > 0
                                ? `${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                                    selectedConversation.participants[
                                      handleViewer() === 1 ? 0 : 1
                                    ].userProfile.profilePicURL
                                  }profile-pic.png`
                                : "/dummy-image.png"
                            }
                            className="w-10 h-10 object-contain object-center rounded-full ml-3"
                            alt="user profile pic"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
              <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
            </div>
          )}
          {/* {activeTab === "Property Management" && <PropertyManagement />}
          {activeTab === "Profile" && <UserManagement />}
          {activeTab === "Offers" && <Offers />}
          {activeTab === "Favourites" && <Favourites />}
          {activeTab === "Wishlist" && <WishList />}
          {activeTab === "Inspections" && <Inspections />}
          {activeTab === "Buyback Requests" && <BuybackRequests />}
          {activeTab === "Modification & Maintenance" && <RaiseRequest />}
          {activeTab === "Shares in Properties" && <Purchases />}
          {activeTab === "Reservations" && <Reservations />} */}
        </div>
      </div>
    </div>
  );
};

export default Page;
