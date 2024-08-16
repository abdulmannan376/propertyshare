// SocketContext.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // if (!socket) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      console.log(userDetails)
      if (userDetails && !socket) {
        const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_HOST, {
          transports: ["websocket"],
          query: { username: userDetails.username },
          reconnection: true,
          reconnectionDelay: 500,
          reconnectionAttempts: 10,
        });

        newSocket.on("connect", () => {
          console.log("connection made");
        });

        newSocket.on("connect_error", (error) => {
          console.error("Connection Error:", error);
        });

        setSocket(newSocket);
        return () => {
          newSocket.close();
        };
      }
    // }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
