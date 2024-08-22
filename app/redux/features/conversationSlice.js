"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversationID: "",
  selectedConversation: null,
  conversationList: [],
};

export const ConversationSlice = createSlice({
  name: "conversations",
  initialState: initialState,
  reducers: {
    addConversationList: (state, action) => {
      state.conversationList = action.payload;
    },
    updateSelectedConversationID: (state, action) => {
      state.selectedConversationID = action.payload;
    },
    updateSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    updateMessagesForSelectedConversation: (state, action) => {
      state.selectedConversation.messages = action.payload;
    },
    addNewMessage: (state, action) => {
      const prevDetails = state.selectedConversation;
      state.selectedConversation = {
        ...prevDetails,
        messages: [...prevDetails.messages, action.payload],
      };
    },
    handleMessagesOpenStatus: (state, action) => {
      const prevDetails = state.selectedConversation;
      state.selectedConversation = {
        ...prevDetails,
        messages: prevDetails.messages.map((msg) => {
          if (action.payload.messageIDs.includes(msg.messageID)) {
            return { ...msg, isOpened: true };
          }
          return msg;
        }),
      };
    },
    updateMessageByActions: (state, action) => {
      const prevDetails = state.selectedConversation;
      state.selectedConversation = {
        ...prevDetails,
        messages: prevDetails.messages.map((msg) => {
          if (action.payload.messageID === msg.messageID) {
            if (action.payload.action === "Like") {
              return { ...msg, isLiked: action.payload.value };
            } else if (action.payload.action === "Delete") {
              return { ...msg, isDeleted: action.payload.value };
            }
          }
          return msg;
        }),
      };
    },
  },
});

export const {
  addConversationList,
  updateSelectedConversationID,
  updateSelectedConversation,
  addNewMessage,
  updateMessagesForSelectedConversation,
  handleMessagesOpenStatus,
  updateMessageByActions,
} = ConversationSlice.actions;

export default ConversationSlice.reducer;
