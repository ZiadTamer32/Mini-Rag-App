import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchData = () => {
  const { data, isPending } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await axios.get(
        "https://gcpqxk30-5000.uks1.devtunnels.ms/api/v1/data/projects/info"
      );
      return response.data;
    },
  });
  return {
    data,
    isPending,
  };
};

export default useFetchData;
