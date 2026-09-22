import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function ProfessionalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "var(--background)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Back link */}
        <a
          href={`/${locale}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--muted-foreground)",
            fontSize: "0.875rem",
            marginBottom: "32px",
            textDecoration: "none",
          }}
        >
          <span style={{ transform: "scaleX(-1)" }}>←</span>
          {t("back_to_search")}
        </a>

        {/* Hero */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
            }}
          >
            {t("professionals")}
          </div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "12px",
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
          >
            {t("cv_passport_title")}
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            {t("cv_passport_subtitle")}
          </p>
        </div>

        {/* Value props */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {[
            t("prof_benefit_1"),
            t("prof_benefit_2"),
            t("prof_benefit_3"),
            t("prof_benefit_4"),
          ].map((label, i) => (
            <div
              key={i}
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
                aria-hidden="true"
              >
                {["🔍", "🎯", "⚡", "📈"][i]}
              </div>
              <p
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "16px",
              color: "var(--foreground)",
            }}
          >
            {t("how_it_works_title")}
          </h2>
          <ol
            style={{
              paddingLeft: "24px",
              color: "var(--muted-foreground)",
              lineHeight: 1.8,
              fontSize: "0.875rem",
            }}
          >
            <li>{t("step_1")}</li>
            <li>{t("step_2")}</li>
            <li>{t("step_3")}</li>
            <li>{t("step_4")}</li>
          </ol>
        </div>

        {/* Upload zone — visual preview */}
        <div
          style={{
            border: "2px dashed var(--border)",
            borderRadius: "16px",
            padding: "48px 32px",
            textAlign: "center",
            background: "var(--background)",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "3.5rem",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            📄
          </div>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "8px",
              color: "var(--foreground)",
            }}
          >
            {t("upload_zone_title")}
          </h3>
          <p
            style={{
              color: "var(--muted-foreground)",
              fontSize: "0.875rem",
              marginBottom: "20px",
            }}
          >
            {t("upload_zone_desc")}
          </p>

          {/* File input (visual only — not functional yet) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--muted)",
              color: "var(--muted-foreground)",
              fontSize: "0.8125rem",
            }}
          >
            <span style={{ fontSize: "1rem" }}>📎</span>
            <span>{t("upload_zone_file_hint")}</span>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
              marginTop: "12px",
              opacity: 0.7,
            }}
          >
            {t("upload_zone_note")}
          </p>
        </div>

        {/* Coming soon notice */}
        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid var(--accent)",
            background: "var(--accent)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "var(--accent-foreground)",
              fontSize: "0.875rem",
              marginBottom: "8px",
            }}
          >
            {t("coming_soon_label")}
          </p>
          <p
            style={{
              color: "var(--accent-foreground)",
              fontSize: "0.8125rem",
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            {t("prof_coming_soon_desc")}
          </p>
        </div>

        {/* Add My CV button */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a
            href={`/${locale}/login`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "10px",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 0 0 1px var(--ring)",
            }}
          >
            <span style={{ fontSize: "1.125rem" }}>📄</span>
            {t("add_my_cv")}
          </a>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
              marginTop: "8px",
            }}
          >
            {t("add_my_cv_subtitle")}
          </p>
        </div>
      </div>
    </main>
  );
}
