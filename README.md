# 🎓 Campus Compass — Student Career Assessment

A beautiful multi-step student assessment form built with **Next.js 14**, **React Hook Form**, **Zod**, **shadcn/ui**, **Tailwind CSS**, and **TypeScript**. Designed with a college-friendly, study-theme aesthetic.

## ✨ Features

- **5-step multipart form** with full validation at each step
- **Persistent state** — each step is saved to `localStorage` automatically; refreshing won't lose data
- **Dynamic questions** — Step 3 questions are generated based on the domains the student selected in Step 2
- **Max 3 domain selection** with visual feedback and slot indicators
- **AI-ready API route** at `/api/analyze` — just plug in your `ANTHROPIC_API_KEY`
- **YouTube motivation suggestions** curated per domain/career path
- **Responsive design** — works great on mobile and desktop
- **TypeScript throughout** — fully typed form data and API contracts

## 📋 Form Steps

| Step | Section | Description |
|------|---------|-------------|
| 1 | Personal Info | Name, Roll No, Email, Phone, Year, Branch, College |
| 2 | Domain Interests | Choose 2–3 domains from 10 tech career tracks |
| 3 | Knowledge Check | Dynamic MCQ + open-ended questions per selected domain |
| 4 | Challenges & Goals | Difficulties faced, approach taken, short & long-term goals |
| 5 | Submit | Delivery preference (Email / WhatsApp / Both) + consent |

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤖 Activating AI Results

The AI analysis route is ready at `src/app/api/analyze/route.ts`.

### Steps to activate:

1. Install the Anthropic SDK:
   ```bash
   npm install @anthropic-ai/sdk
   ```

2. Add your key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. In `src/app/api/analyze/route.ts`, uncomment the Anthropic block:
   ```ts
   import Anthropic from "@anthropic-ai/sdk";
   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
   const message = await anthropic.messages.create({
     model: "claude-opus-4-5",
     max_tokens: 1500,
     messages: [{ role: "user", content: prompt }],
   });
   const analysis = message.content[0].type === "text" ? message.content[0].text : "";
   ```

4. In `src/components/ResultsPage.tsx`, call the API and render `analysis` using a markdown renderer like `react-markdown`.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts    # AI analysis endpoint
│   ├── globals.css             # Tailwind + custom study-theme styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main orchestrator page
├── components/
│   ├── form-steps/
│   │   ├── Step1PersonalInfo.tsx
│   │   ├── Step2DomainInterests.tsx
│   │   ├── Step3DomainKnowledge.tsx
│   │   ├── Step4Challenges.tsx
│   │   └── Step5Submission.tsx
│   ├── ResultsPage.tsx         # Results + YouTube suggestions
│   └── Stepper.tsx             # Progress stepper component
├── lib/
│   ├── formStore.ts            # localStorage persistence helpers
│   └── utils.ts                # cn() utility
└── types/
    └── form.ts                 # All TypeScript types + domain metadata
```

## 🎨 Domains Supported

| Domain | Description |
|--------|-------------|
| 🌐 Web Development | Frontend, backend, full-stack |
| 📊 Data Science | Analytics, visualization |
| 🤖 Machine Learning & AI | Models, neural networks |
| 🔐 Cybersecurity | Ethical hacking, network security |
| 📱 Mobile Development | iOS, Android, cross-platform |
| ☁️ Cloud Computing | AWS, GCP, Azure |
| 🎮 Game Development | Unity, Unreal, Godot |
| 🎨 UI/UX Design | Figma, user research |
| ⚙️ DevOps | CI/CD, containers, Kubernetes |
| ⛓️ Blockchain & Web3 | Smart contracts, DeFi |

## 📦 Adding Email/WhatsApp Delivery

### Email (Resend)
```bash
npm install resend
```
In your API route, use `resend.emails.send(...)` after generating the analysis.

### WhatsApp (Twilio)
```bash
npm install twilio
```
Use `twilio.messages.create({ from: 'whatsapp:...', to: 'whatsapp:...', body: summary })`.

## 🧑‍💻 Tech Stack

- **Next.js 14** (App Router)
- **React Hook Form** + **Zod** validation
- **Tailwind CSS** with custom campus theme
- **TypeScript** throughout
- **localStorage** for step-by-step persistence
- **Lucide React** icons
- **Anthropic Claude** (AI analysis, plug-and-play)
