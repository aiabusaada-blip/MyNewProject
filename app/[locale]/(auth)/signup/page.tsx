export default function SignupPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: "400px", padding: "40px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--card)" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Create Account</h1>
        <form>
          <div style={{ marginBottom: "16px" }}>
            <label>Name</label>
            <input type="text" style={{ width: "100%", padding: "10px", marginTop: "4px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>
            <input type="email" style={{ width: "100%", padding: "10px", marginTop: "4px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>I am a</label>
            <select style={{ width: "100%", padding: "10px", marginTop: "4px", boxSizing: "border-box" }}>
              <option>Professional</option>
              <option>Provider</option>
              <option>Recruiter</option>
              <option>Admin</option>
            </select>
          </div>
          <button className="btn-primary" style={{ width: "100%" }}>Create Account</button>
        </form>
      </div>
    </main>
  );
}
