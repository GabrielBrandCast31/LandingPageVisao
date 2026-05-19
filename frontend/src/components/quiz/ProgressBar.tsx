export function ProgressBar({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const percent = Math.min(100, Math.max(0, (step / total) * 100));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-mute">
        <span className="font-heading uppercase tracking-widest">
          Passo {Math.min(step, total)} de {total}
        </span>
        <span className="font-mono text-support">{Math.round(percent)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card">
        <div
          className="h-full rounded-full bg-gradient-orbital transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
