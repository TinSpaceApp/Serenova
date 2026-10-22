import { PageHero } from "@/components/editorial/PageHero";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDestination } from "@/content/catalog";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/i18n/routing";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const destination = getDestination("uganda")!;

  return (
    <>
      <PageHero image="uganda" title="Uganda" eyebrow="Primate country" />
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
          <MediaFrame id={destination.cover} />
        </div>
        <div>
          <div className="space-y-5 text-lg leading-9 text-muted">
            {destination.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/plan?destination=uganda">Contact us about Uganda</Button>
          </div>
        </div>
      </Container>
      <Container className="pb-20">
        <VideoSlot videoId="uganda-video" coverId="uganda" />
      </Container>
    </>
  );
}
