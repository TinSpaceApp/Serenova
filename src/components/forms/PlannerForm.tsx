"use client";

import { useEffect, useMemo, useRef, useState, type FocusEvent, type MouseEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { submitPlanner, type LeadResult } from "@/app/actions/leads";
import { Figure } from "@/components/editorial/Figure";
import { MediaFrame } from "@/components/media/MediaFrame";
import { packages, styles } from "@/content/catalog";

const STORAGE_KEY = "serenova-planner";

const destinationCards = [
  { id: "tanzania", image: "serengeti-lions" },
  { id: "zanzibar", image: "zanzibar-beach" },
  { id: "kenya", image: "kenya-samburu" },
  { id: "uganda", image: "uganda" },
] as const;

const featuredStarts = ["wild-essence", "ndutu-wilderness", "bush-ocean"] as const;
const occasions = [
  { id: "first", label: "occFirst" },
  { id: "couple", label: "occCouple" },
  { id: "family", label: "occFamily" },
  { id: "friends", label: "occFriends" },
  { id: "celebration", label: "occCelebration" },
] as const;

type PlannerState = {
  destinations: string[];
  tripType: string;
  dateFrom: string;
  dateTo: string;
  dates: string;
  flexible: boolean;
  nights: string;
  adults: string;
  children: string;
  childAges: string;
  occasion: string;
  styles: string[];
  budgetCurrency: string;
  budget: string;
  interests: string;
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  contactPreference: string;
};

const empty: PlannerState = {
  destinations: [],
  tripType: "",
  dateFrom: "",
  dateTo: "",
  dates: "",
  flexible: false,
  nights: "",
  adults: "2",
  children: "0",
  childAges: "",
  occasion: "",
  styles: [],
  budgetCurrency: "USD",
  budget: "",
  interests: "",
  notes: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  contactPreference: "whatsapp",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function nightsBetween(from: string, to: string) {
  if (!from || !to) {
    return "";
  }
  const start = new Date(`${from}T12:00:00`);
  const end = new Date(`${to}T12:00:00`);
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return nights > 0 ? String(nights) : "";
}

function composeDates(from: string, to: string, fallback = "") {
  if (from && to) {
    return `${from} – ${to}`;
  }
  return from || to || fallback;
}

function parseSavedDates(value: string) {
  const match = value.match(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/);
  if (match) {
    return { dateFrom: match[1], dateTo: match[2] };
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { dateFrom: value, dateTo: "" };
  }
  return { dateFrom: "", dateTo: "" };
}

function formatBriefDate(iso: string, locale: string) {
  if (!iso) {
    return "";
  }
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function openCalendar(event: MouseEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  try {
    input.showPicker?.();
  } catch {
    /* native calendar already open */
  }
}

function ChoiceCard({
  pressed,
  label,
  note,
  image,
  selectedLabel,
  onClick,
}: {
  pressed: boolean;
  label: string;
  note?: string;
  image: string;
  selectedLabel: string;
  onClick: () => void;
}) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className="planner-card group block w-full">
      <span className="planner-card-media relative block aspect-[16/11] overflow-hidden">
        <MediaFrame
          id={image}
          sizes="(min-width: 1024px) 22vw, 50vw"
          className="photo-zoom"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
        <span className="planner-card-flag">{selectedLabel}</span>
        <span className="planner-card-mark" aria-hidden>
          ✓
        </span>
        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="display block text-[1.6rem] leading-none">{label}</span>
          {note ? (
            <span className="mt-2 block font-sans text-[0.66rem] uppercase tracking-[0.16em] text-ivory/70">
              {note}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

function Stepper({
  value,
  min,
  max,
  decrease,
  increase,
  onChange,
}: {
  value: string;
  min: number;
  max: number;
  decrease: string;
  increase: string;
  onChange: (next: string) => void;
}) {
  const current = Number.parseInt(value, 10);
  const safe = Number.isFinite(current) ? current : min;

  return (
    <div className="planner-stepper">
      <button
        type="button"
        aria-label={decrease}
        onClick={() => onChange(String(Math.max(min, safe - 1)))}
      >
        −
      </button>
      <input
        type="number"
        min={min}
        max={max}
        inputMode="numeric"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          if (next === "") {
            onChange("");
            return;
          }
          const parsed = Number.parseInt(next, 10);
          if (!Number.isFinite(parsed)) {
            return;
          }
          onChange(String(Math.min(max, Math.max(min, parsed))));
        }}
      />
      <button
        type="button"
        aria-label={increase}
        onClick={() => onChange(String(Math.min(max, safe + 1)))}
      >
        +
      </button>
    </div>
  );
}

export function PlannerForm() {
  const t = useTranslations("planner");
  const styleCopy = useTranslations("catalog.styles");
  const packageCopy = useTranslations("catalog.packages");
  const locale = useLocale();
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<PlannerState>(empty);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [pending, setPending] = useState(false);
  const minDate = todayIso();
  const stepAnchorRef = useRef<HTMLDivElement>(null);
  const skipStepScroll = useRef(true);

  useEffect(() => {
    if (skipStepScroll.current) {
      skipStepScroll.current = false;
      return;
    }

    const node = stepAnchorRef.current;
    if (!node) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector("header");
    const offset = (header?.getBoundingClientRect().height ?? 84) + 20;
    const top = node.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [step]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    let restored = empty;
    if (saved) {
      try {
        const parsed = { ...empty, ...JSON.parse(saved) } as PlannerState;
        if (!parsed.dateFrom && !parsed.dateTo && parsed.dates) {
          restored = { ...parsed, ...parseSavedDates(parsed.dates) };
        } else {
          restored = parsed;
        }
      } catch {
        /* ignore broken drafts */
      }
    }
    const destination = params.get("destination");
    const pack = params.get("package");
    const style = params.get("style");
    setState({
      ...restored,
      destinations: destination
        ? Array.from(new Set([...restored.destinations, destination]))
        : restored.destinations,
      styles: style ? Array.from(new Set([...restored.styles, style])) : restored.styles,
      tripType: pack || restored.tripType,
    });
  }, [params]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const packageName = useMemo(() => {
    if (!state.tripType) {
      return undefined;
    }
    return packageCopy(`${state.tripType}.name`);
  }, [packageCopy, state.tripType]);
  const briefImage =
    destinationCards.find((item) => state.destinations.includes(item.id))?.image ?? "sunset-ngorongoro";
  const selectedStyles = styles.filter((item) => state.styles.includes(item.slug));
  const dateSummary = [formatBriefDate(state.dateFrom, locale), formatBriefDate(state.dateTo, locale)]
    .filter(Boolean)
    .join(" – ");

  function updateDates(next: Pick<PlannerState, "dateFrom" | "dateTo">) {
    setState((current) => {
      const dateFrom = next.dateFrom;
      const dateTo = next.dateTo && next.dateTo < dateFrom ? dateFrom : next.dateTo;
      return {
        ...current,
        dateFrom,
        dateTo,
        dates: composeDates(dateFrom, dateTo, current.dates),
        nights: nightsBetween(dateFrom, dateTo) || current.nights,
      };
    });
  }

  async function onSubmit(formData: FormData) {
    setPending(true);
    const next = await submitPlanner(formData);
    setResult(next);
    setPending(false);
    if (next.ok) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  if (result?.ok) {
    return (
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <Figure
          id="sunset-ngorongoro"
          frameClassName="aspect-[4/5] md:aspect-[3/4]"
          objectPosition="center 70%"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        <div>
          <p className="eyebrow">{t("receivedEyebrow")}</p>
          <h2 className="display mt-5 max-w-[12ch] text-[2.6rem] md:text-[4.2rem]">{t("receivedTitle")}</h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">{t("receivedBody")}</p>
        </div>
      </div>
    );
  }

  const stepKeys = ["step1", "step2", "step3", "step4", "step5"] as const;
  const selectedLabel = t("selected");

  return (
    <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
      <form action={onSubmit} className="grid gap-10">
        <input type="hidden" name="package" value={state.tripType} />
        <input type="hidden" name="destination" value={state.destinations[0] ?? ""} />
        <input type="hidden" name="tripType" value={state.tripType} />
        <input type="hidden" name="dates" value={composeDates(state.dateFrom, state.dateTo, state.dates)} />
        <input type="hidden" name="nights" value={state.nights} />
        <input type="hidden" name="adults" value={state.adults} />
        <input type="hidden" name="children" value={state.children} />
        <input type="hidden" name="childAges" value={state.childAges} />
        <input type="hidden" name="occasion" value={state.occasion} />
        <input type="hidden" name="budgetCurrency" value={state.budgetCurrency} />
        <input type="hidden" name="budget" value={state.budget} />
        <input type="hidden" name="interests" value={state.interests} />
        <input type="hidden" name="notes" value={state.notes} />
        {state.destinations.map((item) => (
          <input key={`d-${item}`} type="hidden" name="destinations" value={item} />
        ))}
        {state.styles.map((item) => (
          <input key={`s-${item}`} type="hidden" name="styles" value={item} />
        ))}
        {state.flexible ? <input type="hidden" name="flexible" value="yes" /> : null}

        <div ref={stepAnchorRef}>
          <ol className="flex flex-wrap gap-x-5 gap-y-2">
            {stepKeys.map((key, index) => {
              const number = index + 1;
              const active = step === number;
              const done = step > number;
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => done && setStep(number)}
                    className={`font-sans text-[0.7rem] uppercase tracking-[0.16em] ${
                      active ? "text-ink" : done ? "text-bronze" : "text-muted"
                    }`}
                  >
                    {String(number).padStart(2, "0")} {t(key)}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="planner-progress mt-4">
            <span style={{ width: `${(step / 5) * 100}%` }} />
          </div>
        </div>

        {step === 1 ? (
          <section className="grid gap-10">
            <div>
              <h2 className="display text-[2.2rem] md:text-[3.2rem]">{t("whereTitle")}</h2>
              <p className="mt-4 max-w-md leading-8 text-muted">{t("whereLede")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {destinationCards.map((item) => (
                <ChoiceCard
                  key={item.id}
                  image={item.image}
                  label={t(item.id)}
                  note={t(`${item.id}Note`)}
                  selectedLabel={selectedLabel}
                  pressed={state.destinations.includes(item.id)}
                  onClick={() =>
                    setState((current) => ({
                      ...current,
                      destinations: toggle(current.destinations, item.id),
                    }))
                  }
                />
              ))}
            </div>
            <div>
              <p className="eyebrow">{t("startTitle")}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <ChoiceCard
                  image="sunset-2"
                  label={t("tailored")}
                  note={t("tailoredNote")}
                  selectedLabel={selectedLabel}
                  pressed={state.tripType === ""}
                  onClick={() => setState((current) => ({ ...current, tripType: "" }))}
                />
                {featuredStarts.map((slug) => {
                  const journey = packages.find((item) => item.slug === slug);
                  if (!journey) {
                    return null;
                  }
                  return (
                    <ChoiceCard
                      key={slug}
                      image={journey.cover}
                      label={packageCopy(`${slug}.name`)}
                      note={packageCopy(`${slug}.subtitle`)}
                      selectedLabel={selectedLabel}
                      pressed={state.tripType === slug}
                      onClick={() => setState((current) => ({ ...current, tripType: slug }))}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="grid gap-8">
            <h2 className="display text-[2.2rem] md:text-[3.2rem]">{t("whenTitle")}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="planner-label">
                <span>{t("dateFrom")}</span>
                <input
                  type="date"
                  className="form-field"
                  min={minDate}
                  value={state.dateFrom}
                  onClick={openCalendar}
                  onFocus={openCalendar}
                  onChange={(event) =>
                    updateDates({ dateFrom: event.target.value, dateTo: state.dateTo })
                  }
                />
              </label>
              <label className="planner-label">
                <span>{t("dateTo")}</span>
                <input
                  type="date"
                  className="form-field"
                  min={state.dateFrom || minDate}
                  value={state.dateTo}
                  onClick={openCalendar}
                  onFocus={openCalendar}
                  onChange={(event) =>
                    updateDates({ dateFrom: state.dateFrom, dateTo: event.target.value })
                  }
                />
              </label>
            </div>
            <label className="planner-toggle" data-checked={state.flexible}>
              <input
                className="form-check"
                type="checkbox"
                checked={state.flexible}
                onChange={(event) =>
                  setState((current) => ({ ...current, flexible: event.target.checked }))
                }
              />
              {t("flexible")}
            </label>
            <label className="planner-label max-w-xs">
              <span>{t("nights")}</span>
              <Stepper
                value={state.nights || "0"}
                min={0}
                max={60}
                decrease={t("decrease")}
                increase={t("increase")}
                onChange={(nights) =>
                  setState((current) => ({
                    ...current,
                    nights: nights === "0" ? "" : nights,
                  }))
                }
              />
              <span className="text-[0.72rem] tracking-normal text-muted">{t("nightsHint")}</span>
            </label>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="grid gap-8">
            <h2 className="display text-[2.2rem] md:text-[3.2rem]">{t("whoTitle")}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="planner-label">
                <span>{t("adults")}</span>
                <Stepper
                  value={state.adults}
                  min={1}
                  max={20}
                  decrease={t("decrease")}
                  increase={t("increase")}
                  onChange={(adults) => setState((current) => ({ ...current, adults }))}
                />
              </label>
              <label className="planner-label">
                <span>{t("children")}</span>
                <Stepper
                  value={state.children}
                  min={0}
                  max={12}
                  decrease={t("decrease")}
                  increase={t("increase")}
                  onChange={(children) =>
                    setState((current) => ({
                      ...current,
                      children,
                      childAges: children === "0" ? "" : current.childAges,
                    }))
                  }
                />
              </label>
            </div>
            {state.children !== "0" && state.children !== "" ? (
              <label className="planner-label">
                <span>{t("childAges")}</span>
                <input
                  className="form-field"
                  inputMode="text"
                  autoComplete="off"
                  placeholder={t("childAgesHint")}
                  value={state.childAges}
                  onChange={(event) =>
                    setState((current) => ({ ...current, childAges: event.target.value }))
                  }
                />
              </label>
            ) : null}
            <fieldset>
              <legend className="eyebrow mb-4">{t("occasion")}</legend>
              <div className="flex flex-wrap gap-3">
                {occasions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={state.occasion === item.id}
                    onClick={() =>
                      setState((current) => ({
                        ...current,
                        occasion: current.occasion === item.id ? "" : item.id,
                      }))
                    }
                    className="planner-chip"
                  >
                    {t(item.label)}
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="grid gap-8">
            <h2 className="display text-[2.2rem] md:text-[3.2rem]">{t("feelTitle")}</h2>
            <fieldset>
              <legend className="eyebrow mb-5">{t("styleLegend")}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {styles.map((item) => (
                  <ChoiceCard
                    key={item.slug}
                    image={item.cover}
                    label={styleCopy(`${item.slug}.name`)}
                    selectedLabel={selectedLabel}
                    pressed={state.styles.includes(item.slug)}
                    onClick={() =>
                      setState((current) => ({
                        ...current,
                        styles: toggle(current.styles, item.slug),
                      }))
                    }
                  />
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="planner-label">
                <span>{t("budgetCurrency")}</span>
                <select
                  className="form-field"
                  value={state.budgetCurrency}
                  onChange={(event) =>
                    setState((current) => ({ ...current, budgetCurrency: event.target.value }))
                  }
                >
                  <option>USD</option>
                  <option>CHF</option>
                  <option>EUR</option>
                </select>
              </label>
              <label className="planner-label">
                <span>{t("budget")}</span>
                <input
                  className="form-field"
                  inputMode="numeric"
                  placeholder="3,500"
                  value={state.budget}
                  onChange={(event) => setState((current) => ({ ...current, budget: event.target.value }))}
                />
                <span className="text-[0.72rem] tracking-normal text-muted">{t("budgetHint")}</span>
              </label>
            </div>
            <label className="planner-label">
              <span>{t("interests")}</span>
              <textarea
                rows={4}
                className="form-field"
                placeholder={t("interests")}
                value={state.interests}
                onChange={(event) =>
                  setState((current) => ({ ...current, interests: event.target.value }))
                }
              />
            </label>
            <label className="planner-label">
              <span>{t("notes")}</span>
              <textarea
                rows={4}
                className="form-field"
                placeholder={t("notes")}
                value={state.notes}
                onChange={(event) => setState((current) => ({ ...current, notes: event.target.value }))}
              />
            </label>
          </section>
        ) : null}

        {step === 5 ? (
          <section className="grid gap-8">
            <h2 className="display text-[2.2rem] md:text-[3.2rem]">{t("contactTitle")}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="planner-label">
                <span>
                  {t("firstName")} {t("required")}
                </span>
                <input
                  name="firstName"
                  required
                  autoComplete="given-name"
                  className="form-field"
                  value={state.firstName}
                  onChange={(event) =>
                    setState((current) => ({ ...current, firstName: event.target.value }))
                  }
                />
              </label>
              <label className="planner-label">
                <span>
                  {t("lastName")} {t("required")}
                </span>
                <input
                  name="lastName"
                  required
                  autoComplete="family-name"
                  className="form-field"
                  value={state.lastName}
                  onChange={(event) =>
                    setState((current) => ({ ...current, lastName: event.target.value }))
                  }
                />
              </label>
              <label className="planner-label">
                <span>
                  {t("email")} {t("required")}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-field"
                  value={state.email}
                  onChange={(event) => setState((current) => ({ ...current, email: event.target.value }))}
                />
              </label>
              <label className="planner-label">
                <span>{t("phone")}</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="form-field"
                  value={state.phone}
                  onChange={(event) => setState((current) => ({ ...current, phone: event.target.value }))}
                />
              </label>
              <label className="planner-label md:col-span-2">
                <span>{t("country")}</span>
                <input
                  name="country"
                  autoComplete="country-name"
                  className="form-field"
                  value={state.country}
                  onChange={(event) =>
                    setState((current) => ({ ...current, country: event.target.value }))
                  }
                />
              </label>
            </div>
            <fieldset>
              <legend className="eyebrow mb-4">{t("contactPref")}</legend>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    ["whatsapp", "whatsapp"],
                    ["email", "emailPref"],
                    ["phone", "phonePref"],
                  ] as const
                ).map(([value, key]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={state.contactPreference === value}
                    onClick={() => setState((current) => ({ ...current, contactPreference: value }))}
                    className="planner-chip"
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
              <input type="hidden" name="contactPreference" value={state.contactPreference} />
            </fieldset>
            <label className="planner-toggle items-start py-4">
              <input name="consent" value="yes" type="checkbox" required className="form-check mt-0.5" />
              {t("consent")}
            </label>
            {result && !result.ok ? <p className="text-sm text-bronze">{result.error}</p> : null}
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {step > 1 ? (
            <button
              type="button"
              className="form-action form-action-ghost"
              onClick={() => setStep((value) => value - 1)}
            >
              {t("back")}
            </button>
          ) : null}
          {step < 5 ? (
            <button
              type="button"
              className="form-action form-action-primary"
              onClick={() => setStep((value) => value + 1)}
            >
              {t("continue")}
            </button>
          ) : (
            <button type="submit" disabled={pending} className="form-action form-action-primary disabled:opacity-60">
              {pending ? t("sending") : t("submit")}
            </button>
          )}
        </div>
      </form>

      <aside className="border-t border-line pt-8 lg:sticky lg:top-28 lg:border-t-0 lg:pt-0">
        <div className="photo-frame relative mb-6 aspect-[16/10]">
          <MediaFrame id={briefImage} sizes="(min-width: 1024px) 30vw, 100vw" />
        </div>
        <p className="eyebrow">{t("briefTitle")}</p>
        <dl className="mt-6 space-y-4 text-sm leading-7">
          <div>
            <dt className="photo-caption">{t("briefPlaces")}</dt>
            <dd className="mt-1 text-ink">
              {state.destinations.length
                ? state.destinations.map((id) => t(id as "tanzania")).join(" · ")
                : t("briefEmpty")}
            </dd>
          </div>
          <div>
            <dt className="photo-caption">{t("briefStart")}</dt>
            <dd className="mt-1 text-ink">{packageName ?? t("tailoredShort")}</dd>
          </div>
          <div>
            <dt className="photo-caption">{t("briefWhen")}</dt>
            <dd className="mt-1 text-ink">
              {dateSummary || t("discuss")}
              {state.flexible ? ` · ${t("flexible")}` : ""}
              {state.nights ? ` · ${state.nights}` : ""}
            </dd>
          </div>
          <div>
            <dt className="photo-caption">{t("briefWho")}</dt>
            <dd className="mt-1 text-ink">
              {state.adults} {t("adultsShort")}
              {state.children !== "0" && state.children !== ""
                ? ` · ${state.children} ${t("childrenShort")}`
                : ""}
              {state.occasion
                ? ` · ${t(occasions.find((item) => item.id === state.occasion)?.label ?? "discuss")}`
                : ""}
            </dd>
          </div>
          <div>
            <dt className="photo-caption">{t("briefFeel")}</dt>
            <dd className="mt-1 text-ink">
              {selectedStyles.length
                ? selectedStyles.map((item) => styleCopy(`${item.slug}.name`)).join(" · ")
                : t("discuss")}
            </dd>
          </div>
        </dl>
        <p className="photo-caption mt-8">{t("promise")}</p>
      </aside>
    </div>
  );
}
