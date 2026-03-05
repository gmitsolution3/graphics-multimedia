import useSWRMutation from "swr/mutation";
import { postFetcher } from "@/lib/fetchers/mutationFetcher";

export function usePost(url: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    postFetcher,
  );

  return {
    createItem: trigger,
    isCreating: isMutating,
    error,
  };
}
