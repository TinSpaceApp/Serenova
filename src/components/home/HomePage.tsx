import { Figure } from "@/components/editorial/Figure";
import { ImmersiveCta } from "@/components/editorial/ImmersiveCta";
import { CinematicHero } from "@/components/editorial/CinematicHero";
import { Reveal } from "@/components/editorial/Reveal";
import { MediaFrame } from "@/components/media/MediaFrame";
import { ScrollFilm } from "@/components/media/ScrollFilm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StayMosaic } from "@/components/media/StayMosaic";
import { fromPrice, packages, styles } from "@/content/catalog";
import { getMedia } from "@/content/media";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const homeStayIds = [
  "lodge-moyo-central",
  "lodge-moyo-central-02",
  "lodge-crater-edge",
  "lodge-crater-edge-02",
  "lodge-kuro-treetops",
  "lodge-kuro-treetops-03",
  "lodge-the-mora",
  "lodge-the-mora-02",
  "lodge-tulia",
  "lodge-tulia-02",
  "lodge-serenity",
  "lodge-salinero",
  "lodge-river-camp",
  "lodge-gran-melia-ngorongoro",
  "lodge-shuhudia",
  "lodge-lions-paw",
  "lodge-farm-of-dreams",
  "lodge-nyuki",
  "lodge-sametu",
  "lodge-kitela",
];

const featuredJourneys = ["wild-essence", "ndutu-wilderness", "bush-ocean"] as const;
const featuredStyles = ["honeymoon", "family", "photography"] as const;
const listedStyles = ["great-migration", "beach-zanzibar", "walking"] as const;
const listedStylePhotos: Record<(typeof listedStyles)[number], string> = {
  "great-migration": "migration-2",
  "beach-zanzibar": "zanzibar-coast",
  walking: "walking",
};

export async function HomePage() {
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");
  const styleCopy = await getTranslations("catalog.styles");
  const packageCopy = await getTranslations("catalog.packages");
  const tier = await getTranslations("catalog.tier");
  const journeys = featuredJourneys
    .map((slug) => packages.find((item) => item.slug === slug))
    .filter((item): item is (typeof packages)[number] => Boolean(item));
  const [leadJourney, ...otherJourneys] = journeys;
  const styleItems = featuredStyles
    .map((slug) => styles.find((item) => item.slug === slug))
    .filter((item): item is (typeof styles)[number] => Boolean(item));
  const styleList = listedStyles
    .map((slug) => styles.find((item) => item.slug === slug))
    .filter((item): item is (typeof styles)[number] => Boolean(item));

  return (
    <>
      <CinematicHero
        image="hero-savanna"
        images={["hero-savanna", "sunset-2", "serengeti-lions"]}
        eyebrow={t("heroEyebrow")}
        title={t("heroLine1")}
        titleLine2={t("heroLine2")}
        lede={t("heroLede")}
        primaryHref="/plan"
        primaryLabel={t("heroPrimary")}
        secondaryHref="/styles"
        secondaryLabel={t("heroSecondary")}
      />

      <ScrollFilm
        src={getMedia("home-video").src}
        poster={getMedia("home-video-cover").src}
        caption={t("momentCaption")}
      />

      <section className="bg-ivory">
        <Container className="grid items-end gap-12 py-20 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:py-32 lg:gap-24">
          <Figure
            id="walking-giraffe"
            caption={t("philosophyCaption")}
            frameClassName="aspect-[4/5] md:aspect-[3/4]"
            objectPosition="center 32%"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="md:mb-8"
          />
          <Reveal className="md:pb-10">
            <p className="eyebrow">{t("introEyebrow")}</p>
            <h2 className="display mt-6 max-w-[16ch] text-[2.4rem] leading-[1.06] text-ink md:text-[4.2rem]">
              {t("introTitle")}
            </h2>
            <p className="mt-7 max-w-[32rem] text-[1.05rem] leading-8 text-muted md:leading-9">
              {t("introBody")}
            </p>
            <p className="photo-caption mt-6">{t("philosophyNote")}</p>
            <div className="mt-8">
              <Link href="/plan" className="text-cta">
                {t("philosophyCta")}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory pb-20 md:pb-28">
        <Container>
          <div className="relative">
            <Figure
              id="serengeti-lion"
              caption={t("wildernessCaption")}
              frameClassName="aspect-[16/10]"
              objectPosition="center 55%"
              sizes="(min-width: 768px) 70vw, 100vw"
              className="md:w-[70%]"
            />
            <Figure
              id="ngorongoro-buffalo"
              caption={t("wildernessDetail")}
              frameClassName="aspect-[3/4]"
              objectPosition="center 62%"
              sizes="(min-width: 768px) 28vw, 50vw"
              delay={160}
              className="mt-8 w-[72%] md:absolute md:right-0 md:top-[18%] md:mt-0 md:w-[28%]"
            />
          </div>
          <div className="mt-10 grid items-center gap-10 md:mt-16 md:grid-cols-2 md:gap-16 lg:gap-20">
            <Reveal>
              <p className="eyebrow">{t("wildernessEyebrow")}</p>
              <h2 className="display mt-4 max-w-[12ch] text-[2.3rem] md:text-[3.8rem]">
                {t("wildernessTitle")}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("wildernessBody")}</p>
            </Reveal>
            <Figure
              id="hyena"
              caption={t("wildernessAccent")}
              frameClassName="aspect-[5/4] md:aspect-[4/3]"
              objectPosition="center 52%"
              sizes="(min-width: 768px) 46vw, 100vw"
              delay={80}
              className="w-full"
            />
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
          <Reveal>
            <p className="eyebrow">{t("operateEyebrow")}</p>
            <h2 className="display mt-4 max-w-[16ch] text-[2.3rem] md:text-[3.8rem]">
              {t("operateTitle")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("operateBody")}</p>
            <ul className="mt-8 space-y-3 font-sans text-[0.78rem] uppercase tracking-[0.14em] text-ink">
              <li>{t("operateTanzania")}</li>
              <li>{t("operateZanzibar")}</li>
              <li>{t("operateRequest")}</li>
            </ul>
          </Reveal>
          <Figure
            id="tarangire-elephant"
            caption={t("operateCaption")}
            frameClassName="aspect-[16/11]"
            objectPosition="center 45%"
            sizes="(min-width: 768px) 44vw, 100vw"
          />
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="grid items-center gap-12 py-20 md:grid-cols-12 md:py-28">
          <Figure
            id="serengeti-river"
            caption={t("tanzaniaCaption")}
            frameClassName="aspect-[16/11] md:aspect-[4/3]"
            objectPosition="center 58%"
            sizes="(min-width: 768px) 58vw, 100vw"
            className="md:col-span-7"
          />
          <Reveal className="md:col-span-5 md:pl-6 lg:pl-10">
            <p className="eyebrow">{t("tanzaniaLabel")}</p>
            <h2 className="display mt-4 text-[2.6rem] md:text-[4.4rem]">{t("tanzaniaTitle")}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("tanzaniaBody")}</p>
            <p className="photo-caption mt-6">{t("tanzaniaPlaces")}</p>
            <div className="mt-8">
              <Link href="/tanzania" className="text-cta">
                {t("exploreTanzania")}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="py-6 md:py-10">
          <Reveal className="border-y border-line py-10 text-center md:py-14">
            <p className="eyebrow">{t("crossingEyebrow")}</p>
            <h2 className="display mx-auto mt-4 max-w-[14ch] text-[2.2rem] md:text-[3.6rem]">
              {t("crossingTitle")}
            </h2>
          </Reveal>
        </Container>
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <MediaFrame id="zanzibar-beach" sizes="100vw" objectPosition="center 68%" />
        </div>
      </section>

      <section className="bg-ivory">
        <Container className="grid items-start gap-12 py-20 md:grid-cols-[1fr_0.85fr] md:py-28">
          <Reveal className="md:pt-10">
            <p className="eyebrow">{t("zanzibarLabel")}</p>
            <h2 className="display mt-4 text-[2.6rem] md:text-[4.2rem]">{t("zanzibarTitle")}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("zanzibarBody")}</p>
            <p className="photo-caption mt-6">{t("zanzibarNote")}</p>
            <div className="mt-8">
              <Link href="/zanzibar" className="text-cta">
                {t("exploreZanzibar")}
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <Figure
              id="zanzibar-detail"
              caption={t("zanzibarCaption")}
              frameClassName="aspect-[3/4]"
              objectPosition="center 45%"
              sizes="(min-width: 768px) 22vw, 50vw"
              className="col-span-2 md:col-span-1 md:mt-16"
            />
            <Figure
              id="zanzibar-coast"
              frameClassName="aspect-[4/5]"
              objectPosition="center 40%"
              sizes="(min-width: 768px) 22vw, 50vw"
              delay={140}
              className="col-span-2 md:col-span-1"
            />
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <StayMosaic
            ids={homeStayIds}
            eyebrow={t("staysEyebrow")}
            title={t("staysTitle")}
            body={t("staysBody")}
          />
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{t("journeysEyebrow")}</p>
            <h2 className="display mt-4 max-w-[26ch] text-[2.4rem] md:text-[4rem]">{t("journeysTitle")}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{t("journeysBody")}</p>
          </Reveal>

          {leadJourney ? (
            <Link
              href={`/journeys/${leadJourney.slug}`}
              className="group mt-14 grid items-center gap-10 border-t border-line pt-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16"
            >
              <Figure
                id={leadJourney.cover}
                frameClassName="aspect-[16/10]"
                objectPosition="center 55%"
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              <div>
                <p className="eyebrow">
                  {leadJourney.days} {t("days")} · {tier(leadJourney.category)}
                </p>
                <h3 className="display mt-3 text-[2.2rem] md:text-[3.2rem]">
                  {packageCopy(`${leadJourney.slug}.name`)}
                </h3>
                <p className="mt-4 leading-8 text-muted">{packageCopy(`${leadJourney.slug}.overview`)}</p>
                <p className="photo-caption mt-5">{leadJourney.mapPoints.join(" · ")}</p>
                <p className="mt-6 font-sans text-sm text-ink">
                  {t("from")} ${fromPrice(leadJourney)?.toLocaleString("en-US")}
                  {t("perPerson")}
                </p>
              </div>
            </Link>
          ) : null}

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {otherJourneys.map((journey) => (
              <Link key={journey.slug} href={`/journeys/${journey.slug}`} className="group block">
                <Figure
                  id={journey.cover}
                  frameClassName="aspect-[16/11]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
                <p className="eyebrow mt-5">
                  {journey.days} {t("days")} · {tier(journey.category)}
                </p>
                <h3 className="display mt-2 text-[2rem]">{packageCopy(`${journey.slug}.name`)}</h3>
                <p className="mt-3 leading-7 text-muted">{packageCopy(`${journey.slug}.overview`)}</p>
                <p className="mt-4 font-sans text-sm text-ink">
                  {t("from")} ${fromPrice(journey)?.toLocaleString("en-US")}
                  {t("perPerson")}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/journeys" variant="ghost">
              {t("allJourneys")}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <Reveal className="grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">{t("stylesEyebrow")}</p>
              <h2 className="display mt-4 max-w-[16ch] text-[2.4rem] md:text-[4rem]">
                {t("stylesTitle")}
              </h2>
            </div>
            <p className="max-w-md leading-8 text-muted md:justify-self-end">{t("stylesBody")}</p>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {styleItems.map((style, index) => (
              <Link key={style.slug} href={`/styles/${style.slug}`} className="group block">
                <Figure
                  id={style.cover}
                  frameClassName={index === 1 ? "aspect-[4/5]" : "aspect-[16/11]"}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className={index === 1 ? "md:mt-10" : ""}
                />
                <h3 className="display mt-5 text-[1.9rem] group-hover:text-bronze">
                  {styleCopy(`${style.slug}.name`)}
                </h3>
                <p className="mt-2 leading-7 text-muted">{styleCopy(`${style.slug}.summary`)}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
            {styleList.map((style) => (
              <Link key={style.slug} href={`/styles/${style.slug}`} className="group block">
                <div className="photo-frame relative aspect-[16/11]">
                  <MediaFrame
                    id={listedStylePhotos[style.slug as (typeof listedStyles)[number]] ?? style.cover}
                    className="photo-zoom"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <h3 className="display mt-5 text-[1.8rem] group-hover:text-bronze">
                  {styleCopy(`${style.slug}.name`)}
                </h3>
                <p className="mt-2 leading-7 text-muted">{styleCopy(`${style.slug}.summary`)}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="grid items-center gap-12 py-20 md:grid-cols-[0.82fr_1.18fr] md:gap-20 md:py-28">
          <Figure
            id="founder-portrait"
            caption={t("founderCaption")}
            frameClassName="aspect-[4/5]"
            objectPosition="center 18%"
            sizes="(min-width: 768px) 36vw, 100vw"
          />
          <Reveal>
            <p className="eyebrow">{t("aboutEyebrow")}</p>
            <h2 className="display mt-4 max-w-[28ch] text-[2.6rem] md:text-[4.2rem]">{t("aboutTitle")}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("aboutBody")}</p>
            <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
              {(["one", "two", "three"] as const).map((key) => (
                <article key={key}>
                  <h3 className="display text-[1.6rem]">{t(`why.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{t(`why.${key}.body`)}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              <Link href="/about" className="text-cta">
                {t("aboutCta")}
              </Link>
              <Link href="/why-serenova" className="text-cta">
                {t("whyCta")}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <ImmersiveCta
        image="sunset-ngorongoro"
        title={t("ctaTitle")}
        body={t("ctaBody")}
        href="/plan"
        label={nav("plan")}
      />
    </>
  );
}
