import { useState } from 'react';
import { motion } from 'framer-motion';
import { activityFeed, agents } from '@/data/mockData';
import { agentAccents } from './AgentAccents';

const typeStyles: Record<string, string> = {
  info: 'bg-muted-foreground',
  success: 'bg-green',
  warning: 'bg-yellow',
  error: 'bg-red',
};

export function WarRoomActivityFeed() {
  const agentNames = ['All', ...agents.map(a => a.name), 'Errors Only'];
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'Errors Only'
    ? activityFeed.filter(e => e.type === 'error')
    : filter === 'All'
      ? activityFeed
      : activityFeed.filter(e => {
          const agent = agents.find(a => a.id === e.agent);
          return agent?.name === filter;
        });

  return (
    <div className="border-t border-border bg-card flex flex-col" style={{ maxHeight: 200 }}>
      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border overflow-x-auto scrollbar-hide">
        <span className="label-xs shrink-0 mr-1">FEED</span>
        {agentNames.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[9px] font-mono px-2 py-0.5 rounded whitespace-nowrap transition-colors ${
              filter === f
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      {/* Feed entries */}
      <div className="flex-1 overflow-auto scrollbar-slim">
        {filtered.map((event, i) => {
          const agent = agents.find(a => a.id === event.agent);
          const accent = agentAccents[event.agent];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="px-3 py-1.5 border-b border-border/30 hover:bg-accent/30 transition-colors flex items-start gap-2"
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${typeStyles[event.type]}`} />
              <span className="text-[10px] font-mono text-muted-foreground shrink-0 tabular-nums w-14">{event.timestamp}</span>
              <span className="text-[10px] font-mono font-bold shrink-0" style={{ color: accent?.color || 'hsl(215,14%,47%)' }}>
                {agent?.name || event.agent}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground truncate">{event.action}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
