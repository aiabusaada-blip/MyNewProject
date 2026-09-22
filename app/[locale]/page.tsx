import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
          {t("app_name")}
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--muted)", marginBottom: "48px" }}>
          {t("tagline")}
        </p>

        <div style={{ marginBottom: "32px" }}>
          <input
            type="text"
            placeholder={t("search_placeholder")}
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "16px 24px",
              fontSize: "1.1rem",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <br />
          <button className="btn-primary" style={{ marginTop: "16px", fontSize: "1.1rem", padding: "14px 48px" }}>
            {t("find_talent")}
          </button>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-secondary">{t("upload_jd")}</button>
          <button className="btn-secondary">{t("upload_sow")}</button>
          <button className="btn-secondary">{t("upload_requirement")}</button>
          <button className="btn-secondary">{t("search_existing")}</button>
          <button className="btn-secondary">{t("find_similar")}</button>
        </div>
      </div>
    </main>
  );
}
