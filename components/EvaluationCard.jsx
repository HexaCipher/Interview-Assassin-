import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function EvaluationCard({ evaluation }) {
  const {
    score,
    verdict,
    technical_accuracy,
    clarity,
    depth,
    strengths,
    improvements,
    ideal_answer,
  } = evaluation;

  const scoreColor =
    score >= 8
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : score >= 5
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";

  const barColor = score >= 8 ? "#22c55e" : score >= 5 ? "#eab308" : "#ef4444";

  const assessments = [
    { title: "Technical Accuracy", content: technical_accuracy },
    { title: "Clarity", content: clarity },
    { title: "Depth", content: depth },
  ];

  return (
    <Card className="fade-up bg-gray-900 border-2 border-gray-800 shadow-2xl shadow-cyan-500/10">
      <CardContent className="pt-8 space-y-8">
        {/* Top row: big score + verdict badge */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-7xl font-light text-white">{score}</span>
            <span className="text-3xl text-gray-400">/10</span>
          </div>
          <Badge className={`${scoreColor} font-mono text-base px-4 py-2`}>{verdict}</Badge>
        </div>

        {/* Score progress bar */}
        <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${score * 10}%`, backgroundColor: barColor }}
          />
        </div>

        <Separator className="bg-gray-800" />

        {/* Three assessment boxes in a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {assessments.map((item) => (
            <div key={item.title} className="space-y-2 bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm font-mono uppercase tracking-wider text-gray-400">
                {item.title}
              </p>
              <p className="text-base leading-relaxed text-gray-200">{item.content}</p>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-800" />

        {/* Strengths list */}
        <div>
          <p className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-3">
            ✓ Strengths
          </p>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="text-base text-green-400 flex gap-3">
                <span>·</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements list */}
        <div>
          <p className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-3">
            ↑ Areas to Improve
          </p>
          <ul className="space-y-2">
            {improvements.map((item, i) => (
              <li key={i} className="text-base text-gray-300 flex gap-3">
                <span className="text-gray-500">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-gray-800" />

        {/* Model Answer */}
        <div className="bg-gray-800/50 rounded-xl p-6 border-l-4 border-cyan-500">
          <p className="text-sm font-mono uppercase tracking-wider text-gray-400 mb-3">
            Model Answer
          </p>
          <p className="text-base leading-relaxed text-gray-200">{ideal_answer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
