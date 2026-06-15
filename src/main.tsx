import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { convex } from "./convex";
import { RootLayout } from "@/routes/__root";
import { LoginPage } from "@/routes/login";
import { DashboardPage } from "@/routes/dashboard";
import { PlanEditorPage } from "@/routes/plan-editor";
import { PlanViewerPage } from "@/routes/plan-viewer";
import { AuthenticatedRoute } from "@/routes/authenticated-route";
import { ErrorBoundary } from "@/components/error-boundary";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<AuthenticatedRoute><DashboardPage /></AuthenticatedRoute>} />
            <Route path="plan/:planId" element={<AuthenticatedRoute><PlanEditorPage /></AuthenticatedRoute>} />
            <Route path="view/:shareToken" element={<PlanViewerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConvexAuthProvider>
  </ErrorBoundary>
  </StrictMode>,
);
