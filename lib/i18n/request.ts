import fs from "fs";
import path from "path";

const messagesDir = path.join(process.cwd(), "lib", "i18n", "messages");
let cache: Record<string, Record<string, string>> = {};

function loadMessages(locale: string): Record<string, string> {
  if (cache[locale]) return cache[locale];
  const filePath = path.join(messagesDir, locale, "common.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  cache[locale] = parsed.common || parsed;
  return cache[locale];
}

export function getTranslations(locale: string, namespace: string = "common") {
  const messages = loadMessages(locale);
  return (key: string): string => {
    const value = messages[key];
    return value || key;
  };
}
