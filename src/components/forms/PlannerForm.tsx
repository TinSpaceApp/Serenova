"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitPlanner, type LeadResult } from "@/app/actions/leads";
import { packages, styles } from "@/content/catalog";

const STORAGE_KEY = "serenova-planner";
const field =
  "min-h-12 w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-serif text-base text-ink outline-none focus:border-bronze";

type PlannerState = {
  destinations: string[];
  tripType: string;
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

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function PlannerForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<PlannerState>(empty);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState({ ...empty, ...JSON.parse(saved) });
      } catch {
        /* ignore broken drafts */
      }
    }
    const destination = params.get("destination");
    const pack = params.get("package");
    const style = params.get("style");
    setState((current) => ({
      ...current,
      destinations: destination
        ? Array.from(new Set([...current.destinations, destination]))
        : current.destinations,
      styles: style ? Array.from(new Set([...current.styles, style])) : current.styles,
      tripType: pack || current.tripType,
    }));
  }, [params]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const packageName = useMemo(
    () => packages.find((item) => item.slug === state.tripType)?.name,
    [state.tripType],
  );

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
      <p className="rounded-2xl bg-ivory px-6 py-10 text-lg leading-8">
        Your brief is with Jenny. She reads every request herself and will come back to you
        personally.
      </p>
    );
  }

  return (
    <form action={onSubmit} className="grid gap-10">
      <input type="hidden" name="package" value={state.tripType} />
      <input type="hidden" name="destination" value={state.destinations[0] ?? ""} />
      <input type="hidden" name="tripType" value={state.tripType} />
      <input type="hidden" name="dates" value={state.dates} />
      <input type="hidden" name="nights" value={state.nights} />
      <input type="hidden" name="adults" value={state.adults} />
      <input type="hidden" name="children" value={state.children} />
      <input type="hidden" name="childAges" value={state.childAges} />
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
      <ol className="flex flex-wrap gap-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-muted">
        {["Your trip", "Your preferences", "Your details", "Review"].map((label, index) => (
          <li
            key={label}
            className={step === index + 1 ? "text-ink" : ""}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <section className="grid gap-6">
          <fieldset>
            <legend className="eyebrow mb-4">Destinations</legend>
            <div className="flex flex-wrap gap-3">
              {["tanzania", "zanzibar", "kenya", "uganda"].map((item) => (
                <label key={item} className="inline-flex min-h-11 items-center gap-2 font-sans text-sm capitalize">
                  <input
                    type="checkbox"
                    name="destinations"
                    value={item}
                    checked={state.destinations.includes(item)}
                    onChange={() =>
                      setState((current) => ({
                        ...current,
                        destinations: toggle(current.destinations, item),
                      }))
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="grid gap-2 font-sans text-sm">
            Starting point
            <select
              name="tripType"
              className={field}
              value={state.tripType}
              onChange={(event) => setState((current) => ({ ...current, tripType: event.target.value }))}
            >
              <option value="">A completely tailored journey</option>
              {packages.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 font-sans text-sm">
              Preferred dates
              <input
                name="dates"
                className={field}
                value={state.dates}
                onChange={(event) => setState((current) => ({ ...current, dates: event.target.value }))}
              />
            </label>
            <label className="inline-flex items-center gap-2 font-sans text-sm">
              <input
                type="checkbox"
                name="flexible"
                checked={state.flexible}
                onChange={(event) =>
                  setState((current) => ({ ...current, flexible: event.target.checked }))
                }
              />
              Dates are flexible
            </label>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <label className="grid gap-2 font-sans text-sm">
              Nights
              <input
                name="nights"
                className={field}
                value={state.nights}
                onChange={(event) => setState((current) => ({ ...current, nights: event.target.value }))}
              />
            </label>
            <label className="grid gap-2 font-sans text-sm">
              Adults
              <input
                name="adults"
                className={field}
                value={state.adults}
                onChange={(event) => setState((current) => ({ ...current, adults: event.target.value }))}
              />
            </label>
            <label className="grid gap-2 font-sans text-sm">
              Children
              <input
                name="children"
                className={field}
                value={state.children}
                onChange={(event) =>
                  setState((current) => ({ ...current, children: event.target.value }))
                }
              />
            </label>
          </div>
          <label className="grid gap-2 font-sans text-sm">
            Ages of children
            <input
              name="childAges"
              className={field}
              value={state.childAges}
              onChange={(event) =>
                setState((current) => ({ ...current, childAges: event.target.value }))
              }
            />
          </label>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="grid gap-6">
          <fieldset>
            <legend className="eyebrow mb-4">Style</legend>
            <div className="grid gap-3 md:grid-cols-2">
              {styles.map((item) => (
                <label key={item.slug} className="inline-flex min-h-11 items-center gap-2 font-sans text-sm">
                  <input
                    type="checkbox"
                    name="styles"
                    value={item.slug}
                    checked={state.styles.includes(item.slug)}
                    onChange={() =>
                      setState((current) => ({
                        ...current,
                        styles: toggle(current.styles, item.slug),
                      }))
                    }
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 font-sans text-sm">
              Currency
              <select
                name="budgetCurrency"
                className={field}
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
            <label className="grid gap-2 font-sans text-sm">
              Budget per person
              <input
                name="budget"
                className={field}
                value={state.budget}
                onChange={(event) => setState((current) => ({ ...current, budget: event.target.value }))}
              />
            </label>
          </div>
          <label className="grid gap-2 font-sans text-sm">
            What are you most hoping for?
            <textarea
              name="interests"
              rows={4}
              className={`${field} resize-y`}
              value={state.interests}
              onChange={(event) =>
                setState((current) => ({ ...current, interests: event.target.value }))
              }
            />
          </label>
          <label className="grid gap-2 font-sans text-sm">
            Anything else Jenny should know?
            <textarea
              name="notes"
              rows={4}
              className={`${field} resize-y`}
              value={state.notes}
              onChange={(event) => setState((current) => ({ ...current, notes: event.target.value }))}
            />
          </label>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 font-sans text-sm">
            First name *
            <input
              name="firstName"
              required
              className={field}
              value={state.firstName}
              onChange={(event) =>
                setState((current) => ({ ...current, firstName: event.target.value }))
              }
            />
          </label>
          <label className="grid gap-2 font-sans text-sm">
            Last name *
            <input
              name="lastName"
              required
              className={field}
              value={state.lastName}
              onChange={(event) =>
                setState((current) => ({ ...current, lastName: event.target.value }))
              }
            />
          </label>
          <label className="grid gap-2 font-sans text-sm">
            Email *
            <input
              name="email"
              type="email"
              required
              className={field}
              value={state.email}
              onChange={(event) => setState((current) => ({ ...current, email: event.target.value }))}
            />
          </label>
          <label className="grid gap-2 font-sans text-sm">
            Phone
            <input
              name="phone"
              className={field}
              value={state.phone}
              onChange={(event) => setState((current) => ({ ...current, phone: event.target.value }))}
            />
          </label>
          <label className="grid gap-2 font-sans text-sm">
            Country of residence
            <input
              name="country"
              className={field}
              value={state.country}
              onChange={(event) =>
                setState((current) => ({ ...current, country: event.target.value }))
              }
            />
          </label>
          <fieldset className="grid gap-2 font-sans text-sm">
            <legend>How should Jenny reach you?</legend>
            {["whatsapp", "email", "phone"].map((item) => (
              <label key={item} className="inline-flex items-center gap-2 capitalize">
                <input
                  type="radio"
                  name="contactPreference"
                  value={item}
                  checked={state.contactPreference === item}
                  onChange={() =>
                    setState((current) => ({ ...current, contactPreference: item }))
                  }
                />
                {item}
              </label>
            ))}
          </fieldset>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="grid gap-4 text-lg leading-8 text-muted">
          <p>
            <strong className="text-ink">Destinations:</strong>{" "}
            {state.destinations.join(", ") || "To be discussed"}
          </p>
          <p>
            <strong className="text-ink">Starting point:</strong> {packageName ?? "Fully tailored"}
          </p>
          <p>
            <strong className="text-ink">Travellers:</strong> {state.adults} adults
            {state.children !== "0" ? `, ${state.children} children` : ""}
          </p>
          <p>
            <strong className="text-ink">Jenny will write to:</strong> {state.firstName} {state.lastName}{" "}
            · {state.email}
          </p>
          <label className="flex items-start gap-3 font-sans text-sm">
            <input name="consent" value="yes" type="checkbox" required className="mt-1" />
            I agree to the processing of my details so Jenny can prepare a personal proposal.
          </label>
          {result && !result.ok ? <p className="text-sm text-bronze">{result.error}</p> : null}
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {step > 1 ? (
          <button
            type="button"
            className="min-h-11 rounded-full border border-line px-5 font-sans text-sm"
            onClick={() => setStep((value) => value - 1)}
          >
            Back
          </button>
        ) : null}
        {step < 4 ? (
          <button
            type="button"
            className="min-h-11 rounded-full bg-bronze px-5 font-sans text-sm text-white"
            onClick={() => setStep((value) => value + 1)}
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className="min-h-11 rounded-full bg-bronze px-5 font-sans text-sm text-white disabled:opacity-60"
          >
            {pending ? "Sending…" : "Start my journey"}
          </button>
        )}
      </div>
    </form>
  );
}
