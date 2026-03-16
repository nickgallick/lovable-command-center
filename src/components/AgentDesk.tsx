import { motion } from 'framer-motion';
import { Agent } from '@/data/mockData';

const statusColors = {
  active: { border: 'border-cyan/30', glow: 'pulse-healthy', screen: 'text-cyan screen-active', dot: 'bg-cyan' },
  idle: { border: 'border-border', glow: '', screen: 'text-muted-foreground', dot: 'bg-slate-dim' },
  error: { border: 'border-rose/40', glow: '', screen: 'text-rose screen-error', dot: 'bg-rose' },
  offline: { border: 'border-border/50', glow: '', screen: 'text-muted-foreground/30', dot: 'bg-muted-foreground/30' },
};

const modelColors: Record<string, string> = {
  Opus: 'bg-cyan/10 text-cyan border-cyan/20',
  Sonnet: 'bg-amber/10 text-amber border-amber/20',
  Haiku: 'bg-surface-overlay text-muted-foreground border-border',
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const h = 20;
  const w = 80;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeskSVG({ status }: { status: string }) {
  const screenFill = status === 'active' ? '#22d3ee' : status === 'error' ? '#f43f5e' : status === 'idle' ? '#1e293b' : '#0f172a';
  const screenOpacity = status === 'offline' ? 0.2 : status === 'idle' ? 0.4 : 0.8;
  return (
    <svg viewBox="0 0 80 50" className="w-full h-auto">
      {/* Desk */}
      <rect x="10" y="38" width="60" height="3" rx="1" fill="#1e293b" />
      <rect x="35" y="34" width="10" height="4" rx="1" fill="#1e293b" />
      {/* Monitor */}
      <rect x="18" y="8" width="44" height="26" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <rect
        x="20" y="10" width="40" height="22" rx="1"
        fill={screenFill}
        opacity={screenOpacity}
        className={status === 'active' ? 'screen-active' : status === 'error' ? 'screen-error' : ''}
      />
      {/* Screen lines for active */}
      {status === 'active' && (
        <>
          <rect x="23" y="14" width="18" height="1.5" rx="0.5" fill="#0f172a" opacity="0.3" />
          <rect x="23" y="18" width="25" height="1.5" rx="0.5" fill="#0f172a" opacity="0.3" />
          <rect x="23" y="22" width="14" height="1.5" rx="0.5" fill="#0f172a" opacity="0.3" />
          <rect x="23" y="26" width="20" height="1.5" rx="0.5" fill="#0f172a" opacity="0.3" />
        </>
      )}
      {/* Keyboard */}
      <rect x="24" y="42" width="32" height="5" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
      {/* Coffee cup */}
      <ellipse cx="68" cy="42" rx="4" ry="2" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
      <rect x="64" y="42" width="8" height="5" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
    </svg>
  );
}

interface Props {
  agent: Agent;
}

export function AgentDesk({ agent }: Props) {
  const style = statusColors[agent.status];
  const sparkColor = agent.status === 'active' ? '#22d3ee' : agent.status === 'error' ? '#f43f5e' : '#64748b';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative bg-card rounded-lg border ${style.border} ${style.glow} p-3 flex flex-col gap-2 cursor-pointer transition-shadow`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${style.dot} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
          <span className="font-mono text-xs font-semibold text-foreground">{agent.id}</span>
          <span className="text-xs text-muted-foreground">/ {agent.name}</span>
        </div>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${modelColors[agent.model]}`}>
          {agent.model}
        </span>
      </div>

      {/* Desk visual */}
      <div className="px-2">
        <DeskSVG status={agent.status} />
      </div>

      {/* State + Project */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="label-xs">{agent.currentState}</span>
        <span className="text-muted-foreground font-mono truncate max-w-[60%]">{agent.project}</span>
      </div>

      {/* Footer: Sparkline + tokens */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <MiniSparkline data={agent.sparkline} color={sparkColor} />
        <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
          {(agent.tokensUsed / 1000).toFixed(0)}k tok
        </span>
      </div>
    </motion.div>
  );
}
