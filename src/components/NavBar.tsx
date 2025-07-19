import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { LogIn, Menu, UserPen, X } from "lucide-react";
import { Button } from "./ui/button";
import InputSearch from "./InputSearch";
import { useTranslation } from "react-i18next";

const menuList = [
  { icon: <LogIn />, title: "Login", url: "/login" },
  { icon: <UserPen />, title: "Register", url: "/register" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    const dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    localStorage.setItem("dir", dir); // Save direction
    localStorage.setItem("language", newLang); // Save language (optional)
  };

  return (
    <nav className="relative flex justify-between items-center w-full border-b border-b-gray-200 dark:border-b-gray-700 px-6 h-16">
      {/* Logo */}
      <h1 className="text-xl font-bold">Mini-Rag-App</h1>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-1 items-center max-w-md border border-input bg-background/50 backdrop-blur-sm rounded-md ltr:pl-2 rtl:pr-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-ring focus-within:border-ring">
        <InputSearch />
      </div>

      {/* Mode Toggle & Language - Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <ModeToggle />
        <Button variant="outline" size="icon" onClick={toggleLanguage}>
          {i18n.language === "ar" ? "EN" : "AR"}
        </Button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          {i18n.language === "ar" ? "EN" : "AR"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsOpen((prev) => !prev)}
          size="icon"
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full p-4 bg-white dark:bg-gray-900 shadow-md md:hidden flex flex-col items-start gap-4 z-50">
          {/* Mobile Search */}
          <div className="w-full flex items-center border border-input bg-background/50 backdrop-blur-sm rounded-md pl-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-ring focus-within:border-ring">
            <InputSearch />
          </div>
          {/* Mobile Links */}
          {menuList.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:bg-accent px-4 py-2 rounded-sm hover:text-primary transition-colors w-full"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
