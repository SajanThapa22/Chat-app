import React, { useEffect, useState } from "react";
import axios from "axios";

const getChatHistory = async (url: string, page?: number | undefined) => {
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
  // const historyName = generateChatHistoryName(senderId, receiverId);

  const access = localStorage.getItem("access");

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        page: page,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

export default getChatHistory;
