"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import { email as agencyEmail, services } from "@/lib/content";

const serviceOptions = [...services.map((s) => s.title), "Something else"];

const budgetOptions = [
  "Under $5k",
  "$5k to $15k",
  "$15k to $50k",
  "Over $50k",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1 to 3 months",
  "Flexible",
];

const channels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    inputLabel: "WhatsApp number",
    type: "tel",
    placeholder: "+62 812 3456 7890",
    autoComplete: "tel",
  },
  {
    id: "email",
    label: "Email",
    inputLabel: "Email address",
    type: "email",
    placeholder: "you@company.com",
    autoComplete: "email",
  },
  {
    id: "line",
    label: "LINE",
    inputLabel: "LINE ID",
    type: "text",
    placeholder: "your-line-id",
    autoComplete: "off",
  },
  {
    id: "wechat",
    label: "WeChat",
    inputLabel: "WeChat ID",
    type: "text",
    placeholder: "your-wechat-id",
    autoComplete: "off",
  },
  {
    id: "telegram",
    label: "Telegram",
    inputLabel: "Telegram username or number",
    type: "text",
    placeholder: "@username",
    autoComplete: "off",
  },
  {
    id: "instagram",
    label: "Instagram",
    inputLabel: "Instagram username",
    type: "text",
    placeholder: "@yourbusiness",
    autoComplete: "off",
  },
  {
    id: "x",
    label: "X",
    inputLabel: "X handle",
    type: "text",
    placeholder: "@yourbusiness",
    autoComplete: "off",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    inputLabel: "LinkedIn profile URL",
    type: "url",
    placeholder: "https://linkedin.com/in/you",
    autoComplete: "off",
  },
] as const;

type ChannelId = (typeof channels)[number]["id"];

type FormData = {
  services: string[];
  businessName: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  budget: string;
  timeline: string;
  name: string;
  channel: ChannelId | "";
  contact: string;
};

const initialData: FormData = {
  services: [],
  businessName: "",
  industry: "",
  website: "",
  location: "",
  description: "",
  budget: "",
  timeline: "",
  name: "",
  channel: "",
  contact: "",
};

const steps = [
  "How can we help?",
  "About your business",
  "About the project",
  "Your details",
];

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-moss/60 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/30";

function Field({
  label,
  htmlFor,
  optional = false,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-moss">optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the step heading so keyboard and screen reader users
  // land at the top of each new step.
  useEffect(() => {
    if (step > 0 || submitted) headingRef.current?.focus();
  }, [step, submitted]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (service: string) => {
    set(
      "services",
      data.services.includes(service)
        ? data.services.filter((s) => s !== service)
        : [...data.services, service]
    );
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (step === 0 && data.services.length === 0) {
      next.services = "Pick at least one, so we know where to start.";
    }
    if (step === 1 && !data.businessName.trim()) {
      next.businessName = "Tell us the name of your business.";
    }
    if (step === 2 && data.description.trim().length < 20) {
      next.description =
        "A couple of sentences helps us come prepared. What should this project achieve?";
    }
    if (step === 3) {
      if (!data.name.trim()) next.name = "We need a name to reply to.";
      if (!data.channel) {
        next.channel = "Pick the channel you prefer.";
      } else if (
        data.channel === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.trim())
      ) {
        next.contact = "That email does not look right.";
      } else if (data.contact.trim().length < 3) {
        const channel = channels.find((c) => c.id === data.channel);
        next.contact = `We need your ${channel?.inputLabel.toLowerCase()} to reach you.`;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validate()) setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "Could not save your request.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not save your request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full bg-sage text-forest">
          <Check size={24} weight="bold" />
        </span>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 font-display text-2xl font-medium tracking-tight outline-none md:text-3xl"
        >
          Your request is on its way
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-moss">
          Thanks, {data.name.split(" ")[0]}. We received your request and will
          get back to you on {channels.find((c) => c.id === data.channel)?.label}{" "}
          within two working days. Anything urgent in the meantime? Write to{" "}
          <a
            href={`mailto:${agencyEmail}`}
            className="text-ink underline underline-offset-4"
          >
            {agencyEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 md:p-12">
      {/* Progress */}
      <div className="mb-10">
        <p className="text-sm text-moss">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-forest transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-2xl font-medium tracking-tight outline-none md:text-3xl"
      >
        {steps[step]}
      </h2>

      <div className="mt-8">
        {step === 0 && (
          <fieldset>
            <legend className="sr-only">Which services do you need?</legend>
            <div className="flex flex-wrap gap-3">
              {serviceOptions.map((service) => {
                const selected = data.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleService(service)}
                    className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                      selected
                        ? "border-forest bg-forest text-cream"
                        : "border-ink/15 bg-white text-ink hover:border-forest/50"
                    }`}
                  >
                    {selected && <Check size={16} weight="bold" />}
                    {service}
                  </button>
                );
              })}
            </div>
            {errors.services && (
              <p className="mt-3 text-sm text-red-700">{errors.services}</p>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field
              label="Business name"
              htmlFor="businessName"
              error={errors.businessName}
            >
              <input
                id="businessName"
                type="text"
                value={data.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                aria-invalid={!!errors.businessName}
                aria-describedby={
                  errors.businessName ? "businessName-error" : undefined
                }
                className={inputClass}
              />
            </Field>
            <Field label="Industry" htmlFor="industry" optional>
              <input
                id="industry"
                type="text"
                value={data.industry}
                onChange={(e) => set("industry", e.target.value)}
                placeholder="Restaurant, retail, finance..."
                className={inputClass}
              />
            </Field>
            <Field label="Current website" htmlFor="website" optional>
              <input
                id="website"
                type="url"
                value={data.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://"
                className={inputClass}
              />
            </Field>
            <Field label="Where are you based?" htmlFor="location" optional>
              <input
                id="location"
                type="text"
                value={data.location}
                onChange={(e) => set("location", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-8">
            <Field
              label="What should this project achieve?"
              htmlFor="description"
              error={errors.description}
            >
              <textarea
                id="description"
                rows={5}
                value={data.description}
                onChange={(e) => set("description", e.target.value)}
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                placeholder="The situation today, what you want to change, and anything already decided."
                className={`${inputClass} resize-y`}
              />
            </Field>

            <fieldset>
              <legend className="text-sm font-medium text-ink">
                Budget range{" "}
                <span className="font-normal text-moss">optional</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={data.budget === option}
                    onClick={() =>
                      set("budget", data.budget === option ? "" : option)
                    }
                    className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
                      data.budget === option
                        ? "border-forest bg-forest text-cream"
                        : "border-ink/15 bg-white text-ink hover:border-forest/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-ink">
                Timeline <span className="font-normal text-moss">optional</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {timelineOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={data.timeline === option}
                    onClick={() =>
                      set("timeline", data.timeline === option ? "" : option)
                    }
                    className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
                      data.timeline === option
                        ? "border-forest bg-forest text-cream"
                        : "border-ink/15 bg-white text-ink hover:border-forest/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-8">
            <Field label="Your name" htmlFor="name" error={errors.name}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />
            </Field>

            <fieldset>
              <legend className="text-sm font-medium text-ink">
                How would you like us to reach you?
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {channels.map((channel) => {
                  const selected = data.channel === channel.id;
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        set("channel", channel.id);
                        // A handle from another channel is meaningless here.
                        if (!selected) set("contact", "");
                      }}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                        selected
                          ? "border-forest bg-forest text-cream"
                          : "border-ink/15 bg-white text-ink hover:border-forest/50"
                      }`}
                    >
                      {selected && <Check size={16} weight="bold" />}
                      {channel.label}
                    </button>
                  );
                })}
              </div>
              {errors.channel && (
                <p className="mt-3 text-sm text-red-700">{errors.channel}</p>
              )}
            </fieldset>

            {data.channel &&
              (() => {
                const channel = channels.find((c) => c.id === data.channel)!;
                return (
                  <Field
                    label={channel.inputLabel}
                    htmlFor="contact"
                    error={errors.contact}
                  >
                    <input
                      id="contact"
                      type={channel.type}
                      autoComplete={channel.autoComplete}
                      placeholder={channel.placeholder}
                      value={data.contact}
                      onChange={(e) => set("contact", e.target.value)}
                      aria-invalid={!!errors.contact}
                      aria-describedby={
                        errors.contact ? "contact-error" : undefined
                      }
                      className={inputClass}
                    />
                  </Field>
                );
              })()}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-moss transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} weight="bold" />
            Back
          </button>
        ) : (
          <span />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Continue
            <ArrowRight size={16} weight="bold" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {submitting ? "Sending..." : "Send request"}
            <PaperPlaneTilt size={16} weight="bold" />
          </button>
        )}
      </div>

      {submitError && (
        <p className="mt-4 text-right text-sm text-red-700" role="alert">
          {submitError} You can also email us at{" "}
          <a
            href={`mailto:${agencyEmail}`}
            className="underline underline-offset-4"
          >
            {agencyEmail}
          </a>
          .
        </p>
      )}
    </div>
  );
}
