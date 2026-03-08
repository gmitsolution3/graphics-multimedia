import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
});

export const getSession = () => {
  return authClient.useSession();
};

export const logOut = () => {
  return authClient.signOut();
};
