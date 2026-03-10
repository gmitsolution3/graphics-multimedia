import { fetcher } from "@/lib/fetchers/fetcher";
import useSWR from "swr";

export const useGetInfluencers = (page: number, limit: number) => {
  const { data, isLoading, mutate } = useSWR(
    `/influencers?page=${page}&limit=${limit}`,
    fetcher,
  );

  return {
    data,
    isLoading,
    refetch: mutate,
  };
};
