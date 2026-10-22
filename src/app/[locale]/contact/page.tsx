import { PageHero } from "@/components/editorial/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));

  return (
    <>
      <PageHero
        image="cta"
        title="Contact us"
        lede="Let’s plan your journey together."
      />
      <Container className="grid gap-8 py-12 font-sans text-sm text-muted md:grid-cols-4">
        <p>
          Email
          <br />
          <a className="text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p>
          WhatsApp
          <br />
          <a className="text-ink" href={site.whatsappHref}>
            {site.phoneDisplay}
          </a>
        </p>
        <p>
          Hours
          <br />
          {site.hours}
        </p>
        <p>
          Based in
          <br />
          Lausanne, Switzerland · planning Tanzania and East Africa
        </p>
      </Container>
      <Container className="grid gap-12 pb-20 md:grid-cols-2">
        <ContactForm />
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
            <MediaFrame id="about" />
          </div>
          <p className="mt-4 text-sm text-muted">
            {site.contactsArePlaceholders
              ? "Phone, WhatsApp and email above are placeholders until Jenny confirms them."
              : null}
          </p>
        </div>
      </Container>
    </>
  );
}
