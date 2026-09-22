import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function GraphPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          {t("technology_graph") || "Technology Capability Graph"}
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "32px", fontSize: "1.05rem" }}>
          Browse domains, categories, vendors, products, and capabilities.
        </p>

        <div style={{ maxWidth: "640px", marginBottom: "40px" }}>
          <input
            type="text"
            id="graphSearch"
            placeholder={t("search_placeholder")}
            style={{
              width: "100%",
              padding: "16px 24px",
              fontSize: "1rem",
              borderRadius: "16px",
              border: "2px solid var(--border)",
              background: "var(--card)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div id="graphGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
          <p style={{ color: "var(--muted)", gridColumn: "1 / -1" }}>
            Select a category above to browse technology items.
          </p>
        </div>
      </div>
    </main>
  );
}
