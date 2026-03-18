"use client";

import { FormData, Domain, DOMAIN_META } from "@/types/form";
import { SparklesIcon, YoutubeIcon, TrophyIcon, BookOpenIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";

interface Props {
  formData: Partial<FormData>;
  analysis: string | null;
  onReset: () => void;
}

// Static YouTube motivation video suggestions per domain (placeholders for AI integration)
const YOUTUBE_SUGGESTIONS: Record<Domain, { title: string; channel: string; url: string; thumbnail: string }[]> = {
  "web-development": [
    { title: "Day in the Life of a Software Engineer at Google", channel: "Mayuko", url: "https://youtube.com/results?search_query=day+in+life+software+engineer+google", thumbnail: "🖥️" },
    { title: "Junior Web Developer Reality Check", channel: "Fireship", url: "https://youtube.com/results?search_query=junior+web+developer+day+in+life", thumbnail: "⚡" },
    { title: "From 0 to Full Stack Developer – My Journey", channel: "Kevin Powell", url: "https://youtube.com/results?search_query=full+stack+developer+journey+motivation", thumbnail: "🌐" },
  ],
  "data-science": [
    { title: "A Day in the Life of a Data Scientist", channel: "Ken Jee", url: "https://youtube.com/results?search_query=day+in+life+data+scientist+ken+jee", thumbnail: "📊" },
    { title: "How I Became a Data Analyst at 21", channel: "Alex The Analyst", url: "https://youtube.com/results?search_query=how+i+became+data+analyst+alex", thumbnail: "📈" },
    { title: "Data Science Student Routine That Actually Works", channel: "TiffinTech", url: "https://youtube.com/results?search_query=data+science+student+study+routine", thumbnail: "📚" },
  ],
  "machine-learning": [
    { title: "Day in the Life of an ML Engineer at Meta", channel: "Andrej Karpathy", url: "https://youtube.com/results?search_query=machine+learning+engineer+day+life", thumbnail: "🤖" },
    { title: "Learning Deep Learning from Scratch", channel: "3Blue1Brown", url: "https://youtube.com/results?search_query=deep+learning+from+scratch+motivation", thumbnail: "🧠" },
    { title: "AI Student to Research Scientist – My Path", channel: "Yannic Kilcher", url: "https://youtube.com/results?search_query=AI+research+scientist+career+path", thumbnail: "🔬" },
  ],
  "cybersecurity": [
    { title: "Day in the Life of a Cybersecurity Analyst", channel: "Gerald Auger", url: "https://youtube.com/results?search_query=day+in+life+cybersecurity+analyst", thumbnail: "🔐" },
    { title: "How I Got Into Ethical Hacking", channel: "NetworkChuck", url: "https://youtube.com/results?search_query=how+to+start+ethical+hacking+networkchuck", thumbnail: "💻" },
    { title: "Bug Bounty Hunter Day in the Life", channel: "STÖK", url: "https://youtube.com/results?search_query=bug+bounty+hunter+day+in+life", thumbnail: "🐛" },
  ],
  "mobile-development": [
    { title: "Day in the Life of an iOS Developer at Apple", channel: "Sean Allen", url: "https://youtube.com/results?search_query=iOS+developer+day+in+life+apple", thumbnail: "📱" },
    { title: "Flutter Developer Routine", channel: "The Net Ninja", url: "https://youtube.com/results?search_query=flutter+developer+day+in+life+routine", thumbnail: "🎯" },
    { title: "From Student to App Developer – Real Talk", channel: "CodeWithChris", url: "https://youtube.com/results?search_query=student+to+app+developer+motivation", thumbnail: "🚀" },
  ],
  "cloud-computing": [
    { title: "Day in the Life of a Cloud Engineer", channel: "TechWorld with Nana", url: "https://youtube.com/results?search_query=cloud+engineer+day+in+life", thumbnail: "☁️" },
    { title: "AWS Certification Journey – Student Perspective", channel: "freeCodeCamp", url: "https://youtube.com/results?search_query=AWS+cloud+certification+student+journey", thumbnail: "📜" },
    { title: "DevOps Engineer Salary & Career Advice", channel: "Kunal Kushwaha", url: "https://youtube.com/results?search_query=devops+engineer+career+salary+advice", thumbnail: "⚙️" },
  ],
  "game-development": [
    { title: "Day in the Life of an Indie Game Developer", channel: "Jonas Tyroller", url: "https://youtube.com/results?search_query=indie+game+developer+day+in+life", thumbnail: "🎮" },
    { title: "My First Year as a Game Developer", channel: "Brackeys", url: "https://youtube.com/results?search_query=first+year+game+developer+experience", thumbnail: "🕹️" },
    { title: "Student Game Dev – From Dorm to Steam", channel: "GDC", url: "https://youtube.com/results?search_query=student+game+developer+steam+release", thumbnail: "🏆" },
  ],
  "ui-ux-design": [
    { title: "Day in the Life of a Product Designer at Google", channel: "Rachel How", url: "https://youtube.com/results?search_query=product+designer+google+day+in+life", thumbnail: "🎨" },
    { title: "Junior UX Designer – My Honest Review", channel: "DesignWithArash", url: "https://youtube.com/results?search_query=junior+UX+designer+honest+review", thumbnail: "🖌️" },
    { title: "How I Built My UX Portfolio from Scratch", channel: "AJ&Smart", url: "https://youtube.com/results?search_query=UX+design+portfolio+from+scratch", thumbnail: "✏️" },
  ],
  "devops": [
    { title: "Day in the Life of a DevOps Engineer", channel: "TechWorld with Nana", url: "https://youtube.com/results?search_query=devops+engineer+day+in+life+nana", thumbnail: "⚙️" },
    { title: "Site Reliability Engineer – Google SRE Interview", channel: "Google Careers", url: "https://youtube.com/results?search_query=site+reliability+engineer+google+day+life", thumbnail: "🔧" },
    { title: "Kubernetes & DevOps for Beginners", channel: "Kunal Kushwaha", url: "https://youtube.com/results?search_query=kubernetes+devops+beginner+journey", thumbnail: "🐳" },
  ],
  "blockchain": [
    { title: "Day in the Life of a Blockchain Developer", channel: "Dapp University", url: "https://youtube.com/results?search_query=blockchain+developer+day+in+life", thumbnail: "⛓️" },
    { title: "Web3 Developer – My First 90 Days", channel: "Patrick Collins", url: "https://youtube.com/results?search_query=web3+developer+first+90+days+experience", thumbnail: "🌐" },
    { title: "How I Got a $150k Web3 Job with No Degree", channel: "Austin Griffith", url: "https://youtube.com/results?search_query=web3+job+without+degree+blockchain", thumbnail: "💎" },
  ],
};

export function ResultsPage({ formData, analysis, onReset }: Props) {
  const domains = formData.domainInterests?.selectedDomains ?? [];
  const name = formData.personalInfo?.fullName?.split(" ")[0] ?? "Student";

  const allVideos = domains.flatMap((d) =>
    (YOUTUBE_SUGGESTIONS[d] ?? []).slice(0, 2).map((v) => ({ ...v, domain: d }))
  ).slice(0, 5);

  return (
    <div className="animate-slide-up space-y-8">
      {/* Header */}
      <div className="text-center py-6 rounded-2xl bg-gradient-to-br from-campus-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <TrophyIcon className="w-8 h-8 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-bold">Your Results, {name}! 🎉</h2>
          <p className="text-campus-100 text-sm mt-1">Here's your personalised career assessment</p>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="rounded-2xl border-2 border-campus-200 p-6 bg-campus-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-campus-600 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">AI Career Analysis</h3>
            <p className="text-xs text-slate-400">Powered by Campus Compass AI</p>
          </div>
          {!analysis && (
            <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
              Coming Soon
            </span>
          )}
        </div>

        {analysis ? (
          <div className="bg-white rounded-xl p-4 border border-campus-100 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {analysis}
          </div>
        ) : (
          <div className="space-y-3">
            {domains.map((d) => {
              const meta = DOMAIN_META[d];
              return (
                <div key={d} className="bg-white rounded-xl p-4 border border-campus-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{meta.icon}</span>
                    <span className="font-semibold text-sm text-slate-800">{meta.label}</span>
                    <div className="ml-auto h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-campus-400 to-campus-600 rounded-full animate-pulse-soft" style={{ width: "70%" }} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-3 bg-slate-100 rounded-full animate-pulse" style={{ width: `${85 - i * 15}%`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <p className="text-xs text-campus-500 mt-3 font-medium flex items-center gap-1">
                    <SparklesIcon className="w-3 h-3" />
                    AI analysis will appear here after integration
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 p-3 bg-white rounded-lg border border-campus-100 text-center">
          <p className="text-sm text-slate-600">
            📧 A detailed report will be sent to{" "}
            <strong className="text-campus-600">{formData.submission?.contactValue ?? formData.personalInfo?.email}</strong>
          </p>
        </div>
      </div>

      {/* Roadmap placeholder */}
      <div className="rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpenIcon className="w-5 h-5 text-campus-600" />
          <h3 className="font-bold text-slate-800">Your Personalised Roadmap</h3>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">AI Driven</span>
        </div>
        <div className="space-y-2">
          {["Beginner resources matched to your level", "Project ideas for your portfolio", "Community & mentorship suggestions", "Certification pathway"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-campus-100 text-campus-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <span className="text-sm text-slate-600">{item}</span>
              <ArrowRightIcon className="w-4 h-4 text-slate-300 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Suggestions */}
      <div className="rounded-xl border border-red-100 p-5 bg-red-50">
        <div className="flex items-center gap-2 mb-4">
          <YoutubeIcon className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-slate-800">Motivation & Day-in-the-Life Videos</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Stay inspired! Here are videos curated for your career path to keep you motivated.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {allVideos.map((video, i) => (
            <a
              key={i}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-xl p-3 border border-red-100 hover:border-red-300 hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center text-2xl shrink-0">
                {video.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                  {video.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{video.channel}</p>
                <span className="text-xs text-campus-500 font-medium">
                  {DOMAIN_META[video.domain as Domain]?.label}
                </span>
              </div>
              <ArrowRightIcon className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Start a new assessment
        </button>
      </div>
    </div>
  );
}
