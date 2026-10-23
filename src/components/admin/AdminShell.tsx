import { signOutAdmin } from "@/app/actions/admin-auth";
import { AdminLocaleSwitch } from "@/components/admin/AdminLocaleSwitch";
import { AdminWordmark } from "@/components/admin/AdminWordmark";
import type { AdminCopy, AdminLocale } from "@/lib/admin/copy";
import type { AdminProfile } from "@/lib/admin/session";

type AdminShellProps = {
  profile: AdminProfile;
  copy: AdminCopy;
  locale: AdminLocale;
  children: React.ReactNode;
};

export function AdminShell({ profile, copy, locale, children }: AdminShellProps) {
  return (
    <div className="min-h-full bg-ivory text-ink md:grid md:grid-cols-[240px_1fr]">
      <aside className="admin-no-print bg-forest text-ivory">
        <div className="flex items-center justify-between px-6 py-6 md:block">
          <AdminWordmark href="/admin" tone="paper" className="text-[1.7rem] md:text-[1.85rem]" />
          <div className="md:mt-8">
            <AdminLocaleSwitch locale={locale} />
          </div>
        </div>
        <nav className="admin-no-print flex gap-4 overflow-x-auto px-6 pb-4 font-sans text-[0.78rem] md:block md:space-y-1 md:overflow-visible md:px-4 md:pb-8">
          <a href="/admin" className="block px-2 py-2 text-ivory">
            {copy.navHome}
          </a>
          <a href="/admin/requests" className="block px-2 py-2 text-ivory/75 transition-colors hover:text-ivory">
            {copy.navRequests}
          </a>
          <a href="/admin/quotes" className="block px-2 py-2 text-ivory/75 transition-colors hover:text-ivory">
            {copy.navQuotes}
          </a>
          <a href="/admin/invoices" className="block px-2 py-2 text-ivory/75 transition-colors hover:text-ivory">
            {copy.navInvoices}
          </a>
          <a href="/admin/settings" className="block px-2 py-2 text-ivory/75 transition-colors hover:text-ivory">
            {copy.navSettings}
          </a>
          <a href="/admin/account" className="block px-2 py-2 text-ivory/75 transition-colors hover:text-ivory">
            {copy.navAccount}
          </a>
        </nav>
        <div className="border-t border-white/10 px-6 py-5 font-sans text-[0.72rem] text-ivory/55">
          <p className="uppercase tracking-[0.14em]">{copy.signedInAs}</p>
          <p className="mt-1 truncate text-ivory/80">{profile.email}</p>
          <form action={signOutAdmin} className="mt-4">
            <button type="submit" className="text-ivory/70 underline-offset-4 hover:text-ivory hover:underline">
              {copy.signOut}
            </button>
          </form>
          <a href="/en" className="mt-3 block text-ivory/45 hover:text-ivory/70">
            {copy.publicSite}
          </a>
        </div>
      </aside>
      <div className="min-w-0">
        <main className="mx-auto max-w-5xl px-5 py-10 md:px-12 md:py-14">{children}</main>
      </div>
    </div>
  );
}
