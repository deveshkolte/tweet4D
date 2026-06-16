"use client";

import { useState } from "react";
import TweetGenerator from "@/components/TweetGenerator";
import ReplyGenerator from "@/components/ReplyGenerator";
import ReplyBackGenerator from "@/components/ReplyBackGenerator";
import ThreadGenerator from "@/components/ThreadGenerator";
import AccountAnalyzer from "@/components/AccountAnalyzer";
import GrowthPlan from "@/components/GrowthPlan";
import BestTime from "@/components/BestTime";
import HistoryViewer from "@/components/HistoryViewer";
import TimeBanner from "@/components/TimeBanner";
import PersonaSettings from "@/components/PersonaSettings";
import { DEFAULT_PERSONA, type Persona } from "@/lib/prompts";
import { DEFAULT_MODEL, FREE_MODELS } from "@/lib/openrouter";

type Tab = "tweet" | "reply" | "replyback" | "thread" | "analyze" | "plan" | "history" | "besttime";

export default function Home() {
  const [tab, setTab] = useState<Tab>("tweet");
  const [persona, setPersona] = useState<Persona>(DEFAULT_PERSONA);
  const [model, setModel] = useState<string>(DEFAULT_MODEL);

  const tabs: { id: Tab; label: string }[] = [
    { id: "tweet", label: "Tweet" },
    { id: "reply", label: "Reply" },
    { id: "replyback", label: "Reply-back" },
    { id: "thread", label: "Thread" },
    { id: "analyze", label: "Analyze" },
    { id: "plan", label: "Growth plan" },
    { id: "history", label: "History" },
    { id: "besttime", label: "Best time" },
  ];

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-brand">tweet4D</h1>
        <p className="text-sm text-slate-500">
          Draft catchy tweets, replies & threads. Built to grow you in the AI
          space, one post at a time.
        </p>
      </header>

      <PersonaSettings
        persona={persona}
        onChange={setPersona}
        model={model}
        onModelChange={setModel}
        models={FREE_MODELS}
      />

      <nav className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-brand text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <TimeBanner />

      <section className="mt-4">
        {tab === "tweet" && (
          <TweetGenerator persona={persona} model={model} />
        )}
        {tab === "reply" && (
          <ReplyGenerator persona={persona} model={model} />
        )}
        {tab === "replyback" && (
          <ReplyBackGenerator persona={persona} model={model} />
        )}
        {tab === "thread" && (
          <ThreadGenerator persona={persona} model={model} />
        )}
        {tab === "analyze" && (
          <AccountAnalyzer persona={persona} model={model} />
        )}
        {tab === "plan" && <GrowthPlan persona={persona} model={model} />}
        {tab === "history" && <HistoryViewer />}
        {tab === "besttime" && <BestTime />}
      </section>

      <footer className="mt-10 text-center text-xs text-slate-400">
        Drafts only. Review before posting. Powered by OpenRouter.
      </footer>
    </main>
  );
}
