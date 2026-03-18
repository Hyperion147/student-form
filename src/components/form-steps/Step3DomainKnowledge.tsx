"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiBrainIcon, ArrowRight01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Domain, DomainKnowledge, DomainQuestion, DOMAIN_META } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  selectedDomains: Domain[];
  defaultValues?: Partial<DomainKnowledge>;
  onNext: (data: DomainKnowledge) => void;
  onBack: () => void;
}

function getQuestionsForDomains(domains: Domain[]): { domain: Domain; question: DomainQuestion }[] {
  const questions: { domain: Domain; question: DomainQuestion }[] = [];
  domains.forEach((domain) => {
    DOMAIN_META[domain].questions.forEach((q) => {
      questions.push({ domain, question: q });
    });
  });
  return questions;
}

// MCQOption removed in favor of RadioGroup

export function Step3DomainKnowledge({ selectedDomains, defaultValues, onNext, onBack }: Props) {
  const allQuestions = getQuestionsForDomains(selectedDomains);
  const [answers, setAnswers] = useState<Record<string, string>>(
    defaultValues?.answers ?? {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setAnswer = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    setErrors((prev) => ({ ...prev, [qId]: "" }));
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    allQuestions.forEach(({ question }) => {
      if (!answers[question.id] || answers[question.id].trim() === "") {
        newErrors[question.id] = "Please answer this question.";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const data: DomainKnowledge = { answers };
    saveFormStep("domainKnowledge", data);
    onNext(data);
  };

  // Group by domain for visual sections
  const domainGroups = selectedDomains.map((domain) => ({
    domain,
    meta: DOMAIN_META[domain],
    questions: allQuestions.filter((q) => q.domain === domain).map((q) => q.question),
  }));

  return (
    <div className="animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <HugeiconsIcon icon={AiBrainIcon} className="w-4 h-4 text-campus-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Knowledge Check</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Answer a few quick questions about your selected domains. Be honest — this helps us give you accurate guidance.
        </p>
      </div>

      <div className="space-y-8">
        {domainGroups.map(({ domain, meta, questions }) => (
          <Card key={domain} className="overflow-hidden border-slate-200">
            <CardHeader className="py-3 px-4 bg-slate-50/50 border-b flex-row items-center gap-2 space-y-0">
              <span className="text-lg">{meta.icon}</span>
              <CardTitle className="text-sm font-semibold text-slate-800">{meta.label}</CardTitle>
              <span className="ml-auto text-xs text-slate-400 font-normal">{questions.length} questions</span>
            </CardHeader>

            <CardContent className="p-4 space-y-8">
              {questions.map((q, qi) => (
                <div key={q.id} className="space-y-4">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-campus-100 text-campus-700 text-[10px] flex items-center justify-center font-bold shrink-0">
                      {qi + 1}
                    </span>
                    <Label className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {q.question}
                    </Label>
                  </div>

                  {q.type === "mcq" && q.options && (
                    <RadioGroup
                      value={answers[q.id] ?? ""}
                      onValueChange={(val) => setAnswer(q.id, val)}
                      className="ml-9 space-y-2"
                    >
                      {q.options.map((opt) => (
                        <div key={opt} className="flex items-center space-x-2 group">
                          <RadioGroupItem value={opt} id={`${q.id}-${opt}`} className="border-slate-300 data-checked:border-campus-500 data-checked:bg-campus-500" />
                          <Label
                            htmlFor={`${q.id}-${opt}`}
                            className={cn(
                              "text-sm font-normal cursor-pointer transition-colors",
                              answers[q.id] === opt ? "text-campus-700 font-medium" : "text-slate-600 group-hover:text-slate-900"
                            )}
                          >
                            {opt}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {q.type === "text" && (
                    <div className="ml-9">
                      <Textarea
                        value={answers[q.id] ?? ""}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        className="min-h-[100px] bg-slate-50/30 border-slate-200 focus:bg-white transition-all resize-none"
                        placeholder="Share your thoughts here…"
                      />
                    </div>
                  )}

                  {errors[q.id] && (
                    <p className="text-xs text-destructive ml-9 mt-1 flex items-center gap-1 animate-fade-in">
                      <span className="text-sm">⚠</span> {errors[q.id]}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
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
          Next: Challenges
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
