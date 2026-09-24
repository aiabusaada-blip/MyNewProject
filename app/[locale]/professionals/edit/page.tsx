import EditClient from "./EditClient";

export default async function EditPage({ params }: { params: Promise<{ locale: string; id?: string }> }) {
  const { locale, id } = await params;
  return <EditClient locale={locale} professionalId={id} />;
}
