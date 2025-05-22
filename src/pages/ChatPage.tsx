import { useTheme } from "../context/ThemeContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navigator from "../components/Navigator";
import { useChat } from "../context/ChatContext";
import getUser from "../hooks/getUser";
import getChatHistory from "../hooks/getChatHistory";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import defaultProfilePicture from "../assets/img/default_image.png";
import { FaChevronLeft } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { IoCheckmark } from "react-icons/io5";
import { BiCheckDouble } from "react-icons/bi";
import { useChatHistory } from "../context/ChatHistoryContext";

const ChatPage = () => {
  const { currentUser, error } = useGetCurrentUser();
  const { id } = useParams<{ id: string }>();
  const { user } = getUser(id);
  const { result } = useChatHistory();
  const [filteredStatus, setFilteredStatus] = useState<string>();
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] =
    useState<boolean>(false);

  const {
    setInitialMessages,
    initialMessages,
    inputMessage,
    setInputMessage,
    url,
    setUrl,
    history,
    setHistory,
    handleSendMessage,
  } = useChat();

  const { isSideBarCollapsed, setIsSideBarCollapsed } = useTheme();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const generateChatHistoryName = (
    senderUserId: string | undefined,
    receiverUserId: string | undefined
  ) => {
    if (!senderUserId || !receiverUserId) {
      console.error("Both sender and receiver IDs must be defined");
      return "";
    }

    const minId = senderUserId < receiverUserId ? senderUserId : receiverUserId;
    const maxId = senderUserId > receiverUserId ? senderUserId : receiverUserId;
    return `${minId}_${maxId}`;
  };

  const filteredMessages = initialMessages.filter(
    (msg) => msg.chat_history === history
  );

  const getTexts = async (url: string) => {
    const chats = await getChatHistory(url);

    const chatsData = chats.data;
    if (chats.status === 200) {
      setUrl((prev) => ({ ...prev, nextUrl: chats.data.next }));
      setUrl((prev) => ({ ...prev, prevUrl: chats.data.previous }));
      if (!chatsData.previous) {
        setInitialMessages([]);
        for (let i = chatsData.results.length - 1; i >= 0; i--) {
          setInitialMessages((prevMessages) => [
            ...prevMessages,
            chatsData.results[i],
          ]);
        }
      } else {
        for (let i = 0; i < chatsData.results.length; i++) {
          setInitialMessages((prev) => [chatsData.results[i], ...prev]);
        }
      }
    } else {
      setUrl((prev) => ({ ...prev, nextUrl: "", prevUrl: "" }));
    }
  };

  useEffect(() => {
    async function getInitialMessages() {
      if (currentUser && id) {
        const historyName = generateChatHistoryName(currentUser.id, id);
        setHistory(historyName);
        const initialurl = `http://127.0.0.1:8000/chat/history/${historyName}`;
        await getTexts(initialurl);
      }
    }
    getInitialMessages();
  }, [currentUser, id]);

  useEffect(() => {
    const updateStatus = () => {
      if (history) {
        const visibleResult = result.find(
          (res) => res.chat_history === history
        );
        setFilteredStatus(visibleResult?.user.user_status.status);
      }
    };

    updateStatus();
  }, [history, result]);

  // Remove automatic scrolling on message changes

  const handleLoadMore = async () => {
    if (url.nextUrl) {
      getTexts(url.nextUrl);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  function showTime(timestamp: string): string {
    // const now = new Date();
    const pastDate = new Date(timestamp);

    // const diff = now.getTime() - pastDate.getTime();

    // const seconds = Math.floor(diff / 1000);
    // const minutes = Math.floor(seconds / 60);
    // const hours = Math.floor(minutes / 60);

    return pastDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
    setTimeout(() => scrollToBottom(), 100);
  };

  return (
    <div
      id="chat-section"
      className={`flex flex-col bg-bgComp h-dvh flex-1 max-w-full relative`}
    >
      <div className="px-3 lg:px-8 py-2 lg:py-4 border-b border-b-gray-400">
        <div className="flex gap-4 items-center ml-3">
          <Navigator />
          <div className="rounded-full aspect-square size-12 relative">
            <img
              src={defaultProfilePicture}
              className="size-full object-cover rounded-full"
            />
            {filteredStatus === "online" && (
              <div className="size-3 bg-[#00FF00] rounded-full absolute bottom-0 right-0"></div>
            )}
          </div>
          <div className="flex flex-col text-txtClr">
            <div className="text-[18px] capitalize">{user?.username}</div>
            {filteredStatus === "online" && (
              <div className="text-[14px]">Active now</div>
            )}
          </div>
        </div>
      </div>

      <div
        id="chats"
        className={`flex-1 h-full overflow-y-auto hide-scrollbar ${
          isSideBarCollapsed && "pl-8"
        }`}
      >
        {url.nextUrl && initialMessages && (
          <div
            onClick={handleLoadMore}
            className="text-center text-txtClr mt-3 text-[18px] cursor-pointer"
          >
            load more messages...
          </div>
        )}
        <div
          id="chatsdivs"
          className={`w-full min-h-full justify-end flex flex-col gap-3 bottom-0 px-4 lg:px-8 pt-5`}
        >
          {filteredMessages.map((msg, index) => {
            const isLongMessage = msg.message.length > 50;

            return (
              <div
                key={index}
                style={{
                  wordBreak: "break-all",
                }}
                className={`max-w-[60%] text-white ${
                  msg.user === currentUser?.id ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`relative group rounded-[20px] ${
                    msg.user === currentUser?.id ? "bg-primary" : "bg-gray-400"
                  } px-4 py-2 text-wrap w-fit flex ${
                    isLongMessage ? "flex-col" : "flex-row items-end"
                  } gap-2`}
                >
                  <div className="hidden absolute w-fit bg-gray-500 text-white text-[12px] p-1 left-0 top-0 -translate-y-full group-hover:block">
                    {showTime(
                      msg.delivered_timestamp
                        ? `${msg.delivered_timestamp}`
                        : msg.sent_timestamp
                    )}
                  </div>

                  <div className="flex-1">{msg.message}</div>

                  <div
                    className={`flex gap-2 text-white ${
                      isLongMessage ? "justify-end" : "items-center"
                    }`}
                  >
                    <span className="text-[10px]">
                      {showTime(
                        msg.delivered_timestamp
                          ? msg.delivered_timestamp
                          : msg.sent_timestamp
                      )}
                    </span>
                    {msg.user === currentUser?.id && (
                      <span className="text-md ">
                        {msg.delivered_timestamp ? (
                          <BiCheckDouble />
                        ) : (
                          <IoCheckmark />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {/* This empty div serves as the reference point for scrolling */}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="px-4 lg:px-8 py-5 w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="border border-gray-400 rounded-lg px-4 py-2 flex items-center gap-4">
            <input
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
              type="text"
              className="focus:outline-none bg-transparent text-txtClr w-full"
              placeholder="Type a message.."
            />

            <div onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}>
              <BsEmojiSmile className="text-white text-xl cursor-pointer" />
            </div>

            <div
              className={`absolute bottom-20 right-8 ${
                isEmojiPickerVisible ? "block" : "hidden"
              }`}
            >
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={(e: any) => {
                  setInputMessage(inputMessage + e.native);
                }}
              />
            </div>

            <button
              type="submit"
              className="border-none size-8 bg-transparent outline-none rounded-lg text-white"
            >
              <PiPaperPlaneRightFill className="text-primary size-8" />
            </button>
          </div>
        </form>
      </div>
      <div
        onClick={() => setIsSideBarCollapsed(!isSideBarCollapsed)}
        className={`p-2 cursor-pointer bg-slate-400 rounded-full absolute transition-transform delay-75 bottom-1/2 -translate-x-1/2 ${
          isSideBarCollapsed && "rotate-180 translate-x-1/2"
        }`}
      >
        <FaChevronLeft className="text-white size-5" />
      </div>
    </div>
  );
};

export default ChatPage;
