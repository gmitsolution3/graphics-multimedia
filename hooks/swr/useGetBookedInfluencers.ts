import useSWR from "swr";
import { fetcher } from "@/lib/fetchers/fetcher";

export const useGetBookedInfluencers = () => {
  const { data, isLoading, mutate } = useSWR(
    "/influencer-bookings",
    fetcher,
  );

  return {
    data,
    isLoading,
    refetch: () => mutate(),
  };
};
