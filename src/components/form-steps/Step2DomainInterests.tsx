"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CompassIcon, AlertCircleIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Domain, DomainInterests, DOMAIN_META } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Props {
  defaultValues?: Partial<DomainInterests>;
  onNext: (data: DomainInterests) => void;
  onBack: () => void;
}

const MAX_DOMAINS = 3;
const MIN_DOMAINS = 1;

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
            <HugeiconsIcon icon={CompassIcon} className="w-4 h-4 text-campus-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">What excites you?</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Pick <strong>1–3 domains</strong> that interest you the most. These will shape your personalised assessment.
        </p>
        <div className="ml-10 mt-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            {Array.from({ length: MAX_DOMAINS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-8 h-1.5 rounded-full transition-all duration-300",
                  i < selected.length ? "bg-campus-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" : "bg-slate-200"
                )}
              />
            ))}
          </div>
          <Badge variant="secondary" className="px-2 py-0 h-5 text-[10px] font-bold border-campus-100 bg-campus-50 text-campus-700">
            {selected.length}/{MAX_DOMAINS} SELECTED
          </Badge>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <HugeiconsIcon icon={AlertCircleIcon} className="w-3.5 h-3.5 shrink-0" />
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

      <div className="mt-10 flex justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2 px-6">
            <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          className="bg-campus-600 hover:bg-campus-700 text-white gap-2 px-8"
        >
          Next: Knowledge Check
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
