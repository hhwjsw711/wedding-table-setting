import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useConvexAuth } from "@convex-dev/auth/react";

export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  return <>{children}</>;
}
