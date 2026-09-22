import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function FindSimilarPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {t("find_similar")}
          </h1>
          <p style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            {t("find_similar_placeholder")}
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
            ⚡
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
            {t("find_similar_placeholder")}
          </p>
        </div>
      </div>
    </main>
  );
}
