import { getTranslations } from "@/lib/i18n/request";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

export default async function FindSimilarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const t = getTranslations(locale);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "var(--background)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Back link */}
        <a
          href={`/${locale}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--muted-foreground)",
            fontSize: "0.875rem",
            marginBottom: "24px",
            textDecoration: "none",
          }}
        >
          <span style={{ transform: "scaleX(-1)" }}>←</span>
          {t("back_to_search")}
        </a>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            {t("find_similar")}
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "12px",
              color: "var(--foreground)",
              lineHeight: 1.3,
            }}
          >
            {t("professional_onboarding_title")}
          </h1>
          <p
            style={{
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              fontSize: "0.9375rem",
              maxWidth: "600px",
            }}
          >
            {t("find_similar_desc")}
          </p>
        </div>

        {/* How it works */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "16px",
              color: "var(--foreground)",
            }}
          >
            {locale === "ar" ? "كيف يعمل" : "How it works"}
          </h2>
          <ol
            style={{
              paddingLeft: "24px",
              color: "var(--muted-foreground)",
              lineHeight: 1.8,
              fontSize: "0.875rem",
            }}
          >
            <li>
              <strong style={{ color: "var(--foreground)" }}>{locale === "ar" ? "اختر ملفًا شخصيًا" : "Select a profile"}</strong> — {locale === "ar" ? "اختر محترفًا أو مزود خدمة موجودًا في شبكة نوجيل كنقطة مرجعية." : "choose an existing professional or provider from the Nujeel network as your reference point."}
            </li>
            <li>
              <strong style={{ color: "var(--foreground)" }}>{locale === "ar" ? "أو أدخل قدرة" : "Or enter a capability"}</strong> — {locale === "ar" ? "صف القدرة التقنية أو المهارة أو النطاق الذي لديك في ذهنك." : "describe the technology capability, skill, or domain you have in mind."}
            </li>
            <li>
              <strong style={{ color: "var(--foreground)" }}>{locale === "ar" ? "نوجيل يجد التطابقات" : "Nujeel finds matches"}</strong> — {locale === "ar" ? "يقارن النظام ملفات القدرات والخبرة والأدلة لترشيح المحترفين المشابهين." : "the system compares capability profiles, experience, and evidence to surface the most similar professionals."}
            </li>
            <li>
              <strong style={{ color: "var(--foreground)" }}>{locale === "ar" ? "راجع واختر" : "Review and shortlist"}</strong> — {locale === "ar" ? "قارن درجات التطابق وثقة الأدلة وحداثة الملفات للعثور على أفضل تطابق." : "compare match scores, evidence confidence, and profile freshness to find the best fit."}
            </li>
          </ol>
        </div>

        {/* Selection interface */}
        <div
          style={{
            border: "2px dashed var(--border)",
            borderRadius: "12px",
            padding: "32px",
            textAlign: "center",
            background: "var(--background)",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "16px" }} aria-hidden="true">
            🔍
          </div>
          <h3
            style={{
              fontSize: "1.0625rem",
              fontWeight: 600,
              marginBottom: "8px",
              color: "var(--foreground)",
            }}
          >
            {t("find_similar")}
          </h3>
          <p
            style={{
              color: "var(--muted-foreground)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: "0 auto 20px",
            }}
          >
            {locale === "ar" ? "اختر نقطة بداية لإيجاد ملفات شخصية مشابهة." : "Choose a starting point to find similar profiles."}
          </p>

          {/* Option A */}
          <div
            style={{
              display: "inline-block",
              padding: "16px 24px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--muted)",
              marginBottom: "12px",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                marginBottom: "4px",
                fontSize: "0.8125rem",
                color: "var(--foreground)",
              }}
            >
              {locale === "ar" ? "الخيار أ: تصفح الملفات الشخصية الموجودة" : "Option A: Browse existing profiles"}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.5,
              }}
            >
              {locale === "ar" ? "اختر محترفًا أو مزود خدمة من شبكة نوجيل لإيجاد ملفات قدرات مشابهة." : "Select a professional or provider from the Nujeel network to find similar capability profiles."}
            </p>
          </div>

          {/* Option B */}
          <div
            style={{
              display: "inline-block",
              padding: "16px 24px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--muted)",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontWeight: 600,
                marginBottom: "4px",
                fontSize: "0.8125rem",
                color: "var(--foreground)",
              }}
            >
              {locale === "ar" ? "الخيار ب: أدخل قدرة" : "Option B: Enter a capability"}
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted-foreground)",
                lineHeight: 1.5,
              }}
            >
              {locale === "ar" ? "صف القدرة التقنية أو المهارة أو النطاق الذي لديك في ذهنك." : "Describe the technology capability, skill, or domain you have in mind."}
            </p>
          </div>
        </div>

        {/* Empty state */}
        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid var(--accent)",
            background: "var(--accent)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "var(--accent-foreground)",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            {t("coming_soon_label")}
          </p>
          <p
            style={{
              color: "var(--accent-foreground)",
              fontSize: "0.8125rem",
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            {t("find_similar_desc")}
          </p>
          <p
            style={{
              color: "var(--accent-foreground)",
              fontSize: "0.8125rem",
              marginTop: "12px",
              opacity: 0.7,
            }}
          >
            {locale === "ar"
              ? "ملفات القدرات المهنية مطلوبة للتطابق. يمكن للمحترفين الانضمام إلى نوجيل وإنشاء بطاقة قدراتهم."
              : "Professional capability profiles are needed for matching. Professionals can join Nujeel and create their Capability Passport."}
          </p>
          <a
            href={`/${locale}/professionals`}
            style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "10px 24px",
              borderRadius: "8px",
              background: "var(--background)",
              color: "var(--accent-foreground)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid var(--accent-foreground)",
            }}
          >
            {t("add_my_cv")}
          </a>
        </div>
      </div>
    </main>
  );
}
