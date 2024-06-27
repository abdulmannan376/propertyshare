import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const Thread = ({ thread, isFirstLevel }) => {
  return (
    <div
      className={`${isFirstLevel ? "" : "pl-4 border-l border-gray-600 ml-0"}`}
    >
      <div className="mb-2 mt-2">
        <div className="bg-white p-2 rounded-md shadow-sm">{thread.body}</div>
        {thread.children &&
          thread.children.map((child) => (
            <Thread key={child.id} thread={child} isFirstLevel={false} />
          ))}
      </div>
    </div>
  );
};

const ThreadDisplay = ({ propertyID }) => {
  const [threads, setThreads] = useState([]);

  const fetchThreads = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/thread/get-all-by-property/${propertyID}`,
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

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <>
    <div>
        <button type="button"> <FaPlus/> New </button>
    </div>
    <div className="p-4">
      {threads.length > 0 ? (
          threads?.map((thread) => (
              <Thread key={thread.threadID} thread={thread} isFirstLevel={true} />
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
