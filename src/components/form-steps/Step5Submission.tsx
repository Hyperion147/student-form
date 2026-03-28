"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon, Mail01Icon, WhatsappIcon, Tick01Icon, Loading01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { SubmissionPreference } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  deliveryMethod: z.enum(["email", "whatsapp", "both"]),
  emailInput: z.string().optional(),
  whatsappInput: z.string().optional(),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to receive your results.",
  }),
}).superRefine((data, ctx) => {
  if (data.deliveryMethod === "email" || data.deliveryMethod === "both") {
    if (!data.emailInput || !/^\S+@\S+\.\S+$/.test(data.emailInput)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["emailInput"],
        message: "Please enter a valid email address.",
      });
    }
  }
  if (data.deliveryMethod === "whatsapp" || data.deliveryMethod === "both") {
    if (!data.whatsappInput || data.whatsappInput.length < 5) { // Basic length check for international
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["whatsappInput"],
        message: "Please enter a valid WhatsApp number.",
      });
    }
  }
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
    label: "Email",
    value: "email" as const,
    icon: <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5" />,
    hint: "PDF directly to your inbox"
  },
  {
    label: "WhatsApp",
    value: "whatsapp" as const,
    icon: <HugeiconsIcon icon={WhatsappIcon} className="w-5 h-5 text-green-500" />,
    hint: "Instant updates via chat"
  },
  {
    label: "Both",
    value: "both" as const,
    icon: <HugeiconsIcon icon={SentIcon} className="w-5 h-5 text-campus-500" />,
    hint: "Best for sharing & storage"
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
    watch,
    formState: { errors },
  } = useForm<SubmissionPreference & { emailInput?: string; whatsappInput?: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      deliveryMethod: method,
      emailInput: defaultValues?.deliveryMethod === "both" 
        ? (defaultValues?.contactValue ?? "").split('|')[0] 
        : (defaultValues?.deliveryMethod === "email" ? defaultValues?.contactValue : (defaultEmail ?? "")),
      whatsappInput: defaultValues?.deliveryMethod === "both" 
        ? (defaultValues?.contactValue ?? "").split('|')[1] 
        : (defaultValues?.deliveryMethod === "whatsapp" ? defaultValues?.contactValue : ""),
      agreeToTerms: false,
    },
  });

  const handleMethodSelect = (m: DeliveryMethod) => {
    setMethod(m);
    setValue("deliveryMethod", m);
  };

  const handleFormSubmit = (data: SubmissionPreference & { emailInput?: string; whatsappInput?: string }) => {
    let finalContact = "";
    if (data.deliveryMethod === "both") {
      finalContact = `${data.emailInput || ""}|${data.whatsappInput || ""}`;
    } else if (data.deliveryMethod === "email") {
      finalContact = data.emailInput || "";
    } else {
      finalContact = data.whatsappInput || "";
    }

    const submissionData: SubmissionPreference = {
      deliveryMethod: data.deliveryMethod,
      contactValue: finalContact || data.contactValue,
      agreeToTerms: data.agreeToTerms,
    };

    saveFormStep("submission", submissionData);
    onSubmit(submissionData);
  };

  const isWhatsapp = method === "whatsapp" || method === "both";
  const isEmail = method === "email" || method === "both";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <HugeiconsIcon icon={SentIcon} className="w-4 h-4 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Almost Done!</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Review your choices and select how you'd like to receive your personalised AI results.
        </p>
      </div>

      <Card className="bg-gradient-to-br from-campus-50/50 to-indigo-50/50 border-campus-100 shadow-sm mb-8">
        <CardContent className="p-4">
          <p className="text-[10px] font-bold text-campus-600 uppercase tracking-widest mb-3">
            Your Assessment Summary
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {[
              "Personal & academic details",
              "Domain interests & preferences",
              "Knowledge assessment responses",
              "Challenges, approach & goals"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Tick01Icon} className="w-3 h-3 text-green-600" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <Label className="text-base font-semibold text-slate-800 mb-4 block">
          📬 How should we send your results?
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {methods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => handleMethodSelect(m.value)}
              className={cn(
                "group flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all duration-300",
                method === m.value
                  ? "border-campus-500 bg-campus-50/50 text-campus-700 shadow-sm"
                  : "border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50/50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                method === m.value ? "bg-campus-500 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
              )}>
                {m.icon}
              </div>
              <span className="text-sm font-bold">{m.label}</span>
              <span className="text-[10px] text-slate-400 leading-tight hidden sm:block opacity-70 group-hover:opacity-100">{m.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 space-y-4">
        {isEmail && (
          <div className="space-y-2">
            <Label htmlFor="emailInput" className="flex items-center gap-2 text-slate-700">
              <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 text-campus-500" />
              Email Address
            </Label>
            <Input
              id="emailInput"
              {...register("emailInput")}
              type="email"
              placeholder="your@email.com"
              className={cn("transition-all duration-300", errors.emailInput && "border-destructive ring-destructive/20")}
            />
            {errors.emailInput && (
              <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in mt-1">
                <span className="text-sm">⚠</span> {errors.emailInput.message}
              </p>
            )}
          </div>
        )}
        {isWhatsapp && (
          <div className="space-y-2">
            <Label htmlFor="whatsappInput" className="flex items-center gap-2 text-slate-700">
              <HugeiconsIcon icon={WhatsappIcon} className="w-4 h-4 text-green-500" />
              WhatsApp Number (with country code)
            </Label>
            <Input
              id="whatsappInput"
              {...register("whatsappInput")}
              type="tel"
              placeholder="+91 98765 43210"
              className={cn("transition-all duration-300", errors.whatsappInput && "border-destructive ring-destructive/20")}
            />
            {errors.whatsappInput && (
              <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in mt-1">
                <span className="text-sm">⚠</span> {errors.whatsappInput.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div 
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
            errors.agreeToTerms ? "border-destructive/20 bg-destructive/5" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
          )}
          onClick={() => {
            const current = (document.getElementById('agreeToTerms') as HTMLInputElement)?.checked;
            setValue("agreeToTerms", !current, { shouldValidate: true });
          }}
        >
          <Checkbox 
            id="agreeToTerms"
            {...register("agreeToTerms")}
            onCheckedChange={(checked) => setValue("agreeToTerms", !!checked, { shouldValidate: true })}
            className="mt-0.5 border-slate-300 data-checked:bg-campus-600 data-checked:border-campus-600"
          />
          <Label htmlFor="agreeToTerms" className="text-xs sm:text-sm text-slate-600 leading-relaxed cursor-pointer font-normal">
            I agree to receive my assessment results and personalised career suggestions to the contact
            provided above. I understand this data will be used only for generating my report.
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
            <span className="text-sm">⚠</span> {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <Button 
          variant="outline" 
          type="button" 
          onClick={onBack} 
          disabled={isSubmitting} 
          className="gap-2 px-6"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white gap-2 px-8 shadow-green-200 shadow-lg"
        >
          {isSubmitting ? (
            <>
              <HugeiconsIcon icon={Loading01Icon} className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <HugeiconsIcon icon={SentIcon} className="w-4 h-4" />
              Submit & Get Results
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
