import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Locale, Messages } from "@/i18n/types";
import { en } from "@/i18n/locales/en";
import { it } from "@/i18n/locales/it";
import { zh } from "@/i18n/locales/zh";
import { zhTW } from "@/i18n/locales/zh-TW";

export type { Locale, Messages };

const messages: Record<Locale, Messages> = {
  en,
  it,
  zh,
  "zh-TW": zhTW,
};

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function normalizeLocale(
  value: string | null | undefined,
): Locale | null {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === "zh-tw" || normalized === "zh-hant" || normalized.startsWith("zh-tw-") || normalized.startsWith("zh-hant-")) return "zh-TW";
  if (normalized === "zh" || normalized.startsWith("zh-")) return "zh";
  if (normalized === "it" || normalized.startsWith("it-")) return "it";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  return null;
}

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") return "zh";

  const params = new URLSearchParams(window.location.search);
  const explicitLocale = normalizeLocale(
    params.get("lang") ?? params.get("locale"),
  );
  return explicitLocale ?? "zh";
}
