import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useConvexAuth } from "@convex-dev/auth/react";

export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) return <div className="flex min-h-dvh items-center justify-center bg-canvas"><div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  return <>{children}</>;
}
