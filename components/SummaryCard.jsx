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
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : avg >= 6
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : avg >= 4
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";

  return (
    <Card className="max-w-2xl mx-auto mt-10 fade-up bg-gray-900 border-2 border-gray-800 shadow-2xl shadow-cyan-500/10">
      <CardContent className="pt-10 pb-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">
            Session Complete
          </p>
          <div>
            <span className="text-8xl font-light text-white">{avg}</span>
            <span className="text-3xl text-gray-400">/10</span>
          </div>
          <Badge className={`${verdictColor} font-mono text-lg px-6 py-2`}>
            {verdict}
          </Badge>
        </div>

        <Separator className="bg-gray-800" />

        {/* Per-question score breakdown */}
        <div className="space-y-4">
          {scores.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-base font-mono text-gray-400 w-12">
                Q{i + 1}
              </span>
              <Progress value={s * 10} className="flex-1 h-3 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-cyan-500 [&>div]:to-purple-500 [&>div]:rounded-full" />
              <span className="text-base font-mono w-14 text-right text-white font-semibold">{s}/10</span>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-800" />

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={onRestart}
            className="font-mono text-base border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6"
          >
            ← New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
