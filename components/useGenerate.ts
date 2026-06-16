"use client";

import { useState } from "react";
import type { Persona } from "@/lib/prompts";
import { parseDrafts, parseThread, type Draft } from "@/lib/parseDrafts";

interface Args {
  mode: "tweet" | "reply" | "replyback" | "thread" | "replyloop" | "analyze" | "plan";
  persona: Persona;
  model: string;
  // When true, keep the model output as one raw markdown block instead of
  // splitting it into numbered drafts (used for analysis / growth plan).
  raw?: boolean;
  // Custom parser for reply/other modes that need different splitting logic
  parser?: (raw: string) => Draft[];
}

export function useGenerate({ mode, persona, model, raw = false, parser }: Args) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [threadTweets, setThreadTweets] = useState<{ tweet: string; label: string }[]>([]);
  const [rawText, setRawText] = useState<string>("");

  async function generate(
    input: string,
    extra: {
      hook?: string;
      intent?: string;
      theirReply?: string;
      minutes?: string;
    } = {}
  ): Promise<string | undefined> {
    setLoading(true);
    setError(null);
    setDrafts([]);
    setThreadTweets([]);
    setRawText("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, input, persona, model, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      if (raw) {
        setRawText(data.result);
        return data.result;
      }
      else if (mode === "thread") setThreadTweets(parseThread(data.result));
      else if (parser) setDrafts(parser(data.result));
      else setDrafts(parseDrafts(data.result));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, drafts, threadTweets, rawText, generate };
}
