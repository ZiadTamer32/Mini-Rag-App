import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const RightSection = () => {
  const { t } = useTranslation();
  const resources = [
    {
      id: 1,
      name: "resource",
      type: "PDF",
      uploadedAt: "2025-07-19",
    },
    { id: 2, name: "Resource 2", type: "DOCX", uploadedAt: "2025-07-18" },
    { id: 3, name: "Resource 3", type: "TXT", uploadedAt: "2025-07-17" },
  ];
  const splitName = (name: string): string =>
    name.length > 15 ? `${name.slice(0, 15)}...` : name;
  return (
    <div className="p-4 xl:ltr:border-l xl:rtl:border-r border-l-gray-200 border-r-gray-200 dark:border-r-gray-700 dark:border-l-gray-700 w-full">
      <h2 className="text-xl font-bold mb-4">{t("resources")}</h2>

      <div className="flex flex-col items-center gap-3 w-full">
        {resources.map((resource) => (
          <div className="flex items-center gap-3 w-full" key={resource.name}>
            <Label className="cursor-pointer w-full hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <FileText />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  {t(splitName(resource.name))}
                </p>
              </div>
              <Checkbox
                id="toggle-2"
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSection;
