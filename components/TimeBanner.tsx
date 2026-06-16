"use client";

import { useEffect, useState } from "react";

function getIstTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000;
  const ist = new Date(utc + istOffset);
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const paddedMinutes = String(minutes).padStart(2, "0");
  const label = `${hours}:${paddedMinutes} IST`;

  let status = "🟡 Off-peak — consider scheduling for 8am or 6pm IST";
  if ((hours === 8 || hours === 9) || (hours === 18 || hours === 19 || hours === 20)) {
    status = "🟢 Best time to post now";
  } else if (hours === 12 || hours === 13) {
    status = "🟢 Good time to post";
  }

  return { label, status };
}

export default function TimeBanner() {
  const [time, setTime] = useState(getIstTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getIstTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-medium">{time.label}</span>
        <span>{time.status}</span>
      </div>
    </div>
  );
}
