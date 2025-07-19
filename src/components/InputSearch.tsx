import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const InputSearch = () => {
  const { t } = useTranslation();
  return (
    <>
      <Search className="text-muted-foreground" />
      <input
        type="search"
        className="w-full h-10 px-4 bg-transparent text-sm focus:outline-none"
        placeholder={`${t("search notes")}...`}
      />
    </>
  );
};

export default InputSearch;
