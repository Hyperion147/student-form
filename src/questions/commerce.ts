import { DomainMeta } from "@/types/form";

export const commerceDomains: Record<string, DomainMeta> = {
  "accounting": {
    label: "Accounting",
    icon: "📈",
    color: "from-blue-600 to-indigo-500",
    description: "Financial tracking, auditing, and corporate finance",
    questions: [
      {
        id: "com-acc-1",
        question: "How comfortable are you with basic mathematics and numbers?",
        type: "mcq",
        options: ["Not very comfortable", "I can manage basic math", "I enjoy calculating and organizing numbers", "I love complex calculations"],
      },
      {
        id: "com-acc-2",
        question: "Have you ever managed a personal budget or tracked expenses?",
        type: "mcq",
        options: ["No, never", "Occasionally on an app/paper", "Yes, structured in a spreadsheet", "Yes, accurately for an organization/club"],
      },
      {
        id: "com-acc-3",
        question: "What is your comfort level with financial statements?",
        type: "mcq",
        options: ["Complete beginner", "Intermediate (Can read Balance Sheets)", "Advanced (Auditing/Taxation)"],
      },
      {
        id: "com-acc-4",
        question: "Which accounting tools are you familiar with?",
        type: "mcq",
        options: ["None", "Excel only", "Tally", "QuickBooks / SAP / Oracle"],
      },
      {
        id: "com-acc-5",
        question: "What career role excites you most?",
        type: "mcq",
        options: ["Chartered Accountant (CA)", "Financial Analyst", "Tax Consultant", "Corporate Auditor", "Other"],
      },
    ],
    youtubeKeywords: ["chartered accountant day in life", "financial analyst motivation", "accounting career progression"],
  },
  "marketing": {
    label: "Marketing",
    icon: "📣",
    color: "from-pink-500 to-rose-400",
    description: "Digital marketing, brand management, and sales",
    questions: [
      {
        id: "com-mkt-1",
        question: "How comfortable are you with talking to new people?",
        type: "mcq",
        options: ["Very shy", "I take some time to open up", "Comfortable with small groups", "Very outgoing and conversational"],
      },
      {
        id: "com-mkt-2",
        question: "Do you enjoy convincing others or negotiating?",
        type: "mcq",
        options: ["Not really", "Sometimes, if I know the topic well", "Yes, I enjoy a good debate", "Yes, I love persuading people"],
      },
      {
        id: "com-mkt-3",
        question: "Which aspect of marketing interests you most?",
        type: "mcq",
        options: ["Digital Marketing (SEO/Ads)", "Brand Management", "Content Creation", "Market Research", "Sales"],
      },
      {
        id: "com-mkt-4",
        question: "Have you ever managed a social media page or run campaigns?",
        type: "mcq",
        options: ["No experience", "No, but I follow trends closely", "Yes, for a personal project/college", "Yes, professionally"],
      },
      {
        id: "com-mkt-5",
        question: "What is your primary career goal in marketing?",
        type: "mcq",
        options: ["Digital Marketing Manager", "Brand Strategist", "Social Media Influencer", "Sales Director", "Other"],
      },
    ],
    youtubeKeywords: ["marketing manager day in life", "digital marketing motivation", "brand manager routine"],
  },
  "business-administration": {
    label: "Business Administration",
    icon: "🏢",
    color: "from-slate-600 to-gray-500",
    description: "Business operations, HR, and management",
    questions: [
      {
        id: "com-ba-1",
        question: "Are you organized and good at planning events/schedules?",
        type: "mcq",
        options: ["Not at all", "Somewhat, when required", "Very organized", "I excel at orchestrating complex events"],
      },
      {
        id: "com-ba-2",
        question: "Have you ever led a group project or a college team?",
        type: "mcq",
        options: ["Never", "Yes, but I didn't enjoy it", "Yes, managed a small team", "Yes, led large teams successfully"],
      },
      {
        id: "com-ba-3",
        question: "Which area of business operations do you prefer?",
        type: "mcq",
        options: ["Human Resources (HR)", "Operations & Supply Chain", "Business Strategy", "Project Management"],
      },
      {
        id: "com-ba-4",
        question: "How do you prefer to handle team conflicts?",
        type: "mcq",
        options: ["Mediate and find a compromise", "Follow strict company policies", "Open team discussion", "Direct intervention"],
      },
      {
        id: "com-ba-5",
        question: "Where do you see yourself in the corporate ladder?",
        type: "mcq",
        options: ["HR Manager", "Operations Head", "Strategy Consultant", "Startup Founder", "Other"],
      },
    ],
    youtubeKeywords: ["HR manager day in life", "business consultant routine", "management student motivation"],
  },
  "economics": {
    label: "Economics",
    icon: "⚖️",
    color: "from-green-600 to-emerald-500",
    description: "Market trends, policy making, and financial economics",
    questions: [
      {
        id: "com-eco-1",
        question: "Do you enjoy reading about global news, politics, or trade markets?",
        type: "mcq",
        options: ["Rarely", "Sometimes, if it's popular", "Yes, I follow it regularly", "Yes, I analyze news trends deeply"],
      },
      {
        id: "com-eco-2",
        question: "How do you feel about learning abstract theories?",
        type: "mcq",
        options: ["I dislike them totally", "I prefer practical applications", "I don't mind them", "I find abstract systems fascinating"],
      },
      {
        id: "com-eco-3",
        question: "What branch of economics interests you more?",
        type: "mcq",
        options: ["Macroeconomics (Policies/Global)", "Microeconomics (Markets/Firms)", "Behavioral Economics", "Econometrics/Data"],
      },
      {
        id: "com-eco-4",
        question: "How comfortable are you with statistics and data analysis?",
        type: "mcq",
        options: ["Beginner/Dislike statistics", "Moderate (Excel/SPSS)", "Very comfortable (R/Python)"],
      },
      {
        id: "com-eco-5",
        question: "What type of role are you aiming for?",
        type: "mcq",
        options: ["Economic Advisor/Policy Maker", "Market Research Analyst", "Investment Banker", "Academic Researcher", "Other"],
      },
    ],
    youtubeKeywords: ["economist day in life", "investment banker routine", "economics student motivation"],
  }
};
