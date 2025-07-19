import { useTranslation } from "react-i18next";

const RightSection = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 xl:ltr:border-l xl:rtl:border-r border-l-gray-200 border-r-gray-200 dark:border-r-gray-700 dark:border-l-gray-700 w-full">
      {t("right section")}
    </div>
  );
};

export default RightSection;
