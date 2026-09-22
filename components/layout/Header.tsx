export default function Header() {
  return (
    <header style={{ padding: "12px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontWeight: "bold" }}>Nujeel</span>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <a href="/en/graph" style={{ color: "var(--foreground)", textDecoration: "none" }}>Graph</a>
        <a href="/en/admin" style={{ color: "var(--foreground)", textDecoration: "none" }}>Admin</a>
        <span style={{ color: "var(--muted)" }}>Welcome</span>
        <button className="btn-secondary" style={{ padding: "6px 16px", fontSize: "0.9rem" }}>Sign In</button>
      </div>
    </header>
  );
}
