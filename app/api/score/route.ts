import { NextRequest, NextResponse } from "next/server";
import { scoreDraft } from "@/lib/algoScore";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { text, isThread } = (await req.json()) as { text?: string; isThread?: boolean };
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text to score." }, { status: 400 });
    }
    return NextResponse.json(scoreDraft(text, isThread));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
