import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  data: { type: string; data: any };
  onClose: () => void;
}

export function ContextPanel({ data, onClose }: Props) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-96 h-full border-l border-border bg-card flex flex-col shrink-0 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="label-sm text-foreground">{data.type.toUpperCase()} DETAIL</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto scrollbar-slim p-4">
        <pre className="log-text text-muted-foreground whitespace-pre-wrap">
          {JSON.stringify(data.data, null, 2)}
        </pre>
      </div>
    </motion.div>
  );
}
