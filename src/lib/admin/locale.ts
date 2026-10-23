import { cookies } from "next/headers";
import { adminCopy, type AdminCopy, type AdminLocale } from "./copy";

const COOKIE = "sn_admin_locale";

export function asAdminLocale(value: string | undefined | null): AdminLocale {
  return value === "en" ? "en" : "fr";
}

export async function getAdminLocale(): Promise<AdminLocale> {
  const store = await cookies();
  return asAdminLocale(store.get(COOKIE)?.value);
}

export async function getAdminCopy(): Promise<{ locale: AdminLocale; copy: AdminCopy }> {
  const locale = await getAdminLocale();
  return { locale, copy: adminCopy[locale] };
}

export { COOKIE as ADMIN_LOCALE_COOKIE };
