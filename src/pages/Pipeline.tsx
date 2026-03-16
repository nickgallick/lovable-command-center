import { motion } from 'framer-motion';
import { builds, type PipelineStage, type BuildStatus } from '@/data/mockData';
import { useState } from 'react';

const stages: { id: PipelineStage; label: string }[] = [
  { id: 'trigger', label: 'TRIGGER' },
  { id: 'parse', label: 'PARSE' },
  { id: 'skill', label: 'SKILL' },
  { id: 'execute', label: 'EXECUTE' },
  { id: 'build', label: 'BUILD' },
  { id: 'deploy', label: 'DEPLOY' },
  { id: 'health', label: 'HEALTH' },
];

const filters = ['All', 'Active', 'Failed', 'Today'] as const;

function StageNode({ stage, currentStage, buildStatus }: { stage: PipelineStage; currentStage: PipelineStage; buildStatus: BuildStatus }) {
  const stageIndex = stages.findIndex(s => s.id === stage);
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  let state: 'complete' | 'active' | 'pending' | 'failed' = 'pending';
  if (buildStatus === 'failed' && stageIndex === currentIndex) state = 'failed';
  else if (buildStatus === 'complete' || stageIndex < currentIndex) state = 'complete';
  else if (stageIndex === currentIndex && buildStatus === 'active') state = 'active';

  const colors = {
    complete: 'border-green bg-green-dim',
    active: 'border-primary bg-blue-dim',
    pending: 'border-border border-dashed',
    failed: 'border-red bg-red-dim',
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        className={`w-6 h-6 rounded-full border-2 ${colors[state]} flex items-center justify-center`}
        animate={state === 'active' ? { boxShadow: ['0 0 0 0 hsla(217,91%,60%,0)', '0 0 0 6px hsla(217,91%,60%,0.15)', '0 0 0 0 hsla(217,91%,60%,0)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {state === 'complete' && <div className="w-2 h-2 rounded-full bg-green" />}
        {state === 'failed' && <div className="w-2 h-2 rounded-full bg-red" />}
        {state === 'active' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
      </motion.div>
      <span className="label-xs text-[8px]">{stages.find(s => s.id === stage)?.label}</span>
    </div>
  );
}

function PipelineEdge({ completed }: { completed: boolean }) {
  return <div className={`flex-1 h-px mx-1 mt-[-18px] ${completed ? 'bg-green/40' : 'bg-border'}`} />;
}

function BuildRow({ build }: { build: typeof builds[0] }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-foreground">{build.id}</span>
          <span className="text-sm font-medium text-foreground">{build.project}</span>
          <span className="text-[10px] font-mono text-muted-foreground">{build.agent}</span>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
            build.model === 'Opus' ? 'bg-purple-dim text-purple border-purple/20' : 'bg-blue-dim text-primary border-primary/20'
          }`}>{build.model}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-mono font-bold ${
            build.status === 'active' ? 'text-primary' : build.status === 'complete' ? 'text-green' : build.status === 'failed' ? 'text-red' : 'text-muted-foreground'
          }`}>{build.status.toUpperCase()}</span>
          {build.duration !== '—' && (
            <span className="text-[11px] font-mono text-muted-foreground tabular-nums">{build.duration}</span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {stages.map((stage, i) => (
          <div key={stage.id} className="contents">
            <StageNode stage={stage.id} currentStage={build.stage} buildStatus={build.status} />
            {i < stages.length - 1 && (
              <PipelineEdge completed={stages.findIndex(s => s.id === build.stage) > i || build.status === 'complete'} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pipeline() {
  const [filter, setFilter] = useState<typeof filters[number]>('All');

  const filtered = builds.filter(b => {
    if (filter === 'Active') return b.status === 'active';
    if (filter === 'Failed') return b.status === 'failed';
    return true;
  });

  const activeBuilds = filtered.filter(b => b.status === 'active');
  const otherBuilds = filtered.filter(b => b.status !== 'active');
  const avgBuildTime = '5m 12s';
  const successRate = 75;

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">Build Pipeline</h1>
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                filter === f ? 'bg-primary/10 text-primary border-primary/30' : 'text-muted-foreground border-border hover:text-foreground'
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Active builds */}
      {activeBuilds.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="label-xs text-primary">{activeBuilds.length} ACTIVE BUILD{activeBuilds.length > 1 ? 'S' : ''}</span>
          {activeBuilds.map(b => <BuildRow key={b.id} build={b} />)}
        </div>
      )}

      {/* Build history */}
      {otherBuilds.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="label-xs">BUILD HISTORY</span>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2.5 label-xs">PROJECT</th>
                  <th className="text-left px-4 py-2.5 label-xs">AGENT</th>
                  <th className="text-left px-4 py-2.5 label-xs">MODEL</th>
                  <th className="text-left px-4 py-2.5 label-xs">STARTED</th>
                  <th className="text-left px-4 py-2.5 label-xs">DURATION</th>
                  <th className="text-left px-4 py-2.5 label-xs">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {otherBuilds.map(b => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-foreground">{b.project}</td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{b.agent}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        b.model === 'Opus' ? 'bg-purple-dim text-purple' : 'bg-blue-dim text-primary'
                      }`}>{b.model}</span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground tabular-nums">{b.startedAt}</td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground tabular-nums">{b.duration}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        b.status === 'complete' ? 'bg-green-dim text-green' : b.status === 'failed' ? 'bg-red-dim text-red' : 'bg-secondary text-muted-foreground'
                      }`}>{b.result || b.status.toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Metrics strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="label-xs mb-1">AVG BUILD TIME</div>
          <div className="metric-md text-foreground">{avgBuildTime}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="label-xs mb-1">SUCCESS RATE</div>
          <div className="metric-md text-green">{successRate}%</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="label-xs mb-1">BUILDS TODAY</div>
          <div className="metric-md text-primary">{builds.length}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="label-xs mb-1">PEAK HOUR</div>
          <div className="metric-md text-foreground">14:00</div>
        </div>
      </div>
    </div>
  );
}
