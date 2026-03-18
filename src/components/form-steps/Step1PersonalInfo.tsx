"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  UserIcon, 
  BookOpen01Icon, 
  Mail01Icon, 
  CallIcon, 
  LicenseIcon, 
  Building01Icon, 
  ArrowRight01Icon 
} from "@hugeicons/core-free-icons";
import { PersonalInfo } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name (minimum 2 chars)"),
  rollNo: z.string().trim().min(3, "Please enter your correct roll number"),
  email: z.string().email("Please enter a valid official email"),
  phone: z.string().trim().min(10, "Please enter a valid 10-digit phone number").max(13, "Phone number is too long"),
  year: z.string().min(1, "Please select your current year of study"),
  branch: z.string().min(1, "Please select your branch or course"),
  college: z.string().min(1, "Please select your college"),
  otherBranch: z.string().optional(),
  otherCollege: z.string().optional(),
}).refine((data) => {
  if (data.branch === "Other") {
    return data.otherBranch && data.otherBranch.trim().length >= 2;
  }
  return true;
}, {
  message: "Please specify your branch name",
  path: ["otherBranch"],
}).refine((data) => {
  if (data.college === "Other") {
    return data.otherCollege && data.otherCollege.trim().length >= 2;
  }
  return true;
}, {
  message: "Please specify your college name",
  path: ["otherCollege"],
});

interface Props {
  defaultValues?: Partial<PersonalInfo>;
  onNext: (data: PersonalInfo) => void;
}

const years = ["1st Year", "2nd Year", "3rd Year"];

export function Step1PersonalInfo({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfo & { otherBranch?: string; otherCollege?: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: defaultValues?.fullName || "",
      rollNo: defaultValues?.rollNo || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      year: defaultValues?.year || "",
      branch: defaultValues?.branch || "",
      college: defaultValues?.college || "",
    },
  });

  const selectedBranch = watch("branch");
  const selectedCollege = watch("college");

  const onSubmit = (data: PersonalInfo & { otherBranch?: string; otherCollege?: string }) => {
    const finalData: PersonalInfo = {
      ...data,
      branch: data.branch === "Other" ? (data.otherBranch || "Other") : data.branch,
      college: data.college === "Other" ? (data.otherCollege || "Other") : data.college,
    };
    // Remove the temporary fields before saving
    const { otherBranch, otherCollege, ...rest } = finalData as any;
    saveFormStep("personalInfo", rest);
    onNext(rest);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-campus-100 flex items-center justify-center">
            <HugeiconsIcon icon={UserIcon} className="w-4 h-4 text-campus-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Tell us about yourself</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Let's start with your basic details so we can personalise your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={UserIcon} className="w-4 h-4 text-campus-500" />
            Full Name
          </Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="e.g. Aarav Kumar"
            className={cn(errors.fullName && "border-destructive ring-destructive/20")}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rollNo" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={LicenseIcon} className="w-3.5 h-3.5 text-campus-500" />
            Roll Number
          </Label>
          <Input
            id="rollNo"
            {...register("rollNo")}
            placeholder="e.g. 2021CS0142"
            className={cn(errors.rollNo && "border-destructive ring-destructive/20")}
          />
          {errors.rollNo && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.rollNo.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={BookOpen01Icon} className="w-4 h-4 text-campus-500" />
            Year of Study
          </Label>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="year" className={cn("w-full h-10", errors.year && "border-destructive ring-destructive/20")}>
                  <SelectValue placeholder="Select year…" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.year && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.year.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={Mail01Icon} className="w-3.5 h-3.5 text-campus-500" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="student@college.edu"
            className={cn(errors.email && "border-destructive ring-destructive/20")}
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={CallIcon} className="w-3.5 h-3.5 text-campus-500" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+91 98765 43210"
            className={cn(errors.phone && "border-destructive ring-destructive/20")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.phone.message}
            </p>
          )}
        </div>

        <div className={cn("space-y-2", selectedBranch === "Other" ? "sm:col-span-1" : "sm:col-span-1")}>
          <Label htmlFor="branch" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={BookOpen01Icon} className="w-4 h-4 text-campus-500" />
            Branch / Course
          </Label>
          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="branch" className={cn("w-full h-10", errors.branch && "border-destructive ring-destructive/20")}>
                  <SelectValue placeholder="Select branch…" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "BCA",
                    "BBA",
                    "B.A",
                    "B.Sc",
                    "B.Com",
                    "Other",
                  ].map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.branch && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.branch.message}
            </p>
          )}
        </div>

        {selectedBranch === "Other" && (
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="otherBranch" className="flex items-center gap-2 text-slate-700">
              <HugeiconsIcon icon={BookOpen01Icon} className="w-3.5 h-3.5 text-campus-500" />
              Specify Branch
            </Label>
            <Input
              id="otherBranch"
              {...register("otherBranch")}
              placeholder="Enter your branch name"
              className={cn(errors.otherBranch && "border-destructive ring-destructive/20")}
            />
            {errors.otherBranch && (
              <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
                <span className="text-sm">⚠</span> {errors.otherBranch.message}
              </p>
            )}
          </div>
        )}

        <div className={cn("space-y-2", selectedCollege === "Other" ? "sm:col-span-1" : "sm:col-span-1")}>
          <Label htmlFor="college" className="flex items-center gap-2 text-slate-700">
            <HugeiconsIcon icon={Building01Icon} className="w-4 h-4 text-campus-500" />
            College / University
          </Label>
          <Controller
            name="college"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="college" className={cn("w-full h-10", errors.college && "border-destructive ring-destructive/20")}>
                  <SelectValue placeholder="Select college…" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "I.B P.G College Panipat",
                    "Other",
                  ].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.college && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
              <span className="text-sm">⚠</span> {errors.college.message}
            </p>
          )}
        </div>

        {selectedCollege === "Other" && (
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="otherCollege" className="flex items-center gap-2 text-slate-700">
              <HugeiconsIcon icon={Building01Icon} className="w-3.5 h-3.5 text-campus-500" />
              Specify College
            </Label>
            <Input
              id="otherCollege"
              {...register("otherCollege")}
              placeholder="Enter your college name"
              className={cn(errors.otherCollege && "border-destructive ring-destructive/20")}
            />
            {errors.otherCollege && (
              <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in">
                <span className="text-sm">⚠</span> {errors.otherCollege.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-campus-600 hover:bg-campus-700 text-white gap-2 px-8"
        >
          Next: Choose Interests
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
