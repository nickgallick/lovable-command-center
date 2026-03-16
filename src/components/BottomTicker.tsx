import { motion } from 'framer-motion';
import { activityFeed } from '@/data/mockData';

const typeColors: Record<string, string> = {
  info: 'text-muted-foreground',
  success: 'text-green',
  warning: 'text-yellow',
  error: 'text-red',
};
const typeDots: Record<string, string> = {
  info: 'bg-muted-foreground',
  success: 'bg-green',
  warning: 'bg-yellow',
  error: 'bg-red',
};

export function BottomTicker() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="h-10 flex items-center border-t border-border bg-card/80 backdrop-blur-md overflow-hidden shrink-0"
    >
      <div className="px-3 label-xs shrink-0 border-r border-border h-full flex items-center text-[9px]">
        LIVE FEED
      </div>
      <div className="flex-1 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-8 whitespace-nowrap px-4"
        >
          {[...activityFeed, ...activityFeed].map((event, i) => (
            <div key={`${event.id}-${i}`} className="flex items-center gap-2 text-xs">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeDots[event.type]}`} />
              <span className="font-mono text-text-muted text-[10px]">[{event.agent}]</span>
              <span className={`font-mono text-[11px] ${typeColors[event.type]}`}>{event.action}</span>
              <span className="font-mono text-text-muted/50 text-[10px]">{event.timestamp}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <button className="px-3 h-full border-l border-border label-xs text-primary hover:text-foreground transition-colors text-[9px]">
        VIEW ALL
      </button>
    </motion.footer>
  );
}
