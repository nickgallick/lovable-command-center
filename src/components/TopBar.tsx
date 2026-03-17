import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { agents, builds, deployments, spendData, alerts } from '@/data/mockData';
import { useTheme } from '@/hooks/use-theme';

const MetricPill = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border">
    <span className="label-xs">{label}</span>
    <span className={`font-mono text-sm font-semibold tabular-nums ${color}`}>{value}</span>
  </div>
);

export function TopBar() {
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const activeBuilds = builds.filter(b => b.status === 'active').length;
  const healthyDeploys = deployments.filter(d => d.status === 'healthy').length;
  const errors24h = alerts.filter(a => a.severity === 'critical' && !a.resolved).length;
  const { theme, toggleTheme } = useTheme();

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-14 flex items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-md z-40"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rotate-45 bg-primary rounded-sm" />
        <span className="font-mono text-xs font-bold tracking-[0.15em] text-foreground">MISSION CONTROL</span>
      </div>

      {/* Center: Metric Pills */}
      <div className="hidden md:flex items-center gap-2">
        <MetricPill label="AGENTS" value={`${activeAgents}/${agents.length}`} color="text-green" />
        <MetricPill label="BUILDS" value={activeBuilds} color="text-yellow" />
        <MetricPill label="DEPLOYS" value={`${healthyDeploys}/${deployments.length}`} color="text-green" />
        <MetricPill label="SPEND" value={`$${spendData.today.toFixed(2)}`} color="text-foreground" />
        <MetricPill label="ERRORS" value={errors24h} color={errors24h > 0 ? 'text-red' : 'text-green'} />
      </div>

      {/* Right: Theme toggle + Clock + Model + Avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-7 h-7 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">{timeStr}</span>
        <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-purple-dim text-purple border border-purple/20 font-medium">
          SONNET 4.6
        </span>
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary">N</span>
        </div>
      </div>
    </motion.header>
  );
}
