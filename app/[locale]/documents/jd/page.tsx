import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import FileUploader from "@/components/upload/FileUploader";

export default async function JDPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) notFound();
  const t = getTranslations(locale);

  const label = locale === "ar" ? t("file_uploader_label_jd") : "Job Description Document";
  const hint = locale === "ar" ? t("file_uploader_hint_jd") : "Drop your JD here or click to browse.";
  const statusMsg = locale === "ar" ? t("file_jd_selected_status") : "Job Description selected. AI requirement extraction will be added in a later phase.";

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <a href={`/${locale}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "24px", textDecoration: "none" }}>
          <span style={{ transform: locale === "ar" ? "scaleX(-1)" : "none" }}>←</span>
          {t("back_to_search")}
        </a>

        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "8px", color: "var(--foreground)" }}>
            {t("upload_jd")}
          </h1>
          <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6, fontSize: "0.9375rem" }}>
            {t("upload_jd_desc")}
          </p>
        </div>

        <FileUploader accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" maxSizeMB={10} label={label} hint={hint} statusMessage={statusMsg} />

        <div style={{ marginTop: "24px", padding: "20px", borderRadius: "12px", border: "1px solid var(--accent)", background: "var(--accent)", textAlign: "center" }}>
          <p style={{ color: "var(--accent-foreground)", fontSize: "0.875rem", marginBottom: "6px", fontWeight: 600 }}>
            {t("coming_soon_label")}
          </p>
          <p style={{ color: "var(--accent-foreground)", fontSize: "0.8125rem", opacity: 0.85, lineHeight: 1.6 }}>
            {t("jd_placeholder")}
          </p>
        </div>

        <div style={{ marginTop: "24px", padding: "20px", background: "var(--accent)", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-foreground)" }}>
            {t("what_to_expect_title")}
          </h3>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--accent-foreground)", lineHeight: 1.7, fontSize: "0.875rem" }}>
            <li>{t("expect_1")}</li>
            <li>{t("expect_2")}</li>
            <li>{t("expect_3")}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}