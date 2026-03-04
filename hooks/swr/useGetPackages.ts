import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useGetPackages = () => {
  const { data, isLoading, mutate } = useSWR("/packages", fetcher);

  return {
    data,
    isLoading,
    refetch: mutate,
  };
};
