import { agents } from '@/data/mockData';
import { AgentDesk } from '@/components/AgentDesk';
import { ActivityPanel } from '@/components/ActivityPanel';

export default function AgentWarRoomPage() {
  return (
    <div className="h-full flex overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-foreground">Agent War Room</h1>
          <span className="label-xs">
            ACTIVE: {agents.filter(a => a.status === 'active').length.toString().padStart(2, '0')} / {agents.length.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {agents.map(agent => (
            <AgentDesk key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
      <ActivityPanel />
    </div>
  );
}
