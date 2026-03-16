import { motion } from 'framer-motion';
import { deployments } from '@/data/mockData';
import { ExternalLink, RotateCcw } from 'lucide-react';

const statusStyles = {
  healthy: { dot: 'bg-cyan', border: 'border-cyan/20', glow: 'pulse-healthy', label: 'text-cyan' },
  degraded: { dot: 'bg-amber', border: 'border-amber/20', glow: '', label: 'text-amber' },
  down: { dot: 'bg-rose', border: 'border-rose/30', glow: '', label: 'text-rose' },
};

function LighthouseBar({ label, score }: { label: string; score: number }) {
  const color = score >= 90 ? 'bg-cyan' : score >= 70 ? 'bg-amber' : 'bg-rose';
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] font-mono text-muted-foreground w-6">{label}</span>
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[9px] font-mono text-muted-foreground tabular-nums w-5 text-right">{score}</span>
    </div>
  );
}

export function DeploymentGrid() {
  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="label-xs text-foreground text-sm">DEPLOYMENT HEALTH</h1>
        <span className="label-xs">{deployments.filter(d => d.status === 'healthy').length}/{deployments.length} HEALTHY</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {deployments.map((dep, i) => {
          const s = statusStyles[dep.status];
          return (
            <motion.div
              key={dep.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`bg-card border ${s.border} ${s.glow} rounded-lg p-3 flex flex-col gap-2.5`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${s.dot} ${dep.status === 'healthy' ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-semibold text-foreground">{dep.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="font-mono text-[10px] text-muted-foreground">{dep.url}</div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="label-xs text-[8px]">UPTIME</div>
                  <div className={`font-mono text-xs tabular-nums ${s.label}`}>{dep.uptime}%</div>
                </div>
                <div>
                  <div className="label-xs text-[8px]">P50</div>
                  <div className="font-mono text-xs tabular-nums text-foreground">{dep.p50}ms</div>
                </div>
                <div>
                  <div className="label-xs text-[8px]">P95</div>
                  <div className="font-mono text-xs tabular-nums text-foreground">{dep.p95}ms</div>
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-1 border-t border-border">
                <LighthouseBar label="PRF" score={dep.lighthouse.perf} />
                <LighthouseBar label="A11" score={dep.lighthouse.a11y} />
                <LighthouseBar label="SEO" score={dep.lighthouse.seo} />
              </div>

              <div className="text-[10px] font-mono text-muted-foreground">Last deploy: {dep.lastDeploy}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
