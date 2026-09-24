import { getTranslations } from "@/lib/i18n/request";
import PassportClient from "./PassportClient";

export default async function PassportPage({ params }: { params: Promise<{ locale: string; professionalId?: string }> }) {
  const { locale, professionalId } = await params;
  return <PassportClient locale={locale} professionalId={professionalId} />;
}
