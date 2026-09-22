"use client";

import { useState, useEffect, useCallback } from "react";

interface GraphItem {
  id: string;
  name: string;
  name_ar?: string;
  type: string;
  sort_order?: number;
}

export default function TechnologyGraph() {
  const [items, setItems] = useState<GraphItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("domains");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      const res = await fetch(`/api/graph/${activeTab}?${params}`);
      const data = await res.json();
      setItems((data[activeTab] || data.results || []).slice(0, 20));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [query, activeTab]);

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      {/* Search */}
      <input
        type="text"
        placeholder="Search technology taxonomy…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "640px",
          padding: "16px 24px",
          fontSize: "1rem",
          borderRadius: "16px",
          border: "2px solid var(--border)",
          background: "var(--card)",
          outline: "none",
          marginBottom: "24px",
          boxSizing: "border-box",
        }}
      />

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["domains", "vendors", "products", "capabilities"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: activeTab === tab ? "var(--primary)" : "var(--card)",
              color: activeTab === tab ? "var(--primary-foreground)" : "var(--foreground)",
              cursor: "pointer",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading && <p style={{ color: "var(--muted)" }}>Loading…</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
        {items.map(item => (
          <div key={item.id} className="search-result-item" style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "capitalize" }}>
              {item.type}
            </span>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "4px 0 8px", color: "var(--primary)" }}>
              {item.name}
            </h3>
            {item.name_ar && (
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>{item.name_ar}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
