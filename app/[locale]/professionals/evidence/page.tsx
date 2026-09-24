import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import EvidenceClient from "./EvidenceClient";

export default async function EvidencePage({ params }: { params: Promise<{ locale: string; id?: string }> }) {
  const { locale, id } = await params;
  if (!LOCALES.includes(locale as any)) notFound();
  return <EvidenceClient locale={locale} professionalId={id} />;
}
