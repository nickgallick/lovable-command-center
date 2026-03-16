import { useState } from 'react';
import { Search, RefreshCw, Zap, Pause, OctagonX, GitBranch, Plus, Play, Pencil, Trash2 } from 'lucide-react';
import { cronJobs, projects } from '@/data/mockData';

const quickActions = [
  { label: 'Rebuild', desc: 'Select project', icon: RefreshCw, color: 'bg-primary hover:bg-primary/80 text-primary-foreground' },
  { label: 'Switch Model', desc: 'Sonnet ↔ Opus', icon: Zap, color: 'bg-purple-dim hover:bg-purple/20 text-purple border border-purple/20' },
  { label: 'Pause All', desc: 'Hold pipelines', icon: Pause, color: 'bg-yellow-dim hover:bg-yellow/20 text-yellow border border-yellow/20' },
  { label: 'Emergency Stop', desc: 'Kill all agents', icon: OctagonX, color: 'bg-red-dim hover:bg-red/20 text-red border border-red/20' },
  { label: 'Flush Queue', desc: 'Push deploys', icon: GitBranch, color: 'border border-border text-foreground hover:bg-accent' },
  { label: 'New Cron Job', desc: 'Schedule task', icon: Plus, color: 'border border-border text-foreground hover:bg-accent' },
];

const recentCommands = [
  'Rebuild Perlantir.com — 2m ago',
  'Switch OC-04 to Sonnet — 15m ago',
  'Pause OC-07 — 1h ago',
  'Flush deploy queue — 3h ago',
];

const cronStatusStyles = {
  active: 'bg-green-dim text-green',
  paused: 'bg-yellow-dim text-yellow',
  failed: 'bg-red-dim text-red',
};

export default function CommandCenter() {
  const [query, setQuery] = useState('');
  const [globalModel, setGlobalModel] = useState<'Sonnet' | 'Opus'>('Sonnet');

  return (
    <div className="h-full flex flex-col gap-5 p-4 overflow-auto scrollbar-slim">
      <h1 className="font-display text-lg font-bold text-foreground">Command Center</h1>

      {/* Command Palette Hero */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-full max-w-2xl flex items-center gap-3 px-5 py-3.5 bg-surface-inset rounded-xl border border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
        <div className="flex gap-2">
          {recentCommands.map((cmd, i) => (
            <span key={i} className="text-[10px] font-mono px-2 py-1 rounded-lg bg-card border border-border text-muted-foreground cursor-pointer hover:text-foreground hover:border-primary/30 transition-colors">
              {cmd.split('—')[0].trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <span className="label-xs mb-3 block">QUICK ACTIONS</span>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map(a => (
            <button key={a.label} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${a.color}`}>
              <a.icon className="w-4 h-4 shrink-0" />
              <div>
                <div className="text-sm font-medium">{a.label}</div>
                <div className="text-[10px] opacity-70">{a.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Model Config */}
      <div className="bg-card border border-border rounded-lg p-4">
        <span className="label-xs mb-3 block">MODEL CONFIGURATION</span>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-muted-foreground">Global Default:</span>
          <button
            onClick={() => setGlobalModel(globalModel === 'Sonnet' ? 'Opus' : 'Sonnet')}
            className={`font-mono text-[11px] px-3 py-1.5 rounded-lg border transition-colors ${
              globalModel === 'Opus' ? 'bg-purple-dim text-purple border-purple/20' : 'bg-blue-dim text-primary border-primary/20'
            }`}
          >
            {globalModel.toUpperCase()} ↔ {globalModel === 'Sonnet' ? 'OPUS' : 'SONNET'}
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          {projects.filter(p => p.agents.length > 0).slice(0, 4).map(p => (
            <div key={p.id} className="flex items-center justify-between py-1.5 text-xs">
              <span className="text-foreground">{p.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">inherits global</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cron Jobs */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="label-xs text-foreground">CRON JOBS</span>
          <button className="text-[10px] font-mono text-primary hover:text-foreground transition-colors flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Job
          </button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-2 label-xs">NAME</th>
              <th className="text-left px-4 py-2 label-xs">SCHEDULE</th>
              <th className="text-left px-4 py-2 label-xs">LAST RUN</th>
              <th className="text-left px-4 py-2 label-xs">NEXT</th>
              <th className="text-left px-4 py-2 label-xs">STATUS</th>
              <th className="text-right px-4 py-2 label-xs">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {cronJobs.map(job => (
              <tr key={job.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                <td className="px-4 py-2.5 font-medium text-foreground">{job.name}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground" title={job.schedule}>{job.humanSchedule}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground tabular-nums">{job.lastRun}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground tabular-nums">{job.nextRun}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${cronStatusStyles[job.status]}`}>
                    {job.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><Play className="w-3 h-3" /></button>
                    <button className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3 h-3" /></button>
                    <button className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-red transition-colors"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Commands */}
      <div className="bg-card border border-border rounded-lg p-4">
        <span className="label-xs mb-3 block">RECENT COMMANDS</span>
        <div className="flex flex-col gap-1.5">
          {recentCommands.map((cmd, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-mono text-muted-foreground py-1">
              <span className="text-text-muted text-[10px] tabular-nums w-16">{cmd.split('—')[1]?.trim()}</span>
              <span className="text-foreground">{cmd.split('—')[0].trim()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
