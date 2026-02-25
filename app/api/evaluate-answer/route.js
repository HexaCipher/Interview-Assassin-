import { NextResponse } from "next/server";
import { evaluateAnswer } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { role, question, answer } = await request.json();
    if (!role || !question || !answer) {
      return NextResponse.json({ error: "role, question, and answer are required" }, { status: 400 });
    }
    if (answer.trim().length < 10) {
      return NextResponse.json({ error: "Answer is too short to evaluate." }, { status: 400 });
    }
    const evaluation = await evaluateAnswer(role, question, answer);
    return NextResponse.json({ evaluation });
  } catch (err) {
    console.error("[evaluate-answer]", err);
    return NextResponse.json({ error: "Failed to evaluate answer. Check your API key." }, { status: 500 });
  }
}
