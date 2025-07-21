import { cleanName } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
type UploadResponse = {
  signal: string;
  assest_id: string;
  file_id_name: string;
};
const useUpload = () => {
  const [res, setRes] = useState<UploadResponse | null>(null);
  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: async ({
      file,
      projectName,
    }: {
      file: File;
      projectName: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `https://gcpqxk30-5000.uks1.devtunnels.ms/api/v1/data/upload/${cleanName(
          projectName
        )}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data as UploadResponse;
    },
    onSuccess: (data) => {
      toast.success("File uploaded successfully");
      setRes(data);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
  return {
    res,
    uploadFile,
    isPending,
  };
};

export default useUpload;
