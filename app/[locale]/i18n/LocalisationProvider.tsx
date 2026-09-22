"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

import enMessages from "@/lib/i18n/messages/en/common.json";
import arMessages from "@/lib/i18n/messages/ar/common.json";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

export function useI18n() {
  return useContext(I18nContext);
}

function getMessages(locale: Locale): Record<string, string> {
  if (locale === "ar") {
    return (arMessages as any).common || arMessages;
  }
  return (enMessages as any).common || enMessages;
}

export function I18nProvider({ children, defaultLocale }: { children: React.ReactNode; defaultLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const messages = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: (key: string) => messages[key] || key,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}