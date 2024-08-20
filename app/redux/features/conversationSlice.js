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
      const newDetails = [...state.conversationList];
      newDetails.map((convo) => {
        if (convo.conversationID === action.payload) {
          convo.lastMessage.isOpened = true;
        }
      });

      state.conversationList = newDetails;
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
  },
});

export const {
  addConversationList,
  updateSelectedConversationID,
  updateSelectedConversation,
  addNewMessage,
  updateMessagesForSelectedConversation,
  handleMessagesOpenStatus,
} = ConversationSlice.actions;

export default ConversationSlice.reducer;
