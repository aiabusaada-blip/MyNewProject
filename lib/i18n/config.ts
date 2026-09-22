// Custom i18n configuration — NO next-intl

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (LOCALES.includes(first as Locale)) {
    return first as Locale;
  }
  return DEFAULT_LOCALE;
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}
