import { motion } from 'framer-motion';
import { builds, type PipelineStage, type BuildStatus } from '@/data/mockData';

const stages: { id: PipelineStage; label: string }[] = [
  { id: 'trigger', label: 'TRIGGER' },
  { id: 'parse', label: 'PARSE' },
  { id: 'skill', label: 'SKILL' },
  { id: 'execute', label: 'EXECUTE' },
  { id: 'build', label: 'BUILD' },
  { id: 'deploy', label: 'DEPLOY' },
  { id: 'health', label: 'HEALTH' },
];

function StageNode({ stage, currentStage, buildStatus }: { stage: PipelineStage; currentStage: PipelineStage; buildStatus: BuildStatus }) {
  const stageIndex = stages.findIndex(s => s.id === stage);
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  let state: 'complete' | 'active' | 'pending' | 'failed' = 'pending';
  if (buildStatus === 'failed' && stageIndex === currentIndex) state = 'failed';
  else if (buildStatus === 'complete' || stageIndex < currentIndex) state = 'complete';
  else if (stageIndex === currentIndex && buildStatus === 'active') state = 'active';

  const colors = {
    complete: 'border-cyan bg-cyan/10',
    active: 'border-cyan animate-pulse',
    pending: 'border-border border-dashed',
    failed: 'border-rose bg-rose/10',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        className={`w-5 h-5 rounded-full border-2 ${colors[state]} flex items-center justify-center`}
        animate={state === 'active' ? { boxShadow: ['0 0 0 0 hsla(187,92%,56%,0)', '0 0 0 6px hsla(187,92%,56%,0.2)', '0 0 0 0 hsla(187,92%,56%,0)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {state === 'complete' && <div className="w-2 h-2 rounded-full bg-cyan" />}
        {state === 'failed' && <div className="w-2 h-2 rounded-full bg-rose" />}
      </motion.div>
      <span className="label-xs text-[8px]">{stages.find(s => s.id === stage)?.label}</span>
    </div>
  );
}

function PipelineEdge({ completed }: { completed: boolean }) {
  return (
    <div className="flex-1 h-px relative mx-1 mt-[-14px]">
      <div className={`absolute inset-0 ${completed ? 'bg-cyan/40' : 'bg-border'}`} />
    </div>
  );
}

function BuildRow({ build }: { build: typeof builds[0] }) {
  const statusColor = {
    active: 'text-cyan',
    pending: 'text-muted-foreground',
    complete: 'text-cyan',
    failed: 'text-rose',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-foreground">{build.id}</span>
          <span className="text-xs text-muted-foreground">{build.project}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono uppercase font-medium ${statusColor[build.status]}`}>
            {build.status}
          </span>
          {build.duration !== '—' && (
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{build.duration}</span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {stages.map((stage, i) => (
          <div key={stage.id} className="contents">
            <StageNode stage={stage.id} currentStage={build.stage} buildStatus={build.status} />
            {i < stages.length - 1 && (
              <PipelineEdge completed={stages.findIndex(s => s.id === build.stage) > i || (build.status === 'complete')} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PipelineVisualizer() {
  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="label-xs text-foreground text-sm">BUILD PIPELINE</h1>
        <span className="label-xs">{builds.filter(b => b.status === 'active').length} ACTIVE</span>
      </div>
      <div className="flex flex-col gap-3">
        {builds.map(build => (
          <BuildRow key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
}
