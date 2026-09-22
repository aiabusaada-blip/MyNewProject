import { config } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { I18nProvider } from "./i18n/LocalisationProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRtl = locale === "ar";
  const validLocale = config.LOCALES.includes(locale as Locale) ? (locale as Locale) : config.DEFAULT_LOCALE;

  return (
    <html lang={validLocale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <I18nProvider defaultLocale={validLocale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
