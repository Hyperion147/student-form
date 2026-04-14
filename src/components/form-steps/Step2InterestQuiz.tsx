"use client";

import { useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CompassIcon,
  AlertCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { DomainInterests, DOMAIN_META } from "@/types/form";
import {
  inferDomainsFromAnswers,
  PROFILING_QUESTIONS,
} from "@/lib/domainInference";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  defaultValues?: Partial<DomainInterests>;
  onNext: (data: DomainInterests) => void;
  onBack: () => void;
}

export function Step2InterestQuiz({ defaultValues, onNext, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    defaultValues?.answers ?? {}
  );
  const [error, setError] = useState("");

  const inferredDomains = useMemo(
    () => inferDomainsFromAnswers(answers),
    [answers]
  );

  const answeredCount = PROFILING_QUESTIONS.filter(
    (question) => !!answers[question.id]
  ).length;

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError("");
  };

  const handleNext = () => {
    const hasMissingAnswers = PROFILING_QUESTIONS.some(
      (question) => !answers[question.id]
    );

    if (hasMissingAnswers) {
      setError("Please answer all questions so we can infer your strongest domains.");
      return;
    }

    const data: DomainInterests = {
      answers,
      selectedDomains: inferredDomains.map((match) => match.domain),
      inferredDomains,
    };

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
          <h2 className="text-xl font-bold text-slate-800">Interest discovery</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Answer these quick questions first. We will use your responses to guess your most likely domains automatically.
        </p>
        <div className="ml-10 mt-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            {Array.from({ length: PROFILING_QUESTIONS.length }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-8 h-1.5 rounded-full transition-all duration-300",
                  i < answeredCount
                    ? "bg-campus-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                    : "bg-slate-200"
                )}
              />
            ))}
          </div>
          <Badge
            variant="secondary"
            className="px-2 py-0 h-5 text-[10px] font-bold border-campus-100 bg-campus-50 text-campus-700"
          >
            {answeredCount}/{PROFILING_QUESTIONS.length} ANSWERED
          </Badge>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <HugeiconsIcon icon={AlertCircleIcon} className="w-3.5 h-3.5 shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-5">
        {PROFILING_QUESTIONS.map((question, index) => (
          <Card key={question.id} className="border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-campus-100 text-campus-700 text-[10px] flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    {question.question}
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-1">{question.helperText}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <RadioGroup
                value={answers[question.id] ?? ""}
                onValueChange={(value) => setAnswer(question.id, value)}
                className="space-y-2"
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-2 group">
                    <RadioGroupItem
                      value={option.value}
                      id={`${question.id}-${option.value}`}
                      className="mt-0.5 border-slate-300 data-checked:border-campus-500 data-checked:bg-campus-500"
                    />
                    <Label
                      htmlFor={`${question.id}-${option.value}`}
                      className={cn(
                        "text-sm font-normal cursor-pointer transition-colors leading-snug",
                        answers[question.id] === option.value
                          ? "text-campus-700 font-medium"
                          : "text-slate-600 group-hover:text-slate-900"
                      )}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      {inferredDomains.length > 0 && (
        <Card className="mt-6 border-campus-100 bg-campus-50/40">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-campus-600 flex items-center justify-center">
                <HugeiconsIcon icon={SparklesIcon} className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-slate-800">
                  Current best-fit domains
                </CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  These update as you answer and will be used in the next step.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {inferredDomains.map((match, index) => {
                const meta = DOMAIN_META[match.domain];

                return (
                  <div
                    key={match.domain}
                    className="rounded-xl border border-campus-100 bg-white p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{meta.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {meta.label}
                        </p>
                        <p className="text-[10px] uppercase tracking-wide text-campus-600 font-bold">
                          Match #{index + 1}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                      {match.reasons.join(" • ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

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
