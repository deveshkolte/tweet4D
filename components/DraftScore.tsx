"use client";

import { useEffect, useState } from "react";

interface ScoreData {
  score: number;
  breakdown: Record<string, number>;
  warnings: string[];
  tips: string[];
}

function scoreColor(s: number): string {
  if (s >= 71) return "bg-emerald-500";
  if (s >= 41) return "bg-amber-500";
  return "bg-red-500";
}

function scoreTextColor(s: number): string {
  if (s >= 71) return "text-emerald-700";
  if (s >= 41) return "text-amber-700";
  return "text-red-700";
}

export default function DraftScore({ text, isThread }: { text: string; isThread?: boolean }) {
  const [data, setData] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, isThread }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (active) {
          setData(d);
        }
      })
      .catch(() => {
        if (active) {
          setData(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [text]);

  return (
    <div className="mt-3 space-y-2 text-xs">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className={`font-medium ${data ? scoreTextColor(data.score) : "text-slate-500"}`}>
            {data ? `Score: ${data.score}/100` : loading ? "Scoring..." : "Score unavailable"}
          </span>
          <div className="flex-1 overflow-hidden rounded-full bg-slate-200 h-2">
            <div
              className={`${data ? scoreColor(data.score) : "bg-slate-400"} h-2 transition-all duration-300`}
              style={{ width: data ? `${data.score}%` : "0%" }}
            />
          </div>
        </div>
      </div>
      {data && data.warnings.length > 0 && (
        <div className="text-red-600">
          {data.warnings.slice(0, 2).map((warning, index) => (
            <div key={index}>{warning}</div>
          ))}
        </div>
      )}
      {data && data.tips.length > 0 && (
        <div className="text-sky-600">{data.tips[0]}</div>
      )}
    </div>
  );
}
