import { DomainMeta } from "@/types/form";

export const artsDomains: Record<string, DomainMeta> = {
  "graphic-design": {
    label: "Graphic Design",
    icon: "🖌️",
    color: "from-fuchsia-500 to-purple-400",
    description: "Visual concepts, branding, and illustration",
    questions: [
      {
        id: "art-gd-1",
        question: "How would you describe your artistic or creative abilities?",
        type: "mcq",
        options: ["Not very creative", "I enjoy drawing casually", "I have an eye for colors and layouts", "I sketch and design frequently"],
      },
      {
        id: "art-gd-2",
        question: "Do you prefer digital drawing or traditional (paper) art?",
        type: "mcq",
        options: ["I don't draw much", "Traditional paper art exclusively", "A mix of both", "Strictly digital design"],
      },
      {
        id: "art-gd-3",
        question: "Which tools are you most proficient in?",
        type: "mcq",
        options: ["None yet", "Canva", "Procreate/Digital Painting apps", "Figma/Sketch", "Adobe Photoshop/Illustrator"],
      },
      {
        id: "art-gd-4",
        question: "What type of design do you enjoy most?",
        type: "mcq",
        options: ["Logo & Branding", "Social Media Creatives", "Character Illustration", "Print Media", "UI/UX Design"],
      },
      {
        id: "art-gd-5",
        question: "What is your main career aspiration?",
        type: "mcq",
        options: ["Freelance Illustrator", "Art Director", "Brand Designer", "Multimedia Artist", "Other"],
      },
    ],
    youtubeKeywords: ["graphic designer day in life", "freelance illustrator routine", "design motivation"],
  },
  "journalism": {
    label: "Journalism & Mass Comm",
    icon: "🎤",
    color: "from-yellow-600 to-amber-500",
    description: "News reporting, media production, and writing",
    questions: [
      {
        id: "art-jour-1",
        question: "How comfortable are you with speaking publicly or interviewing strangers?",
        type: "mcq",
        options: ["Terrified", "Nervous but I can do it", "Comfortable with preparation", "I love engaging with people"],
      },
      {
        id: "art-jour-2",
        question: "Do you enjoy writing essays or documenting events?",
        type: "mcq",
        options: ["No, I avoid writing", "Sometimes, if the topic is interesting", "Yes, I document things often", "Yes, I write extensively"],
      },
      {
        id: "art-jour-3",
        question: "Which medium appeals to you the most?",
        type: "mcq",
        options: ["Print (Newspapers/Magazines)", "Broadcast (TV/Radio)", "Digital Media (Blogs/Web)", "Photojournalism"],
      },
      {
        id: "art-jour-4",
        question: "How much experience do you have with writing/reporting?",
        type: "mcq",
        options: ["Beginner", "Personal writing only", "College newsletter/magazine", "Published articles/blogs"],
      },
      {
        id: "art-jour-5",
        question: "What role do you want to pursue?",
        type: "mcq",
        options: ["News Anchor", "Investigative Journalist", "Content Writer/Editor", "PR Specialist", "Other"],
      },
    ],
    youtubeKeywords: ["journalist day in life", "news reporter routine", "mass media career motivation"],
  },
  "psychology": {
    label: "Psychology",
    icon: "🧠",
    color: "from-cyan-500 to-teal-400",
    description: "Human behavior, counseling, and cognitive science",
    questions: [
      {
        id: "art-psy-1",
        question: "How empathetic do you consider yourself regarding others' problems?",
        type: "mcq",
        options: ["Not very empathetic", "Somewhat empathetic", "Very empathetic", "I naturally absorb people's emotions"],
      },
      {
        id: "art-psy-2",
        question: "Do you enjoy reading or learning about how the human brain functions?",
        type: "mcq",
        options: ["Not really", "Occasionally", "I find it fascinating", "I study it constantly"],
      },
      {
        id: "art-psy-3",
        question: "What field of psychology interests you?",
        type: "mcq",
        options: ["Clinical Psychology", "Counseling/Therapy", "Organizational/Industrial", "Forensic", "Child Psychology"],
      },
      {
        id: "art-psy-4",
        question: "Are you interested in research or practice?",
        type: "mcq",
        options: ["A mix of both", "Research and academic work", "Direct practice with patients/clients"],
      },
      {
        id: "art-psy-5",
        question: "Where do you see yourself working?",
        type: "mcq",
        options: ["Hospital/Clinic", "Corporate Office (HR/I-O)", "Private Practice", "Academic Institution", "Other"],
      },
    ],
    youtubeKeywords: ["psychologist day in life", "therapist routine", "psychology student motivation"],
  },
  "literature": {
    label: "Literature & Languages",
    icon: "📚",
    color: "from-orange-500 to-red-400",
    description: "Creative writing, linguistics, and publishing",
    questions: [
      {
        id: "art-lit-1",
        question: "How often do you read books, novels, or classic literature?",
        type: "mcq",
        options: ["Rarely", "A few books a year", "Every month", "I am a voracious reader"],
      },
      {
        id: "art-lit-2",
        question: "Are you interested in analyzing metaphors and story structures?",
        type: "mcq",
        options: ["No, I just read for fun", "Sometimes, if it's obvious", "Yes, I enjoy breaking down the themes", "Yes, it is my favorite part of reading"],
      },
      {
        id: "art-lit-3",
        question: "What is your primary interest area?",
        type: "mcq",
        options: ["Creative Writing (Fiction/Poetry)", "Literary Criticism & Analysis", "Linguistics/Translation", "Publishing & Editing"],
      },
      {
        id: "art-lit-4",
        question: "Do you maintain a writing portfolio?",
        type: "mcq",
        options: ["Starting out", "I just read a lot", "A few personal pieces", "Yes, extensive portfolio"],
      },
      {
        id: "art-lit-5",
        question: "What is your dream job?",
        type: "mcq",
        options: ["Published Author", "Editorial Director", "Translator/Interpreter", "Literature Professor", "Other"],
      },
    ],
    youtubeKeywords: ["writer day in life", "editor routine", "literature student motivation"],
  }
};
