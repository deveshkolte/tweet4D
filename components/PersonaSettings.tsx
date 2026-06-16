"use client";

import { useState } from "react";
import type { Persona } from "@/lib/prompts";

export default function PersonaSettings({
  persona,
  onChange,
  model,
  onModelChange,
  models,
}: {
  persona: Persona;
  onChange: (p: Persona) => void;
  model: string;
  onModelChange: (m: string) => void;
  models: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-medium text-slate-700"
      >
        <span>Persona & model settings</span>
        <span className="text-slate-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          <label className="block text-xs font-medium text-slate-500">
            Bio
            <textarea
              value={persona.bio}
              onChange={(e) => onChange({ ...persona, bio: e.target.value })}
              className="mt-1 h-20 w-full rounded-md border border-slate-200 p-2 text-sm"
            />
          </label>
          <label className="block text-xs font-medium text-slate-500">
            Niche
            <input
              value={persona.niche}
              onChange={(e) => onChange({ ...persona, niche: e.target.value })}
              className="mt-1 w-full rounded-md border border-slate-200 p-2 text-sm"
            />
          </label>
          <div className="flex gap-3">
            <label className="block flex-1 text-xs font-medium text-slate-500">
              Tone
              <select
                value={persona.tone}
                onChange={(e) =>
                  onChange({ ...persona, tone: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-slate-200 p-2 text-sm"
              >
                {["casual", "professional", "witty", "contrarian"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block flex-1 text-xs font-medium text-slate-500">
              Model
              <select
                value={model}
                onChange={(e) => onModelChange(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 p-2 text-sm"
              >
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
