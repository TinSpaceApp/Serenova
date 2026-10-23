import { AdminWordmark } from "@/components/admin/AdminWordmark";
import { ForgotForm } from "@/components/admin/ForgotForm";
import { getAdminCopy } from "@/lib/admin/locale";

export default async function AdminForgotPage() {
  const { copy } = await getAdminCopy();

  return (
    <div className="flex min-h-full flex-col bg-forest">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <AdminWordmark href="/admin/login" tone="paper" />
        <p className="eyebrow mt-10 text-ivory/55">{copy.loginEyebrow}</p>
        <h1 className="display mt-3 text-5xl text-ivory">{copy.forgotTitle}</h1>
        <p className="mt-4 font-serif text-lg leading-8 text-ivory/65">{copy.forgotLede}</p>
        <div className="mt-10 bg-ivory px-6 py-8 text-ink md:px-8">
          <ForgotForm copy={copy} />
          <a
            href="/admin/login"
            className="mt-6 inline-block font-sans text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {copy.backToLogin}
          </a>
        </div>
      </div>
    </div>
  );
}
