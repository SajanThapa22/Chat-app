import { useEffect, useRef } from "react";

interface MessageProps {
  message: {
    id: string;
    user: string;
    text: string;
  };
  currentUser: { id: string };
  sendMessage: (data: any) => void;
}

export default function MessageItem({
  message,
  currentUser,
  sendMessage,
}: MessageProps) {
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (message.user === currentUser?.id) return; // Don't send seen for own messages

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Send "seen" status when message is visible
          sendMessage({
            type: "updated_message_info",
            updated_message_info_type: "seen",
            receiver_id: message.user,
            message_id: message.id,
          });

          observer.disconnect(); // Stop observing after seen is sent
        }
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => observer.disconnect();
  }, [message, currentUser, sendMessage]);

  return (
    <div ref={messageRef} className="message-item">
      {message.text}
    </div>
  );
}
