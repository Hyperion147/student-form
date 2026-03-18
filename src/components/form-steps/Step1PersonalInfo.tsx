"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { UserIcon, BookOpenIcon, MailIcon, PhoneIcon, BadgeIcon, BuildingIcon } from "lucide-react";
import { PersonalInfo } from "@/types/form";
import { saveFormStep } from "@/lib/formStore";

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  rollNo: z.string().min(2, "Roll number is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  year: z.string().min(1, "Please select your year of study"),
  branch: z.string().min(2, "Branch/Course is required"),
  college: z.string().min(2, "College name is required"),
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
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfo & { otherBranch?: string; otherCollege?: string }>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
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
            <UserIcon className="w-4 h-4 text-campus-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Tell us about yourself</h2>
        </div>
        <p className="text-sm text-slate-500 ml-10">
          Let's start with your basic details so we can personalise your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="label-text">
            <UserIcon className="w-3.5 h-3.5 text-campus-400" />
            Full Name
          </label>
          <input
            {...register("fullName")}
            className="input-field"
            placeholder="e.g. Aarav Kumar"
          />
          {errors.fullName && (
            <p className="error-text">⚠ {errors.fullName.message}</p>
          )}
        </div>

        {/* Roll Number */}
        <div>
          <label className="label-text">
            <BadgeIcon className="w-3.5 h-3.5 text-campus-400" />
            Roll Number
          </label>
          <input
            {...register("rollNo")}
            className="input-field"
            placeholder="e.g. 2021CS0142"
          />
          {errors.rollNo && (
            <p className="error-text">⚠ {errors.rollNo.message}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="label-text">
            <BookOpenIcon className="w-3.5 h-3.5 text-campus-400" />
            Year of Study
          </label>
          <select {...register("year")} className="input-field cursor-pointer">
            <option value="">Select year…</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.year && (
            <p className="error-text">⚠ {errors.year.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label-text">
            <MailIcon className="w-3.5 h-3.5 text-campus-400" />
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className="input-field"
            placeholder="student@college.edu"
          />
          {errors.email && (
            <p className="error-text">⚠ {errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="label-text">
            <PhoneIcon className="w-3.5 h-3.5 text-campus-400" />
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="input-field"
            placeholder="+91 98765 43210"
          />
          {errors.phone && (
            <p className="error-text">⚠ {errors.phone.message}</p>
          )}
        </div>

        {/* Branch */}
        <div className={selectedBranch === "Other" ? "sm:col-span-1" : "sm:col-span-1"}>
          <label className="label-text">
            <BookOpenIcon className="w-3.5 h-3.5 text-campus-400" />
            Branch / Course
          </label>
          <select {...register("branch")} className="input-field cursor-pointer">
            <option value="">Select branch…</option>
            {[
              "BCA",
              "BBA",
              "B.A",
              "B.Sc",
              "B.Com",
              "Other",
            ].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="error-text">⚠ {errors.branch.message}</p>
          )}
        </div>

        {/* Other Branch Input */}
        {selectedBranch === "Other" && (
          <div className="animate-fade-in">
            <label className="label-text">
              <BookOpenIcon className="w-3.5 h-3.5 text-campus-400" />
              Specify Branch
            </label>
            <input
              {...register("otherBranch")}
              className="input-field"
              placeholder="Enter your branch name"
            />
          </div>
        )}

        {/* College */}
        <div className={selectedCollege === "Other" ? "sm:col-span-1" : "sm:col-span-1"}>
          <label className="label-text">
            <BuildingIcon className="w-3.5 h-3.5 text-campus-400" />
            College / University
          </label>
          <select {...register("college")} className="input-field cursor-pointer">
            <option value="">Select college…</option>
            {[
              "I.B P.G College Panipat",
              "Other",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.college && (
            <p className="error-text">⚠ {errors.college.message}</p>
          )}
        </div>

        {/* Other College Input */}
        {selectedCollege === "Other" && (
          <div className="animate-fade-in">
            <label className="label-text">
              <BuildingIcon className="w-3.5 h-3.5 text-campus-400" />
              Specify College
            </label>
            <input
              {...register("otherCollege")}
              className="input-field"
              placeholder="Enter your college name"
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          Next: Choose Interests →
        </button>
      </div>
    </form>
  );
}
