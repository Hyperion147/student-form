"use client";

import { FormData } from "@/types/form";

const STORAGE_KEY = "student_assessment_form";

export function saveFormStep<K extends keyof FormData>(
  step: K,
  data: FormData[K]
): void {
  try {
    const existing = loadFormData();
    const updated = { ...existing, [step]: data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save form step:", e);
  }
}

export function loadFormData(): Partial<FormData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function clearFormData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveCurrentStep(step: number): void {
  localStorage.setItem(`${STORAGE_KEY}_step`, String(step));
}

export function loadCurrentStep(): number {
  const s = localStorage.getItem(`${STORAGE_KEY}_step`);
  return s ? parseInt(s, 10) : 0;
}
