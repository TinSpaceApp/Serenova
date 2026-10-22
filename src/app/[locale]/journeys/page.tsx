import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fromPrice, packages } from "@/content/catalog";
import { Link } from "@/i18n/navigation";
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
        image="serengeti"
        title="Safari packages"
        lede="Starting points, never inventory. Every price below is indicative and must be confirmed."
      />
      <Container className="py-16 md:py-20">
        <div className="grid gap-10">
          {packages.map((item) => (
            <Link
              key={item.slug}
              href={`/journeys/${item.slug}`}
              className="grid items-center gap-6 border-b border-line pb-10 md:grid-cols-[220px_1fr]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <MediaFrame id={item.cover} sizes="220px" />
              </div>
              <div>
                <p className="eyebrow">
                  {item.days} days · {item.category}
                </p>
                <h2 className="display mt-2 text-[2.1rem]">{item.name}</h2>
                <p className="mt-2 max-w-2xl leading-7 text-muted">{item.overview}</p>
                <p className="mt-3 font-sans text-sm">
                  From ${fromPrice(item)?.toLocaleString("en-US")} per person
                  {item.pricesPending ? " · indicative" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/plan">Looking for something different?</Button>
        </div>
      </Container>
    </>
  );
}
