
export async function getRequestConfig({ request }) {
  const locale = request.headers.get("x-next-intl-locale") || "en";

  if (!["en", "ar"].includes(locale)) {
    return { notFound: () => { throw new Error("Not Found") } };
  }

  return {
    locale,
    messages: {
      common: (await import(`./messages/${locale}/common.json`)).default,
    },
  };
}
