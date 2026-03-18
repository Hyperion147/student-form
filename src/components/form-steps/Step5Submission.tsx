"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SendIcon, MailIcon, MessageCircleIcon, CheckIcon, LoaderIcon } from "lucide-react";
import { SubmissionPreference } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";

const schema = z.object({
  deliveryMethod: z.enum(["email", "whatsapp", "both"]),
  contactValue: z.string().min(5, "Please enter a valid contact."),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to receive your results.",
  }),
});

interface Props {
  defaultEmail?: string;
  defaultValues?: Partial<SubmissionPreference>;
  onSubmit: (data: SubmissionPreference) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

type DeliveryMethod = "email" | "whatsapp" | "both";

const methods: { value: DeliveryMethod; label: string; icon: React.ReactNode; hint: string }[] = [
  {
    value: "email",
    label: "Email",
    icon: <MailIcon className="w-5 h-5" />,
    hint: "Receive a detailed PDF report to your inbox",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: <MessageCircleIcon className="w-5 h-5" />,
    hint: "Get a quick summary on WhatsApp",
  },
  {
    value: "both",
    label: "Both",
    icon: (
      <span className="flex gap-0.5">
        <MailIcon className="w-4 h-4" />
        <MessageCircleIcon className="w-4 h-4" />
      </span>
    ),
    hint: "Full report via email + summary on WhatsApp",
  },
];

export function Step5Submission({ defaultEmail, defaultValues, onSubmit, onBack, isSubmitting }: Props) {
  const [method, setMethod] = useState<DeliveryMethod>(
    defaultValues?.deliveryMethod ?? "email"
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubmissionPreference>({
    resolver: zodResolver(schema),
    defaultValues: {
      deliveryMethod: method,
      contactValue: defaultValues?.contactValue ?? defaultEmail ?? "",
      agreeToTerms: false,
    },
  });

  const handleMethodSelect = (m: DeliveryMethod) => {
    setMethod(m);
    setValue("deliveryMethod", m);
  };

  const handleFormSubmit = (data: SubmissionPreference) => {
    saveFormStep("submission", data);
    onSubmit(data);
  };

  const isWhatsapp = method === "whatsapp" || method === "both";
  const isEmail = method === "email" || method === "both";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <SendIcon className="w-4 h-4 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Almost Done!</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Review your choices and select how you'd like to receive your personalised AI results.
        </p>
      </div>

      {/* Review summary */}
      <div className="bg-gradient-to-br from-campus-50 to-indigo-50 border border-campus-100 rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-campus-600 uppercase tracking-wide mb-2">
          ✅ Your submission includes
        </p>
        <ul className="space-y-1.5 text-sm text-slate-700">
          <li className="flex items-center gap-2">
            <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
            Personal & academic details
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
            Domain interests and preferences
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
            Domain-specific knowledge assessment
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
            Challenges, approach & goals
          </li>
        </ul>
      </div>

      {/* Delivery method */}
      <div className="mb-5">
        <label className="label-text text-base mb-3">
          📬 How should we send your results?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {methods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => handleMethodSelect(m.value)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all duration-200",
                method === m.value
                  ? "border-campus-500 bg-campus-50 text-campus-700"
                  : "border-slate-200 text-slate-500 hover:border-campus-300"
              )}
            >
              {m.icon}
              <span className="text-sm font-medium">{m.label}</span>
              <span className="text-xs text-slate-400 leading-tight hidden sm:block">{m.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact input */}
      <div className="mb-5 space-y-3">
        {isEmail && (
          <div>
            <label className="label-text">
              <MailIcon className="w-3.5 h-3.5 text-campus-400" />
              Email Address
            </label>
            <input
              {...register("contactValue")}
              type="email"
              className="input-field"
              placeholder="your@email.com"
            />
          </div>
        )}
        {isWhatsapp && (
          <div>
            <label className="label-text">
              <MessageCircleIcon className="w-3.5 h-3.5 text-green-500" />
              WhatsApp Number (with country code)
            </label>
            <input
              type="tel"
              className="input-field"
              placeholder="+91 98765 43210"
              onChange={(e) =>
                setValue(
                  "contactValue",
                  isEmail
                    ? `${(document.querySelector('input[type="email"]') as HTMLInputElement)?.value ?? ""}|${e.target.value}`
                    : e.target.value
                )
              }
            />
          </div>
        )}
        {errors.contactValue && (
          <p className="error-text">⚠ {errors.contactValue.message}</p>
        )}
      </div>

      {/* Agreement */}
      <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
        <input
          type="checkbox"
          {...register("agreeToTerms")}
          className="mt-0.5 w-4 h-4 rounded accent-campus-600 cursor-pointer"
        />
        <span className="text-sm text-slate-600">
          I agree to receive my assessment results and personalised career suggestions to the contact
          provided above. I understand this data will be used only for generating my report.
        </span>
      </label>
      {errors.agreeToTerms && (
        <p className="error-text mt-1">⚠ {errors.agreeToTerms.message}</p>
      )}

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary" disabled={isSubmitting}>
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Analysing…
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Submit & Get Results
            </>
          )}
        </button>
      </div>
    </form>
  );
}
