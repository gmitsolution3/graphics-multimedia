"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`,
      );
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

          {/* Text */}
          <p className="text-lg font-medium text-gray-700">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
