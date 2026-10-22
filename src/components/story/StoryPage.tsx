import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type StoryKey =
  | "destinations"
  | "tanzania"
  | "zanzibar"
  | "kenya"
  | "uganda"
  | "kilimanjaro"
  | "styles"
  | "journeys"
  | "about"
  | "journal"
  | "contact"
  | "plan";

type StoryPageProps = {
  page: StoryKey;
  image: string;
};

export async function StoryPage({ page, image }: StoryPageProps) {
  const t = await getTranslations(`pages.${page}`);
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");

  return (
    <>
        <section className="relative isolate min-h-[58vh] overflow-hidden md:min-h-[68vh]">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex min-h-[58vh] items-end px-5 pb-12 md:min-h-[68vh] md:px-10 md:pb-16">
          <div className="mx-auto w-full max-w-[1180px] text-white">
            <p className="eyebrow text-white/75">{t("eyebrow")}</p>
            <h1 className="display mt-3 text-[3rem] md:text-[5rem]">{t("title")}</h1>
          </div>
        </div>
      </section>
      <section className="bg-paper">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <p className="max-w-xl text-lg leading-9 text-muted">{t("lede")}</p>
          <div className="flex flex-col justify-end gap-5">
            <p className="leading-8 text-muted">{common("comingBody")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/plan">{nav("plan")}</Button>
              <Button href="/" variant="ghost">
                {common("backHome")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
