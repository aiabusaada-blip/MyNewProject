"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/app/[locale]/i18n/LocalisationProvider";

interface Evidence {
  id: string; type: string; title: string; description: string;
  source?: string; verification_status: string; expiry_date?: string;
  last_confirmed?: string; created_at: string;
}

const evidenceTypes = [
  { value: "project", label: "Project" },
  { value: "certificate", label: "Certificate / Certification" },
  { value: "reference", label: "Reference" },
  { value: "portfolio", label: "Portfolio" },
  { value: "assessment", label: "Assessment" },
  { value: "other", label: "Other" },
];

const verificationStatuses = [
  { value: "self_declared", label: "Self-declared" },
  { value: "pending", label: "Pending review" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Not verified" },
];

export default function EvidenceClient({ locale: propLocale, professionalId }: { locale: string; professionalId?: string }) {
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(!professionalId);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);

  const [form, setForm] = useState({
    type: "project" as const,
    title: "",
    description: "",
    source: "",
    verification_status: "self_declared" as const,
    expiry_date: "",
    capability_id: "",
  });

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/professionals/${professionalId}/evidence`)
        .then(r => r.json())
        .then(data => {
          if (data.evidences) {
            setEvidenceList(data.evidences);
          } else {
            setError(t("failed_to_load") ?? "Failed to load evidence");
          }
        })
        .catch(() => setError(t("failed_to_load") ?? "Failed to load evidence"));
    }
  }, [professionalId, t]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError(t("fill_title_description") ?? "Please fill in title and description.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: any = {
        type: form.type,
        title: form.title,
        description: form.description,
        source: form.source || undefined,
        verification_status: form.verification_status,
        expiry_date: form.expiry_date || undefined,
        capability_id: form.capability_id || undefined,
      };
      Object.keys(payload).forEach(k => {
        if (payload[k] === undefined) delete payload[k];
      });
      const url = professionalId ? `/api/professionals/${professionalId}/evidence` : "/api/professionals/evidence";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || (t("add_failed") ?? "Failed to add evidence"));
      }
      const data = await res.json();
      setEvidenceList(prev => [...prev, data.evidence]);
      setForm(prev => ({ ...prev, title: "", description: "", source: "", expiry_date: "", capability_id: "" }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (evId: string) => {
    if (!professionalId) return;
    if (!confirm(t("confirm_remove") ?? "Remove this evidence?")) return;
    try {
      const res = await fetch(`/api/professionals/${professionalId}/evidence`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(t("delete_failed") ?? "Failed to delete");
      const data = await res.json();
      if (data.success) {
        setEvidenceList(prev => prev.filter(e => e.id !== evId));
      }
    } catch (err) {
      setError(t("delete_failed") ?? "Failed to delete evidence");
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
        <a href={professionalId ? `/${locale}/professionals/passport?id=${professionalId}` : `/${locale}/professionals`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--muted-foreground)",
            fontSize: "0.875rem", marginBottom: "24px", textDecoration: "none" }}>
          <span style={{ transform: "scaleX(-1)" }}>←</span>{" "}
          {professionalId ? t("back_to_passport") ?? "Back to Passport" : t("back_to_list") ?? "Back to list"}
        </a>

        <div style={{ textAlign: "center" as const, marginBottom: "32px" }}>
          <span style={{
            display: "inline-block", padding: "6px 16px", borderRadius: "999px",
            background: "var(--accent)", color: "var(--accent-foreground)",
            fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
            letterSpacing: "0.08em", marginBottom: "12px",
          }}>
            {t("evidence_and_verification") ?? "Evidence & Verification"}
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)", marginBottom: "8px" }}>
            {t("add_evidence") ?? "Add Evidence"}
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "480px", margin: "0 auto" }}>
            {t("add_evidence_desc") ?? "Attach proof of your capabilities — projects, certificates, references, and more."}
          </p>
        </div>

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--destructive)", color: "white", marginBottom: "24px", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {/* Evidence list */}
        {evidenceList.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px", color: "var(--foreground)" }}>
              {t("your_evidence") ?? "Your Evidence"}
              <span style={{ fontWeight: 400, color: "var(--muted-foreground)", marginLeft: "8px", fontSize: "0.8125rem" }}>
                ({evidenceList.length})
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {evidenceList.map(ev => (
                <div key={ev.id}
                  style={{
                    padding: "16px 20px", borderRadius: "10px", border: "1px solid var(--border)",
                    background: "var(--card)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px",
                  }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "1.25rem" }}>
                        {ev.type === "certificate" ? "📜" : ev.type === "project" ? "🏗️" : ev.type === "reference" ? "👤" : ev.type === "portfolio" ? "🎨" : ev.type === "assessment" ? "📊" : "📎"}
                      </span>
                      <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.9375rem" }}>{ev.title}</span>
                      <span style={{
                        padding: "1px 8px", borderRadius: "4px", fontSize: "0.6875rem", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "0.04em",
                        background: ev.verification_status === "verified" ? "#10b981" : ev.verification_status === "pending" ? "#f59e0b" : "var(--muted)",
                        color: ev.verification_status === "verified" || ev.verification_status === "pending" ? "white" : "var(--foreground)",
                      }}>
                        {ev.verification_status === "self_declared" ? "Self-declared" : ev.verification_status === "pending" ? "Pending" : ev.verification_status === "verified" ? "Verified" : "Not verified"}
                      </span>
                    </div>
                    <p style={{ color: "var(--muted-foreground)", fontSize: "0.8125rem", lineHeight: 1.5, marginBottom: "4px" }}>
                      {ev.description}
                    </p>
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
                  <button type="button" onClick={() => handleDelete(ev.id)}
                    style={{
                      padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--destructive)",
                      background: "transparent", color: "var(--destructive)",
                      fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                    }}>
                    {t("remove") ?? "Remove"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add evidence form */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
            {t("new_evidence") ?? "New Evidence"}
          </h2>

          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("type") ?? "Evidence Type"}
                </label>
                <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value as any }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                  {evidenceTypes.map(tp => <option key={tp.value} value={tp.value}>{tp.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("verification") ?? "Verification Status"}
                </label>
                <select value={form.verification_status} onChange={e => setForm(prev => ({ ...prev, verification_status: e.target.value as any }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                  {verificationStatuses.map(vs => <option key={vs.value} value={vs.value}>{vs.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("title") ?? "Title *"}
              </label>
              <input type="text" required value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("description") ?? "Description *"}
              </label>
              <textarea rows={3} required value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem", resize: "vertical" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("source_url") ?? "Source URL (optional)"}
                </label>
                <input type="url" value={form.source} onChange={e => setForm(prev => ({ ...prev, source: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}
                  placeholder="https://…" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                  {t("expiry_date") ?? "Expiry Date (optional)"}
                </label>
                <input type="date" value={form.expiry_date} onChange={e => setForm(prev => ({ ...prev, expiry_date: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                    background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <a href={professionalId ? `/${locale}/professionals/passport?id=${professionalId}` : `/${locale}/professionals`}
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
                {saving ? "Saving…" : t("add_evidence") ?? "Add Evidence"}
              </button>
            </div>
          </form>
        </div>

        {/* Self-declared notice */}
        <div style={{ marginTop: "24px", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--muted)", textAlign: "center" as const }}>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.8125rem", lineHeight: 1.5, margin: 0 }}>
            <strong style={{ color: "var(--foreground)" }}>{t("self_declared_note") ?? "Self-declared evidence is not verified."}</strong>{" "}
            {t("self_declared_note_detail") ?? "Evidence marked as self-declared will be visible on your profile but cannot be relied upon for verification until reviewed."}
          </p>
        </div>
      </div>
    </main>
  );
}
