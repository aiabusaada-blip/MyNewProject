export default function AdminTaxonomy() {
  return (
    <main style={{ minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Admin: Technology Graph
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "32px" }}>
          Manage domains, categories, vendors, products, and capabilities.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {/* Add Domain */}
          <div className="filter-box" style={{ padding: "24px" }}>
            <h3 style={{ fontWeight: "700", marginBottom: "12px" }}>Add Domain</h3>
            <input type="text" placeholder="Domain name" style={{ width: "100%", padding: "8px", marginBottom: "8px", boxSizing: "border-box" }} />
            <button className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>Add Domain</button>
          </div>

          {/* Add Vendor */}
          <div className="filter-box" style={{ padding: "24px" }}>
            <h3 style={{ fontWeight: "700", marginBottom: "12px" }}>Add Vendor</h3>
            <input type="text" placeholder="Vendor name" style={{ width: "100%", padding: "8px", marginBottom: "8px", boxSizing: "border-box" }} />
            <button className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>Add Vendor</button>
          </div>

          {/* Add Product */}
          <div className="filter-box" style={{ padding: "24px" }}>
            <h3 style={{ fontWeight: "700", marginBottom: "12px" }}>Add Product</h3>
            <input type="text" placeholder="Product name" style={{ width: "100%", padding: "8px", marginBottom: "8px", boxSizing: "border-box" }} />
            <button className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>Add Product</button>
          </div>

          {/* Add Capability */}
          <div className="filter-box" style={{ padding: "24px" }}>
            <h3 style={{ fontWeight: "700", marginBottom: "12px" }}>Add Capability</h3>
            <input type="text" placeholder="Capability name" style={{ width: "100%", padding: "8px", marginBottom: "8px", boxSizing: "border-box" }} />
            <button className="btn-primary" style={{ width: "100%", marginTop: "8px" }}>Add Capability</button>
          </div>
        </div>
      </div>
    </main>
  );
}
