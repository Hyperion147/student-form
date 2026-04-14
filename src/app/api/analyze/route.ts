import { NextRequest, NextResponse } from "next/server";
import { FormData, DOMAIN_META } from "@/types/form";
import { PROFILING_QUESTIONS } from "@/lib/domainInference";

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.json();

    const { personalInfo, domainInterests, domainKnowledge, challenges } = formData;

    const profilingSummary = PROFILING_QUESTIONS.map((question) => {
      const answerValue = domainInterests.answers?.[question.id];
      const answerLabel =
        question.options.find((option) => option.value === answerValue)?.label ??
        "Not answered";

      return `- ${question.question}: ${answerLabel}`;
    }).join("\n");

    const inferredDomainsSummary = domainInterests.inferredDomains
      .map((match, index) => {
        const meta = DOMAIN_META[match.domain];
        return `${index + 1}. ${meta.label} (score ${match.score}) because of: ${match.reasons.join(", ")}`;
      })
      .join("\n");

    // Build a rich prompt for Claude
    const domainDetails = domainInterests.selectedDomains
      .map((d) => {
        const meta = DOMAIN_META[d];
        const answers = meta.questions
          .map((q) => `  Q: ${q.question}\n  A: ${domainKnowledge.answers[q.id] ?? "Not answered"}`)
          .join("\n");
        return `### ${meta.label}\n${answers}`;
      })
      .join("\n\n");

    const prompt = `You are a friendly and encouraging student career counsellor. Analyse this student's assessment and provide:

1. A brief personalised summary (2-3 sentences addressing them by first name)
2. For each of their chosen domains, give:
   - Current level assessment (Beginner / Intermediate / Advanced)
   - Top 3 actionable next steps specific to their answers
   - One key strength you noticed
   - One area to focus on
3. Overall career path recommendation
4. Top 3 resources (courses, books, or platforms) matched to their level
5. A motivating closing message

Student Profile:
- Name: ${personalInfo.fullName}
- Year: ${personalInfo.year}, Branch: ${personalInfo.branch}
- College: ${personalInfo.college}

    Inferred Domains: ${domainInterests.selectedDomains.join(", ")}

    Interest Discovery Answers:
    ${profilingSummary}

    Why these domains were inferred:
    ${inferredDomainsSummary}

    Domain Knowledge Responses:
    ${domainDetails}

Challenges: ${challenges.difficulties}
Approach Taken: ${challenges.approach}
Short-term Goal: ${challenges.shortTermGoal}
Long-term Goal: ${challenges.longTermGoal}

Respond in a warm, college-friendly tone. Use emojis sparingly. Format with clear sections using markdown headings. Keep it concise but genuinely helpful.`;

    // ── Replace this block with actual Anthropic API call ──────────────────
    // import Anthropic from "@anthropic-ai/sdk";
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    // const message = await anthropic.messages.create({
    //   model: "claude-opus-4-5",
    //   max_tokens: 1500,
    //   messages: [{ role: "user", content: prompt }],
    // });
    // const analysis = message.content[0].type === "text" ? message.content[0].text : "";
    // ──────────────────────────────────────────────────────────────────────

    // Placeholder response until API is integrated
    const analysis = `## Your Assessment Results, ${personalInfo.fullName.split(" ")[0]}! 🎓

> AI analysis will appear here once you connect your Anthropic API key in \`.env.local\`.

**Prompt ready to send:**
\`\`\`
${prompt.slice(0, 300)}...
\`\`\`

Set \`ANTHROPIC_API_KEY\` in your environment and uncomment the API call in \`/src/app/api/analyze/route.ts\` to activate full AI results.`;

    return NextResponse.json({ analysis, prompt });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}
