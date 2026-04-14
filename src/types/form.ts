import { DOMAIN_META as EXT_DOMAIN_META } from "@/questions";

export type Domain = string;

export interface PersonalInfo {
  fullName: string;
  rollNo: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  college: string;
}

export interface DomainInterests {
  answers: Record<string, string>;
  selectedDomains: Domain[];
  inferredDomains: InferredDomainMatch[];
}

export interface DomainQuestion {
  id: string;
  question: string;
  type: "mcq" | "text" | "rating";
  options?: string[];
}

export interface DomainKnowledge {
  answers: Record<string, string>;
}

export interface InferredDomainMatch {
  domain: Domain;
  score: number;
  reasons: string[];
}

export interface ChallengesInfo {
  difficulties: string;
  approach: string;
  shortTermGoal: string;
  longTermGoal: string;
}

export interface SubmissionPreference {
  deliveryMethod: "email" | "whatsapp" | "both";
  contactValue: string;
  agreeToTerms: boolean;
}

export interface FormData {
  personalInfo: PersonalInfo;
  domainInterests: DomainInterests;
  domainKnowledge: DomainKnowledge;
  challenges: ChallengesInfo;
  submission: SubmissionPreference;
}

export interface DomainMeta {
  label: string;
  icon: string;
  color: string;
  description: string;
  questions: DomainQuestion[];
  youtubeKeywords: string[];
}

export const DOMAIN_META: Record<string, DomainMeta> = EXT_DOMAIN_META;

export const STEP_LABELS = [
  "Personal Info",
  "Interest Quiz",
  "Knowledge Check",
  "Challenges",
  "Submit",
];
