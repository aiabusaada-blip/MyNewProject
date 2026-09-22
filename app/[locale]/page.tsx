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
          <a href={`/${locale}/search`}>{t("search_existing")}</a>
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

        <button className="hero-cta">
          <span>{t("find_talent")}</span>
          <span aria-hidden="true">→</span>
        </button>
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
          <a href={`/${locale}/search?mode=similar`} className="action-card">
            <div className="action-card-icon" aria-hidden="true">⚡</div>
            <span className="action-card-title">{t("find_similar")}</span>
            <span className="action-card-desc">{t("find_similar_desc")}</span>
          </a>
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
