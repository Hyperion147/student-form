"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { STEP_LABELS } from "@/types/form";
import { Progress } from "@/components/ui/progress";

interface StepperProps {
  currentStep: number;
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full">
      {/* Mobile: compact dots */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 py-2">
        {STEP_LABELS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-full transition-all duration-300",
              i === currentStep
                ? "w-6 h-2 bg-campus-600"
                : i < currentStep
                ? "w-2 h-2 bg-campus-400"
                : "w-2 h-2 bg-slate-200"
            )}
          />
        ))}
      </div>

      {/* Desktop: full stepper */}
      <div className="hidden sm:flex items-start justify-between relative">
        <div className="absolute top-5 left-0 right-0 z-0">
          <Progress 
            value={(currentStep / (STEP_LABELS.length - 1)) * 100} 
            className="h-0.5 bg-slate-200"
          />
        </div>

        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-2 z-10">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                i === currentStep
                  ? "bg-campus-600 text-white shadow-lg shadow-campus-200 scale-110"
                  : i < currentStep
                  ? "bg-campus-500 text-white"
                  : "bg-white text-slate-400 border-2 border-slate-200"
              )}
            >
              {i < currentStep ? (
                <HugeiconsIcon icon={Tick01Icon} className="w-5 h-5" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium text-center max-w-[72px] leading-tight",
                i === currentStep
                  ? "text-campus-700"
                  : i < currentStep
                  ? "text-campus-500"
                  : "text-slate-400"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Step counter */}
      <p className="text-center text-xs text-slate-400 mt-3 sm:mt-4">
        Step {currentStep + 1} of {STEP_LABELS.length} —{" "}
        <span className="text-campus-600 font-medium">{STEP_LABELS[currentStep]}</span>
      </p>
    </div>
  );
}
