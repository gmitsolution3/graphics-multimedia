import { fetcher } from "@/lib/fetchers/fetcher";
import useSWR from "swr";

export const useGetBookings = () => {
  const { data, isLoading, mutate } = useSWR("/bookings", fetcher);

  return {
    data,
    isLoading,
    refetch: mutate,
  };
};
