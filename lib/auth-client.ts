import { createAuthClient } from "better-auth/react";
import type { AppSession } from "@/types/auth";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
});

export function useAppSession() {
  const { data, ...rest } = authClient.useSession();
  return { data: data as AppSession | null, ...rest };
}

export const logOut = () => authClient.signOut();
