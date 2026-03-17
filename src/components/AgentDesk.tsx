import { motion } from 'framer-motion';
import { Agent } from '@/data/mockData';

const statusConfig = {
  active: { border: 'border-primary/30', stripe: 'bg-green', screenFill: 'hsl(38, 92%, 50%)', screenOpacity: 0.8, dot: 'bg-green dot-glow-green', screenClass: 'screen-active' },
  idle: { border: 'border-border', stripe: 'bg-muted-foreground', screenFill: 'hsl(24, 12%, 14%)', screenOpacity: 0.3, dot: 'bg-muted-foreground', screenClass: '' },
  error: { border: 'border-red/30', stripe: 'bg-red', screenFill: 'hsl(0, 72%, 51%)', screenOpacity: 0.7, dot: 'bg-red dot-glow-red', screenClass: 'screen-error' },
  offline: { border: 'border-border/50', stripe: 'bg-border', screenFill: 'hsl(20, 10%, 8%)', screenOpacity: 0.15, dot: 'bg-border', screenClass: '' },
};

const modelBadge: Record<string, string> = {
  Opus: 'bg-purple-dim text-purple border-purple/20',
  Sonnet: 'bg-blue-dim text-primary border-primary/20',
  Haiku: 'bg-secondary text-muted-foreground border-border',
};

const pipelineStates = ['Idle', 'Planning', 'Coding', 'Testing', 'Deploying', 'Complete'];

function DeskScene({ agent }: { agent: Agent }) {
  const cfg = statusConfig[agent.status];
  const hasPlant = agent.personality === 'plant';
  const hasStickyNotes = agent.personality === 'sticky-notes';
  const hasDualMonitor = agent.personality === 'dual-monitor';
  const hasFigurines = agent.personality === 'figurines';

  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto">
      {/* Desk surface */}
      <rect x="20" y="88" width="160" height="6" rx="2" fill="hsl(24, 12%, 14%)" />
      {/* Monitor stand */}
      <rect x="88" y="80" width="24" height="8" rx="2" fill="hsl(24, 12%, 14%)" />

      {/* Main monitor */}
      <rect x="40" y="20" width="120" height="60" rx="4" fill="hsl(20, 10%, 6%)" stroke="hsl(24, 12%, 14%)" strokeWidth="1.5" />
      <rect x="44" y="24" width="112" height="52" rx="2" fill={cfg.screenFill} opacity={cfg.screenOpacity} className={cfg.screenClass} />

      {/* Code lines on active screen */}
      {agent.status === 'active' && (
        <>
          <rect x="50" y="30" width="40" height="2" rx="1" fill="hsl(20, 14%, 4%)" opacity="0.4" />
          <rect x="50" y="36" width="60" height="2" rx="1" fill="hsl(20, 14%, 4%)" opacity="0.3" />
          <rect x="50" y="42" width="35" height="2" rx="1" fill="hsl(20, 14%, 4%)" opacity="0.4" />
          <rect x="50" y="48" width="55" height="2" rx="1" fill="hsl(20, 14%, 4%)" opacity="0.3" />
          <rect x="50" y="54" width="45" height="2" rx="1" fill="hsl(20, 14%, 4%)" opacity="0.4" />
          <rect x="50" y="60" width="50" height="2" rx="1" fill="hsl(20, 14%, 4%)" opacity="0.3" />
          {/* Cursor blink */}
          <rect x="110" y="48" width="6" height="2" rx="1" fill="hsl(38, 92%, 50%)" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
          </rect>
        </>
      )}
      {/* Error icon */}
      {agent.status === 'error' && (
        <>
          <polygon points="100,32 108,46 92,46" fill="none" stroke="hsl(0, 72%, 51%)" strokeWidth="1.5" />
          <text x="100" y="44" textAnchor="middle" fill="hsl(0, 72%, 51%)" fontSize="8" fontWeight="bold">!</text>
        </>
      )}
      {/* Loading bar for building/deploying */}
      {(agent.currentState === 'Deploying' || agent.currentState === 'Testing') && (
        <>
          <rect x="60" y="48" width="80" height="4" rx="2" fill="hsl(24, 12%, 14%)" />
          <rect x="60" y="48" width="52" height="4" rx="2" fill="hsl(38, 92%, 50%)">
            <animate attributeName="width" values="20;60;20" dur="2s" repeatCount="indefinite" />
          </rect>
        </>
      )}

      {/* Dual monitor */}
      {hasDualMonitor && (
        <>
          <rect x="170" y="30" width="20" height="30" rx="2" fill="hsl(20, 10%, 6%)" stroke="hsl(24, 12%, 14%)" strokeWidth="1" />
          <rect x="172" y="32" width="16" height="26" rx="1" fill={cfg.screenFill} opacity={cfg.screenOpacity * 0.6} />
        </>
      )}

      {/* Keyboard */}
      <rect x="60" y="96" width="80" height="10" rx="2" fill="hsl(24, 12%, 14%)" stroke="hsl(24, 12%, 18%)" strokeWidth="0.5" />
      {/* Typing indicator */}
      {agent.status === 'active' && (
        <rect x="85" y="99" width="4" height="4" rx="1" fill="hsl(38, 92%, 50%)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="0.3s" repeatCount="indefinite" />
        </rect>
      )}

      {/* Coffee mug */}
      <ellipse cx="175" cy="94" rx="8" ry="3" fill="hsl(24, 12%, 14%)" />
      <rect x="167" y="94" width="16" height="12" rx="2" fill="hsl(24, 12%, 14%)" />
      {/* Steam */}
      {agent.status === 'active' && (
        <>
          <path d="M172,90 C172,86 174,84 174,80" fill="none" stroke="hsl(24, 10%, 55%)" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M176,91 C176,87 178,85 178,81" fill="none" stroke="hsl(24, 10%, 55%)" strokeWidth="0.5" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2.5s" repeatCount="indefinite" />
          </path>
        </>
      )}

      {/* Plant */}
      {hasPlant && (
        <>
          <rect x="22" y="80" width="10" height="8" rx="1" fill="hsl(24, 12%, 17%)" />
          <circle cx="27" cy="76" r="5" fill="hsl(152, 50%, 30%)" />
          <circle cx="24" cy="78" r="3" fill="hsl(152, 50%, 25%)" />
        </>
      )}
      {/* Sticky notes */}
      {hasStickyNotes && (
        <>
          <rect x="10" y="24" width="14" height="12" rx="1" fill="hsl(48, 96%, 47%)" opacity="0.3" transform="rotate(-5 17 30)" />
          <rect x="12" y="40" width="14" height="12" rx="1" fill="hsl(217, 91%, 60%)" opacity="0.2" transform="rotate(3 19 46)" />
        </>
      )}
      {/* Figurines */}
      {hasFigurines && (
        <>
          <circle cx="30" cy="82" r="3" fill="hsl(271, 91%, 65%)" opacity="0.4" />
          <rect x="28" y="85" width="4" height="3" rx="1" fill="hsl(271, 91%, 65%)" opacity="0.3" />
        </>
      )}
    </svg>
  );
}

function ProgressDots({ currentState }: { currentState: string }) {
  const idx = pipelineStates.indexOf(currentState);
  const activeIdx = idx >= 0 ? idx : 0;
  return (
    <div className="flex items-center gap-1">
      {pipelineStates.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${
            i < activeIdx ? 'bg-green' :
            i === activeIdx ? 'bg-primary animate-pulse' :
            'bg-border'
          }`} />
          {i < pipelineStates.length - 1 && <div className={`w-2 h-px ${i < activeIdx ? 'bg-green/40' : 'bg-border'}`} />}
        </div>
      ))}
    </div>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const h = 18;
  const w = 70;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="opacity-50">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AgentDesk({ agent }: { agent: Agent }) {
  const cfg = statusConfig[agent.status];
  const sparkColor = agent.status === 'active' ? 'hsl(142, 71%, 45%)' : agent.status === 'error' ? 'hsl(0, 84%, 60%)' : 'hsl(215, 14%, 47%)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-card rounded-lg border ${cfg.border} p-0 flex flex-col cursor-pointer transition-all overflow-hidden`}
    >
      {/* Left stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${cfg.stripe}`} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          <span className="font-mono text-xs font-bold text-foreground">{agent.name}</span>
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${modelBadge[agent.model]}`}>
          {agent.model.toUpperCase()}
        </span>
      </div>

      {/* Desk Scene */}
      <div className="px-4">
        <DeskScene agent={agent} />
      </div>

      {/* Info */}
      <div className="px-4 pb-2 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground truncate">{agent.project}</span>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
            agent.status === 'active' ? 'bg-green-dim text-green' :
            agent.status === 'error' ? 'bg-red-dim text-red' :
            'bg-secondary text-muted-foreground'
          }`}>{agent.currentState.toUpperCase()}</span>
        </div>
        <ProgressDots currentState={agent.currentState} />
        <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{agent.uptime} elapsed</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border mt-auto">
        <MiniSparkline data={agent.sparkline} color={sparkColor} />
        <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
          {(agent.tokensUsed / 1000).toFixed(0)}k tok
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 pb-3">
        <button className="text-[10px] font-mono px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          View Chat
        </button>
        <button className="text-[10px] font-mono px-2 py-1 rounded border border-yellow/20 text-yellow hover:bg-yellow-dim transition-colors">
          Pause
        </button>
      </div>
    </motion.div>
  );
}
