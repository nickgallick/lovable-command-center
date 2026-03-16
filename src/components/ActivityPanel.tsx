import { motion } from 'framer-motion';
import { activityFeed } from '@/data/mockData';
import { useState } from 'react';

const typeStyles: Record<string, { dot: string; text: string }> = {
  info: { dot: 'bg-muted-foreground', text: 'text-foreground' },
  success: { dot: 'bg-green', text: 'text-green' },
  warning: { dot: 'bg-yellow', text: 'text-yellow' },
  error: { dot: 'bg-red', text: 'text-red' },
};

const filters = ['All', 'Errors Only'] as const;

export function ActivityPanel() {
  const [filter, setFilter] = useState<typeof filters[number]>('All');

  const filtered = filter === 'Errors Only'
    ? activityFeed.filter(e => e.type === 'error')
    : activityFeed;

  return (
    <div className="h-full flex flex-col border-l border-border bg-card w-72 shrink-0">
      <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
        <span className="label-xs text-foreground">LIVE ACTIVITY</span>
        <div className="flex gap-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                filter === f ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >{f}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto scrollbar-slim">
        {filtered.map((event, i) => {
          const s = typeStyles[event.type];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="px-3 py-2 border-b border-border/50 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                <span className="font-mono text-[10px] font-bold text-foreground">{event.agent}</span>
                <span className="text-[10px] text-muted-foreground truncate">{event.project}</span>
                <span className="ml-auto text-[9px] font-mono text-text-muted tabular-nums shrink-0">{event.timestamp}</span>
              </div>
              <p className="log-text text-muted-foreground pl-3.5 line-clamp-2">{event.action}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
