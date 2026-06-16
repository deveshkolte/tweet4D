"use client";

import { useState } from "react";
import DraftScore from "./DraftScore";
import type { Draft } from "@/lib/parseDrafts";

function characterClass(count: number) {
  if (count > 280) return "text-red-500";
  if (count > 260) return "text-amber-600";
  return "text-emerald-600";
}

function checklistItem(condition: boolean, label: string) {
  return `${condition ? "✅" : "❌"} ${label}`;
}

export default function DraftCard({ draft }: { draft: Draft }) {
  const [copied, setCopied] = useState(false);
  const count = draft.tweet.length;
  const tooLong = count > 280;
  const hasQuestion = draft.tweet.trim().endsWith("?");
  const noHashtags = !/#\w+/.test(draft.tweet);
  const hasNumber = /\d+/.test(draft.tweet);
  const optimalLength = count < 260;

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft.tweet);
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweet: draft.tweet }),
      });
    } catch {
      // ignore history save failures
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="whitespace-pre-wrap text-[15px] leading-snug">{draft.tweet}</p>
      {draft.explanation ? (
        <p className="mt-3 text-sm text-gray-400">{draft.explanation}</p>
      ) : null}
      <DraftScore text={draft.tweet} />
      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
        <span>{checklistItem(!tooLong, "Under 280 chars")}</span>
        <span>{checklistItem(hasQuestion, "Has a question")}</span>
        <span>{checklistItem(noHashtags, "No hashtags")}</span>
        <span>{checklistItem(hasNumber, "Has a number/detail")}</span>
        <span>{checklistItem(optimalLength, "Optimal length (under 260)")}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs ${characterClass(count)}`}>
          {tooLong ? "TOO LONG" : `${count}/280`}
        </span>
        <button
          onClick={copy}
          className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
