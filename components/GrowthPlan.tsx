"use client";

import { useState } from "react";
import { useGenerate } from "./useGenerate";
import type { Persona } from "@/lib/prompts";

export default function GrowthPlan({
  persona,
  model,
}: {
  persona: Persona;
  model: string;
}) {
  const [minutes, setMinutes] = useState("30");
  const { loading, error, rawText, generate } = useGenerate({
    mode: "plan",
    persona,
    model,
    raw: true,
  });

  return (
    <div>
      <p className="mb-2 text-sm text-slate-500">
        Get a concrete daily routine to grow from zero, weighted toward the
        replies that actually move a new account.
      </p>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">Minutes/day</label>
        <select
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="rounded-md border border-slate-200 px-2 py-2 text-sm"
        >
          {["15", "30", "45", "60", "90"].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          onClick={() => generate("", { minutes })}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Building..." : "Build my plan"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {rawText && (
        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed">
          {rawText}
        </div>
      )}
    </div>
  );
}
