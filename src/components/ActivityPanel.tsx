import { motion } from 'framer-motion';
import { activityFeed } from '@/data/mockData';

const typeStyles: Record<string, { dot: string; text: string }> = {
  info: { dot: 'bg-slate-bright', text: 'text-foreground' },
  success: { dot: 'bg-cyan', text: 'text-cyan' },
  warning: { dot: 'bg-amber', text: 'text-amber' },
  error: { dot: 'bg-rose', text: 'text-rose' },
};

export function ActivityPanel() {
  return (
    <div className="h-full flex flex-col border-l border-border bg-surface w-80">
      <div className="px-3 py-2.5 border-b border-border">
        <span className="label-xs">LIVE ACTIVITY</span>
      </div>
      <div className="flex-1 overflow-auto scrollbar-slim">
        {activityFeed.map((event, i) => {
          const s = typeStyles[event.type];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="px-3 py-2 border-b border-border/50 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                <span className="font-mono text-[10px] font-semibold text-foreground">{event.agent}</span>
                <span className="text-[10px] text-muted-foreground">{event.project}</span>
                <span className="ml-auto text-[9px] font-mono text-muted-foreground/60 tabular-nums">{event.timestamp}</span>
              </div>
              <p className="log-text text-muted-foreground pl-3.5">{event.action}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
