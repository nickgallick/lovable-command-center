import { agents, skillUsage, errorCategories } from '@/data/mockData';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, Legend } from 'recharts';
import { ArrowUp, ArrowDown, Minus, TrendingUp } from 'lucide-react';

function AgentScorecard({ agent, rank }: { agent: typeof agents[0]; rank: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (agent.successRate / 100) * circ;
  const color = agent.successRate >= 95 ? 'hsl(142, 71%, 45%)' : agent.successRate >= 85 ? 'hsl(48, 96%, 47%)' : 'hsl(0, 84%, 60%)';

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col items-center gap-2 min-w-[150px]">
      <div className="flex items-center gap-2 w-full">
        <span className="text-[10px] font-mono text-muted-foreground">#{rank}</span>
        <span className="text-sm font-semibold text-foreground flex-1">{agent.name}</span>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
          agent.model === 'Opus' ? 'bg-purple-dim text-purple' : agent.model === 'Haiku' ? 'bg-secondary text-muted-foreground' : 'bg-blue-dim text-primary'
        }`}>{agent.model}</span>
      </div>

      <svg width="52" height="52" className="-rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="hsl(217, 33%, 17%)" strokeWidth="4" />
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="font-mono text-xs font-bold tabular-nums" style={{ color }}>{agent.successRate}%</span>
      <span className="label-xs text-[8px]">SUCCESS RATE</span>

      <div className="w-full grid grid-cols-2 gap-2 text-center border-t border-border pt-2">
        <div>
          <div className="font-mono text-xs font-bold text-foreground tabular-nums">{agent.buildsCompleted}</div>
          <div className="label-xs text-[7px]">BUILDS</div>
        </div>
        <div>
          <div className="font-mono text-xs font-bold text-foreground tabular-nums">{agent.avgBuildTime}</div>
          <div className="label-xs text-[7px]">AVG TIME</div>
        </div>
        <div>
          <div className="font-mono text-xs font-bold text-foreground tabular-nums">${agent.totalCost.toFixed(0)}</div>
          <div className="label-xs text-[7px]">COST</div>
        </div>
        <div>
          <div className="font-mono text-xs font-bold text-foreground tabular-nums">{(agent.tokensUsed / 1000).toFixed(0)}k</div>
          <div className="label-xs text-[7px]">TOKENS</div>
        </div>
      </div>
    </div>
  );
}

const trendIcon = { up: ArrowUp, down: ArrowDown, stable: Minus };
const trendColor = { up: 'text-red', down: 'text-green', stable: 'text-muted-foreground' };

export default function PerformancePage() {
  const sortedAgents = [...agents].filter(a => a.status !== 'offline').sort((a, b) => {
    const scoreA = a.successRate * 0.6 + (100 - parseFloat(a.avgBuildTime)) * 0.2 + (a.buildsCompleted / 100) * 20;
    const scoreB = b.successRate * 0.6 + (100 - parseFloat(b.avgBuildTime)) * 0.2 + (b.buildsCompleted / 100) * 20;
    return scoreB - scoreA;
  });

  const modelComparison = [
    { metric: 'Avg Build Time', Sonnet: 4.5, Opus: 7.5 },
    { metric: 'Success Rate', Sonnet: 96, Opus: 88 },
    { metric: 'Avg Cost', Sonnet: 12, Opus: 28 },
    { metric: 'Avg Tokens (k)', Sonnet: 65, Opus: 172 },
  ];

  const perfOverTime = [
    { day: 'Mon', 'OC-01': 92, 'OC-02': 97, 'OC-06': 95 },
    { day: 'Tue', 'OC-01': 94, 'OC-02': 96, 'OC-06': 97 },
    { day: 'Wed', 'OC-01': 90, 'OC-02': 98, 'OC-06': 94 },
    { day: 'Thu', 'OC-01': 95, 'OC-02': 95, 'OC-06': 96 },
    { day: 'Fri', 'OC-01': 93, 'OC-02': 97, 'OC-06': 98 },
    { day: 'Sat', 'OC-01': 96, 'OC-02': 98, 'OC-06': 95 },
    { day: 'Sun', 'OC-01': 94, 'OC-02': 97, 'OC-06': 96 },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">Agent Performance</h1>
        <span className="label-xs">{sortedAgents.length} AGENTS RANKED</span>
      </div>

      {/* Scorecards */}
      <div className="flex gap-3 overflow-x-auto scrollbar-slim pb-2">
        {sortedAgents.map((agent, i) => (
          <AgentScorecard key={agent.id} agent={agent} rank={i + 1} />
        ))}
      </div>

      {/* Model Comparison */}
      <div className="bg-card border border-border rounded-lg p-4">
        <span className="label-xs mb-3 block">MODEL COMPARISON — SONNET VS OPUS</span>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelComparison}>
              <XAxis dataKey="metric" tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 14%, 47%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 14%, 47%)' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: 'hsl(220 30% 10%)', border: '1px solid hsl(217 33% 17%)', borderRadius: '6px', fontSize: '10px', fontFamily: 'JetBrains Mono' }} />
              <Bar dataKey="Sonnet" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Opus" fill="hsl(271, 91%, 65%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-[10px] font-mono"><span className="w-2 h-2 rounded-full bg-primary" />Sonnet</span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono"><span className="w-2 h-2 rounded-full bg-purple" />Opus</span>
        </div>
      </div>

      {/* Performance Over Time */}
      <div className="bg-card border border-border rounded-lg p-4">
        <span className="label-xs mb-3 block">SUCCESS RATE OVER TIME</span>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={perfOverTime}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 14%, 47%)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 14%, 47%)' }} axisLine={false} tickLine={false} width={25} />
              <Tooltip contentStyle={{ background: 'hsl(220 30% 10%)', border: '1px solid hsl(217 33% 17%)', borderRadius: '6px', fontSize: '10px', fontFamily: 'JetBrains Mono' }} />
              <Line type="monotone" dataKey="OC-01" stroke="hsl(217, 91%, 60%)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="OC-02" stroke="hsl(142, 71%, 45%)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="OC-06" stroke="hsl(271, 91%, 65%)" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skill Usage */}
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-3 block">SKILL USAGE</span>
          <div className="flex flex-col gap-2">
            {skillUsage.map(s => (
              <div key={s.skill} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground w-32 truncate">{s.skill}</span>
                <div className="flex-1 h-2 bg-surface-inset rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(s.count / skillUsage[0].count) * 100}%` }} />
                </div>
                <span className="font-mono text-[10px] text-foreground tabular-nums w-6 text-right">{s.count}</span>
                <span className={`font-mono text-[9px] tabular-nums w-8 text-right ${s.successRate >= 95 ? 'text-green' : 'text-yellow'}`}>{s.successRate}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Analysis */}
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-3 block">ERROR ANALYSIS</span>
          <div className="flex flex-col gap-2">
            {errorCategories.map(e => {
              const TrendIcon = trendIcon[e.trend];
              return (
                <div key={e.type} className="flex items-center gap-2">
                  <span className="text-xs text-foreground flex-1">{e.type}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">{e.count}</span>
                  <TrendIcon className={`w-3 h-3 ${trendColor[e.trend]}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
