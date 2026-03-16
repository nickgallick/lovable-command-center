import { motion } from 'framer-motion';
import { activityFeed } from '@/data/mockData';

const typeColors: Record<string, string> = {
  info: 'text-slate-bright',
  success: 'text-cyan',
  warning: 'text-amber',
  error: 'text-rose',
};

const typeDots: Record<string, string> = {
  info: 'bg-slate-bright',
  success: 'bg-cyan',
  warning: 'bg-amber',
  error: 'bg-rose',
};

export function BottomTicker() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="h-8 flex items-center border-t border-border bg-surface/80 backdrop-blur-md overflow-hidden"
    >
      <div className="px-3 label-xs shrink-0 border-r border-border h-full flex items-center">
        LIVE FEED
      </div>
      <div className="flex-1 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-6 whitespace-nowrap px-4"
        >
          {[...activityFeed, ...activityFeed].map((event, i) => (
            <div key={`${event.id}-${i}`} className="flex items-center gap-2 text-xs font-mono">
              <div className={`w-1.5 h-1.5 rounded-full ${typeDots[event.type]}`} />
              <span className="text-muted-foreground">[{event.agent}]</span>
              <span className={typeColors[event.type]}>{event.action}</span>
              <span className="text-muted-foreground/50">{event.timestamp}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
}
