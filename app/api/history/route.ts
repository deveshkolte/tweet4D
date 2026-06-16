import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const HISTORY_FILE = path.join(process.cwd(), "data", "history.json");

async function readHistory() {
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf-8");
    return JSON.parse(raw) as { tweet: string; copiedAt: string }[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeHistory(history: { tweet: string; copiedAt: string }[]) {
  await fs.mkdir(path.dirname(HISTORY_FILE), { recursive: true });
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
}

export const runtime = "nodejs";

export async function GET() {
  try {
    const history = await readHistory();
    return NextResponse.json({ history });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { tweet?: string };
    if (!body.tweet || !body.tweet.trim()) {
      return NextResponse.json({ error: "No tweet provided." }, { status: 400 });
    }

    const history = await readHistory();
    const entry = { tweet: body.tweet.trim(), copiedAt: new Date().toISOString() };
    const updated = [entry, ...history].slice(0, 20);
    await writeHistory(updated);
    return NextResponse.json({ success: true, history: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
