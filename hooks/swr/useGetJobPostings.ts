import useSWR from "swr";
import { fetcher } from "@/lib/fetchers/fetcher";

export const useGetJobPostings = () => {
  const { data, isLoading, mutate } = useSWR(
    "/job-postings",
    fetcher,
  );

  return {
    data,
    isLoading,
    refetch: () => mutate(),
  };
};
