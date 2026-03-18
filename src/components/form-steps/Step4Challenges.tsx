"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MountainIcon, RouteIcon } from "lucide-react";
import { ChallengesInfo } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";

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
            <MountainIcon className="w-4 h-4 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your Challenges & Goals</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Every great journey has obstacles. Share yours — and what you're doing about them.
        </p>
      </div>

      <div className="space-y-5">
        {/* Difficulties */}
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-xs">🧱</span>
            </div>
            <label className="text-sm font-semibold text-slate-800">
              What difficulties are you currently facing?
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-2 ml-8">
            e.g. Lack of mentorship, struggling with specific concepts, time management, resources…
          </p>
          <textarea
            {...register("difficulties")}
            className="input-field resize-none"
            rows={4}
            placeholder="Be honest — this is just for your assessment…"
          />
          <div className="flex justify-between mt-1">
            {errors.difficulties ? (
              <p className="error-text">⚠ {errors.difficulties.message}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400">{difficulties.length} chars</span>
          </div>
        </div>

        {/* Approach */}
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
              <span className="text-xs">🪜</span>
            </div>
            <label className="text-sm font-semibold text-slate-800">
              What approach have you taken so far?
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-2 ml-8">
            e.g. Online courses, building projects, reading books, joining communities…
          </p>
          <textarea
            {...register("approach")}
            className="input-field resize-none"
            rows={4}
            placeholder="Even small steps count. Share what you've tried…"
          />
          <div className="flex justify-between mt-1">
            {errors.approach ? (
              <p className="error-text">⚠ {errors.approach.message}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400">{approach.length} chars</span>
          </div>
        </div>

        {/* Goals */}
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-campus-50 flex items-center justify-center">
              <RouteIcon className="w-3.5 h-3.5 text-campus-600" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Your Goals</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-text">
                <span className="text-base">🎯</span>
                Short-term Goal (next 6 months)
              </label>
              <input
                {...register("shortTermGoal")}
                className="input-field"
                placeholder="e.g. Build 2 full-stack projects"
              />
              {errors.shortTermGoal && (
                <p className="error-text">⚠ {errors.shortTermGoal.message}</p>
              )}
            </div>

            <div>
              <label className="label-text">
                <span className="text-base">🚀</span>
                Long-term Goal (1–3 years)
              </label>
              <input
                {...register("longTermGoal")}
                className="input-field"
                placeholder="e.g. Get a job at a top tech company"
              />
              {errors.longTermGoal && (
                <p className="error-text">⚠ {errors.longTermGoal.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button type="submit" className="btn-primary">
          Next: Final Submit →
        </button>
      </div>
    </form>
  );
}
