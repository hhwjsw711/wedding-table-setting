import { Outlet } from "react-router";
import { I18nProvider } from "@/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";

export function RootLayout() {
  return (
    <I18nProvider>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </I18nProvider>
  );
}
