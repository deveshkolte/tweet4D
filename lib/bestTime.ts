// Best-time-to-post guidance for an AI/tech audience. This is static,
// well-established guidance (no live analytics needed yet). Times are given
// in the user's local timezone, computed in the browser.
//
// Rationale tied to the algorithm: early engagement velocity matters, so
// posting when your audience is online maximizes the chance of hitting the
// out-of-network push window.

export interface TimeWindow {
  label: string;
  detail: string;
}

export const POSTING_WINDOWS: TimeWindow[] = [
  {
    label: "Weekday mornings, ~8-10am",
    detail:
      "People scroll over coffee/commute. Strong for tips, hot takes and build-in-public updates.",
  },
  {
    label: "Lunch, ~12-1pm",
    detail: "A reliable second peak. Good for quick, save-worthy posts.",
  },
  {
    label: "Evenings, ~6-9pm",
    detail:
      "Highest reply activity. Best window for posts designed to start conversations and for replying to big accounts.",
  },
];

export const TIMING_TIPS: string[] = [
  "Tue-Thu generally outperform weekends for tech/AI content.",
  "The AI niche skews US/EU hours. If your audience is mostly US, evening UTC = US morning/afternoon.",
  "Post, then stay online ~30 min to reply fast. Early velocity (≈10 engagements in 30 min) can trigger out-of-network push.",
  "Consistency beats perfect timing. Same slots daily trains your audience and the algorithm.",
];

// Returns a friendly description of the user's timezone for the UI.
export function localTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "your timezone";
  } catch {
    return "your timezone";
  }
}
