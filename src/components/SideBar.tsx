import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import AddNotebook from "./AddNotebook";
import Projects from "./Projects";

const SideBar = () => {
  const { t } = useTranslation();
  return (
    <div className="xl:border-r xl:ltr:border-r xl:rtl:border-l border-l-gray-200 border-r-gray-200 dark:border-l-gray-700 dark:border-r-gray-700 w-full">
      <div className="w-full p-4 border-b border-b-gray-200 dark:border-b-gray-700">
        <AddNotebook />
      </div>
      <div className="w-full p-4">
        <Projects />
      </div>
      <div className="w-full p-4">
        <Button
          variant={"outline"}
          disabled
          className="flex items-center gap-2 w-full"
        >
          <Settings />
          {t("settings")}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
