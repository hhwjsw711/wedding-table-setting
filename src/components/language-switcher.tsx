import { useState, useRef, useEffect } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, type Locale } from "@/i18n";

const languageKey: Record<Locale, "en" | "it" | "zh" | "zhTW"> = {
  en: "en",
  it: "it",
  zh: "zh",
  "zh-TW": "zhTW",
};

const localeOptions: Locale[] = ["en", "zh", "zh-TW", "it"];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button
        aria-label={t.aria.language}
        size="icon"
        type="button"
        variant="outline"
        title={t.language[languageKey[locale]]}
        onClick={() => setOpen(!open)}
      >
        <Languages aria-hidden="true" className="size-3.5" />
        <span
          aria-hidden="true"
          className="absolute -right-1 -bottom-1 rounded-sm border border-border bg-background px-1 text-[10px] font-black leading-4"
        >
          {t.language.current}
        </span>
      </Button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md">
          {localeOptions.map((code) => (
            <button
              key={code}
              type="button"
              className={`flex w-full items-center rounded-sm px-3 py-1.5 text-sm transition-colors hover:bg-accent ${
                locale === code
                  ? "font-semibold text-primary"
                  : "text-popover-foreground"
              }`}
              onClick={() => {
                setLocale(code);
                setOpen(false);
              }}
            >
              {t.language[languageKey[code]]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
