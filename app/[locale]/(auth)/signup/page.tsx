"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "app/[locale]/i18n/LocalisationProvider";

export default function SignupPage() {
  const router = useRouter();
  const ctx = useI18n();
  const locale = ctx.locale;
  const t = ctx.t;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [supabaseAvailable, setSupabaseAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const url = typeof window !== "undefined" ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_URL : null;
    const key = typeof window !== "undefined" ? (window as any).process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : null;
    setSupabaseAvailable(!!(url && key));
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (supabaseAvailable === false) {
      setError("Supabase authentication is not configured in this environment.");
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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (signUpError) {
        setError(signUpError.message || "Sign up failed. Please try again.");
        return;
      }
      if (data.user) {
        setSuccess(true);
        setTimeout(() => router.push(`/${locale}/login`), 2000);
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
    border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--foreground)",
  };
  const headingStyle = { fontSize: "1.5rem", marginBottom: "24px", color: "var(--foreground)" };
  const footerStyle = { marginTop: "16px", fontSize: "0.8125rem", color: "var(--muted-foreground)" };
  const linkStyle = { color: "var(--primary)", textDecoration: "none" };

  const renderForm = () => (
    <form onSubmit={handleSignUp}>
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{t("full_name") ?? "Full Name"}</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} placeholder={locale === "ar" ? "اسمك الكامل" : "Your full name"} />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{t("email") ?? "Email"}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{t("password") ?? "Password"}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder={locale === "ar" ? "6 أحرف على الأقل" : "At least 6 characters"} />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{t("confirm_password") ?? "Confirm Password"}</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} placeholder={locale === "ar" ? "أعد كتابة كلمة المرور" : "Repeat your password"} />
      </div>
      {error && <p style={{ color: "var(--destructive)", fontSize: "0.8125rem", marginBottom: "12px" }}>{error}</p>}
      <button
        type="submit" disabled={loading}
        style={{
          width: "100%", padding: "10px", borderRadius: "6px", border: "none",
          fontSize: "0.875rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
          background: "var(--primary)", color: "var(--primary-foreground)", opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? (locale === "ar" ? "جارٍ الإنشاء…" : "Creating account…") : (t("sign_up_button") ?? "Create Account")}
      </button>
    </form>
  );

  if (success) {
    return (
      <main style={baseStyle}>
        <div style={cardStyle}>
          <h1 style={{ ...headingStyle, margin: "0 auto", textAlign: "center" as const }}>{t("check_email") ?? "Check your email"}</h1>
          <p style={{ color: "var(--muted-foreground)", margin: "0 auto", lineHeight: 1.6 }}>
            {locale === "ar" ? t("signup_success_desc") : `We&apos;ve sent a confirmation link to <strong>${email}</strong>. Click it to verify your account and sign in.`}
          </p>
        </div>
      </main>
    );
  }

  if (supabaseAvailable === false) {
    return (
      <main style={baseStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>{t("sign_up_title") ?? "Create Account"}</h1>
          <div style={{ padding: "20px", borderRadius: "8px", background: "var(--muted)", border: "1px solid var(--border)", marginBottom: "24px" }}>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {locale === "ar"
                ? "مصادقة Supabase غير متاحة في هذه البيئة. للتمكين، أضف بيانات اعتماد Supabase إلى ملف"
                : "Supabase authentication is not configured. To enable sign-up, add your Supabase credentials to the"}{" "}
              <code style={{ background: "var(--background)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8125rem" }}>
                .env.local
              </code>{" "}
              {locale === "ar" ? "تحت:" : "file."}
            </p>
          </div>
          {renderForm()}
          <p style={footerStyle}>
            {t("have_account") ?? "Already have an account?"}{" "}
            <a href={`/${locale}/login`} style={linkStyle}>{t("sign_in") ?? "Sign in"}</a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={baseStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>{t("sign_up_title") ?? "Create Account"}</h1>
        {renderForm()}
        <p style={footerStyle}>
          {t("have_account") ?? "Already have an account?"}{" "}
          <a href={`/${locale}/login`} style={linkStyle}>{t("sign_in") ?? "Sign in"}</a>
        </p>
      </div>
    </main>
  );
}