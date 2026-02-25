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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-muted-foreground font-mono">Loading interview...</p>
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
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [scores, setScores] = useState([]);
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
          body: JSON.stringify({ role, difficulty }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to generate question");
          setPhase("answering");
          return;
        }

        setQuestion(data.question);
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
        body: JSON.stringify({ role, question, answer }),
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
    <div className="max-w-[760px] mx-auto px-5">
      {/* Header Bar */}
      <header className="flex items-center justify-between py-6 border-b border-border mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            ← back
          </Button>
          <span className="text-sm text-muted-foreground font-mono">
            {roleLabel} · {difficulty}
          </span>
        </div>
        {phase !== "summary" && (
          <Badge variant="outline" className="font-mono text-xs">
            {Math.min(currentQ + 1, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS}
          </Badge>
        )}
      </header>

      {/* Progress Bar */}
      {phase !== "summary" && (
        <Progress
          value={progressValue}
          className="h-1 mb-10 [&>div]:bg-brand"
        />
      )}

      {/* Summary View */}
      {phase === "summary" ? (
        <SummaryCard scores={scores} onRestart={handleRestart} />
      ) : (
        <>
          {/* Question Block */}
          <div className="mb-8 fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="font-mono text-xs">
                Question {currentQ + 1}
              </Badge>
              {phase !== "loading" && (
                <Badge className="bg-brand/10 text-brand border-brand/20 font-mono text-xs">
                  {difficulty}
                </Badge>
              )}
            </div>

            {phase === "loading" ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ) : (
              <p className="text-xl font-light leading-relaxed text-foreground">
                {question}
              </p>
            )}
          </div>

          {/* Answer Section - Phase: answering / evaluating */}
          {(phase === "answering" || phase === "evaluating") && (
            <div className="space-y-3">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Your Answer
              </label>

              <Textarea
                ref={textareaRef}
                placeholder="Write your answer here. Be as detailed and specific as possible..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={phase === "evaluating"}
                rows={8}
                className="font-mono text-sm resize-none"
              />

              {error && (
                <p className="text-xs text-red-500 font-mono">{error}</p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">
                  {wordCount} words
                </span>
                <Button
                  onClick={handleSubmit}
                  disabled={phase === "evaluating"}
                  className="bg-brand hover:bg-brand/90 text-white font-mono"
                >
                  {phase === "evaluating" ? "Evaluating..." : "Submit Answer →"}
                </Button>
              </div>
            </div>
          )}

          {/* Answer Section - Phase: reviewed */}
          {phase === "reviewed" && (
            <div className="space-y-6">
              {/* Collapsed submitted answer */}
              <details className="group">
                <summary className="text-xs font-mono text-muted-foreground cursor-pointer hover:text-foreground list-none flex items-center gap-1">
                  <span className="group-open:rotate-90 transition-transform">
                    ▶
                  </span>{" "}
                  Your answer
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border">
                  {answer}
                </p>
              </details>

              {/* Evaluation card */}
              {evaluation && <EvaluationCard evaluation={evaluation} />}

              {/* Navigation */}
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleNext}
                  className="bg-brand hover:bg-brand/90 text-white font-mono"
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
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InterviewContent />
    </Suspense>
  );
}
