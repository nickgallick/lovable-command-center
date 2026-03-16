import { motion } from 'framer-motion';
import { projects, agents, type ProjectStatus } from '@/data/mockData';
import { useState } from 'react';
import { Search, ExternalLink, MoreHorizontal } from 'lucide-react';

const columns: { status: ProjectStatus; label: string; color?: string }[] = [
  { status: 'queued', label: 'QUEUED' },
  { status: 'in-progress', label: 'IN PROGRESS' },
  { status: 'building', label: 'BUILDING' },
  { status: 'deploying', label: 'DEPLOYING' },
  { status: 'live', label: 'LIVE' },
  { status: 'attention', label: 'NEEDS ATTENTION', color: 'text-red' },
];

const typeColors: Record<string, string> = {
  SaaS: 'bg-blue-dim text-primary',
  Landing: 'bg-purple-dim text-purple',
  API: 'bg-green-dim text-green',
  PWA: 'bg-yellow-dim text-yellow',
};

const pipelineStages = ['Idle', 'Planning', 'Coding', 'Testing', 'Deploying', 'Complete'];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const agent = agents.find(a => project.agents.includes(a.id));
  const stageIdx = agent ? pipelineStages.indexOf(agent.currentState) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-lg p-3 flex flex-col gap-2 cursor-pointer hover:border-primary/30 transition-all relative"
    >
      {/* Health dot */}
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
        project.health >= 90 ? 'bg-green' : project.health >= 70 ? 'bg-yellow' : 'bg-red'
      }`} />

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">{project.name}</span>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${typeColors[project.type]}`}>{project.type}</span>
      </div>

      {agent && (
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full bg-surface-inset border border-border flex items-center justify-center`}>
            <span className="text-[8px] font-mono font-bold text-foreground">{agent.id.split('-')[1]}</span>
          </div>
          <span className="text-[11px] text-muted-foreground">{agent.name}</span>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex items-center gap-0.5">
        {pipelineStages.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${
            i <= stageIdx ? 'bg-primary' : 'bg-border'
          }`} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">{project.lastActivity}</span>
        {project.url && (
          <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <button className="absolute top-2.5 right-8 p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

export default function ProjectBoard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-display text-lg font-bold text-foreground">Project Command Board</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-inset rounded-lg border border-border">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter projects..."
              className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-32 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto scrollbar-slim">
        <div className="flex gap-3 min-w-max h-full">
          {columns.map(col => {
            const colProjects = filteredProjects.filter(p => p.status === col.status);
            if (col.status === 'attention' && colProjects.length === 0) return null;
            return (
              <div key={col.status} className="w-60 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`label-xs ${col.color || ''}`}>{col.label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary rounded px-1.5 py-0.5">{colProjects.length}</span>
                </div>
                <div className="flex-1 flex flex-col gap-2 overflow-auto scrollbar-slim">
                  {colProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
