import { fetcher } from "@/lib/fetchers/fetcher";
import useSWR from "swr";

export const useGetServices = () => {
  const { data, isLoading, mutate } = useSWR("/services", fetcher);

  return {
    data,
    isLoading,
    refetch: mutate,
  };
};
