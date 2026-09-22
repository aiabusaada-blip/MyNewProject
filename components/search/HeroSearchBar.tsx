"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeroSearchBarProps {
  locale: string;
  placeholder: string;
}

export default function HeroSearchBar({ locale, placeholder }: HeroSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    // Navigate to search page with the query preserved as a URL param
    router.push(`/${locale}/search?q=${encodeURIComponent(trimmed)}`, {
      state: { fromHero: true },
    });
    // Reset after navigation
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        gap: "8px",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        <span
          style={{
            fontSize: "1.125rem",
            color: "var(--muted-foreground)",
            flexShrink: 0,
          }}
        >
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          disabled={loading}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "0.9375rem",
            color: "var(--foreground)",
            fontWeight: 500,
          }}
        />
        {loading && (
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--muted-foreground)",
              flexShrink: 0,
            }}
          >
            …
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={!query.trim() || loading}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          background: !query.trim() || loading ? "var(--muted)" : "var(--primary)",
          color: !query.trim() || loading ? "var(--muted-foreground)" : "var(--primary-foreground)",
          fontSize: "0.9375rem",
          fontWeight: 600,
          border: "none",
          cursor: !query.trim() || loading ? "not-allowed" : "pointer",
          opacity: !query.trim() || loading ? 0.5 : 1,
          whiteSpace: "nowrap",
          boxShadow: "0 0 0 1px var(--ring)",
          transition: "background 0.15s, opacity 0.15s",
        }}
      >
        {loading ? "Searching…" : "Find Talent"}
      </button>
    </form>
  );
}
