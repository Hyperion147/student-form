"use client";

import { useState } from "react";
import { BrainCircuitIcon, ChevronRightIcon } from "lucide-react";
import { Domain, DomainKnowledge, DomainQuestion, DOMAIN_META } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { cn } from "@/lib/utils";

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

function MCQOption({ option, selected, onClick }: { option: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mcq-option w-full text-left",
        selected && "mcq-option-selected"
      )}
    >
      <div
        className={cn(
          "w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-150 flex items-center justify-center",
          selected ? "border-campus-500 bg-campus-500" : "border-slate-300"
        )}
      >
        {selected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
      </div>
      <span className={cn("text-sm", selected ? "text-campus-700 font-medium" : "text-slate-700")}>
        {option}
      </span>
    </button>
  );
}

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
            <BrainCircuitIcon className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Knowledge Check</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Answer a few quick questions about your selected domains. Be honest — this helps us give you accurate guidance.
        </p>
      </div>

      <div className="space-y-8">
        {domainGroups.map(({ domain, meta, questions }) => (
          <div key={domain} className="rounded-xl border border-slate-200 overflow-hidden">
            {/* Domain header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <span className="text-lg">{meta.icon}</span>
              <span className="font-semibold text-sm text-slate-800">{meta.label}</span>
              <span className="ml-auto text-xs text-slate-400">{questions.length} questions</span>
            </div>

            <div className="p-4 space-y-6">
              {questions.map((q, qi) => (
                <div key={q.id}>
                  <p className="text-sm font-medium text-slate-800 mb-3 flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-campus-100 text-campus-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {qi + 1}
                    </span>
                    {q.question}
                  </p>

                  {q.type === "mcq" && q.options && (
                    <div className="space-y-2">
                      {q.options.map((opt) => (
                        <MCQOption
                          key={opt}
                          option={opt}
                          selected={answers[q.id] === opt}
                          onClick={() => setAnswer(q.id, opt)}
                        />
                      ))}
                    </div>
                  )}

                  {q.type === "text" && (
                    <textarea
                      value={answers[q.id] ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Write your answer here…"
                    />
                  )}

                  {errors[q.id] && (
                    <p className="error-text mt-1">⚠ {errors[q.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="button" onClick={handleNext} className="btn-primary">
          Next: Challenges →
        </button>
      </div>
    </div>
  );
}
