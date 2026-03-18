"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import { MountainIcon, RouteIcon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ChallengesInfo } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const schema = z.object({
  difficulties: z.string().min(20, "Please describe your difficulties in at least 20 characters."),
  approach: z.string().min(20, "Please share your approach in at least 20 characters."),
  shortTermGoal: z.string().min(10, "Short-term goal must be at least 10 characters."),
  longTermGoal: z.string().min(10, "Long-term goal must be at least 10 characters."),
});

interface Props {
  defaultValues?: Partial<ChallengesInfo>;
  onNext: (data: ChallengesInfo) => void;
  onBack: () => void;
}

export function Step4Challenges({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChallengesInfo>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
  });

  const difficulties = watch("difficulties") ?? "";
  const approach = watch("approach") ?? "";

  const onSubmit = (data: ChallengesInfo) => {
    saveFormStep("challenges", data);
    onNext(data);
  };

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
          Every great journey has obstacles. Share yours — and what you're doing about them.
        </p>
      </div>

      <div className="space-y-6">
        {/* Difficulties */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 flex-row items-center gap-2 space-y-0">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">
              🧱
            </div>
            <CardTitle className="text-sm font-semibold text-slate-800">
              What difficulties are you currently facing?
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            <p className="text-xs text-slate-400">
              e.g. Lack of mentorship, struggling with specific concepts, time management, resources…
            </p>
            <Textarea
              {...register("difficulties")}
              className="min-h-[100px] resize-none"
              placeholder="Be honest — this is just for your assessment…"
            />
            <div className="flex justify-between items-center text-[10px] sm:text-xs">
              {errors.difficulties ? (
                <p className="text-destructive flex items-center gap-1">
                  <span className="text-sm">⚠</span> {errors.difficulties.message}
                </p>
              ) : (
                <span className="text-slate-400">Be descriptive for better AI analysis</span>
              )}
              <span className={cn(
                "font-medium",
                difficulties.length < 20 ? "text-amber-500" : "text-slate-400"
              )}>
                {difficulties.length} characters
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Approach */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 flex-row items-center gap-2 space-y-0">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
              🪜
            </div>
            <CardTitle className="text-sm font-semibold text-slate-800">
              What approach have you taken so far?
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            <p className="text-xs text-slate-400">
              e.g. Online courses, building projects, reading books, joining communities…
            </p>
            <Textarea
              {...register("approach")}
              className="min-h-[100px] resize-none"
              placeholder="Even small steps count. Share what you've tried…"
            />
            <div className="flex justify-between items-center text-[10px] sm:text-xs">
              {errors.approach ? (
                <p className="text-destructive flex items-center gap-1">
                  <span className="text-sm">⚠</span> {errors.approach.message}
                </p>
              ) : (
                <span className="text-slate-400">The more you share, the better we can help</span>
              )}
              <span className={cn(
                "font-medium",
                approach.length < 20 ? "text-amber-500" : "text-slate-400"
              )}>
                {approach.length} characters
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 flex-row items-center gap-2 space-y-0">
            <div className="w-8 h-8 rounded-full bg-campus-100 flex items-center justify-center">
              <HugeiconsIcon icon={RouteIcon} className="w-4 h-4 text-campus-600" />
            </div>
            <CardTitle className="text-sm font-semibold text-slate-800">Your Goals</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shortTermGoal" className="flex items-center gap-2 text-slate-700">
                  <span className="text-base">🎯</span>
                  Short-term Goal
                </Label>
                <Input
                  id="shortTermGoal"
                  {...register("shortTermGoal")}
                  placeholder="e.g. Build 2 full-stack projects"
                  className={cn(errors.shortTermGoal && "border-destructive ring-destructive/20")}
                />
                {errors.shortTermGoal && (
                  <p className="text-xs text-destructive animate-fade-in">⚠ {errors.shortTermGoal.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longTermGoal" className="flex items-center gap-2 text-slate-700">
                  <span className="text-base">🚀</span>
                  Long-term Goal
                </Label>
                <Input
                  id="longTermGoal"
                  {...register("longTermGoal")}
                  placeholder="e.g. Get a job at a top tech company"
                  className={cn(errors.longTermGoal && "border-destructive ring-destructive/20")}
                />
                {errors.longTermGoal && (
                  <p className="text-xs text-destructive animate-fade-in">⚠ {errors.longTermGoal.message}</p>
                )}
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
        <Button 
          type="submit" 
          className="bg-campus-600 hover:bg-campus-700 text-white gap-2 px-8"
        >
          Next: Final Submit
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
