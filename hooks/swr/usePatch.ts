import useSWRMutation from "swr/mutation";
import { patchFetcher } from "@/lib/fetchers/mutationFetcher";
import { mutate } from "swr";

export function usePatch(url: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    url,
    patchFetcher,
  );

  const revalidate = () => {
    mutate((key) => typeof key === "string" && key.startsWith(url));
  };

  return {
    updateItem: trigger,
    isUpdating: isMutating,
    error,
    revalidate,
  };
}
