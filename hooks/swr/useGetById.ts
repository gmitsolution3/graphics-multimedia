import useSWR from "swr";
import { fetcher } from "@/lib/fetchers/fetcher";

export function useGetById(url: string, id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${url}/${id}` : null,
    fetcher,
  );

  return {
    data,
    isLoading,
    error,
    refetch: mutate,
  };
}
