import useSWR from "swr";
import { fetcher } from "@/lib/fetchers/fetcher";

export const useGetJobApplications = (jobId: string) => {
  const { data, isLoading, mutate } = useSWR(
    jobId ? `/job-applications?jobId=${jobId}` : null,
    fetcher,
  );

  return {
    data,
    isLoading,
    refetch: () => mutate(),
  };
};
