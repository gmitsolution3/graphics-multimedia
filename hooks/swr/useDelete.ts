import useSWRMutation from "swr/mutation";
import { deleteFetcher } from "@/lib/fetchers/deleteFetcher";
import { mutate } from "swr";

export function useDelete(url: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    deleteFetcher,
  );

  const revalidate = () => {
    mutate((key) => typeof key === "string" && key.startsWith(url));
  };

  return {
    deleteItem: trigger,
    isDeleting: isMutating,
    error,
    revalidate,
  };
}
