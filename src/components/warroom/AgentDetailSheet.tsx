import { Agent, activityFeed } from '@/data/mockData';
import { agentAccents, getVisualState } from './AgentAccents';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

interface Props {
  agent: Agent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const modelBadge: Record<string, string> = {
  Opus: 'bg-purple-dim text-purple border border-purple/20',
  Sonnet: 'bg-blue-dim text-primary border border-primary/20',
  Haiku: 'bg-secondary text-muted-foreground border border-border',
};

export function AgentDetailSheet({ agent, open, onOpenChange }: Props) {
  if (!agent) return null;

  const accent = agentAccents[agent.id];
  const state = getVisualState(agent.status, agent.currentState);
  const agentEvents = activityFeed.filter(e => e.agent === agent.id).slice(0, 10);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-96 sm:max-w-md overflow-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent?.color + '20' }}>
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: accent?.color, opacity: 0.6 }} />
            </div>
            <div>
              <SheetTitle className="text-base">{agent.name}</SheetTitle>
              <SheetDescription className="text-xs font-mono">{agent.id} · {state.toUpperCase()}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Status section */}
        <div className="space-y-4 px-1">
          <div className="grid grid-cols-2 gap-3">
            <InfoCard label="Model">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${modelBadge[agent.model]}`}>{agent.model}</span>
            </InfoCard>
            <InfoCard label="Project">
              <span className="text-xs font-medium text-foreground">{agent.project}</span>
            </InfoCard>
            <InfoCard label="Pipeline Step">
              <span className="text-xs font-mono text-foreground">{agent.currentState}</span>
            </InfoCard>
            <InfoCard label="Uptime">
              <span className="text-xs font-mono tabular-nums text-foreground">{agent.uptime}</span>
            </InfoCard>
            <InfoCard label="Tokens Used">
              <span className="text-xs font-mono tabular-nums text-foreground">{(agent.tokensUsed / 1000).toFixed(1)}k / {(agent.tokensLimit / 1000).toFixed(0)}k</span>
            </InfoCard>
            <InfoCard label="Success Rate">
              <span className="text-xs font-mono tabular-nums text-foreground">{agent.successRate}%</span>
            </InfoCard>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 text-xs font-mono py-2 px-3 rounded border border-border hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              View Full Chat
            </button>
            <button className="text-xs font-mono py-2 px-3 rounded border border-yellow/30 text-yellow hover:bg-yellow-dim transition-colors">
              Pause
            </button>
            <button className="text-xs font-mono py-2 px-3 rounded border border-border hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              Switch Model
            </button>
          </div>

          {/* Recent activity */}
          <div>
            <span className="label-xs block mb-2">RECENT ACTIVITY</span>
            <div className="space-y-0 border border-border rounded-md overflow-hidden">
              {agentEvents.length === 0 && (
                <div className="px-3 py-4 text-center text-xs text-muted-foreground font-mono">No recent activity</div>
              )}
              {agentEvents.map(ev => (
                <div key={ev.id} className="px-3 py-2 border-b border-border/50 last:border-0 flex items-start gap-2">
                  <span className="text-[9px] font-mono text-muted-foreground tabular-nums shrink-0 w-12 mt-0.5">{ev.timestamp}</span>
                  <span className="text-[10px] font-mono text-muted-foreground leading-relaxed">{ev.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-muted/50 rounded-md px-3 py-2">
      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">{label}</span>
      {children}
    </div>
  );
}
