export default function Sidebar() {
  return (
    <aside style={{ width: "240px", minHeight: "100vh", borderRight: "1px solid var(--border)", padding: "16px" }}>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "24px" }}>Nujeel</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <a href="/en/search" style={{ padding: "8px 12px", borderRadius: "6px", textDecoration: "none", color: "var(--foreground)" }}>
          Search Talent
        </a>
        <a href="/en" style={{ padding: "8px 12px", borderRadius: "6px", textDecoration: "none", color: "var(--foreground)" }}>
          Home
        </a>
      </nav>
    </aside>
  );
}
