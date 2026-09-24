"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/app/[locale]/i18n/LocalisationProvider";

interface Professional {
  id: string; name: string; headline: string; summary: string;
  country: string; city: string; years_experience: number;
  languages: string[]; industries: string[];
  countries_worked: string[];
  travel_availability: string; work_authorization: string;
  relocation_preference: boolean; work_preference: string;
  availability_status: string; privacy: string;
  created_at: string; updated_at: string;
}

const travelOptions = [
  { value: "not_traveling", label: "Not traveling" },
  { value: "local_only", label: "Local only" },
  { value: "regional", label: "Regional travel" },
  { value: "international", label: "International travel" },
];

const authOptions: { value: string; label: string }[] = [
  { value: "citizen", label: "Citizen" },
  { value: "permanent_resident", label: "Permanent resident" },
  { value: "work_visa", label: "Work visa" },
  { value: "sponsored_visa", label: "Needs visa sponsorship" },
  { value: "unauthorized", label: "Not authorized to work" },
];

const workPrefOptions: { value: string; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "limited", label: "Limited availability" },
  { value: "unavailable", label: "Unavailable" },
];

const privacyOptions: { value: string; label: string }[] = [
  { value: "public", label: "Public — anyone can see your profile" },
  { value: "nujeel_customers", label: "Nujeel customers only" },
  { value: "anonymous", label: "Anonymous discovery — skills visible, identity hidden" },
  { value: "hidden", label: "Hidden — no discovery" },
];

export default function EditClient({ locale: propLocale, professionalId }: { locale: string; professionalId?: string }) {
  const { locale, t } = useI18n();
  const [profile, setProfile] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "", headline: "", summary: "", country: "", city: "",
    years_experience: 5, languages: "", industries: "",
    countries_worked: "", travel_availability: "local_only" as const,
    work_authorization: "citizen" as const,
    relocation_preference: false, work_preference: "hybrid" as const,
    availability_status: "available" as const, privacy: "public" as const,
  });

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/professionals/${professionalId}`)
        .then(r => r.json())
        .then(data => {
          if (data.professional) {
            const p = data.professional;
            setProfile(p);
            setForm({
              name: p.name || "", headline: p.headline || "", summary: p.summary || "",
              country: p.country || "", city: p.city || "",
              years_experience: p.years_experience || 5,
              languages: Array.isArray(p.languages) ? p.languages.join(", ") : "",
              industries: Array.isArray(p.industries) ? p.industries.join(", ") : "",
              countries_worked: Array.isArray(p.countries_worked) ? p.countries_worked.join(", ") : "",
              travel_availability: p.travel_availability || "local_only",
              work_authorization: p.work_authorization || "citizen",
              relocation_preference: p.relocation_preference || false,
              work_preference: p.work_preference || "hybrid",
              availability_status: p.availability_status || "available",
              privacy: p.privacy || "public",
            });
          } else {
            setError(t("professional_not_found") ?? "Professional not found");
          }
        })
        .catch(() => setError(t("failed_to_load") ?? "Failed to load profile"))
        .finally(() => setLoading(false));
    }
  }, [professionalId, t]);

  const handleChange = (field: string, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.headline.trim() || !form.country.trim() || !form.city.trim()) {
      setError(t("fill_name_headline_country_city") ?? "Please fill in name, headline, country, and city.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        languages: form.languages.split(",").map(s => s.trim()).filter(Boolean),
        industries: form.industries.split(",").map(s => s.trim()).filter(Boolean),
        countries_worked: form.countries_worked.split(",").map(s => s.trim()).filter(Boolean),
        years_experience: Number(form.years_experience),
        relocation_preference: Boolean(form.relocation_preference),
      };
      const url = professionalId ? `/api/professionals/${professionalId}` : "/api/professionals";
      const method = professionalId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || (t("save_failed") ?? "Failed to save"));
      }
      const data = await res.json();
      setProfile(data.professional);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
        <div style={{ color: "var(--muted-foreground)" }}>{t("loading") ?? "Loading…"}</div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)", padding: "40px 20px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <a href={`/${locale}/professionals`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--muted-foreground)",
            fontSize: "0.875rem", marginBottom: "32px", textDecoration: "none" }}>
          <span style={{ transform: "scaleX(-1)" }}>←</span> {t("back_to_search")}
        </a>

        <div style={{ textAlign: "center" as const, marginBottom: "32px" }}>
          <span style={{
            display: "inline-block", padding: "6px 16px", borderRadius: "999px",
            background: "var(--accent)", color: "var(--accent-foreground)",
            fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "12px",
          }}>
            {t("professional_profile") ?? "Professional Profile"}
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)", marginBottom: "8px" }}>
            {professionalId ? t("edit_your_profile") ?? "Edit Your Profile" : t("create_your_profile") ?? "Create Your Profile"}
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "480px", margin: "0 auto" }}>
            {t("create_profile_desc") ?? "Build your Nujeel Capability Passport. Add your details and connect your technology capabilities."}
          </p>
        </div>

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--destructive)", color: "white", marginBottom: "24px", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#10b981", color: "white", marginBottom: "24px", fontSize: "0.875rem" }}>
            {t("profile_saved") ?? "Profile saved successfully!"}
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Personal Information */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
              {t("personal_information") ?? "Personal Information"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("full_name") ?? "Full Name *"}
                </label>
                <input type="text" required value={form.name} onChange={e => handleChange("name", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("headline") ?? "Headline / Professional Title *"}
                </label>
                <input type="text" required value={form.headline} onChange={e => handleChange("headline", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("country") ?? "Country *"}
                </label>
                <input type="text" required value={form.country} onChange={e => handleChange("country", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("city") ?? "City *"}
                </label>
                <input type="text" required value={form.city} onChange={e => handleChange("city", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("years_experience") ?? "Years of Experience *"}
                </label>
                <input type="number" min="0" max="60" value={form.years_experience} onChange={e => handleChange("years_experience", Number(e.target.value))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>
                  {t("availability_status") ?? "Availability Status"}
                </label>
                {availabilityOptions.map(opt => (
                  <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8125rem", cursor: "pointer", padding: "4px 0" }}>
                    <input type="radio" name="availability_status" value={opt.value} checked={form.availability_status === opt.value}
                      onChange={e => handleChange("availability_status", (e.target as HTMLInputElement).value)}
                      style={{ accentColor: "var(--primary)" }} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "12px", color: "var(--foreground)" }}>
              {t("professional_summary") ?? "Professional Summary"}
            </h2>
            <textarea rows={4} value={form.summary} onChange={e => handleChange("summary", e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem", resize: "vertical" }}
              placeholder={locale === "ar" ? "اكتب ملخصًا عن مسيرتك المهنية…" : "Write a brief summary of your professional background…"} />
          </div>

          {/* Languages & Industries */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
              {t("skills_details") ?? "Skills & Details"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("languages") ?? "Languages"}
                </label>
                <input type="text" value={form.languages} onChange={e => handleChange("languages", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}
                  placeholder={locale === "ar" ? "العربية، الإنجليزية…" : "Arabic, English…"} />
                <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "4px" }}>
                  {locale === "ar" ? "افصل اللغات بالفواصل" : "Separate languages with commas"}
                </p>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("industries") ?? "Industries"}
                </label>
                <input type="text" value={form.industries} onChange={e => handleChange("industries", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}
                  placeholder="Financial Services, Government, Healthcare…" />
                <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "4px" }}>
                  {locale === "ar" ? "افصل الصناعات باستخدام الفواصل" : "Separate industries with commas"}
                </p>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("countries_worked") ?? "Countries Worked In"}
                </label>
                <input type="text" value={form.countries_worked} onChange={e => handleChange("countries_worked", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}
                  placeholder="JO, AE, US, GB…" />
                <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "4px" }}>
                  {locale === "ar" ? "رموز البلدان حسب ISO أو الأسماء" : "ISO country codes or names"}
                </p>
              </div>
            </div>
          </div>

          {/* Work Preferences */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
              {t("work_preferences") ?? "Work Preferences"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("work_preference") ?? "Work Preference"}
                </label>
                <select value={form.work_preference} onChange={e => handleChange("work_preference", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                  {workPrefOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("travel_availability") ?? "Travel Availability"}
                </label>
                <select value={form.travel_availability} onChange={e => handleChange("travel_availability", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                  {travelOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("work_authorization") ?? "Work Authorization"}
                </label>
                <select value={form.work_authorization} onChange={e => handleChange("work_authorization", e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                  {authOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "4px" }}>
                <input type="checkbox" id="relocation" checked={form.relocation_preference}
                  onChange={e => handleChange("relocation_preference", e.target.checked)}
                  style={{ accentColor: "var(--primary)", width: "18px", height: "18px" }} />
                <label htmlFor="relocation" style={{ fontSize: "0.875rem", color: "var(--foreground)", cursor: "pointer" }}>
                  {t("open_to_relocation") ?? "Open to relocation"}
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "16px", color: "var(--foreground)" }}>
              {t("visibility_privacy") ?? "Visibility & Privacy"}
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "16px", lineHeight: 1.5 }}>
              {t("privacy_note") ?? "Choose who can discover your profile. You can change this at any time."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {privacyOptions.map(opt => (
                <label key={opt.value} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", borderRadius: "8px",
                  border: form.privacy === opt.value ? "2px solid var(--primary)" : "1px solid var(--border)",
                  background: form.privacy === opt.value ? "var(--muted)" : "transparent", cursor: "pointer" }}>
                  <input type="radio" name="privacy" value={opt.value} checked={form.privacy === opt.value}
                    onChange={e => handleChange("privacy", e.target.value)}
                    style={{ accentColor: "var(--primary)", marginTop: "2px" }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "2px" }}>{opt.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                      {(() => {
                        switch (opt.value) {
                          case "public": return (form.privacy as string) === "public" ? (t("privacy_public_desc") ?? "Your full profile, capabilities, and evidence are visible to everyone.") : null;
                          case "nujeel_customers": return (form.privacy as string) === "nujeel_customers" ? (t("privacy_customers_desc") ?? "Only logged-in Nujeel customers can view your full profile.") : null;
                          case "anonymous": return (form.privacy as string) === "anonymous" ? (t("privacy_anonymous_desc") ?? "Employers can discover your capabilities but not your name, photo, or contact details.") : null;
                          case "hidden": return (form.privacy as string) === "hidden" ? (t("privacy_hidden_desc") ?? "Your profile is completely hidden from discovery. Only you can see it.") : null;
                          default: return null;
                        }
                      })()}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", alignItems: "center" }}>
            <a href={`/${locale}/professionals`}
              style={{ padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
                color: "var(--muted-foreground)", fontSize: "0.875rem", background: "transparent", border: "1px solid var(--border)" }}>
              {t("cancel") ?? "Cancel"}
            </a>
            <button type="submit" disabled={saving}
              style={{
                padding: "10px 28px", borderRadius: "8px", border: "none", cursor: saving ? "not-allowed" : "pointer",
                background: saving ? "var(--muted)" : "var(--primary)",
                color: saving ? "var(--muted-foreground)" : "var(--primary-foreground)",
                fontSize: "0.875rem", fontWeight: 600, opacity: saving ? 0.6 : 1,
              }}>
              {saving ? "Saving…" : (professionalId ? t("save_changes") ?? "Save Changes" : t("create_profile") ?? "Create Profile")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
