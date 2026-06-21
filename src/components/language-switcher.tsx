import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, type Locale } from "@/i18n";

const localeOrder: Locale[] = ["en", "zh", "it"];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <Button
      aria-label={t.aria.language}
      className="relative"
      size="icon"
      type="button"
      title={t.language.next}
      variant="outline"
      onClick={() => {
        const next = localeOrder[(localeOrder.indexOf(locale) + 1) % localeOrder.length];
        setLocale(next);
      }}
    >
      <Languages aria-hidden="true" className="size-3.5" />
      <span
        aria-hidden="true"
        className="absolute -right-1 -bottom-1 rounded-sm border border-border bg-background px-1 text-[10px] font-black leading-4"
      >
        {t.language.current}
      </span>
    </Button>
  );
}
