import { agents } from '@/data/mockData';
import { AgentDesk } from './AgentDesk';

export function AgentWarRoom() {
  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="label-xs text-foreground text-sm">AGENT WAR ROOM</h1>
        <span className="label-xs">
          AGENTS ACTIVE: {agents.filter(a => a.status === 'active').length.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map(agent => (
          <AgentDesk key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
