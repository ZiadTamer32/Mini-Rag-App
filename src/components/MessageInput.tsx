import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useChat } from "@/context/ChatContext";

const MessageInput = () => {
  const { t } = useTranslation();
  const { message, setMessage, isFileUploading, handleSend, handleKeyDown } =
    useChat();
  return (
    <div className="w-full p-2">
      <div className="flex items-end gap-2">
        <textarea
          className="w-full shadow-sm border-2 border-gray-200 dark:border-gray-700 rounded-md p-3 h-auto resize-none focus:outline-none focus:ring-1 focus:ring-accent-foreground transition"
          placeholder={`${
            isFileUploading
              ? `${t("start typing...")}`
              : `${t("you must upload a file first")}`
          }`}
          disabled={!isFileUploading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          autoFocus
        />
        <Button
          variant="default"
          className="h-10 px-3"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
