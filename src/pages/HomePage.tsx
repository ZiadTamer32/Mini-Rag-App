import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import SideBar from "@/components/SideBar";
import MiddleSection from "@/components/MiddleSection";
import RightSection from "@/components/RightSection";

const HomePage = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const dir = localStorage.getItem("dir") || "ltr";
  const [active, setActive] = useState<"left" | "chat" | "resources">("chat");
  const toggleSwitch: ("left" | "chat" | "resources")[] =
    dir === "rtl"
      ? ["resources", "chat", "left"]
      : ["left", "chat", "resources"];

  return (
    <>
      {/* Desktop */}
      <div
        className={`${
          !isMobile ? "grid" : "hidden"
        } grid-cols-[20rem_1fr_20rem] min-h-[calc(100vh-4rem)]`}
      >
        <SideBar />
        <MiddleSection />
        <RightSection />
      </div>

      {/* Mobile */}
      {isMobile && (
        <div>
          <ul className="w-full pb-4 flex items-center justify-center gap-2">
            {toggleSwitch.map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`${
                  active === item
                    ? "bg-gray-100 dark:bg-gray-800 border-b-2 border-b-gray-500 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } w-full text-center px-4 py-2 cursor-pointer transition`}
              >
                {t(item)}
              </li>
            ))}
          </ul>
          <div className="min-h-[calc(100vh-8rem)] flex justify-center">
            {active === "left" && <SideBar />}
            {active === "chat" && <MiddleSection />}
            {active === "resources" && <RightSection />}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
