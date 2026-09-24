import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import CapabilitiesClient from "./CapabilitiesClient";

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string; id?: string }> }) {
  const { locale, id } = await params;
  if (!LOCALES.includes(locale as any)) notFound();
  return <CapabilitiesClient locale={locale} professionalId={id} />;
}
