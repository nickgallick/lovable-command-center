import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, GitBranch, Pause, Zap, OctagonX, RefreshCw, Globe, Users } from 'lucide-react';

const commands = [
  { id: 'rebuild', label: 'Execute Rebuild', desc: 'Trigger fresh build for a project', icon: RefreshCw, color: 'text-primary' },
  { id: 'switch', label: 'Switch All to Opus', desc: 'Upgrade all agents to Opus model', icon: Zap, color: 'text-purple' },
  { id: 'pause', label: 'Pause All Builds', desc: 'Hold all running agent pipelines', icon: Pause, color: 'text-yellow' },
  { id: 'stop', label: 'Emergency Stop', desc: 'Terminate all running agents immediately', icon: OctagonX, color: 'text-red' },
  { id: 'flush', label: 'Deploy Queue Flush', desc: 'Push all pending deployments now', icon: GitBranch, color: 'text-green' },
  { id: 'deploy', label: 'View Deployments', desc: 'Check deployment health grid', icon: Globe, color: 'text-cyan' },
  { id: 'agents', label: 'View Agent War Room', desc: 'Monitor all active agents', icon: Users, color: 'text-foreground' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        setQuery('');
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-card border border-border shadow-2xl rounded-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search commands, projects, agents..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
              />
              <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="py-1 max-h-80 overflow-auto scrollbar-slim">
              {filtered.map(cmd => (
                <button
                  key={cmd.id}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-colors text-left"
                  onClick={() => setOpen(false)}
                >
                  <cmd.icon className={`w-4 h-4 ${cmd.color}`} />
                  <div className="flex-1">
                    <div className="text-sm text-foreground font-medium">{cmd.label}</div>
                    <div className="text-xs text-muted-foreground">{cmd.desc}</div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">No commands found</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
