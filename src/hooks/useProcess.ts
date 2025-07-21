import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { cleanName } from "@/lib/utils";

const useProcess = () => {
  const { mutate: processData, isPending } = useMutation({
    mutationFn: async ({
      projectName,
      file_id,
    }: {
      projectName: string;
      file_id: string;
    }) => {
      const response = await axios.post(
        `https://gcpqxk30-5000.uks1.devtunnels.ms/api/v1/data/process/${cleanName(
          projectName
        )}`,
        { file_id }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("File processed successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
  return {
    processData,
    isPending,
  };
};

export default useProcess;
