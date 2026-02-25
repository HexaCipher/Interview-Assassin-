import { NextResponse } from "next/server";
import { generateQuestion } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { role, difficulty } = await request.json();
    if (!role || !difficulty) {
      return NextResponse.json({ error: "role and difficulty are required" }, { status: 400 });
    }
    const question = await generateQuestion(role, difficulty);
    return NextResponse.json({ question });
  } catch (err) {
    console.error("[generate-question]", err);
    return NextResponse.json({ error: "Failed to generate question. Check your API key." }, { status: 500 });
  }
}
