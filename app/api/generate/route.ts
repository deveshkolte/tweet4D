import { NextRequest, NextResponse } from "next/server";
import { callOpenRouter, DEFAULT_MODEL } from "@/lib/openrouter";
import {
  buildTweetPrompt,
  buildReplyPrompt,
  buildReplyBackPrompt,
  buildThreadPrompt,
  buildAnalyzePrompt,
  buildGrowthPlanPrompt,
  formatPersona,
  DEFAULT_PERSONA,
  REPLY_INTENTS,
  type Persona,
} from "@/lib/prompts";

export const runtime = "nodejs";

interface Body {
  mode: "tweet" | "reply" | "replyback" | "thread" | "analyze" | "plan";
  input?: string;
  intent?: string;
  hook?: string;
  minutes?: string;
  theirReply?: string;
  persona?: Persona;
  model?: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENROUTER_API_KEY is not set. Add it to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  try {
    let body: Body;
    try {
      body = (await req.json()) as Body;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const persona = body.persona || DEFAULT_PERSONA;
    const personaStr = formatPersona(persona);
    const model = body.model || DEFAULT_MODEL;

    const hook = body.hook || "auto";
    const intent = body.intent && REPLY_INTENTS[body.intent] ? body.intent : "add_insight";
    const minutes = body.minutes || "30";

    if (body.mode !== "plan" && !body.input?.trim()) {
      return NextResponse.json(
        { error: "Please enter some input first." },
        { status: 400 }
      );
    }

    let prompt: string;
    switch (body.mode) {
      case "tweet":
        prompt = buildTweetPrompt(body.input!.trim(), hook);
        break;
      case "reply":
        prompt = buildReplyPrompt(body.input!.trim(), intent);
        break;
      case "replyback":
        prompt = buildReplyBackPrompt(
          body.input!.trim(),
          body.theirReply?.trim() || ""
        );
        break;
      case "thread":
        prompt = buildThreadPrompt(body.input!.trim());
        break;
      case "analyze":
        prompt = buildAnalyzePrompt(body.input!.trim());
        break;
      case "plan":
        prompt = buildGrowthPlanPrompt(minutes, personaStr);
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported generation mode." },
          { status: 400 }
        );
    }

    const raw = await callOpenRouter(
      [{ role: "user", content: prompt }],
      model
    );
    return NextResponse.json({ result: raw });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
