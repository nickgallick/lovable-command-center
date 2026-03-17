import { useState } from 'react';
import { agents } from '@/data/mockData';
import { Agent } from '@/data/mockData';
import { DeskSVG } from '@/components/warroom/DeskSVG';
import { LoungeSVG } from '@/components/warroom/LoungeSVG';
import { WarRoomActivityFeed } from '@/components/warroom/WarRoomActivityFeed';
import { AgentDetailSheet } from '@/components/warroom/AgentDetailSheet';
import { agentAccents, getVisualState } from '@/components/warroom/AgentAccents';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

export default function AgentWarRoomPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const deskAgents = agents.filter(a => a.status !== 'idle');
  const idleAgents = agents.filter(a => a.status === 'idle');
  const activeCount = agents.filter(a => a.status === 'active').length;

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setSheetOpen(true);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-lg font-bold text-foreground">Agent War Room</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="label-xs">{activeCount} ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="label-xs">
            {agents.filter(a => a.status === 'active').length} CODING · {agents.filter(a => a.status === 'idle').length} IDLE · {agents.filter(a => a.status === 'error').length} ERROR · {agents.filter(a => a.status === 'offline').length} OFF
          </span>
        </div>
      </div>

      {/* Scene area */}
      <div className="flex-1 overflow-auto scrollbar-slim">
        <div className="flex flex-col xl:flex-row gap-0 min-h-0">
          {/* THE OFFICE — desk grid */}
          <div className="xl:w-[65%] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="label-xs text-primary">THE OFFICE</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {deskAgents.map(agent => {
                const accent = agentAccents[agent.id];
                const state = getVisualState(agent.status, agent.currentState);
                return (
                  <motion.div
                    key={agent.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleAgentClick(agent)}
                    className="relative bg-card rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors overflow-hidden group"
                    style={{
                      boxShadow: state === 'error'
                        ? '0 0 20px -5px hsla(0,72%,51%,0.1)'
                        : state === 'coding'
                          ? `0 0 20px -5px ${accent?.color}15`
                          : 'none'
                    }}
                  >
                    {/* Status glow bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background: state === 'error' ? 'hsl(0,72%,51%)' : state === 'coding' ? accent?.color : state === 'deploying' ? '#0EA5E9' : state === 'building' ? '#F59E0B' : 'transparent',
                        opacity: state === 'offline' ? 0 : 0.5,
                      }}
                    />

                    {/* Desk scene */}
                    <div className="px-2 pt-1">
                      <DeskSVG accent={accent?.color || '#94A3B8'} state={state} personality={agent.personality} name={agent.name} />
                    </div>

                    {/* Info overlay */}
                    <div className="px-3 pb-3 pt-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-foreground">{agent.name}</span>
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                          agent.model === 'Opus' ? 'bg-purple-dim text-purple' :
                          agent.model === 'Sonnet' ? 'bg-blue-dim text-primary' :
                          'bg-secondary text-muted-foreground'
                        }`}>{agent.model.toUpperCase()}</span>
                      </div>
                      {agent.status !== 'offline' && (
                        <>
                          <div className="text-[9px] font-mono text-muted-foreground truncate">{agent.project}</div>
                          <div className="flex items-center justify-between">
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                              state === 'error' ? 'bg-red-dim text-red' :
                              state === 'coding' ? 'bg-green-dim text-green' :
                              state === 'deploying' ? 'bg-blue-dim text-primary' :
                              state === 'building' ? 'bg-yellow-dim text-yellow' :
                              'bg-secondary text-muted-foreground'
                            }`}>{agent.currentState.toUpperCase()}</span>
                            <span className="text-[9px] font-mono text-muted-foreground tabular-nums">{agent.uptime}</span>
                          </div>
                        </>
                      )}
                      {agent.status === 'offline' && (
                        <div className="text-[9px] font-mono text-muted-foreground">Offline</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* THE LOUNGE */}
          <div className="xl:w-[35%] p-4 xl:border-l border-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow" />
              <span className="label-xs text-yellow">THE LOUNGE</span>
              {idleAgents.length > 0 && <span className="text-[9px] font-mono text-muted-foreground">({idleAgents.length} agent{idleAgents.length !== 1 ? 's' : ''})</span>}
            </div>
            <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--card)), hsl(30, 20%, 97%))' }}>
              <div className="dark:bg-gradient-to-br dark:from-[hsl(215,25%,10%)] dark:to-[hsl(30,10%,12%)]">
                <LoungeSVG idleAgents={idleAgents} />
                {/* Idle agent cards */}
                {idleAgents.map(agent => {
                  const accent = agentAccents[agent.id];
                  return (
                    <div
                      key={agent.id}
                      onClick={() => handleAgentClick(agent)}
                      className="mx-3 mb-3 p-2 rounded border border-border/50 bg-background/50 hover:bg-accent/30 cursor-pointer transition-colors flex items-center gap-2"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accent?.color + '20' }}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent?.color, opacity: 0.5 }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono font-bold text-foreground">{agent.name}</div>
                        <div className="text-[9px] font-mono text-muted-foreground">Idle · {agent.uptime}</div>
                      </div>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                        agent.model === 'Opus' ? 'bg-purple-dim text-purple' : 'bg-secondary text-muted-foreground'
                      }`}>{agent.model.toUpperCase()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <WarRoomActivityFeed />

      {/* Agent detail sheet */}
      <AgentDetailSheet agent={selectedAgent} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
