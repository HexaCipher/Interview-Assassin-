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
      ? "bg-green-100 text-green-800 border-green-200"
      : score >= 5
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-red-100 text-red-800 border-red-200";

  const barColor = score >= 8 ? "#0A5C47" : score >= 5 ? "#D4830A" : "#C0392B";

  const assessments = [
    { title: "Technical Accuracy", content: technical_accuracy },
    { title: "Clarity", content: clarity },
    { title: "Depth", content: depth },
  ];

  return (
    <Card className="fade-up">
      <CardContent className="pt-6 space-y-6">
        {/* Top row: big score + verdict badge */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-5xl font-light">{score}</span>
            <span className="text-xl text-muted-foreground">/10</span>
          </div>
          <Badge className={`${scoreColor} font-mono`}>{verdict}</Badge>
        </div>

        {/* Score progress bar */}
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${score * 10}%`, backgroundColor: barColor }}
          />
        </div>

        <Separator />

        {/* Three assessment boxes in a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {assessments.map((item) => (
            <div key={item.title} className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {item.title}
              </p>
              <p className="text-sm leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Strengths list */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            ✓ Strengths
          </p>
          <ul className="space-y-1">
            {strengths.map((s, i) => (
              <li key={i} className="text-sm text-green-700 flex gap-2">
                <span>·</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements list */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            ↑ Areas to Improve
          </p>
          <ul className="space-y-1">
            {improvements.map((item, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-muted-foreground">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Model Answer */}
        <div className="bg-muted/50 rounded-md p-4 border-l-2 border-brand">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Model Answer
          </p>
          <p className="text-sm leading-relaxed">{ideal_answer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
