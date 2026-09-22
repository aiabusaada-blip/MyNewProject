import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import FileUploader from "@/components/upload/FileUploader";

export default async function SOWPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) notFound();
  const t = getTranslations(locale);

  const label = locale === "ar" ? t("file_uploader_label_sow") : "SOW Document";
  const hint = locale === "ar" ? t("file_uploader_hint_sow") : "Drop your SOW file here or click to browse.";
  const statusMsg = locale === "ar" ? t("file_sow_selected_status") : "SOW selected. AI SOW analysis will be added in a later phase.";

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <a href={`/${locale}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "24px", textDecoration: "none" }}>
          <span style={{ transform: locale === "ar" ? "scaleX(-1)" : "none" }}>←</span>
          {t("back_to_search")}
        </a>

        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "8px", color: "var(--foreground)" }}>
            {t("upload_sow")}
          </h1>
          <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6, fontSize: "0.9375rem" }}>
            {locale === "ar" ? t("sow_description") : t("upload_sow_desc")}
          </p>
        </div>

        <div style={{ background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "12px", color: "var(--foreground)" }}>
            {locale === "ar" ? "ما هو بيان نطاق العمل؟" : "What is a Statement of Work?"}
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.7 }}>
            {locale === "ar"
              ? "بيان نطاق العمل (SOW) يصف نطاق المشروع والنتائج المتوقعة والجدول الزمني ومتطلبات التقنية. رفع بيان نطاق العمل يساعد نوجيل في فهم ما يحتاجه مشروعك لتقديم الفرق والقدرات المناسبة."
              : "A Statement of Work (SOW) describes the scope, deliverables, timeline, and technology requirements of your project. Uploading a SOW helps Nujeel understand what your project needs so it can surface relevant teams and capabilities."}
          </p>
          <div style={{ marginTop: "12px", padding: "12px", background: "var(--background)", borderRadius: "6px", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>
              {locale === "ar" ? "نصيحة:" : "Tip:"}
            </strong>{" "}
            {locale === "ar"
              ? "أذكر تقنيتك الأساسية، القدرات المطلوبة، جدول المشروع، والنتائج المتوقعة للحصول على أفضل النتائج."
              : "Include your technology stack, required capabilities, project timeline, and expected deliverables for the best results."}
          </div>
        </div>

        <FileUploader accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" maxSizeMB={10} label={label} hint={hint} statusMessage={statusMsg} />

        <div style={{ marginTop: "24px", padding: "20px", borderRadius: "12px", border: "1px solid var(--accent)", background: "var(--accent)", textAlign: "center" }}>
          <p style={{ color: "var(--accent-foreground)", fontSize: "0.875rem", marginBottom: "6px", fontWeight: 600 }}>
            {t("coming_soon_label")}
          </p>
          <p style={{ color: "var(--accent-foreground)", fontSize: "0.8125rem", opacity: 0.85, lineHeight: 1.6 }}>
            {t("sow_placeholder")}
          </p>
        </div>
      </div>
    </main>
  );
}