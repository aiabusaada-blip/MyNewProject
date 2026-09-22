import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, getLocaleFromPath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;
  return <>{children}</>;
}