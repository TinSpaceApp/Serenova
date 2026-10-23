import { setAdminLocale } from "@/app/actions/admin-auth";
import type { AdminLocale } from "@/lib/admin/copy";

export function AdminLocaleSwitch({ locale }: { locale: AdminLocale }) {
  return (
    <form action={setAdminLocale} className="flex items-center gap-1 font-sans text-[0.68rem] uppercase tracking-[0.16em]">
      <input type="hidden" name="locale" value={locale === "fr" ? "en" : "fr"} />
      <button
        type="submit"
        className="text-ivory/50 transition-colors hover:text-ivory"
        aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
      >
        {locale === "fr" ? "EN" : "FR"}
      </button>
    </form>
  );
}
