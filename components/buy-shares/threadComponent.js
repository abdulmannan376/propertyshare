import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import NewThread from "../modals/newThread";
import { useSelector } from "react-redux";

const Thread = ({ thread, isFirstLevel, threadIndex, handleFetchChildren }) => {
  return (
    <div
      className={`${
        isFirstLevel ? "" : "pl-4 border-l border-gray-600 ml-0"
      } cursor-pointer`}
      onClick={() => handleFetchChildren(thread.threadID, threadIndex)}
    >
      <div className="mb-2 mt-2">
        <div className="bg-white text-xl font-semibold p-2 rounded-md shadow-sm">
          {thread.title}
        </div>
        {isFirstLevel && (
          <div className="bg-white px-2 rounded-md shadow-sm">
            Duration: {thread.shareDocID.availableInDuration.startDate} -{" "}
            {thread.shareDocID.availableInDuration.endDate}
          </div>
        )}
        <div className="bg-white p-2 rounded-md ">{thread.body}</div>
        <button type="button" className="text-[#116A7B] font-semibold px-2">
          Reply
        </button>
        {thread.children &&
          thread.children.map((child) => (
            <Thread key={child.id} thread={child} isFirstLevel={false} />
          ))}
      </div>
    </div>
  );
};

const ThreadDisplay = ({ propertyID, propertyDocID, category }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const [threads, setThreads] = useState([]);

  const userRole = useSelector(state => state.adminSliceReducer.userRole)

  const fetchThreads = async () => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_HOST
        }/thread/get-all-by-property/${JSON.stringify({
          propertyID: propertyID,
          category: category,
        })}`,
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

  const [newThreadSubmitted, setNewThreadSubmitted] = useState(true);

  useEffect(() => {
    if (newThreadSubmitted) {
      fetchThreads();
      setNewThreadSubmitted(false);
    }
  }, [newThreadSubmitted]);

  const handleFetchChildren = async (threadID, threadIndex) => {
    console.log("role: ", userRole, typeof userRole, userRole === "admin");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-childern-by-parent/${threadID}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setThreads((prevData) => {
          const newData = [...prevData];
          newData[threadIndex].children = response.body;
          return newData;
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
    <>
      {userRole === "shareholder" ||
        userRole === "admin" && (
          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="text-3xl flex flex-row items-center px-3 py-1 border border-[#116A7B] text-[#116A7B] rounded-full"
            >
              {" "}
              New <FaPlus className="text-xl ml-5" />
            </button>
          </div>
        )}
      <NewThread
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        propertyDocID={propertyDocID}
        propertyID={propertyID}
        category={category}
        setNewThreadSubmitted={setNewThreadSubmitted}
      />
      <div className="p-4">
        {threads.length > 0 ? (
          threads?.map((thread, index) => (
            <Thread
              key={thread.threadID}
              thread={thread}
              isFirstLevel={true}
              threadIndex={index}
              handleFetchChildren={handleFetchChildren}
            />
          ))
        ) : (
          <div className="text-[32px] font-semibold text-[#116A7B]">
            <h1 className="text-center">No Threads Yet.</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ThreadDisplay;
