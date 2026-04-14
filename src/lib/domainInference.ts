import { DOMAIN_META, Domain, InferredDomainMatch } from "@/types/form";

export interface ProfilingQuestionOption {
  value: string;
  label: string;
  domains: Domain[];
}

export interface ProfilingQuestion {
  id: string;
  question: string;
  helperText: string;
  options: ProfilingQuestionOption[];
}

export const PROFILING_QUESTIONS: ProfilingQuestion[] = [
  {
    id: "preferred-work",
    question: "What kind of work feels most exciting to you?",
    helperText: "Pick the type of work you naturally enjoy the most.",
    options: [
      {
        value: "build-digital-products",
        label: "Building apps, websites, or digital tools",
        domains: ["web-development", "mobile-development", "game-development"],
      },
      {
        value: "analyze-data",
        label: "Analyzing numbers, patterns, or trends",
        domains: ["data-science", "economics", "accounting"],
      },
      {
        value: "design-experiences",
        label: "Designing visuals, interfaces, or creative experiences",
        domains: ["ui-ux-design", "graphic-design", "journalism"],
      },
      {
        value: "solve-people-problems",
        label: "Understanding people and helping them grow",
        domains: ["psychology", "business-administration", "marketing"],
      },
      {
        value: "secure-and-optimize",
        label: "Protecting systems or making them run smoothly",
        domains: ["cybersecurity", "cloud-computing", "devops"],
      },
      {
        value: "future-tech",
        label: "Exploring cutting-edge technology and experimentation",
        domains: ["machine-learning", "blockchain", "cloud-computing"],
      },
    ],
  },
  {
    id: "favorite-subject",
    question: "Which subject area do you enjoy the most?",
    helperText: "Think about the classes or topics that keep your attention.",
    options: [
      {
        value: "coding-logic",
        label: "Coding, logic, and problem solving",
        domains: ["web-development", "mobile-development", "game-development"],
      },
      {
        value: "math-statistics",
        label: "Math, statistics, and structured analysis",
        domains: ["data-science", "machine-learning", "accounting"],
      },
      {
        value: "business-markets",
        label: "Business, markets, and management",
        domains: ["marketing", "business-administration", "economics"],
      },
      {
        value: "design-media",
        label: "Design, media, and communication",
        domains: ["graphic-design", "ui-ux-design", "journalism"],
      },
      {
        value: "human-behaviour",
        label: "Human behaviour, language, or society",
        domains: ["psychology", "literature", "journalism"],
      },
      {
        value: "systems-infra",
        label: "Systems, networks, and how technology works underneath",
        domains: ["cybersecurity", "cloud-computing", "devops"],
      },
    ],
  },
  {
    id: "dream-project",
    question: "If you had one month to build something, what would you choose?",
    helperText: "Choose the project idea that sounds the most fun.",
    options: [
      {
        value: "launch-app",
        label: "Launch an app, website, or online product",
        domains: ["web-development", "mobile-development", "ui-ux-design"],
      },
      {
        value: "ai-model",
        label: "Create an AI, prediction, or automation system",
        domains: ["machine-learning", "data-science", "devops"],
      },
      {
        value: "brand-campaign",
        label: "Design a brand campaign or grow an audience",
        domains: ["marketing", "graphic-design", "journalism"],
      },
      {
        value: "finance-strategy",
        label: "Solve a finance, market, or business strategy problem",
        domains: ["accounting", "economics", "business-administration"],
      },
      {
        value: "secure-platform",
        label: "Secure, deploy, or scale a digital platform",
        domains: ["cybersecurity", "cloud-computing", "blockchain"],
      },
      {
        value: "help-people",
        label: "Build something that improves people's lives directly",
        domains: ["psychology", "literature", "business-administration"],
      },
    ],
  },
  {
    id: "natural-strength",
    question: "Which strength sounds most like you?",
    helperText: "Pick the one that friends or teachers would probably agree with.",
    options: [
      {
        value: "technical-builder",
        label: "I like building and fixing technical things",
        domains: ["web-development", "mobile-development", "cloud-computing"],
      },
      {
        value: "analytical-thinker",
        label: "I notice patterns and think analytically",
        domains: ["data-science", "economics", "machine-learning"],
      },
      {
        value: "creative-eye",
        label: "I have a strong creative or visual eye",
        domains: ["graphic-design", "ui-ux-design", "game-development"],
      },
      {
        value: "people-person",
        label: "I communicate well and understand people",
        domains: ["marketing", "psychology", "journalism"],
      },
      {
        value: "organized-leader",
        label: "I organize things well and like taking responsibility",
        domains: ["business-administration", "accounting", "devops"],
      },
      {
        value: "curious-explorer",
        label: "I love exploring new ideas and emerging tech",
        domains: ["blockchain", "machine-learning", "cybersecurity"],
      },
    ],
  },
  {
    id: "work-environment",
    question: "What type of environment sounds best for your future work?",
    helperText: "Choose the setting where you can imagine doing your best work.",
    options: [
      {
        value: "product-team",
        label: "A product team building digital experiences",
        domains: ["web-development", "ui-ux-design", "mobile-development"],
      },
      {
        value: "research-lab",
        label: "A research or analytics environment",
        domains: ["machine-learning", "data-science", "psychology"],
      },
      {
        value: "business-floor",
        label: "A business, consulting, or operations setup",
        domains: ["business-administration", "accounting", "economics"],
      },
      {
        value: "creative-studio",
        label: "A creative studio, media room, or editorial space",
        domains: ["graphic-design", "journalism", "literature"],
      },
      {
        value: "infra-center",
        label: "A systems, security, or infrastructure-focused team",
        domains: ["cybersecurity", "cloud-computing", "devops"],
      },
      {
        value: "startup-lab",
        label: "A fast-moving startup experimenting with new tech",
        domains: ["blockchain", "marketing", "game-development"],
      },
    ],
  },
];

export function inferDomainsFromAnswers(
  answers: Record<string, string>,
  limit = 3
): InferredDomainMatch[] {
  const domainScores = Object.keys(DOMAIN_META).reduce<Record<Domain, number>>(
    (acc, domain) => {
      acc[domain] = 0;
      return acc;
    },
    {} as Record<Domain, number>
  );

  const domainReasons = Object.keys(DOMAIN_META).reduce<Record<Domain, string[]>>(
    (acc, domain) => {
      acc[domain] = [];
      return acc;
    },
    {} as Record<Domain, string[]>
  );

  PROFILING_QUESTIONS.forEach((question) => {
    const selectedValue = answers[question.id];
    const selectedOption = question.options.find(
      (option) => option.value === selectedValue
    );

    if (!selectedOption) {
      return;
    }

    selectedOption.domains.forEach((domain, index) => {
      const weight = index === 0 ? 4 : index === 1 ? 3 : 2;
      domainScores[domain] += weight;

      if (domainReasons[domain].length < 3) {
        domainReasons[domain].push(selectedOption.label);
      }
    });
  });

  return Object.keys(DOMAIN_META)
    .map((domain) => ({
      domain,
      score: domainScores[domain],
      reasons: Array.from(new Set(domainReasons[domain])).slice(0, 3),
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.domain.localeCompare(b.domain))
    .slice(0, limit);
}
