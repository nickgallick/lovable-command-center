import { motion } from 'framer-motion';
import { agents, builds, deployments, spendData } from '@/data/mockData';

const MetricChip = ({ label, value, color }: { label: string; value: string | number; color?: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-raised rounded-md border border-border">
    <span className="label-xs">{label}</span>
    <span className={`font-mono text-sm font-medium tabular-nums ${color || 'text-foreground'}`}>{value}</span>
  </div>
);

export function TopBar() {
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const activeBuilds = builds.filter(b => b.status === 'active').length;
  const healthyDeploys = deployments.filter(d => d.status === 'healthy').length;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="h-12 flex items-center justify-between px-4 border-b border-border bg-surface/80 backdrop-blur-md z-40"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-foreground">NERVE CENTER</span>
        </div>
        <span className="text-border">|</span>
        <span className="label-xs">SYSTEM STATUS: OPERATIONAL</span>
      </div>

      <div className="flex items-center gap-2">
        <MetricChip label="AGENTS" value={`${activeAgents}/${agents.length}`} color="text-cyan" />
        <MetricChip label="BUILDS" value={activeBuilds} color="text-amber" />
        <MetricChip label="DEPLOYS" value={`${healthyDeploys}/${deployments.length}`} color="text-cyan" />
        <MetricChip label="SPEND" value={`$${spendData.today.toFixed(2)}`} color="text-foreground" />
        <div className="ml-2 flex items-center gap-1.5 px-2 py-1 rounded bg-surface-overlay cursor-pointer hover:bg-accent transition-colors">
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1">⌘K</kbd>
        </div>
      </div>
    </motion.header>
  );
}
