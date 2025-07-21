import { useChat } from "@/context/ChatContext";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { messages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="w-full flex-1 px-2 overflow-y-auto mt-2 max-h-[70vh] custom-scrollbar">
      {messages.map((message, index: number) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`
      p-3 rounded-md break-words
      ${
        message.sender === "user"
          ? "bg-primary text-primary-foreground max-w-sm md:max-w-md"
          : "text-gray-800 dark:text-gray-200"
      }
    `}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
