import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function SummaryCard({ scores, onRestart }) {
  const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);

  const verdict =
    avg >= 8
      ? "Outstanding"
      : avg >= 6
      ? "Solid Performance"
      : avg >= 4
      ? "Needs Practice"
      : "Keep Grinding";

  const verdictColor =
    avg >= 8
      ? "bg-green-100 text-green-800 border-green-200"
      : avg >= 6
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : avg >= 4
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-red-100 text-red-800 border-red-200";

  return (
    <Card className="max-w-lg mx-auto mt-10 fade-up">
      <CardContent className="pt-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Session Complete
          </p>
          <div>
            <span className="text-7xl font-light">{avg}</span>
            <span className="text-2xl text-muted-foreground">/10</span>
          </div>
          <Badge className={`${verdictColor} font-mono text-sm px-4 py-1`}>
            {verdict}
          </Badge>
        </div>

        <Separator />

        {/* Per-question score breakdown */}
        <div className="space-y-3">
          {scores.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-6">
                Q{i + 1}
              </span>
              <Progress value={s * 10} className="flex-1 h-2 [&>div]:bg-brand" />
              <span className="text-sm font-mono w-10 text-right">{s}/10</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onRestart}
            className="font-mono border-brand text-brand hover:bg-brand-light"
          >
            ← New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
