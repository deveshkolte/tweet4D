"use client";

import { POSTING_WINDOWS, TIMING_TIPS, localTimezone } from "@/lib/bestTime";

export default function BestTime() {
  const tz = typeof window !== "undefined" ? localTimezone() : "your timezone";

  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">
        Best windows to post for an AI/tech audience. Times are local to{" "}
        <span className="font-medium text-slate-700">{tz}</span>. Posting when
        your audience is online boosts early velocity, which helps trigger the
        out-of-network push.
      </p>
      <div className="space-y-3">
        {POSTING_WINDOWS.map((w) => (
          <div
            key={w.label}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="font-medium text-slate-800">{w.label}</div>
            <div className="text-sm text-slate-500">{w.detail}</div>
          </div>
        ))}
      </div>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
        {TIMING_TIPS.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
