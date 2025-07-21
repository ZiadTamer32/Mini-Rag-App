import { ChevronDown } from "lucide-react";
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
import { useChat } from "@/context/ChatContext";
import UploadFile from "./UploadFile";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useProcess from "@/hooks/useProcess";
import useUpload from "@/hooks/useUpload";
import Spinner from "./Spinner";

const MiddleSection = () => {
  const { t } = useTranslation();
  const { projectName, isFileUploaded } = useChat();
  const { isPending: isFileUploading } = useUpload();
  const { isPending: isProcessing } = useProcess();

  if (projectName.length === 0) {
    return <StartChatPrompt />;
  }

  return (
    <main className="flex items-center justify-between flex-col w-full">
      <div className="xl:flex hidden items-center justify-between w-full p-4 border-b border-b-gray-200 dark:border-b-gray-700">
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
      {isFileUploaded && <UploadFile />}
      {(isFileUploading || isProcessing) && <Spinner />}
      {!isFileUploaded && <Messages />}
      <MessageInput />
    </main>
  );
};

export default MiddleSection;
