import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>
          {t("search_existing")}
        </h1>

        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div className="filter-box" style={{ minWidth: "150px" }}>
            <label>Location</label>
            <select style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
              <option value="">All</option>
              <option value="saudi">Saudi Arabia</option>
              <option value="jordan">Jordan</option>
              <option value="egypt">Egypt</option>
              <option value="germany">Germany</option>
              <option value="uk">UK</option>
            </select>
          </div>
          <div className="filter-box" style={{ minWidth: "150px" }}>
            <label>Capability</label>
            <select style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
              <option value="">All</option>
              <option value="tenable">Tenable</option>
              <option value="paloalto">Palo Alto</option>
              <option value="fortinet">Fortinet</option>
            </select>
          </div>
          <div className="filter-box" style={{ minWidth: "150px" }}>
            <label>Technology</label>
            <select style={{ width: "100%", padding: "8px", marginTop: "4px" }}>
              <option value="">All</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="cloud">Cloud</option>
              <option value="devops">DevOps</option>
            </select>
          </div>
        </div>

        <div id="results">
          <p style={{ color: "var(--muted)" }}>{t("no_results")}</p>
        </div>
      </div>
    </main>
  );
}
