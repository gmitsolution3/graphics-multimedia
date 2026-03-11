import { fetcher } from "@/lib/fetchers/fetcher";
import useSWR from "swr";

export const useGetBookings = (type: string) => {
  const { data, isLoading, mutate } = useSWR(
    `/bookings?type=${type}`,
    fetcher,
  );

  return {
    data,
    isLoading,
    refetch: () => mutate,
  };
};
