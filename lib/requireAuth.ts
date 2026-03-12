import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type Role = "user" | "admin" | "super_admin";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth(
  options?: {
    roles?: Role[];
    redirectTo?: string;
  }
) {
  const session = await getSession();

  if (!session) {
    const loginUrl = options?.redirectTo
      ? `/login?redirect=${encodeURIComponent(options.redirectTo)}`
      : "/login";

    redirect(loginUrl);
  }

  if (options?.roles && !options.roles.includes(session.user.role as Role)) {
    redirect("/");
  }

  return session;
}