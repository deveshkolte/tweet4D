"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  tweet: string;
  copiedAt: string;
};

function formatRelativeTime(timestamp: string) {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diff = now - then;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function HistoryViewer() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load history");
        setHistory(data.history || []);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  async function copy(tweet: string) {
    await navigator.clipboard.writeText(tweet);
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Loading history...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!history.length) {
    return <p className="text-sm text-slate-500">No copied tweets yet.</p>;
  }

  return (
    <div className="space-y-3">
      {history.map((item, index) => (
        <div key={index} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="whitespace-pre-wrap text-sm leading-snug">{item.tweet}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">{formatRelativeTime(item.copiedAt)}</span>
            <button
              onClick={() => copy(item.tweet)}
              className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
