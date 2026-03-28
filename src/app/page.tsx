"use client";

import { useState, useEffect } from "react";
import { Stepper } from "@/components/Stepper";
import { Step1PersonalInfo } from "@/components/form-steps/Step1PersonalInfo";
import { Step2DomainInterests } from "@/components/form-steps/Step2DomainInterests";
import { Step3DomainKnowledge } from "@/components/form-steps/Step3DomainKnowledge";
import { Step4Challenges } from "@/components/form-steps/Step4Challenges";
import { Step5Submission } from "@/components/form-steps/Step5Submission";
import { ResultsPage } from "@/components/ResultsPage";
import {
  FormData,
  PersonalInfo,
  DomainInterests,
  DomainKnowledge,
  ChallengesInfo,
  SubmissionPreference,
} from "@/types/form";
import {
  loadFormData,
  loadCurrentStep,
  saveCurrentStep,
  clearFormData,
} from "@/lib/formStore";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  SparklesIcon, 
  BookOpen01Icon, 
  Home01Icon 
} from "@hugeicons/core-free-icons";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = loadFormData();
    const savedStep = loadCurrentStep();
    setFormData(saved);
    setCurrentStep(savedStep);
    setHydrated(true);
  }, []);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    saveCurrentStep(step);
  };

  const handleStep1 = (data: PersonalInfo) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }));
    goToStep(1);
  };

  const handleStep2 = (data: DomainInterests) => {
    setFormData((prev) => ({ ...prev, domainInterests: data }));
    goToStep(2);
  };

  const handleStep3 = (data: DomainKnowledge) => {
    setFormData((prev) => ({ ...prev, domainKnowledge: data }));
    goToStep(3);
  };

  const handleStep4 = (data: ChallengesInfo) => {
    setFormData((prev) => ({ ...prev, challenges: data }));
    goToStep(4);
  };

  const handleStep5 = async (data: SubmissionPreference) => {
    setIsSubmitting(true);
    const finalData: FormData = {
      personalInfo: formData.personalInfo!,
      domainInterests: formData.domainInterests!,
      domainKnowledge: formData.domainKnowledge!,
      challenges: formData.challenges!,
      submission: data,
    };
    setFormData(finalData);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const json = await res.json();
      setAnalysis(json.analysis ?? null);
    } catch (err) {
      console.error("Analysis request failed:", err);
    }

    setIsSubmitting(false);
    setIsComplete(true);
  };

  const handleReset = () => {
    clearFormData();
    setFormData({});
    setCurrentStep(0);
    setIsComplete(false);
    setAnalysis(null);
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-campus-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen grid-dots-bg flex flex-col">
      {/* Top header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="flex items-center gap-3 group transition-opacity hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-lg bg-campus-600 flex items-center justify-center group-hover:shadow-lg transition-all">
              <HugeiconsIcon icon={SparklesIcon} className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-slate-900 text-sm leading-tight">fragbasic.fun</h1>
              <p className="text-xs text-slate-400 leading-tight">AI-Driven Student Career Assessment</p>
            </div>
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            {(currentStep > 0 || isComplete) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-campus-600 font-semibold hover:text-campus-800 transition-colors"
              >
                <HugeiconsIcon icon={Home01Icon} className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Go to Homepage</span>
              </button>
            )}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <HugeiconsIcon icon={BookOpen01Icon} className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Your data is saved as you go</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero banner (only on step 0) */}
      {currentStep === 0 && !isComplete && (
        <div className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-10" />
          <div className="absolute top-0 -translate-y-1/2 translate-x-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-pulse-soft" />
          <div className="absolute bottom-0 translate-y-1/3 -translate-x-1/4 left-0 w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full mix-blend-screen filter blur-[60px] animate-pulse-soft" style={{ animationDelay: '1s'}} />
          
          <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 text-xs font-medium mb-6 backdrop-blur-md border border-white/10 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              Free for all students · Takes ~5 minutes
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight flex flex-col gap-1 sm:gap-2">
              <span className="text-white">Discover Your</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400">Ideal Career Path</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Answer a few questions and get AI-powered insights about your perfect role,
              personalised roadmap, and curated resources.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        {isComplete ? (
          <div className="form-card p-6 sm:p-8">
            <ResultsPage formData={formData} analysis={analysis} onReset={handleReset} />
          </div>
        ) : (
          <div className="form-card">
            {/* Stepper */}
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-slate-100 bg-slate-50/50">
              <Stepper currentStep={currentStep} />
            </div>

            {/* Step content */}
            <div className="px-6 sm:px-8 py-6 sm:py-8">
              {currentStep === 0 && (
                <Step1PersonalInfo
                  defaultValues={formData.personalInfo}
                  onNext={handleStep1}
                />
              )}
              {currentStep === 1 && (
                <Step2DomainInterests
                  defaultValues={formData.domainInterests}
                  onNext={handleStep2}
                  onBack={() => goToStep(0)}
                />
              )}
              {currentStep === 2 && (
                <Step3DomainKnowledge
                  selectedDomains={formData.domainInterests?.selectedDomains ?? []}
                  defaultValues={formData.domainKnowledge}
                  onNext={handleStep3}
                  onBack={() => goToStep(1)}
                />
              )}
              {currentStep === 3 && (
                <Step4Challenges
                  selectedDomains={formData.domainInterests?.selectedDomains ?? []}
                  domainKnowledge={formData.domainKnowledge}
                  defaultValues={formData.challenges}
                  onNext={handleStep4}
                  onBack={() => goToStep(2)}
                />
              )}
              {currentStep === 4 && (
                <Step5Submission
                  defaultEmail={formData.personalInfo?.email}
                  defaultValues={formData.submission}
                  onSubmit={handleStep5}
                  onBack={() => goToStep(3)}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>

            {/* Footer note */}
            <div className="px-6 sm:px-8 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                🔒 Your responses are saved locally and used only for your assessment.
              </p>
              {currentStep > 0 && (
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                >
                  Reset form
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs text-slate-400">
          fragbasic.fun · Built for students, by students ·{" "}
          <span className="text-campus-500">AI results powered by Claude</span>
        </div>
      </footer>
    </main>
  );
}
