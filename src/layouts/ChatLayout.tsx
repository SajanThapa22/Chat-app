// src/layouts/ChatLayout.tsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import ChatSidebar from "../components/chat/ChatSidebar";
import Header from "../components/layout/Header";

const ChatLayout: React.FC = () => {
  const { fetchChatHistories } = useChat();

  useEffect(() => {
    fetchChatHistories();
  }, [fetchChatHistories]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;
