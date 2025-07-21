import { cleanName } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending } = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (projectName: string) => {
      const response = await axios.post(
        `https://gcpqxk30-5000.uks1.devtunnels.ms/api/v1/data/project/create/${cleanName(
          projectName
        )}`,
        {
          project_name: projectName,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
  return {
    createProject,
    isPending,
  };
};

export default useCreateProject;
