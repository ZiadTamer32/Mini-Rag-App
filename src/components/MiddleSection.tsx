import { ChevronDown, Upload, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StartChatPrompt from "./StartChatPrompt";

const MiddleSection = () => {
  const { t } = useTranslation();
  const [notes, setNotes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isFileUploading, setIsFileUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddNote = () => {
    setNotes((prevNotes): string[] => [...prevNotes, "New Note"]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
      setIsFileUploading(true);
    }
  };

  // Handle sending message
  const handleSend = () => {
    if (message.trim()) {
      // Add your send logic here
      alert(`Sent: ${message}`);
      setMessage("");
    }
  };

  // Handle Enter key for sending
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (notes.length === 0) {
    return <StartChatPrompt handleAddNote={handleAddNote} />;
  }

  return (
    <main className="flex items-center justify-between flex-col w-full">
      <div className="flex items-center justify-between w-full p-4 border-b border-b-gray-200 dark:border-b-gray-700">
        <h2>{t("chat")}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              {t("model")}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose Model</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Model 1</DropdownMenuItem>
            <DropdownMenuItem>Model 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="p-5 bg-accent text-accent-foreground rounded-full">
          <Upload />
        </span>
        <p className="text-2xl font-semibold">
          {t("add a source to get started")}
        </p>
        <Button variant={"outline"} onClick={handleUploadClick}>
          {t("upload a file")}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
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
    </main>
  );
};

export default MiddleSection;
