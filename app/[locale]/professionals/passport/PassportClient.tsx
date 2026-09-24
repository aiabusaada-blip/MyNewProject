"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/app/[locale]/i18n/LocalisationProvider";
import type { CurrentCapability } from "../capabilities/CapabilitiesClient";

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function PassportClient({ locale: propLocale, professionalId }: { locale: string; professionalId?: string }) {
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [professional, setProfessional] = useState<any>(null);
  const [capabilities, setCapabilities] = useState<CurrentCapability[]>([]);
  const [evidenceList, setEvidenceList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!professionalId) throw new Error(t("no_professional_id") ?? "No professional ID");
        const [profRes, capsRes, evRes] = await Promise.all([
          fetch(`/api/professionals/${professionalId}`),
          fetch(`/api/professionals/${professionalId}/capabilities`),
          fetch(`/api/professionals/${professionalId}/evidence`),
        ]);
        if (!profRes.ok) throw new Error("Professional not found");
        const profData = await profRes.json();
        const capsData = await capsRes.json();
        const evData = await evRes.json();
        setProfessional(profData.professional);
        setCapabilities(capsData.capabilities || []);
        setEvidenceList(evData.evidences || []);
      } catch (err: any) {
        setError(err.message || (t("failed_to_load") ?? "Failed to load passport"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [professionalId, t]);

  const p = professional;
  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
        <div style={{ color: "var(--muted-foreground)" }}>{t("loading") ?? "Loading…"}</div>
      </main>
    );
  }

  if (error || !p) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
        <div style={{ color: "var(--destructive)", fontSize: "0.875rem", textAlign: "center" as const, padding: "20px" }}>
          {error || (t("not_found") ?? "Professional not found")}
        </div>
      </main>
    );
  }

  const renderValue = (val: any, fallback: string = "—"): React.ReactNode => {
    if (val === undefined || val === null) return <span style={{ color: "var(--muted-foreground)" }}>{fallback}</span>;
    if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : <span style={{ color: "var(--muted-foreground)" }}>{fallback}</span>;
    return String(val);
  };

  const renderTag = (label: string, color?: string) => (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: "999px",
      fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap",
      background: color || "var(--muted)", color: color ? "var(--background)" : "var(--foreground)",
    }}>
      {label}
    </span>
  );

  const renderPrivacyBadge = () => {
    const colors: Record<string, string> = {
      public: "#10b981", nujeel_customers: "#3b82f6",
      anonymous: "#8b5cf6", hidden: "var(--muted-foreground)",
    };
    const labels: Record<string, string> = {
      public: "Public", nujeel_customers: "Nujeel customers", anonymous: "Anonymous", hidden: "Hidden",
    };
    return renderTag(labels[p.privacy] ?? p.privacy, colors[p.privacy] || undefined);
  };

  const renderVerificationBadge = (status: string) => {
    const colors: Record<string, string> = {
      self_declared: "var(--muted)", pending: "#f59e0b", verified: "#10b981", rejected: "var(--destructive)",
    };
    const labels: Record<string, string> = {
      self_declared: "Self-declared", pending: "Pending", verified: "Verified", rejected: "Not verified",
    };
    return renderTag(labels[status] ?? status, colors[status] || undefined);
  };

  const proficiencyColors: Record<string, string> = {
    Beginner: "var(--muted-foreground)", Intermediate: "var(--primary)",
    Advanced: "var(--accent)", Expert: "#f59e0b",
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back link */}
        <a href={`/${locale}/professionals`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--muted-foreground)",
            fontSize: "0.875rem", marginBottom: "32px", textDecoration: "none" }}>
          <span style={{ transform: "scaleX(-1)" }}>←</span> {t("back_to_search")}
        </a>

        {/* Header */}
        <div style={{ textAlign: "center" as const, marginBottom: "48px" }}>
          <span style={{
            display: "inline-block", padding: "6px 16px", borderRadius: "999px",
            background: "var(--accent)", color: "var(--accent-foreground)",
            fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "16px",
          }}>
            {t("capability_passport")}
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--foreground)", lineHeight: 1.1, marginBottom: "12px" }}>
            {p.name}
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--muted-foreground)", lineHeight: 1.5, maxWidth: "600px", margin: "0 auto" }}>
            {p.headline}
          </p>
          <div style={{ marginTop: "20px", display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {renderPrivacyBadge()}
            {renderTag(p.availability_status === "available" ? "Available" : p.availability_status === "limited" ? "Limited availability" : "Unavailable",
              p.availability_status === "available" ? "#10b981" : p.availability_status === "limited" ? "#f59e0b" : "var(--muted-foreground)")}
            <span style={{ color: "var(--muted-foreground)", fontSize: "0.8125rem" }}>
              {p.years_experience} years experience · {p.city}, {p.country}
            </span>
          </div>
        </div>

        {/* Overview section */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
            {t("overview") ?? "Overview"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", fontWeight: 600 }}>{t("location") ?? "Location"}</div>
              <div style={{ color: "var(--foreground)", fontSize: "0.9375rem" }}>{p.city}, {p.country}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", fontWeight: 600 }}>{t("experience_years") ?? "Experience"}</div>
              <div style={{ color: "var(--foreground)", fontSize: "0.9375rem" }}>{p.years_experience} years</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", fontWeight: 600 }}>{t("work_preference") ?? "Work Preference"}</div>
              <div style={{ color: "var(--foreground)", fontSize: "0.9375rem" }}>
                {p.work_preference === "remote" ? "Remote" : p.work_preference === "hybrid" ? "Hybrid" : "On-site"}
                {p.relocation_preference ? " · Open to relocation" : ""}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", fontWeight: 600 }}>{t("work_authorization") ?? "Work Authorization"}</div>
              <div style={{ color: "var(--foreground)", fontSize: "0.9375rem" }}>
                {p.work_authorization === "citizen" ? "Citizen" :
                 p.work_authorization === "permanent_resident" ? "Permanent resident" :
                 p.work_authorization === "work_visa" ? "Work visa" :
                 p.work_authorization === "sponsored_visa" ? "Needs visa sponsorship" : "—"}
              </div>
            </div>
            {p.travel_availability !== "not_traveling" && (
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", fontWeight: 600 }}>{t("travel_availability") ?? "Travel"}</div>
                <div style={{ color: "var(--foreground)", fontSize: "0.9375rem" }}>
                  {p.travel_availability === "local_only" ? "Local only" :
                   p.travel_availability === "regional" ? "Regional travel" : "International travel"}
                </div>
              </div>
            )}
            {p.countries_worked && p.countries_worked.length > 0 && (
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", fontWeight: 600 }}>{t("countries_worked") ?? "Countries Worked"}</div>
                <div style={{ color: "var(--foreground)", fontSize: "0.9375rem" }}>{p.countries_worked.join(", ")}</div>
              </div>
            )}
          </div>
        </div>

        {/* Languages & Industries */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "12px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("languages") ?? "Languages"}</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {p.languages.map((lang: string, i: number) => (
                <span key={i} style={{ padding: "4px 12px", borderRadius: "6px", background: "var(--muted)", fontSize: "0.8125rem", color: "var(--foreground)" }}>{lang}</span>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "12px", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("industries") ?? "Industries"}</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {p.industries.map((ind: string, i: number) => (
                <span key={i} style={{ padding: "4px 12px", borderRadius: "6px", background: "var(--muted)", fontSize: "0.8125rem", color: "var(--foreground)" }}>{ind}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        {p.summary && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "16px", color: "var(--foreground)" }}>
              {t("professional_summary") ?? "Professional Summary"}
            </h2>
            <p style={{ color: "var(--muted-foreground)", lineHeight: 1.8, fontSize: "0.9375rem" }}>{p.summary}</p>
          </div>
        )}

        {/* Technology Capabilities */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
              {t("technology_capabilities") ?? "Technology Capabilities"}
            </h2>
            <span style={{ color: "var(--muted-foreground)", fontSize: "0.8125rem" }}>
              {capabilities.length} {t("capabilities_count") ?? "capabilities"}
            </span>
          </div>

          {capabilities.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center" as const, color: "var(--muted-foreground)", fontSize: "0.875rem", border: "1px dashed var(--border)", borderRadius: "12px" }}>
              {t("no_capabilities") ?? "No capabilities added yet."}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {capabilities.map((cap: any) => (
                <div key={cap.id}
                  style={{
                    padding: "20px", borderRadius: "12px", border: "1px solid var(--border)",
                    background: "var(--background)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "16px", alignItems: "start",
                  }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                    {cap.domain_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "var(--accent)", color: "var(--accent-foreground)", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{cap.domain_name}</span>}
                    {cap.category_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "var(--muted)", fontSize: "0.6875rem", fontWeight: 500 }}>{cap.category_name}</span>}
                    {cap.vendor_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "#3b82f6", color: "white", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.vendor_name}</span>}
                    {cap.product_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "#1d4ed8", color: "white", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.product_name}</span>}
                    {cap.capability_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.capability_name}</span>}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      {cap.proficiency_level && (
                        <span style={{
                          padding: "2px 10px", borderRadius: "999px",
                          background: proficiencyColors[cap.proficiency_level] || "var(--muted)",
                          color: cap.proficiency_level === "Expert" ? "white" : "var(--foreground)",
                          fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                        }}>
                          {cap.proficiency_level}
                        </span>
                      )}
                      {cap.years_experience > 0 && (
                        <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
                          {cap.years_experience} yr{cap.years_experience !== 1 ? "s" : ""}
                        </span>
                      )}
                      {cap.project_count > 0 && (
                        <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
                          {cap.project_count} {t("projects") ?? "projects"}
                        </span>
                      )}
                    </div>

                    {cap.industries && cap.industries.length > 0 && (
                      <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {cap.industries.map((ind: string, i: number) => <span key={i}>{ind}</span>)}
                      </div>
                    )}

                    {cap.countries && cap.countries.length > 0 && (
                      <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{cap.countries.join(", ")}</div>
                    )}

                    {cap.last_used && (
                      <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                        Last used: {new Date(cap.last_used).toLocaleDateString()}
                      </div>
                    )}

                    {cap.verification_status && (
                      <div style={{ marginTop: "4px" }}>{renderVerificationBadge(cap.verification_status)}</div>
                    )}

                    {cap.notes && (
                      <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", fontStyle: "italic", marginTop: "4px", lineHeight: 1.5 }}>
                        {cap.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Evidence & Verification */}
        {evidenceList.length > 0 && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "24px", color: "var(--foreground)" }}>
              {t("evidence_and_verification") ?? "Evidence & Verification"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {evidenceList.map((ev: any) => (
                <div key={ev.id}
                  style={{
                    padding: "20px", borderRadius: "12px", border: "1px solid var(--border)",
                    background: "var(--background)",
                  }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "1.25rem" }}>
                          {ev.type === "certificate" ? "📜" : ev.type === "project" ? "🏗️" : ev.type === "reference" ? "👤" : ev.type === "portfolio" ? "🎨" : ev.type === "assessment" ? "📊" : "📎"}
                        </span>
                        <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.9375rem" }}>{ev.title}</span>
                        <span style={{
                          display: "inline-block", marginLeft: "8px", padding: "1px 8px", borderRadius: "4px",
                          background: ev.verification_status === "verified" ? "#10b981" : ev.verification_status === "pending" ? "#f59e0b" : "var(--muted)",
                          color: ev.verification_status === "verified" || ev.verification_status === "pending" ? "white" : "var(--foreground)",
                          fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em",
                        }}>
                          {ev.verification_status === "self_declared" ? "Self-declared" : ev.verification_status === "pending" ? "Pending" : ev.verification_status === "verified" ? "Verified" : "Not verified"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "8px" }}>{ev.description}</p>
                  {ev.source && (
                    <a href={ev.source} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: "0.8125rem", color: "var(--primary)", textDecoration: "none" }}>
                      {ev.source}
                    </a>
                  )}
                  {ev.expiry_date && (
                    <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "4px" }}>
                      Expires: {new Date(ev.expiry_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coming soon note */}
        <div style={{
          padding: "20px", borderRadius: "12px", border: "1px solid var(--accent)",
          background: "var(--accent)", textAlign: "center" as const, marginBottom: "24px",
        }}>
          <p style={{ color: "var(--accent-foreground)", fontSize: "0.875rem", marginBottom: "4px", fontWeight: 600 }}>
            {t("coming_soon_label")}
          </p>
          <p style={{ color: "var(--accent-foreground)", fontSize: "0.8125rem", opacity: 0.85, lineHeight: 1.5 }}>
            AI-powered CV extraction, match scoring, and recruiter discovery are coming in Phase 4.
          </p>
        </div>

        {/* Action links */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          <a href={`/${locale}/professionals/edit?id=${p.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
              background: "var(--primary)", color: "var(--primary-foreground)",
              fontSize: "0.875rem", fontWeight: 600, boxShadow: "0 0 0 1px var(--ring)",
            }}>
            ✏️ {t("edit_profile") ?? "Edit Profile"}
          </a>
          <a href={`/${locale}/professionals/capabilities?id=${p.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
              background: "var(--muted)", color: "var(--foreground)",
              fontSize: "0.875rem", fontWeight: 500, border: "1px solid var(--border)",
            }}>
            ➕ {t("add_capabilities") ?? "Add Capabilities"}
          </a>
          <a href={`/${locale}/professionals/evidence?id=${p.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
              background: "var(--muted)", color: "var(--foreground)",
              fontSize: "0.875rem", fontWeight: 500, border: "1px solid var(--border)",
            }}>
            📎 {t("add_evidence") ?? "Add Evidence"}
          </a>
        </div>
      </div>
    </main>
  );
}
