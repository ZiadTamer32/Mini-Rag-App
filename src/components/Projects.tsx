import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileCode, NotepadText } from "lucide-react";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="transition-colors hover:text-primary hover:bg-accent px-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <NotepadText /> {t("projects")}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {[
              "Project 1",
              "Project 2",
              "Project 3",
              "Project 4",
              "Project 5",
            ].map((project, index) => (
              <li
                key={project}
                className="flex items-center gap-2 p-2 transition-colors cursor-pointer hover:text-primary hover:bg-accent rounded-sm"
              >
                <FileCode /> {t("project") + " " + (index + 1)}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Projects;
