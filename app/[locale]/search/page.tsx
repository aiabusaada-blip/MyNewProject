import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { seedDomains, seedVendors, seedCategories } from "@/lib/graph/seed-data";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; location?: string; domain?: string; vendor?: string; category?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  if (!LOCALES.includes(locale as any)) notFound();
  const t = getTranslations(locale);

  const domainOptions = seedDomains.map((d) => ({
    value: d.name.toLowerCase(),
    label: d.name,
    ar_label: d.name_ar || d.name,
  }));

  const vendorOptions = seedVendors
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((v) => ({ value: v.name.toLowerCase(), label: v.name }));

  const categoryByDomain: Record<string, { value: string; label: string }[]> = {};
  for (const cat of seedCategories) {
    if (!categoryByDomain[cat.domain_id]) categoryByDomain[cat.domain_id] = [];
    categoryByDomain[cat.domain_id].push({
      value: cat.name.toLowerCase(),
      label: cat.name,
    });
  }

  const isAr = locale === "ar";
  const locationOptions = isAr
    ? [
        { value: "", label: t("all") },
        { value: "saudi-arabia", label: "السعودية" },
        { value: "jordan", label: "الأردن" },
        { value: "egypt", label: "مصر" },
        { value: "germany", label: "ألمانيا" },
        { value: "united-kingdom", label: "المملكة المتحدة" },
        { value: "united-states", label: "الولايات المتحدة" },
        { value: "uae", label: "الإمارات" },
        { value: "india", label: "الهند" },
      ]
    : [
        { value: "", label: t("all") },
        { value: "saudi-arabia", label: "Saudi Arabia" },
        { value: "jordan", label: "Jordan" },
        { value: "egypt", label: "Egypt" },
        { value: "germany", label: "Germany" },
        { value: "united-kingdom", label: "United Kingdom" },
        { value: "united-states", label: "United States" },
        { value: "uae", label: "United Arab Emirates" },
        { value: "india", label: "India" },
      ];

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "var(--background)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px", color: "var(--foreground)" }}>
            {t("search_existing")}
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.5 }}>
            {t("search_existing_desc")}
          </p>
        </div>

        {/* Search input + filters */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          {/* Search input */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "6px", color: "var(--foreground)" }}>
              {t("search_input_placeholder") ?? "Search"}
            </label>
            <input
              type="search"
              defaultValue={sp.q || ""}
              placeholder="e.g. cybersecurity, devops, cloud infrastructure…"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.9375rem", color: "var(--foreground)", background: "var(--background)" }}
            />
          </div>

          {/* Filters row 1: Location + Technology Domain */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
            <div style={{ flex: "1 1 180px", minWidth: "160px" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px", color: "var(--foreground)" }}>
                {t("search_filter_location") ?? "Location"}
              </label>
              <select
                defaultValue={sp.location || ""}
                style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.8125rem",  cursor: "pointer" }}
              >
                {locationOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: "2 1 220px", minWidth: "180px" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px", color: "var(--foreground)" }}>
                {isAr ? `${t("technology_graph")} — ${t("all")}` : `${t("technology_graph")} — ${t("all")}`}
              </label>
              <select
                defaultValue={sp.domain || ""}
                style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.8125rem",  cursor: "pointer" }}
              >
                <option value="">{t("all")}</option>
                {domainOptions.map((d) => (
                  <option key={d.value} value={d.value}>{isAr ? d.ar_label : d.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filters row 2: Vendor + Category */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 180px", minWidth: "160px" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px", color: "var(--foreground)" }}>
                {isAr ? "مزود / منظمة" : "Vendor / Organization"}
              </label>
              <select
                defaultValue={sp.vendor || ""}
                style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.8125rem",  cursor: "pointer" }}
              >
                <option value="">{t("all")}</option>
                {vendorOptions.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: "2 1 220px", minWidth: "180px" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "4px", color: "var(--foreground)" }}>
                {isAr ? "القدرة / الفئة" : "Capability / Category"}
              </label>
              <select
                defaultValue={sp.category || ""}
                style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: "0.8125rem",  cursor: "pointer" }}
              >
                <option value="">{t("all")}</option>
                {seedCategories.sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
                  <option key={c.name.toLowerCase()} value={c.name.toLowerCase()}>{isAr ? c.name_ar || c.name : c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Clear filters + search button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <a href={`/${locale}/search`} style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            ← {t("back_to_search")}
          </a>

          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "0.8125rem", cursor: "pointer" }}>
              {isAr ? "مسح الفلاتر" : "Clear filters"}
            </button>
            <button type="button" style={{ padding: "8px 20px", borderRadius: "6px", background: "var(--primary)", color: "var(--primary-foreground)", border: "none", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
              {t("search_existing")}
            </button>
          </div>
        </div>

        {/* Results area */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>
              {t("search_existing")} ({t("no_results")})
            </h2>
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              {t("match_score")} · {t("evidence_confidence")} · {t("profile_freshness")}
            </span>
          </div>

          {/* Empty state */}
          <div style={{ padding: "32px 24px", border: "1px dashed var(--border)", borderRadius: "8px", textAlign: "center" as const }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }} aria-hidden="true">🔍</div>
            <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, marginBottom: "8px", color: "var(--foreground)" }}>
              {t("no_results")}
            </h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto" }}>
              {isAr
                ? "لا توجد ملفات قدرات مهنية متاحة حاليًا. يمكن للمحترفين الانضمام إلى نوجيل وإنشاء بطاقة قدراتهم."
                : "No professional capability profiles are available yet. Professionals can join Nujeel and create their Capability Passport."}
            </p>
            <a href={`/${locale}/professionals`} style={{ display: "inline-block", marginTop: "16px", padding: "10px 24px", borderRadius: "8px", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none" }}>
              {t("add_my_cv")}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}