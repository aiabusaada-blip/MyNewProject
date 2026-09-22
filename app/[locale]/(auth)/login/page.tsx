"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "app/[locale]/i18n/LocalisationProvider";

export default function LoginPage() {
  const router = useRouter();
  const ctx = useI18n();
  const locale = ctx.locale;
  const t = ctx.t;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supabaseAvailable, setSupabaseAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const url = typeof window !== "undefined" ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_URL : null;
    const key = typeof window !== "undefined" ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : null;
    setSupabaseAvailable(!!(url && key));
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (supabaseAvailable === false) {
      setError("Supabase authentication is not configured in this environment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { createClient } = require("@supabase/supabase-js");
      const supabase = createClient(
        (typeof window !== "undefined" ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_URL : null) || "",
        (typeof window !== "undefined" ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : null) || ""
      );
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message || "Sign in failed. Check your credentials.");
        return;
      }
      if (data.user) {
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const baseStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--background)",
  };
  const cardStyle = {
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--card)",
  };
  const labelStyle = { display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "4px", color: "var(--foreground)" };
  const inputStyle = {
    width: "100%", padding: "10px", marginTop: "4px", borderRadius: "6px",
    border: "1px solid var(--border)", boxSizing: "border-box", fontSize: "0.875rem", color: "var(--foreground)",
  };
  const headingStyle = { fontSize: "1.5rem", marginBottom: "24px", color: "var(--foreground)" };
  const footerStyle = { textAlign: "center", marginTop: "16px", fontSize: "0.8125rem", color: "var(--muted-foreground)" };
  const linkStyle = { color: "var(--primary)", textDecoration: "none" };

  const renderForm = () => (
    <form onSubmit={handleSignIn}>
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{t("email") ?? "Email"}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{t("password") ?? "Password"}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" />
      </div>
      {error && <p style={{ color: "var(--destructive)", fontSize: "0.8125rem", marginBottom: "12px" }}>{error}</p>}
      <button
        type="submit" disabled={loading || supabaseAvailable === false}
        style={{
          width: "100%", padding: "10px", borderRadius: "6px", border: "none",
          fontSize: "0.875rem", fontWeight: 600, cursor: (loading || supabaseAvailable === false) ? "not-allowed" : "pointer",
          background: supabaseAvailable === false ? "var(--muted)" : "var(--primary)",
          color: supabaseAvailable === false ? "var(--muted-foreground)" : "var(--primary-foreground)",
          opacity: supabaseAvailable === false ? 0.5 : 1,
        }}
      >
        {loading ? "Signing in…" : (t("sign_in_button") ?? "Sign In")}
      </button>
    </form>
  );

  if (supabaseAvailable === false) {
    return (
      <main style={baseStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>{t("sign_in_title") ?? "Sign In"}</h1>
          <div style={{ padding: "20px", borderRadius: "8px", background: "var(--muted)", border: "1px solid var(--border)", marginBottom: "24px" }}>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {t("auth_supabase_unavailable") ?? "Supabase authentication is not configured in this environment. To enable sign-in, add your Supabase credentials to the"}{" "}
              <code style={{ background: "var(--background)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8125rem" }}>
                .env.local
              </code>{" "}
              {locale === "ar" ? "تحت:" : "file:"}
            </p>
            <pre style={{ marginTop: "12px", padding: "12px", background: "var(--background)", borderRadius: "6px", fontSize: "0.75rem", color: "var(--muted-foreground)", overflow: "auto" }}>
              <code>NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</code>
            </pre>
          </div>
          {renderForm()}
          <p style={footerStyle}>
            {t("no_account") ?? "Don&apos;t have an account?"}{" "}
            <a href={`/${locale}/signup`} style={linkStyle}>{t("create_account") ?? "Create one"}</a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={baseStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>{t("sign_in_title") ?? "Sign In"}</h1>
        {renderForm()}
        <p style={footerStyle}>
          {t("no_account") ?? "Don&apos;t have an account?"}{" "}
          <a href={`/${locale}/signup`} style={linkStyle}>{t("create_account") ?? "Create one"}</a>
        </p>
      </div>
    </main>
  );
}