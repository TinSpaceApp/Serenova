import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const journeys = [
  {
    key: "wild" as const,
    price: "2,294",
    image: "/images/official/serengeti.jpg",
    href: "/journeys/wild-essence",
  },
  {
    key: "ndutu" as const,
    price: "3,740",
    image: "/images/official/ndutu.jpg",
    href: "/journeys/ndutu-wilderness",
  },
  {
    key: "ocean" as const,
    price: "7,935",
    image: "/images/official/zanzibar.jpg",
    href: "/journeys/bush-ocean",
  },
];

export async function HomePage() {
  const t = await getTranslations("home");
  const journeysT = await getTranslations("journeysPreview");
  const nav = await getTranslations("nav");

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#2b241c] md:min-h-[94vh]">
        <Image
          src="/images/hero-savanna.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
        <div className="relative flex min-h-[88vh] items-center justify-center px-5 text-center md:min-h-[94vh]">
          <h1 className="display max-w-[18ch] text-[2.7rem] text-white drop-shadow-sm sm:text-[4rem] md:text-[5.15rem]">
            {t("heroLine1")}
            <br />
            {t("heroLine2")}
          </h1>
        </div>
      </section>

      <section className="bg-paper">
        <Container className="flex flex-col items-center py-16 text-center md:py-24">
          <p className="eyebrow">{t("introEyebrow")}</p>
          <h2 className="display mt-4 max-w-[16ch] text-[2.15rem] text-ink md:text-[3.4rem]">
            {t("introTitle")}
          </h2>
          <p className="mt-6 max-w-[38rem] text-[1.05rem] leading-8 text-muted md:text-lg md:leading-9">
            {t("introBody")}
          </p>
        </Container>
      </section>

      <section className="bg-paper pb-8 md:pb-16">
        <Container>
          <VideoSlot
            videoId="home-video"
            coverId="home-video-cover"
            caption={t("momentCaption")}
          />
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{t("destinationsEyebrow")}</p>
            <h2 className="display mt-4 text-[2.15rem] md:text-[3.2rem]">
              {t("destinationsTitle")}
            </h2>
          </div>

          <div className="mt-12 grid gap-12 md:mt-16 md:gap-20">
            <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/images/tanzania.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="md:pr-6">
                <p className="eyebrow">{t("tanzaniaLabel")}</p>
                <h3 className="display mt-3 text-[2.2rem] md:text-[3rem]">
                  {t("tanzaniaTitle")}
                </h3>
                <p className="mt-4 max-w-md leading-8 text-muted">
                  {t("tanzaniaBody")}
                </p>
                <Link
                  href="/tanzania"
                  className="mt-6 inline-flex font-sans text-sm tracking-[0.04em] text-bronze hover:text-ink"
                >
                  {t("explore")} →
                </Link>
              </div>
            </article>

            <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.4rem] md:order-2">
                <Image
                  src="/images/zanzibar.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="md:pl-6">
                <p className="eyebrow">{t("zanzibarLabel")}</p>
                <h3 className="display mt-3 text-[2.2rem] md:text-[3rem]">
                  {t("zanzibarTitle")}
                </h3>
                <p className="mt-4 max-w-md leading-8 text-muted">
                  {t("zanzibarBody")}
                </p>
                <Link
                  href="/zanzibar"
                  className="mt-6 inline-flex font-sans text-sm tracking-[0.04em] text-bronze hover:text-ink"
                >
                  {t("explore")} →
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container className="grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">{t("stylesEyebrow")}</p>
            <h2 className="display mt-4 max-w-[14ch] text-[2.15rem] md:text-[3.2rem]">
              {t("stylesTitle")}
            </h2>
          </div>
          <p className="max-w-md leading-8 text-muted md:justify-self-end">
            {t("stylesBody")}
          </p>
        </Container>
        <Container className="mt-10">
          <Link href="/styles" className="group relative block overflow-hidden rounded-[1.4rem]">
            <div className="relative aspect-[16/10] md:aspect-[21/8]">
              <Image
                src="/images/styles.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-6 left-6 font-sans text-sm tracking-[0.06em] text-white md:bottom-8 md:left-8">
                {t("explore")} →
              </span>
            </div>
          </Link>
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">{t("journeysEyebrow")}</p>
            <h2 className="display mt-4 text-[2.15rem] md:text-[3.2rem]">
              {t("journeysTitle")}
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-muted">{t("journeysBody")}</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {journeys.map((journey) => (
              <Link
                key={journey.key}
                href={journey.href}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem]">
                  <Image
                    src={journey.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <p className="eyebrow mt-5">{journeysT(`${journey.key}.meta`)}</p>
                <h3 className="display mt-2 text-[1.85rem]">
                  {journeysT(`${journey.key}.name`)}
                </h3>
                <p className="mt-2 text-[0.98rem] leading-7 text-muted">
                  {journeysT(`${journey.key}.body`)}
                </p>
                <p className="mt-3 font-sans text-sm text-ink">
                  {t("from")} ${journey.price}
                  {t("perPerson")}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] md:aspect-[5/6]">
            <Image
              src="/images/about.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow">{t("aboutEyebrow")}</p>
            <h2 className="display mt-4 text-[2.15rem] md:text-[3.2rem]">
              {t("aboutTitle")}
            </h2>
            <p className="mt-5 max-w-md leading-8 text-muted">{t("aboutBody")}</p>
            <div className="mt-8">
              <Button href="/about" variant="ghost">
                {t("aboutCta")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <Image
          src="/images/cta.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Container className="relative flex flex-col items-center text-center text-white">
          <h2 className="display max-w-[16ch] text-[2.3rem] md:text-[3.6rem]">
            {t("ctaTitle")}
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-8 text-white/85">
            {t("ctaBody")}
          </p>
          <div className="mt-8">
            <Button href="/plan" variant="light">
              {nav("plan")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
