"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { MountainIcon, RouteIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ChallengesInfo, DomainKnowledge } from "@/types/form";
import { techDomains } from "@/questions/tech";
import { commerceDomains } from "@/questions/commerce";
import { artsDomains } from "@/questions/arts";
import { saveFormStep } from "@/lib/formStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const schema = z.object({
  difficulties: z.string().min(1, "Please select a difficulty."),
  approach: z.string().min(1, "Please select an approach."),
  shortTermGoal: z.string().min(1, "Please select a short-term goal."),
  longTermGoal: z.string().min(1, "Please select a long-term goal."),
});

interface Props {
  selectedDomains: string[];
  domainKnowledge?: DomainKnowledge;
  defaultValues?: Partial<ChallengesInfo>;
  onNext: (data: ChallengesInfo) => void;
  onBack: () => void;
}

export function Step4Challenges({ selectedDomains, domainKnowledge, defaultValues, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengesInfo>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
  });

  const onSubmit = (data: ChallengesInfo) => {
    saveFormStep("challenges", data);
    onNext(data);
  };

  const { difficultiesOptions, approachOptions, shortTermOptions, longTermOptions } = useMemo(() => {
    const hasTech = selectedDomains.some((d) => d in techDomains);
    const hasCommerce = selectedDomains.some((d) => d in commerceDomains);
    const hasArts = selectedDomains.some((d) => d in artsDomains);

    const answersStr = JSON.stringify(domainKnowledge?.answers ?? {}).toLowerCase();
    const isBeginner = answersStr.includes("beginner") || answersStr.includes("never") || answersStr.includes("no experience");

    const diff = [
      "Finding good resources / structured learning path",
      "Time management and staying consistent",
      "Procrastination / Losing motivation"
    ];
    if (hasTech) diff.push("Struggling with complex code or technical concepts");
    if (hasCommerce) diff.push("Understanding complex financial or market logic");
    if (hasArts) diff.push("Developing my creative style and artistic voice");
    if (diff.length < 5) diff.push("Lack of mentorship or guidance");

    const appr = [
      "Taking online courses / tutorials",
      "Reading official documentation and books",
      "Joining professional communities and forums",
      "Just trying to figure it out as I go"
    ];
    if (hasTech) appr.splice(1, 0, "Building personal coding projects from scratch");
    else if (hasCommerce) appr.splice(1, 0, "Analyzing real-world case studies");
    else if (hasArts) appr.splice(1, 0, "Building and refining my creative portfolio");
    if (appr.length < 5) appr.push("Participating in study groups");

    const short = [
      "Land a good internship or entry-level role",
      "Win a professional competition or hackathon"
    ];
    if (isBeginner) short.unshift("Master the foundational basics firmly");
    if (hasTech) short.push("Complete a full-stack or complex tech project");
    if (hasCommerce) short.push("Get certified in an essential tool or framework");
    if (hasArts) short.push("Publish my work or launch my public portfolio");
    if (short.length < 5) short.push("Network with industry professionals deeply");

    const long = [
      "Get a job at a top global company",
      "Start my own company/startup",
      "Become a successful freelancer/consultant",
      "Lead a team of professionals",
      "Transition into a specialized senior role"
    ];

    return {
      difficultiesOptions: Array.from(new Set(diff)).slice(0, 5),
      approachOptions: Array.from(new Set(appr)).slice(0, 5),
      shortTermOptions: Array.from(new Set(short)).slice(0, 5),
      longTermOptions: Array.from(new Set(long)).slice(0, 5),
    };
  }, [selectedDomains, domainKnowledge]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <HugeiconsIcon icon={MountainIcon} className="w-4 h-4 text-campus-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your Challenges & Goals</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          We want to know what's blocking you, so we can give better advice.
        </p>
      </div>

      <div className="space-y-6">
        {/* Difficulties */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 flex-row items-center gap-2 space-y-0 text-slate-800">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">🧱</div>
            <CardTitle className="text-sm font-semibold">What difficulties are you currently facing?</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Controller
              control={control}
              name="difficulties"
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                  {difficultiesOptions.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2 group">
                      <RadioGroupItem value={opt} id={`diff-${opt}`} className="border-slate-300 data-checked:border-campus-500 data-checked:bg-campus-500" />
                      <Label htmlFor={`diff-${opt}`} className={cn("text-sm font-normal cursor-pointer transition-colors", field.value === opt ? "text-campus-700 font-medium" : "text-slate-600 group-hover:text-slate-900")}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.difficulties && <p className="text-xs text-destructive mt-2">⚠ {errors.difficulties.message}</p>}
          </CardContent>
        </Card>

        {/* Approach */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 flex-row items-center gap-2 space-y-0 text-slate-800">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">🪜</div>
            <CardTitle className="text-sm font-semibold">What approach have you taken so far?</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Controller
              control={control}
              name="approach"
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                  {approachOptions.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2 group">
                      <RadioGroupItem value={opt} id={`app-${opt}`} className="border-slate-300 data-checked:border-campus-500 data-checked:bg-campus-500" />
                      <Label htmlFor={`app-${opt}`} className={cn("text-sm font-normal cursor-pointer transition-colors", field.value === opt ? "text-campus-700 font-medium" : "text-slate-600 group-hover:text-slate-900")}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.approach && <p className="text-xs text-destructive mt-2">⚠ {errors.approach.message}</p>}
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 flex-row items-center gap-2 space-y-0 text-slate-800">
            <div className="w-8 h-8 rounded-full bg-campus-100 flex items-center justify-center">
              <HugeiconsIcon icon={RouteIcon} className="w-4 h-4 text-campus-600" />
            </div>
            <CardTitle className="text-sm font-semibold">Your Goals</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <span className="text-base">🎯</span> Short-term Goal
                </Label>
                <Controller
                  control={control}
                  name="shortTermGoal"
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                      {shortTermOptions.map((opt) => (
                        <div key={opt} className="flex items-start space-x-2 group">
                          <RadioGroupItem value={opt} id={`short-${opt}`} className="mt-0.5 border-slate-300 data-checked:border-campus-500 data-checked:bg-campus-500" />
                          <Label htmlFor={`short-${opt}`} className={cn("text-sm font-normal cursor-pointer transition-colors leading-snug", field.value === opt ? "text-campus-700 font-medium" : "text-slate-600 group-hover:text-slate-900")}>{opt}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.shortTermGoal && <p className="text-xs text-destructive">⚠ {errors.shortTermGoal.message}</p>}
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <span className="text-base">🚀</span> Long-term Goal
                </Label>
                <Controller
                  control={control}
                  name="longTermGoal"
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                      {longTermOptions.map((opt) => (
                        <div key={opt} className="flex items-start space-x-2 group">
                          <RadioGroupItem value={opt} id={`long-${opt}`} className="mt-0.5 border-slate-300 data-checked:border-campus-500 data-checked:bg-campus-500" />
                          <Label htmlFor={`long-${opt}`} className={cn("text-sm font-normal cursor-pointer transition-colors leading-snug", field.value === opt ? "text-campus-700 font-medium" : "text-slate-600 group-hover:text-slate-900")}>{opt}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.longTermGoal && <p className="text-xs text-destructive">⚠ {errors.longTermGoal.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex justify-between">
        <Button variant="outline" type="button" onClick={onBack} className="gap-2 px-6">
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
          Back
        </Button>
        <Button type="submit" className="bg-campus-600 hover:bg-campus-700 text-white gap-2 px-8">
          Next: Final Submit
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
