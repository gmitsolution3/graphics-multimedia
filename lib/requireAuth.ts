import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth(roles: string[]) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!roles.includes(session.user.role)) {
    redirect("/");
  }

  return session;
}
