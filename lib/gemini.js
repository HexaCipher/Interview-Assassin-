import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
}

export async function generateQuestion(role, difficulty) {
  const model = getGeminiModel();
  const prompt = `You are a senior technical interviewer at a top tech company.
Generate one realistic ${difficulty} level interview question for a ${role} position.
The question should be specific, challenging, and commonly asked in real interviews.
Return ONLY the question text, nothing else.`;
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function evaluateAnswer(role, question, answer) {
  const model = getGeminiModel();
  const prompt = `You are an expert technical interviewer evaluating a candidate for a ${role} position.

Question asked:
${question}

Candidate's answer:
${answer}

Evaluate the answer and return a JSON object with exactly this structure.
No markdown, no code blocks — raw JSON only:
{
  "score": <integer 1-10>,
  "verdict": "<one of: Excellent | Good | Average | Needs Work | Poor>",
  "technical_accuracy": "<2-3 sentence assessment of technical correctness>",
  "clarity": "<2-3 sentence assessment of communication clarity>",
  "depth": "<2-3 sentence assessment of answer depth and thoroughness>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>", "<area 3>"],
  "ideal_answer": "<a concise model answer in 3-5 sentences>"
}`;
  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  // Strip markdown fences if Gemini wraps the JSON
  const clean = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(clean);
}
