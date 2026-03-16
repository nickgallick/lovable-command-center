import { motion } from 'framer-motion';
import { deployments } from '@/data/mockData';
import { ExternalLink, RotateCcw, ArrowLeft, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const statusConfig = {
  healthy: { dot: 'bg-green', bg: 'bg-green-dim', border: 'border-green/20', label: 'text-green', glow: 'pulse-healthy' },
  degraded: { dot: 'bg-yellow', bg: 'bg-yellow-dim', border: 'border-yellow/20', label: 'text-yellow', glow: '' },
  down: { dot: 'bg-red', bg: 'bg-red-dim', border: 'border-red/20', label: 'text-red', glow: '' },
};

function LighthouseRing({ score, label }: { score: number; label: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 90 ? 'hsl(142, 71%, 45%)' : score >= 70 ? 'hsl(48, 96%, 47%)' : 'hsl(0, 84%, 60%)';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="hsl(217, 33%, 17%)" strokeWidth="3" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[10px] font-bold tabular-nums" style={{ color }}>{score}</span>
      <span className="label-xs text-[8px]">{label}</span>
    </div>
  );
}

function SparklineChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <div className="h-6 w-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke="hsl(217, 91%, 60%)" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function DeploymentsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const healthy = deployments.filter(d => d.status === 'healthy').length;
  const degraded = deployments.filter(d => d.status === 'degraded').length;
  const down = deployments.filter(d => d.status === 'down').length;

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">Deployment Health</h1>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-green">{healthy} Healthy</span>
          {degraded > 0 && <span className="text-yellow">{degraded} Degraded</span>}
          {down > 0 && <span className="text-red">{down} Down</span>}
          <span className="text-muted-foreground">| 99.7% overall uptime</span>
        </div>
      </div>

      {/* Tiles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {deployments.map((dep, i) => {
          const cfg = statusConfig[dep.status];
          const isExpanded = expanded === dep.name;
          return (
            <motion.div
              key={dep.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setExpanded(isExpanded ? null : dep.name)}
              className={`${cfg.bg} border ${cfg.border} ${cfg.glow} rounded-lg p-3 flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">{dep.name}</span>
                <div className={`w-2 h-2 rounded-full ${cfg.dot} ${dep.status === 'healthy' ? 'animate-pulse' : ''}`} />
              </div>
              <span className={`text-[9px] font-mono font-bold ${cfg.label}`}>{dep.status.toUpperCase()}</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground tabular-nums">p50: {dep.p50}ms</span>
                <SparklineChart data={dep.responseHistory} />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{dep.lastDeploy}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded detail */}
      {expanded && (() => {
        const dep = deployments.find(d => d.name === expanded);
        if (!dep) return null;
        const cfg = statusConfig[dep.status];
        const chartData = dep.responseHistory.map((v, i) => ({ time: `${i}h`, p50: v, p95: v * (dep.p95 / dep.p50) }));

        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-card border border-border rounded-lg p-5 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Left: Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                <span className="font-display text-base font-bold text-foreground">{dep.name}</span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">URL</span><a href={`https://${dep.url}`} className="text-primary font-mono">{dep.url}</a></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Commit</span><span className="font-mono text-foreground">{dep.commitHash}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Deploy</span><span className="font-mono text-foreground">{dep.lastDeploy}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Domain</span><span className="font-mono text-foreground">{dep.domain}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-1"><Shield className="w-3 h-3" />SSL</span>
                  <span className="font-mono text-green text-[10px]">Valid until {dep.sslExpiry}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Visit Site</button>
                <button className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-accent transition-colors flex items-center gap-1"><RotateCcw className="w-3 h-3" />Redeploy</button>
                <button className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-accent transition-colors flex items-center gap-1"><ArrowLeft className="w-3 h-3" />Roll Back</button>
              </div>
            </div>

            {/* Center: Charts */}
            <div className="flex flex-col gap-3">
              <span className="label-xs">RESPONSE TIME (24H)</span>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Tooltip contentStyle={{ background: 'hsl(220 30% 10%)', border: '1px solid hsl(217 33% 17%)', borderRadius: '6px', fontSize: '10px', fontFamily: 'JetBrains Mono' }} />
                    <Line type="monotone" dataKey="p50" stroke="hsl(217, 91%, 60%)" strokeWidth={1.5} dot={false} name="p50" />
                    <Line type="monotone" dataKey="p95" stroke="hsl(189, 95%, 43%)" strokeWidth={1.5} dot={false} name="p95" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
                <span>Uptime: <span className={cfg.label}>{dep.uptime}%</span></span>
                <span>Error Rate: <span className={dep.errorRate > 1 ? 'text-red' : 'text-green'}>{dep.errorRate}%</span></span>
              </div>
            </div>

            {/* Right: Lighthouse */}
            <div className="flex flex-col gap-3">
              <span className="label-xs">LIGHTHOUSE SCORES</span>
              <div className="flex items-center justify-around">
                <LighthouseRing score={dep.lighthouse.perf} label="PERF" />
                <LighthouseRing score={dep.lighthouse.a11y} label="A11Y" />
                <LighthouseRing score={dep.lighthouse.bestPractices} label="BP" />
                <LighthouseRing score={dep.lighthouse.seo} label="SEO" />
              </div>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
}
