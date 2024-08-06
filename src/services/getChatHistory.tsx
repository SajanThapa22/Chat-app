import React, { useEffect, useState } from "react";
import axios from "axios";

const getChatHistory = async (
  senderId: string | undefined,
  receiverId: string | undefined
) => {
  const generateChatHistoryName = (
    senderUserId: string | undefined,
    receiverUserId: string | undefined
  ) => {
    const minId =
      senderUserId && receiverUserId && senderUserId < receiverUserId
        ? senderUserId
        : receiverUserId;
    const maxId =
      senderUserId && receiverUserId && senderUserId > receiverUserId
        ? senderUserId
        : receiverUserId;
    return `${minId}_${maxId}`;
  };
  const historyName = generateChatHistoryName(senderId, receiverId);

  const url = `http://127.0.0.1:8000/chat/history/${historyName}`;

  const access = localStorage.getItem("access");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => res.data.results)
    .catch((err) => err.message);
};

export default getChatHistory;
