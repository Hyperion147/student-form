export type Domain =
  | "web-development"
  | "data-science"
  | "machine-learning"
  | "cybersecurity"
  | "mobile-development"
  | "cloud-computing"
  | "game-development"
  | "ui-ux-design"
  | "devops"
  | "blockchain";

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
  selectedDomains: Domain[];
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

export const DOMAIN_META: Record<Domain, DomainMeta> = {
  "web-development": {
    label: "Web Development",
    icon: "🌐",
    color: "from-blue-500 to-cyan-400",
    description: "Frontend, backend, and full-stack web apps",
    questions: [
      {
        id: "wd-1",
        question: "Which languages/frameworks are you familiar with?",
        type: "mcq",
        options: ["HTML/CSS only", "JavaScript basics", "React/Vue/Angular", "Node.js & backend", "Full-stack"],
      },
      {
        id: "wd-2",
        question: "Have you built any personal or academic web projects?",
        type: "mcq",
        options: ["No, just started", "1-2 small projects", "3-5 projects", "5+ projects with deployment"],
      },
      {
        id: "wd-3",
        question: "Briefly describe a web project you'd love to build:",
        type: "text",
      },
    ],
    youtubeKeywords: ["web development day in life", "junior developer routine", "web dev motivation"],
  },
  "data-science": {
    label: "Data Science",
    icon: "📊",
    color: "from-green-500 to-emerald-400",
    description: "Analytics, visualization, and insights from data",
    questions: [
      {
        id: "ds-1",
        question: "What is your comfort level with Python/R for data analysis?",
        type: "mcq",
        options: ["Never used them", "Know basic syntax", "Can do EDA & visualizations", "Built ML pipelines", "Production experience"],
      },
      {
        id: "ds-2",
        question: "Which data tools have you used?",
        type: "mcq",
        options: ["Excel only", "Pandas/NumPy", "Matplotlib/Seaborn", "SQL + Python", "Spark/Big Data tools"],
      },
      {
        id: "ds-3",
        question: "What kind of data problem excites you most?",
        type: "text",
      },
    ],
    youtubeKeywords: ["data scientist day in life", "data science student routine", "data analyst motivation"],
  },
  "machine-learning": {
    label: "Machine Learning & AI",
    icon: "🤖",
    color: "from-purple-500 to-violet-400",
    description: "AI models, neural networks, and intelligent systems",
    questions: [
      {
        id: "ml-1",
        question: "How familiar are you with ML concepts?",
        type: "mcq",
        options: ["Heard of it", "Know supervised/unsupervised basics", "Implemented models in sklearn", "Built neural networks", "Researching/publishing"],
      },
      {
        id: "ml-2",
        question: "Which ML frameworks have you tried?",
        type: "mcq",
        options: ["None yet", "scikit-learn", "TensorFlow/Keras", "PyTorch", "Multiple + production"],
      },
      {
        id: "ml-3",
        question: "What AI application do you most want to build?",
        type: "text",
      },
    ],
    youtubeKeywords: ["machine learning engineer day in life", "AI researcher routine", "deep learning student motivation"],
  },
  "cybersecurity": {
    label: "Cybersecurity",
    icon: "🔐",
    color: "from-red-500 to-orange-400",
    description: "Ethical hacking, network security, and defense",
    questions: [
      {
        id: "cs-1",
        question: "What is your current knowledge in cybersecurity?",
        type: "mcq",
        options: ["Curious beginner", "Know networking basics", "Practiced CTF challenges", "Done penetration testing", "Security certifications"],
      },
      {
        id: "cs-2",
        question: "Which area of security interests you most?",
        type: "mcq",
        options: ["Ethical hacking", "Network security", "Application security", "Digital forensics", "Cloud security"],
      },
      {
        id: "cs-3",
        question: "Describe a security concept or vulnerability you want to learn more about:",
        type: "text",
      },
    ],
    youtubeKeywords: ["cybersecurity analyst day in life", "ethical hacker routine", "security engineer motivation"],
  },
  "mobile-development": {
    label: "Mobile Development",
    icon: "📱",
    color: "from-pink-500 to-rose-400",
    description: "iOS, Android, and cross-platform apps",
    questions: [
      {
        id: "mob-1",
        question: "What is your mobile development experience?",
        type: "mcq",
        options: ["No experience", "Know basic layouts", "Built 1-2 apps", "Published on app store", "Professional experience"],
      },
      {
        id: "mob-2",
        question: "Which platform/tech are you targeting?",
        type: "mcq",
        options: ["Android (Java/Kotlin)", "iOS (Swift)", "React Native", "Flutter", "Undecided"],
      },
      {
        id: "mob-3",
        question: "What app idea have you been thinking about?",
        type: "text",
      },
    ],
    youtubeKeywords: ["mobile developer day in life", "iOS developer routine", "Flutter developer motivation"],
  },
  "cloud-computing": {
    label: "Cloud Computing",
    icon: "☁️",
    color: "from-sky-500 to-blue-400",
    description: "AWS, GCP, Azure, and infrastructure at scale",
    questions: [
      {
        id: "cc-1",
        question: "How much cloud experience do you have?",
        type: "mcq",
        options: ["None", "Created free-tier accounts", "Deployed basic services", "Architected solutions", "Certified/Professional"],
      },
      {
        id: "cc-2",
        question: "Which cloud provider are you most interested in?",
        type: "mcq",
        options: ["AWS", "Google Cloud", "Microsoft Azure", "Multi-cloud", "Not sure yet"],
      },
      {
        id: "cc-3",
        question: "What kind of cloud project would you like to build?",
        type: "text",
      },
    ],
    youtubeKeywords: ["cloud engineer day in life", "DevOps engineer routine", "AWS certification motivation"],
  },
  "game-development": {
    label: "Game Development",
    icon: "🎮",
    color: "from-yellow-500 to-amber-400",
    description: "2D/3D games, game engines, and interactive experiences",
    questions: [
      {
        id: "gd-1",
        question: "What is your game development background?",
        type: "mcq",
        options: ["Just a gamer", "Tried basic tutorials", "Made a small game", "Released a game", "Professional indie dev"],
      },
      {
        id: "gd-2",
        question: "Which engine/tool are you using or want to learn?",
        type: "mcq",
        options: ["Unity", "Unreal Engine", "Godot", "GameMaker", "Custom/OpenGL"],
      },
      {
        id: "gd-3",
        question: "Describe the type of game you want to create:",
        type: "text",
      },
    ],
    youtubeKeywords: ["indie game developer day in life", "game dev routine", "Unity developer motivation"],
  },
  "ui-ux-design": {
    label: "UI/UX Design",
    icon: "🎨",
    color: "from-fuchsia-500 to-purple-400",
    description: "User interfaces, design systems, and user research",
    questions: [
      {
        id: "ux-1",
        question: "How familiar are you with design tools?",
        type: "mcq",
        options: ["No experience", "Used Canva/basic tools", "Know Figma basics", "Created full design systems", "Professional designer"],
      },
      {
        id: "ux-2",
        question: "Which UX area interests you most?",
        type: "mcq",
        options: ["Visual design", "User research", "Prototyping", "Design systems", "Motion design"],
      },
      {
        id: "ux-3",
        question: "What user problem would you like to solve with design?",
        type: "text",
      },
    ],
    youtubeKeywords: ["UX designer day in life", "product designer routine", "Figma UI design motivation"],
  },
  "devops": {
    label: "DevOps & Automation",
    icon: "⚙️",
    color: "from-slate-500 to-gray-400",
    description: "CI/CD, containers, infrastructure automation",
    questions: [
      {
        id: "do-1",
        question: "What is your DevOps knowledge level?",
        type: "mcq",
        options: ["No experience", "Basic Linux/shell", "Used Docker/CI tools", "Managed Kubernetes", "Production infrastructure owner"],
      },
      {
        id: "do-2",
        question: "Which tool are you most interested in?",
        type: "mcq",
        options: ["Docker & containers", "Kubernetes", "GitHub Actions/CI-CD", "Terraform/IaC", "Monitoring (Grafana/Prometheus)"],
      },
      {
        id: "do-3",
        question: "What automation problem would you like to solve?",
        type: "text",
      },
    ],
    youtubeKeywords: ["DevOps engineer day in life", "SRE routine", "Kubernetes automation motivation"],
  },
  "blockchain": {
    label: "Blockchain & Web3",
    icon: "⛓️",
    color: "from-orange-500 to-yellow-400",
    description: "Smart contracts, DeFi, and decentralized apps",
    questions: [
      {
        id: "bc-1",
        question: "How well do you understand blockchain concepts?",
        type: "mcq",
        options: ["Basic crypto knowledge", "Understand distributed ledgers", "Written smart contracts", "Built dApps", "Web3 professional"],
      },
      {
        id: "bc-2",
        question: "Which blockchain space interests you?",
        type: "mcq",
        options: ["DeFi", "NFTs & digital assets", "Smart contract dev", "Layer 2 solutions", "Web3 infrastructure"],
      },
      {
        id: "bc-3",
        question: "What Web3 project idea excites you?",
        type: "text",
      },
    ],
    youtubeKeywords: ["blockchain developer day in life", "Web3 developer routine", "Solidity developer motivation"],
  },
};

export const STEP_LABELS = [
  "Personal Info",
  "Interests",
  "Knowledge Check",
  "Challenges",
  "Submit",
];
