import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useChat } from "@/context/ChatContext";

const UploadFile = () => {
  const { t } = useTranslation();
  const { handleFileChange } = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
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
  );
};

export default UploadFile;
