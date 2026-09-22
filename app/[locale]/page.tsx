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
    <main style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header className="nujeel-header">
        <a href={`/${locale}`} className="nujeel-logo">
          Nujeel
        </a>
        <nav className="nujeel-nav">
          <a href={`/${locale}/graph`}>{t("technology_graph")}</a>
          <a href={`/${locale}/search`}>{t("search_existing")}</a>
          <a href={`/${locale}/professionals`}>{t("for_professionals")}</a>
          <a href={`/${locale}/login`}>{t("sign_in")}</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <h1 className="hero-tagline">{t("tagline")}</h1>
        <p className="hero-subtitle">{t("subtitle")}</p>

        <div className="hero-search-box">
          <input
            type="text"
            className="hero-search-input"
            placeholder={t("search_placeholder")}
            aria-label={t("search_placeholder")}
          />
        </div>

        <a href={`/${locale}/search`} className="hero-cta">
          <span>{t("find_talent")}</span>
          <span aria-hidden="true">→</span>
        </a>
      </section>

      {/* Action Cards */}
      <section className="actions-section">
        <h2>{t("how_it_works")}</h2>
        <div className="actions-grid">
          <a href={`/${locale}/documents/jd`} className="action-card">
            <div className="action-card-icon" aria-hidden="true">📄</div>
            <span className="action-card-title">{t("upload_jd")}</span>
            <span className="action-card-desc">{t("upload_jd_desc")}</span>
          </a>
          <a href={`/${locale}/documents/sow`} className="action-card">
            <div className="action-card-icon" aria-hidden="true">📋</div>
            <span className="action-card-title">{t("upload_sow")}</span>
            <span className="action-card-desc">{t("upload_sow_desc")}</span>
          </a>
          <a href={`/${locale}/search`} className="action-card">
            <div className="action-card-icon" aria-hidden="true">🔍</div>
            <span className="action-card-title">{t("search_existing")}</span>
            <span className="action-card-desc">{t("search_existing_desc")}</span>
          </a>
          <a href={`/${locale}/find-similar`} className="action-card">
            <div className="action-card-icon" aria-hidden="true">⚡</div>
            <span className="action-card-title">{t("find_similar")}</span>
            <span className="action-card-desc">{t("find_similar_desc")}</span>
          </a>
        </div>
      </section>

      {/* For Professionals — Capability Passport */}
      <section
        style={{
          padding: "64px 24px",
          background: "var(--muted)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span
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
              marginBottom: "20px",
            }}
          >
            {t("for_professionals")}
          </span>

          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "12px",
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
          >
            {t("capability_passport")}
          </h2>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              maxWidth: "560px",
              margin: "0 auto 36px",
            }}
          >
            {t("capability_passport_desc")}
          </p>

          {/* CV Upload preview */}
          <div
            style={{
              border: "2px dashed var(--border)",
              borderRadius: "16px",
              padding: "40px 32px",
              background: "var(--background)",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "12px",
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
                marginBottom: "16px",
              }}
            >
              {t("upload_zone_desc")}
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
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

          {/* Add My CV button */}
          <a
            href={`/${locale}/professionals`}
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
      </section>

      {/* Footer */}
      <footer className="nujeel-footer">
        <a href={`/${locale}/privacy`}>{t("privacy")}</a>
        <a href={`/${locale}/terms`}>{t("terms")}</a>
        <span>© {new Date().getFullYear()} Nujeel</span>
      </footer>
    </main>
  );
}
