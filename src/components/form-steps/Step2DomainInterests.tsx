"use client";

import { useState } from "react";
import { CompassIcon, AlertCircleIcon } from "lucide-react";
import { Domain, DomainInterests, DOMAIN_META } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";

interface Props {
  defaultValues?: Partial<DomainInterests>;
  onNext: (data: DomainInterests) => void;
  onBack: () => void;
}

const MAX_DOMAINS = 3;
const MIN_DOMAINS = 2;

export function Step2DomainInterests({ defaultValues, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<Domain[]>(
    defaultValues?.selectedDomains ?? []
  );
  const [error, setError] = useState("");

  const toggle = (domain: Domain) => {
    setError("");
    if (selected.includes(domain)) {
      setSelected(selected.filter((d) => d !== domain));
    } else {
      if (selected.length >= MAX_DOMAINS) {
        setError(`You can select a maximum of ${MAX_DOMAINS} domains.`);
        return;
      }
      setSelected([...selected, domain]);
    }
  };

  const handleNext = () => {
    if (selected.length < MIN_DOMAINS) {
      setError(`Please select at least ${MIN_DOMAINS} domains you're interested in.`);
      return;
    }
    const data: DomainInterests = { selectedDomains: selected };
    saveFormStep("domainInterests", data);
    onNext(data);
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <CompassIcon className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">What excites you?</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Pick <strong>2–3 domains</strong> that interest you the most. These will shape your personalised assessment.
        </p>
        <div className="ml-10 mt-2 flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: MAX_DOMAINS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-6 h-2 rounded-full transition-all duration-200",
                  i < selected.length ? "bg-campus-500" : "bg-slate-200"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            {selected.length}/{MAX_DOMAINS} selected
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <AlertCircleIcon className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.entries(DOMAIN_META) as [Domain, typeof DOMAIN_META[Domain]][]).map(
          ([domain, meta]) => {
            const isSelected = selected.includes(domain);
            const isDisabled = !isSelected && selected.length >= MAX_DOMAINS;

            return (
              <button
                key={domain}
                type="button"
                onClick={() => !isDisabled && toggle(domain)}
                className={cn(
                  "domain-card text-left group",
                  isSelected && "domain-card-selected",
                  isDisabled && "opacity-40 cursor-not-allowed hover:border-slate-200 hover:shadow-none"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-slate-800 group-hover:text-campus-700">
                        {meta.label}
                      </span>
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-150",
                          isSelected
                            ? "border-campus-500 bg-campus-500"
                            : "border-slate-300"
                        )}
                      >
                        {isSelected && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {meta.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="button" onClick={handleNext} className="btn-primary">
          Next: Knowledge Check →
        </button>
      </div>
    </div>
  );
}
