/* eslint-disable react-refresh/only-export-components */
import useProcess from "@/hooks/useProcess";
import useUpload from "@/hooks/useUpload";
import { createContext, useContext, useState } from "react";

type ChatContextType = {
  notes: string[];
  message: string;
  projectName: string;
  messages: { sender: "user" | "bot"; text: string }[];
  setMessage: (msg: string) => void;
  setProjectName: (name: string) => void;
  isFileUploaded: boolean;
  isFileUploading: boolean;
  handleAddNote: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function ChatProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(true);
  const { uploadFile } = useUpload();
  const { processData } = useProcess();
  const [projectName, setProjectName] = useState("");

  const handleAddNote = () => {
    setNotes((prevNotes): string[] => [...prevNotes, "New Note"]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsFileUploading(true); // Start uploading immediately
      setIsFileUploaded(false);
      uploadFile(
        { file, projectName },
        {
          onSuccess: (data) => {
            setIsFileUploading(false); // Done uploading
            setIsFileUploaded(true);
            processData({ projectName, file_id: data.file_id_name });
            console.log(projectName, data.file_id_name);
          },
          onError: () => {
            setIsFileUploading(false); // Done uploading (with error)
            setIsFileUploaded(false);
            // Optionally show error toast here
          },
        }
      );
    }
  };

  // Handle sending message
  const handleSend = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: message },
        { sender: "bot", text: `You said: ${message}` },
      ]);
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
  return (
    <ChatContext.Provider
      value={{
        notes,
        message,
        messages,
        projectName,
        setMessage,
        setProjectName,
        isFileUploaded,
        isFileUploading,
        handleAddNote,
        handleFileChange,
        handleSend,
        handleKeyDown,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export { ChatProvider, useChat };
