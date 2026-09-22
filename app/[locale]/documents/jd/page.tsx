import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function JDPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Back link */}
        <a
          href={`/${locale}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--muted-foreground)",
            fontSize: "0.875rem",
            marginBottom: "24px",
            textDecoration: "none",
          }}
        >
          <span style={{ transform: "scaleX(-1)" }}>←</span>
          {t("back_to_search")}
        </a>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "8px",
              color: "var(--foreground)",
            }}
          >
            {t("upload_jd")}
          </h1>
          <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            {t("upload_jd_desc")}
          </p>
        </div>

        {/* Coming Soon notice */}
        <div
          style={{
            background: "var(--muted)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "12px",
            }}
            aria-hidden="true"
          >
            🚧
          </div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "8px",
              color: "var(--foreground)",
            }}
          >
            {t("coming_soon")}
          </h2>
          <p
            style={{
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {t("jd_placeholder")}
          </p>
        </div>

        {/* Upload zone (visual only — not functional yet) */}
        <div
          style={{
            border: "2px dashed var(--border)",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            marginTop: "24px",
            background: "var(--background)",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }} aria-hidden="true">
            📄
          </div>
          <p
            style={{
              color: "var(--muted-foreground)",
              marginBottom: "16px",
            }}
          >
            {t("upload_zone_hint")}
          </p>
          <button
            disabled
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              fontWeight: 500,
              cursor: "not-allowed",
              fontSize: "0.875rem",
            }}
          >
            {t("upload_button_placeholder")}
          </button>
        </div>

        {/* What to expect */}
        <div
          style={{
            marginTop: "32px",
            padding: "20px",
            background: "var(--accent)",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--accent-foreground)",
            }}
          >
            {t("what_to_expect_title")}
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              color: "var(--accent-foreground)",
              lineHeight: 1.7,
              fontSize: "0.875rem",
            }}
          >
            <li>{t("expect_1")}</li>
            <li>{t("expect_2")}</li>
            <li>{t("expect_3")}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
