"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import EvaluationCard from "@/components/EvaluationCard";
import SummaryCard from "@/components/SummaryCard";

const TOTAL_QUESTIONS = 3;

const ROLES = [
  { id: "frontend-developer", label: "Frontend Developer" },
  { id: "backend-developer", label: "Backend Developer" },
  { id: "full-stack-developer", label: "Full Stack Developer" },
  { id: "data-scientist", label: "Data Scientist" },
  { id: "machine-learning-engineer", label: "ML Engineer" },
  { id: "devops-engineer", label: "DevOps Engineer" },
  { id: "cybersecurity-analyst", label: "Cybersecurity Analyst" },
  { id: "product-manager", label: "Product Manager" },
  { id: "system-design", label: "System Design" },
];

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-gray-400 font-mono">Loading interview...</p>
      </div>
    </div>
  );
}

function InterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const textareaRef = useRef(null);

  const role = searchParams.get("role") || "";
  const difficulty = searchParams.get("difficulty") || "";

  const roleLabel = ROLES.find((r) => r.id === role)?.label || role.replace(/-/g, " ");

  const [phase, setPhase] = useState("loading");
  // "loading" | "answering" | "evaluating" | "reviewed" | "summary"

  const [currentQ, setCurrentQ] = useState(0);
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [scores, setScores] = useState([]);
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  const [error, setError] = useState("");

  // Load question when currentQ changes
  useEffect(() => {
    if (phase === "summary") return;

    const loadQuestion = async () => {
      setPhase("loading");
      setAnswer("");
      setEvaluation(null);
      setError("");

      try {
        const res = await fetch("/api/generate-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, difficulty, excludeIds: askedQuestionIds }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to generate question");
          setPhase("answering");
          return;
        }

        setQuestion(data.question);
        setQuestionId(data.questionId);
        setAskedQuestionIds(prev => [...prev, data.questionId]);
        setPhase("answering");
      } catch (err) {
        console.error("[loadQuestion]", err);
        setError("Network error. Please try again.");
        setPhase("answering");
      }
    };

    loadQuestion();
  }, [currentQ, role, difficulty]);

  const handleSubmit = async () => {
    if (answer.trim().length < 10) {
      setError("Please write a more complete answer.");
      return;
    }

    setError("");
    setPhase("evaluating");

    try {
      const res = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, answer, difficulty }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to evaluate answer");
        setPhase("answering");
        return;
      }

      setEvaluation(data.evaluation);
      setScores((prev) => [...prev, data.evaluation.score]);
      setPhase("reviewed");
    } catch (err) {
      console.error("[handleSubmit]", err);
      setError("Network error. Please try again.");
      setPhase("answering");
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= TOTAL_QUESTIONS) {
      setPhase("summary");
    } else {
      setCurrentQ((q) => q + 1);
    }
  };

  const handleRestart = () => {
    router.push("/");
  };

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

  const progressValue =
    ((currentQ + (phase === "reviewed" ? 1 : 0)) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[900px] mx-auto px-6 py-6">
        {/* Header Bar */}
        <header className="flex items-center justify-between py-8 border-b-2 border-gray-800 mb-12">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => router.push("/")}
              className="text-gray-400 hover:text-white hover:bg-gray-900 text-base font-mono px-4"
            >
              ← back
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-lg text-white font-semibold">
                {roleLabel}
              </span>
              <span className="text-gray-600">·</span>
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 font-mono text-sm px-3 py-1">
                {difficulty}
              </Badge>
            </div>
          </div>
          {phase !== "summary" && (
            <Badge variant="outline" className="font-mono text-base px-4 py-2 border-gray-700 bg-gray-900 text-gray-300">
              {Math.min(currentQ + 1, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS}
            </Badge>
          )}
        </header>

        {/* Progress Bar */}
        {phase !== "summary" && (
          <Progress
            value={progressValue}
            className="h-2 mb-12 bg-gray-900 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-cyan-500 [&>div]:to-purple-500 [&>div]:rounded-full"
          />
        )}

        {/* Summary View */}
        {phase === "summary" ? (
          <SummaryCard scores={scores} onRestart={handleRestart} />
        ) : (
          <>
            {/* Question Block */}
            <div className="mb-10 fade-up">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="font-mono text-sm px-4 py-1.5 border-gray-700 bg-gray-900 text-gray-300">
                  Question {currentQ + 1}
                </Badge>
                {phase !== "loading" && (
                  <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30 font-mono text-sm px-4 py-1.5">
                    {difficulty}
                  </Badge>
                )}
              </div>

              {/* Question Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
                {phase === "loading" ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-full bg-gray-800" />
                    <Skeleton className="h-8 w-5/6 bg-gray-800" />
                    <Skeleton className="h-8 w-4/6 bg-gray-800" />
                  </div>
                ) : (
                  <p className="text-3xl font-light leading-relaxed text-white">
                    {question}
                  </p>
                )}
              </div>
            </div>

            {/* Answer Section - Phase: answering / evaluating */}
            {(phase === "answering" || phase === "evaluating") && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-base font-mono text-gray-400 uppercase tracking-wider">
                    Your Answer
                  </label>
                  <span className="text-sm text-gray-500 font-mono">
                    {wordCount} words
                  </span>
                </div>

                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Write your answer here. Be as detailed and specific as possible..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={phase === "evaluating"}
                    rows={12}
                    className="font-mono text-base resize-none bg-gray-900 border-2 border-gray-800 text-white placeholder:text-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 rounded-xl p-6 transition-all"
                  />
                  {phase === "evaluating" && (
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400 font-mono text-lg">Analyzing your response...</span>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm text-red-400 font-mono">{error}</p>
                  </div>
                )}

                <div className="flex items-center justify-end pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={phase === "evaluating"}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-mono text-base px-8 py-6 shadow-2xl shadow-cyan-500/50 border-0 rounded-xl"
                  >
                    {phase === "evaluating" ? "Evaluating..." : "Submit Answer →"}
                  </Button>
                </div>
              </div>
            )}

            {/* Answer Section - Phase: reviewed */}
            {phase === "reviewed" && (
              <div className="space-y-8">
                {/* Collapsed submitted answer */}
                <details className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <summary className="text-base font-mono text-gray-400 cursor-pointer hover:text-white list-none flex items-center gap-2 font-semibold">
                    <span className="group-open:rotate-90 transition-transform">
                      ▶
                    </span>{" "}
                    Your submitted answer
                  </summary>
                  <p className="mt-4 text-base text-gray-300 leading-relaxed pl-6 border-l-2 border-cyan-500/30">
                    {answer}
                  </p>
                </details>

                {/* Evaluation card */}
                {evaluation && <EvaluationCard evaluation={evaluation} />}

                {/* Navigation */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-mono text-base px-8 py-6 shadow-2xl shadow-cyan-500/50 border-0 rounded-xl"
                  >
                    {currentQ + 1 >= TOTAL_QUESTIONS
                      ? "View Summary →"
                      : "Next Question →"}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InterviewContent />
    </Suspense>
  );
}
