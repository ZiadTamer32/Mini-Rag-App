import { cleanName } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useDelete = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: async (projectName: string) => {
      const response = await axios.delete(
        "https://gcpqxk30-5000.uks1.devtunnels.ms/api/v1/data/projects/delete",
        {
          data: {
            project_name: cleanName(projectName),
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
  return {
    deleteProject,
    isPending,
  };
};

export default useDelete;
