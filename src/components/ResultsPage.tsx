"use client";

import { FormData, Domain, DOMAIN_META } from "@/types/form";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  SparklesIcon, 
  YoutubeIcon, 
  Award01Icon, 
  BookOpen01Icon, 
  ArrowRight01Icon, 
  Refresh01Icon, 
  Mail01Icon, 
  Layout01Icon 
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  const inferredDomains = formData.domainInterests?.inferredDomains ?? [];
  const name = formData.personalInfo?.fullName?.split(" ")[0] ?? "Student";

  const allVideos = domains.flatMap((d) =>
    (YOUTUBE_SUGGESTIONS[d] ?? []).slice(0, 2).map((v) => ({ ...v, domain: d }))
  ).slice(0, 5);

  return (
    <div className="animate-slide-up space-y-8">
      {/* Header */}
      <Card className="border-none bg-gradient-to-br from-campus-600 via-campus-600 to-indigo-700 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <CardContent className="relative z-10 py-10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30 shadow-inner">
            <HugeiconsIcon icon={Award01Icon} className="w-8 h-8 text-yellow-300 drop-shadow-md" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Your Results, {name}! 🎉</h2>
          <p className="text-campus-100 text-sm mt-2 font-medium opacity-90">AI-Powered Career Roadmap Based on Your Profile</p>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card className="border-2 border-campus-100 bg-campus-50/30 overflow-hidden">
        <CardHeader className="flex-row items-center gap-3 space-y-0 px-6 py-5">
          <div className="w-10 h-10 rounded-xl bg-campus-600 flex items-center justify-center shadow-lg shadow-campus-200">
            <HugeiconsIcon icon={SparklesIcon} className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-800">AI Career Analysis</CardTitle>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by fragbasic.fun Engine</p>
          </div>
          {!analysis && (
            <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200 animate-pulse text-[10px]">
              Processing Profile
            </Badge>
          )}
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {analysis ? (
            <div className="bg-white rounded-xl p-6 border border-campus-100/50 shadow-sm text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {analysis}
            </div>
          ) : (
            <div className="space-y-4">
              {domains.map((d) => {
                const meta = DOMAIN_META[d];
                return (
                  <Card key={d} className="bg-white border-campus-100/50 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl">{meta.icon}</span>
                        <span className="font-bold text-sm text-slate-800">{meta.label}</span>
                        <div className="ml-auto h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-campus-400 to-campus-600 rounded-full animate-pulse-soft" style={{ width: "70%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-3 bg-slate-100/60 rounded-full animate-pulse" style={{ width: `${90 - i * 15}%`, animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-campus-500 uppercase tracking-tighter italic">
                        <HugeiconsIcon icon={SparklesIcon} className="w-3 h-3" />
                        Generating domain specific insights...
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-campus-100/50 text-center shadow-inner">
            <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
              <HugeiconsIcon icon={Mail01Icon} className="w-3.5 h-3.5 text-campus-500" />
              Full assessment report sent to:{" "}
              <span className="font-bold text-campus-700">{formData.submission?.contactValue ?? formData.personalInfo?.email}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {inferredDomains.length > 0 && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex-row items-center gap-2 space-y-0 px-5 py-4 border-b">
            <HugeiconsIcon icon={SparklesIcon} className="w-5 h-5 text-campus-600" />
            <CardTitle className="text-base font-bold text-slate-800">Inferred Interests</CardTitle>
          </CardHeader>
          <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {inferredDomains.map((match, index) => {
              const meta = DOMAIN_META[match.domain];

              return (
                <div key={match.domain} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{meta.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{meta.label}</p>
                      <p className="text-[10px] uppercase tracking-wide text-campus-600 font-bold">
                        Match #{index + 1}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {match.reasons.join(" • ")}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex-row items-center gap-2 space-y-0 px-5 py-4 border-b">
          <HugeiconsIcon icon={Layout01Icon} className="w-5 h-5 text-campus-600" />
          <CardTitle className="text-base font-bold text-slate-800">Your Action Plan</CardTitle>
          <Badge className="ml-auto bg-campus-50 text-campus-700 hover:bg-campus-100 border-none font-bold text-[10px]">
            AI GENERATED
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              "Beginner resources matched to your level", 
              "Project ideas for your portfolio", 
              "Community & mentorship suggestions", 
              "Certification pathway"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 group transition-colors hover:bg-slate-50/50">
                <div className="w-7 h-7 rounded-full bg-campus-50 text-campus-700 text-xs font-bold flex items-center justify-center shrink-0 border border-campus-100 group-hover:bg-campus-600 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-slate-300 ml-auto group-hover:text-campus-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 bg-red-50/30 overflow-hidden shadow-sm">
        <CardHeader className="flex-row items-center gap-2 space-y-0 px-5 py-4 border-b border-red-100 bg-red-50/50">
          <HugeiconsIcon icon={YoutubeIcon} className="w-5 h-5 text-red-600" />
          <CardTitle className="text-base font-bold text-slate-800">Learning & Inspiration</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <p className="text-xs text-slate-500">
            Handpicked videos to keep you inspired on your selected domains.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {allVideos.map((video, i) => (
              <a
                key={i}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl p-3 border border-red-100/50 hover:border-red-300 hover:shadow-md transition-all group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-2xl shrink-0 group-hover:bg-red-100 transition-colors">
                  {video.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">{video.channel}</span>
                    <Separator orientation="vertical" className="h-2 bg-slate-200" />
                    <span className="text-[10px] text-campus-600 font-bold uppercase tracking-tighter">
                      {DOMAIN_META[video.domain as Domain]?.label}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-red-50 group-hover:text-red-500 transition-all">
                  <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center pt-8 border-t border-slate-100">
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-slate-400 hover:text-red-600 hover:bg-red-50 gap-2 transition-all"
        >
          <HugeiconsIcon icon={Refresh01Icon} className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}
