import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) notFound();
  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          {t("admin") || "Admin: Technology Graph"}
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "32px" }}>Manage domains, categories, vendors, products, and capabilities.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {["Add Domain", "Add Vendor", "Add Product", "Add Capability"].map(label => (
            <div key={label} style={{ padding: "24px", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--card)" }}>
              <h3 style={{ fontWeight: "700", marginBottom: "8px" }}>{label}</h3>
              <button className="btn-primary" style={{ width: "100%" }}>Add New</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
