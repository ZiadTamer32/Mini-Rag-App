import { FileCode, NotepadText, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import useFetchData from "../hooks/useFetchData";
import Spinner from "./Spinner";
import useDelete from "@/hooks/useDelete";
import { Button } from "./ui/button";

const Projects = () => {
  const { data, isPending: isLoading } = useFetchData();
  const { t } = useTranslation();
  const { deleteProject, isPending: isDeleting } = useDelete();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 px-2 py-3 font-semibold text-lg border-b border-gray-200 dark:border-gray-700">
        <NotepadText /> {t("projects")}
      </div>
      <div className="overflow-y-auto max-h-96 custom-scrollbar py-2">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
        <ul>
          {data?.projects &&
            data.projects.map((project: string, index: number) => (
              <li
                key={index}
                className="flex justify-between ml-2 items-center gap-2 p-2 transition-colors cursor-pointer hover:text-primary hover:bg-accent rounded-sm"
              >
                <FileCode /> {project}{" "}
                <Button
                  variant={"destructive"}
                  onClick={() => deleteProject(project)}
                >
                  {isDeleting ? <Spinner /> : <Trash />}
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
