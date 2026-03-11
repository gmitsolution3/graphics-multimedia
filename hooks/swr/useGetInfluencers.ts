import useSWR from "swr";
import { fetcher } from "@/lib/fetchers/fetcher";

export const useGetInfluencers = (page: number, limit: number) => {
  const key = `/influencers?page=${page}&limit=${limit}`;

  const { data, isLoading, mutate } = useSWR(key, fetcher);

  return {
    data,
    isLoading,
    refetch: () => mutate(),
    key,
  };
};