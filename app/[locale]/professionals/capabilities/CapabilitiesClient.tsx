"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/app/[locale]/i18n/LocalisationProvider";

interface Domain { id: string; name: string; name_ar: string; categories?: Category[]; }
interface Category { id: string; name: string; name_ar: string; }
interface Vendor { id: string; name: string; name_ar: string; description: string; products?: { id: string; name: string; name_ar: string }[]; }
interface Product { id: string; name: string; name_ar: string; }
interface Capability { id: string; name: string; name_ar: string; description: string; }

export interface CurrentCapability {
  id?: string;
  domain_id?: string; domain_name?: string;
  category_id?: string; category_name?: string;
  vendor_id?: string; vendor_name?: string;
  product_id?: string; product_name?: string;
  capability_id?: string; capability_name?: string;
  proficiency_level?: string;
  years_experience: number;
  project_count: number;
  industries: string;
  countries: string;
  notes?: string;
}

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function CapabilitiesClient({ locale: propLocale, professionalId }: { locale: string; professionalId?: string }) {
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(!professionalId);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [capabilities, setCapabilities] = useState<CurrentCapability[]>([]);

  // Graph data
  const [domains, setDomains] = useState<Domain[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [capabilitiesList, setCapabilitiesList] = useState<Capability[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const [form, setForm] = useState<CurrentCapability>({
    years_experience: 3, project_count: 1,
    industries: "", countries: "", notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [domainsRes, vendorsRes, capsRes] = await Promise.all([
          fetch("/api/graph/domains"),
          fetch("/api/graph/vendors"),
          fetch("/api/graph/capabilities"),
        ]);
        const [dData, vData, cData] = await Promise.all([
          domainsRes.json(), vendorsRes.json(), capsRes.json(),
        ]);
        setDomains(dData.domains || []);
        setVendors(vData.vendors || []);
        setCapabilitiesList(cData.capabilities || []);
      } catch (err) {
        setError("Failed to load technology graph data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/professionals/${professionalId}/capabilities`)
        .then(r => r.json())
        .then(data => {
          if (data.capabilities) {
            const mapped = data.capabilities.map((c: any) => ({
              id: c.id,
              domain_id: c.domain_id, domain_name: c.domain_name,
              category_id: c.category_id, category_name: c.category_name,
              vendor_id: c.vendor_id, vendor_name: c.vendor_name,
              product_id: c.product_id, product_name: c.product_name,
              capability_id: c.capability_id, capability_name: c.capability_name,
              proficiency_level: c.proficiency_level,
              years_experience: c.years_experience,
              project_count: c.project_count,
              industries: c.industries || [],
              countries: c.countries || [],
              notes: c.notes || "",
            }));
            setCapabilities(mapped);
          }
        })
        .catch(() => setError("Failed to load capabilities"));
    }
  }, [professionalId]);

  const resetForm = () => {
    setForm({
      id: undefined,
      domain_id: selectedDomain || undefined,
      category_id: undefined,
      vendor_id: undefined,
      product_id: undefined,
      capability_id: undefined,
      proficiency_level: "Intermediate",
      years_experience: 3,
      project_count: 1,
      industries: "",
      countries: "",
      notes: "",
    });
  };

  useEffect(() => {
    if (selectedDomain) resetForm();
  }, [selectedDomain]);

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    setExpandedDomain(expandedDomain === domainId ? null : domainId);
    setForm(prev => ({ ...prev, domain_id: domainId, category_id: undefined, vendor_id: undefined, product_id: undefined, capability_id: undefined }));
  };

  const handleVendorSelect = (vendorId: string, vendorName: string) => {
    setForm(prev => ({
      ...prev, vendor_id: vendorId, vendor_name: vendorName,
      product_id: undefined, capability_id: undefined,
    }));
  };

  const handleProductSelect = (productId: string, productName: string) => {
    setForm(prev => ({
      ...prev, product_id: productId, product_name: productName,
      capability_id: undefined,
    }));
  };

  const handleCapabilitySelect = (capabilityId: string, capabilityName: string) => {
    setForm(prev => ({
      ...prev, capability_id: capabilityId, capability_name: capabilityName,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.domain_id && !form.vendor_id && !form.capability_id && !form.product_id && !form.category_id) {
      setError(t("select_at_least_one") ?? "Select at least one technology from the graph.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: any = {
        domain_id: form.domain_id,
        category_id: form.category_id,
        vendor_id: form.vendor_id,
        product_id: form.product_id,
        capability_id: form.capability_id,
        proficiency_level: form.proficiency_level,
        years_experience: form.years_experience,
        project_count: form.project_count,
        industries: form.industries.split(",").map(s => s.trim()).filter(Boolean),
        countries: form.countries.split(",").map(s => s.trim()).filter(Boolean),
        notes: form.notes || undefined,
      };
      Object.keys(payload).forEach(k => { if (payload[k] === undefined) delete payload[k]; });

      const url = professionalId ? `/api/professionals/${professionalId}/capabilities` : "/api/professionals/capabilities";
      const method = form.id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || (t("save_failed") ?? "Failed to save capability"));
      }
      const data = await res.json();
      setCapabilities(prev => {
        if (form.id) return prev.map(c => c.id === form.id ? { ...c, ...data.capability } : c);
        return [...prev, { ...data.capability, id: data.capability.id }];
      });
      setForm(prev => ({ ...prev, id: undefined }));
      resetForm();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (capId: string) => {
    if (!professionalId) return;
    if (!confirm(t("confirm_remove") ?? "Remove this capability?")) return;
    try {
      const res = await fetch(`/api/professionals/${professionalId}/capabilities`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(t("failed_to_delete") ?? "Failed to delete");
      const data = await res.json();
      if (data.success) setCapabilities(prev => prev.filter(c => c.id !== capId));
    } catch (err) {
      setError(t("failed_to_delete") ?? "Failed to delete capability");
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
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
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
            {t("technology_capabilities") ?? "Technology Capabilities"}
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--foreground)", marginBottom: "8px" }}>
            {professionalId ? t("add_capabilities") ?? "Add Your Capabilities" : t("select_capabilities") ?? "Connect Your Capabilities"}
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "520px", margin: "0 auto" }}>
            {t("add_cap_desc") ?? "Browse the Nujeel Technology Capability Graph and connect each capability to the vendors, products, and skills you work with."}
          </p>
        </div>

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--destructive)", color: "white", marginBottom: "24px", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {/* Capabilities list */}
        {capabilities.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px", color: "var(--foreground)" }}>
              {t("your_capabilities") ?? "Your Connected Capabilities"}
              <span style={{ fontWeight: 400, color: "var(--muted-foreground)", marginLeft: "8px", fontSize: "0.8125rem" }}>
                ({capabilities.length})
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {capabilities.map(cap => (
                <div key={cap.id}
                  style={{
                    padding: "16px 20px", borderRadius: "10px", border: "1px solid var(--border)",
                    background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                  }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", flex: 1 }}>
                    {cap.domain_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "var(--accent)", color: "var(--accent-foreground)", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.domain_name}</span>}
                    {cap.vendor_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "#3b82f6", color: "white", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.vendor_name}</span>}
                    {cap.product_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "#1d4ed8", color: "white", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.product_name}</span>}
                    {cap.capability_name && <span style={{ padding: "2px 8px", borderRadius: "4px", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.6875rem", fontWeight: 600 }}>{cap.capability_name}</span>}
                    {cap.proficiency_level && (
                      <span style={{
                        padding: "2px 10px", borderRadius: "999px", fontSize: "0.6875rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.04em",
                        background: cap.proficiency_level === "Expert" ? "#f59e0b" : cap.proficiency_level === "Advanced" ? "var(--accent)" : cap.proficiency_level === "Intermediate" ? "var(--primary)" : "var(--muted)",
                        color: cap.proficiency_level === "Expert" ? "white" : "var(--foreground)",
                      }}>
                        {cap.proficiency_level}
                      </span>
                    )}
                    <span style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", marginLeft: "4px" }}>
                      {cap.years_experience}yr · {cap.project_count}{" "}{t("projects") ?? "projects"}
                    </span>
                  </div>
                  <button type="button" onClick={() => handleDelete(cap.id!)}
                    style={{
                      padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--destructive)",
                      background: "transparent", color: "var(--destructive)",
                      fontSize: "0.8125rem", fontWeight: 500, cursor: "pointer",
                    }}>
                    {t("remove") ?? "Remove"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selection form */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
            {t("select_from_graph") ?? "Select from the Technology Graph"}
          </h2>

          {/* Domain list */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--muted-foreground)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {t("domains") ?? "Domains"}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {domains.map(domain => (
                <button key={domain.id} type="button"
                  onClick={() => handleDomainSelect(domain.id)}
                  style={{
                    padding: "8px 14px", borderRadius: "8px",
                    border: selectedDomain === domain.id ? "2px solid var(--primary)" : "1px solid var(--border)",
                    background: selectedDomain === domain.id ? "var(--primary)" : "var(--background)",
                    color: selectedDomain === domain.id ? "var(--primary-foreground)" : "var(--foreground)",
                    fontSize: "0.8125rem", fontWeight: selectedDomain === domain.id ? 600 : 500, cursor: "pointer",
                    textAlign: "left",
                  }}>
                  {domain.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected domain details */}
          {selectedDomain && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", marginTop: "4px" }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "8px" }}>
                {domains.find(d => d.id === selectedDomain)?.name}
              </div>

              {/* Categories */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                  {t("categories") ?? "Categories"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {domains.find(d => d.id === selectedDomain)?.categories?.map(cat => (
                    <button key={cat.id} type="button"
                      onClick={() => setForm(prev => ({
                        ...prev,
                        category_id: prev.category_id === cat.id ? undefined : cat.id,
                        category_name: prev.category_name === cat.name ? undefined : cat.name,
                      }))}
                      style={{
                        padding: "4px 10px", borderRadius: "6px",
                        border: form.category_id === cat.id ? "1px solid var(--accent)" : "1px solid var(--border)",
                        background: form.category_id === cat.id ? "var(--accent)" : "var(--background)",
                        color: form.category_id === cat.id ? "var(--accent-foreground)" : "var(--muted-foreground)",
                        fontSize: "0.75rem", cursor: "pointer",
                      }}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vendors */}
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                {t("vendors") ?? "Vendors"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {vendors.map(vendor => (
                  <button key={vendor.id} type="button"
                    onClick={() => handleVendorSelect(vendor.id, vendor.name)}
                    style={{
                      padding: "4px 10px", borderRadius: "6px",
                      border: form.vendor_id === vendor.id ? "1px solid #3b82f6" : "1px solid var(--border)",
                      background: form.vendor_id === vendor.id ? "#3b82f6" : "var(--background)",
                      color: form.vendor_id === vendor.id ? "white" : "var(--muted-foreground)",
                      fontSize: "0.75rem", cursor: "pointer",
                    }}>
                    {vendor.name}
                  </button>
                ))}
              </div>

              {/* Products for selected vendor */}
              {form.vendor_id && (
                <>
                  <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                    {t("products") ?? "Products"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {vendors.find(v => v.id === form.vendor_id)?.products?.map((product: Product) => (
                      <button key={product.id} type="button"
                        onClick={() => handleProductSelect(product.id, product.name)}
                        style={{
                          padding: "4px 10px", borderRadius: "6px",
                          border: form.product_id === product.id ? "1px solid #1d4ed8" : "1px solid var(--border)",
                          background: form.product_id === product.id ? "#1d4ed8" : "var(--background)",
                          color: form.product_id === product.id ? "white" : "var(--muted-foreground)",
                          fontSize: "0.75rem", cursor: "pointer",
                        }}>
                        {product.name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Capabilities */}
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                {t("capabilities") ?? "Capabilities"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {capabilitiesList.map(cap => (
                  <button key={cap.id} type="button"
                    onClick={() => handleCapabilitySelect(cap.id, cap.name)}
                    style={{
                      padding: "4px 10px", borderRadius: "6px",
                      border: form.capability_id === cap.id ? "1px solid var(--primary)" : "1px solid var(--border)",
                      background: form.capability_id === cap.id ? "var(--primary)" : "var(--background)",
                      color: form.capability_id === cap.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      fontSize: "0.75rem", cursor: "pointer",
                    }}>
                    {cap.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Details form */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "20px", color: "var(--foreground)" }}>
            {t("capability_details") ?? "Capability Details"}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("proficiency") ?? "Proficiency Level"}
              </label>
              <select value={form.proficiency_level || "Intermediate"}
                onChange={e => setForm(prev => ({ ...prev, proficiency_level: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}>
                {proficiencyLevels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("years_experience") ?? "Years of Experience"}
              </label>
              <input type="number" min="0" max="60" value={form.years_experience}
                onChange={e => setForm(prev => ({ ...prev, years_experience: Number(e.target.value) }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("project_count") ?? "Project Count"}
              </label>
              <input type="number" min="0" max="9999" value={form.project_count}
                onChange={e => setForm(prev => ({ ...prev, project_count: Number(e.target.value) }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("industries") ?? "Industries"}
              </label>
              <input type="text" value={form.industries}
                onChange={e => setForm(prev => ({ ...prev, industries: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}
                placeholder="Financial Services, Government…" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
                {t("countries") ?? "Countries"}
              </label>
              <input type="text" value={form.countries}
                onChange={e => setForm(prev => ({ ...prev, countries: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem" }}
                placeholder="JO, AE, US…" />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 500, marginBottom: "6px", color: "var(--foreground)" }}>
              {t("notes") ?? "Notes (optional)"}
            </label>
            <textarea rows={3} value={form.notes || ""}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border)",
                background: "var(--background)", color: "var(--foreground)", fontSize: "0.875rem", resize: "vertical" }}
              placeholder={locale === "ar" ? "ملاحظات إضافية…" : "Any additional context…"} />
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <a href={professionalId ? `/${locale}/professionals/passport?id=${professionalId}` : `/${locale}/professionals`}
            style={{ padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
              color: "var(--muted-foreground)", fontSize: "0.875rem", background: "transparent", border: "1px solid var(--border)" }}>
            {t("cancel") ?? "Cancel"}
          </a>
          <button type="button" onClick={handleSave} disabled={saving}
            style={{
              padding: "10px 28px", borderRadius: "8px", border: "none", cursor: saving ? "not-allowed" : "pointer",
              background: saving ? "var(--muted)" : "var(--primary)",
              color: saving ? "var(--muted-foreground)" : "var(--primary-foreground)",
              fontSize: "0.875rem", fontWeight: 600, opacity: saving ? 0.6 : 1,
            }}>
            {saving ? "Saving…" : t("save_capability") ?? "Add Capability"}
          </button>
        </div>
      </div>
    </main>
  );
}
