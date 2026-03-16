import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { agents, builds, deployments, spendData, activityFeed, type PipelineStage } from '@/data/mockData';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

const stages: PipelineStage[] = ['trigger', 'parse', 'skill', 'execute', 'build', 'deploy', 'health'];

function KPICard({ label, value, color, trend, delta, onClick }: { label: string; value: string; color: string; trend: 'up' | 'down' | 'stable'; delta: string; onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary/30 transition-all"
    >
      <div className="label-xs mb-2">{label}</div>
      <div className={`metric-lg ${color}`}>{value}</div>
      <div className="flex items-center gap-1 mt-2">
        {trend === 'up' && <ArrowUpRight className="w-3 h-3 text-green" />}
        {trend === 'down' && <ArrowDownRight className="w-3 h-3 text-red" />}
        {trend === 'stable' && <Minus className="w-3 h-3 text-muted-foreground" />}
        <span className="text-[11px] font-mono text-muted-foreground">{delta}</span>
      </div>
    </motion.div>
  );
}

function AgentCircle({ agent }: { agent: typeof agents[0] }) {
  const ringColor = agent.status === 'active' ? 'border-green' : agent.status === 'error' ? 'border-red' : agent.status === 'idle' ? 'border-muted-foreground' : 'border-border';
  const dotGlow = agent.status === 'active' ? 'dot-glow-green' : agent.status === 'error' ? 'dot-glow-red' : '';
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-12 h-12 rounded-full border-2 ${ringColor} bg-surface-inset flex items-center justify-center ${dotGlow}`}>
        <span className="font-mono text-[10px] font-bold text-foreground">{agent.id.split('-')[1]}</span>
      </div>
      <span className="text-xs font-medium text-foreground">{agent.name}</span>
      <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">{agent.project}</span>
      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
        agent.status === 'active' ? 'bg-green-dim text-green' :
        agent.status === 'error' ? 'bg-red-dim text-red' :
        agent.status === 'idle' ? 'bg-secondary text-muted-foreground' :
        'bg-secondary text-muted-foreground'
      }`}>
        {agent.currentState.toUpperCase()}
      </span>
    </div>
  );
}

function MiniPipelineDots({ build }: { build: typeof builds[0] }) {
  const currentIdx = stages.indexOf(build.stage);
  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-[10px] text-muted-foreground w-16 truncate">{build.project}</span>
      <div className="flex items-center gap-0.5 flex-1">
        {stages.map((s, i) => {
          let color = 'bg-border';
          if (build.status === 'complete' || i < currentIdx) color = 'bg-green';
          else if (i === currentIdx && build.status === 'active') color = 'bg-primary animate-pulse';
          else if (i === currentIdx && build.status === 'failed') color = 'bg-red';
          return (
            <div key={s} className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              {i < stages.length - 1 && <div className={`w-3 h-px ${i < currentIdx || build.status === 'complete' ? 'bg-green/40' : 'bg-border'}`} />}
            </div>
          );
        })}
      </div>
      <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
        build.status === 'complete' ? 'bg-green-dim text-green' :
        build.status === 'failed' ? 'bg-red-dim text-red' :
        build.status === 'active' ? 'bg-blue-dim text-primary' :
        'bg-secondary text-muted-foreground'
      }`}>{build.status === 'active' ? build.duration : build.result || build.status.toUpperCase()}</span>
    </div>
  );
}

export default function Overview() {
  const navigate = useNavigate();
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const activeBuilds = builds.filter(b => b.status === 'active').length;
  const healthyDeploys = deployments.filter(d => d.status === 'healthy').length;
  const errors24h = 1;

  const chartData = spendData.dailyTrend.map((v, i) => ({ day: spendData.dailyLabels[i], value: v }));
  const topAgents = agents.filter(a => a.status !== 'offline').slice(0, 3);
  const recentBuilds = builds.slice(0, 6);

  return (
    <div className="h-full overflow-auto scrollbar-slim p-4 flex flex-col gap-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KPICard label="AGENTS ACTIVE" value={`${activeAgents}`} color="text-green" trend="up" delta="+2 from yesterday" onClick={() => navigate('/agents')} />
        <KPICard label="BUILDS TODAY" value={`${builds.length}`} color="text-primary" trend="up" delta="+3 vs avg" onClick={() => navigate('/pipeline')} />
        <KPICard label="DEPLOYS HEALTHY" value={`${healthyDeploys}/${deployments.length}`} color="text-green" trend="stable" delta="99.7% uptime" onClick={() => navigate('/deployments')} />
        <KPICard label="DAILY SPEND" value={`$${spendData.today.toFixed(2)}`} color="text-foreground" trend="down" delta="-8% vs yesterday" onClick={() => navigate('/analytics')} />
        <KPICard label="ERRORS 24H" value={`${errors24h}`} color="text-red" trend="down" delta="-2 from yesterday" onClick={() => navigate('/alerts')} />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Agent Activity Mini */}
        <div className="lg:col-span-3 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="label-sm text-foreground">AGENT ACTIVITY</span>
            <button onClick={() => navigate('/agents')} className="text-[10px] font-mono text-primary hover:text-foreground transition-colors">VIEW ALL →</button>
          </div>
          <div className="flex items-start justify-around">
            {topAgents.map(a => <AgentCircle key={a.id} agent={a} />)}
          </div>
        </div>

        {/* Recent Builds */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="label-sm text-foreground">RECENT BUILDS</span>
            <button onClick={() => navigate('/pipeline')} className="text-[10px] font-mono text-primary hover:text-foreground transition-colors">VIEW ALL →</button>
          </div>
          <div className="flex flex-col gap-2">
            {recentBuilds.map(b => (
              <div key={b.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent/30 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  b.status === 'complete' ? 'bg-green' : b.status === 'failed' ? 'bg-red' : b.status === 'active' ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
                }`} />
                <span className="text-xs font-medium text-foreground flex-1 truncate">{b.project}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  b.status === 'complete' ? 'bg-green-dim text-green' : b.status === 'failed' ? 'bg-red-dim text-red' : b.status === 'active' ? 'bg-blue-dim text-primary' : 'bg-secondary text-muted-foreground'
                }`}>{b.result || b.status.toUpperCase()}</span>
                <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{b.startedAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Spend Chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="label-sm text-foreground">WEEKLY SPEND</span>
            <div className="flex items-center gap-2">
              <span className="metric-md text-foreground">${spendData.week.toFixed(0)}</span>
              <span className="text-[10px] font-mono text-green">↓ 12%</span>
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Tooltip
                  contentStyle={{ background: 'hsl(220 30% 10%)', border: '1px solid hsl(217 33% 17%)', borderRadius: '6px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                  labelStyle={{ color: 'hsl(215 16% 65%)' }}
                  itemStyle={{ color: 'hsl(217 91% 60%)' }}
                />
                <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deploy Grid Mini */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="label-sm text-foreground">DEPLOYMENT HEALTH</span>
            <button onClick={() => navigate('/deployments')} className="text-[10px] font-mono text-primary hover:text-foreground transition-colors">VIEW ALL →</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {deployments.map(d => (
              <div key={d.name} className={`rounded-lg p-2 text-center border ${
                d.status === 'healthy' ? 'bg-green-dim border-green/20' :
                d.status === 'degraded' ? 'bg-yellow-dim border-yellow/20' :
                'bg-red-dim border-red/20'
              } ${d.status === 'healthy' ? 'pulse-healthy' : ''}`}>
                <div className="text-[9px] font-mono font-bold text-foreground truncate">{d.name.substring(0, 6)}</div>
                <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${
                  d.status === 'healthy' ? 'bg-green' : d.status === 'degraded' ? 'bg-yellow' : 'bg-red'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Mini */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="label-sm text-foreground">PIPELINE STATUS</span>
          <button onClick={() => navigate('/pipeline')} className="text-[10px] font-mono text-primary hover:text-foreground transition-colors">VIEW ALL →</button>
        </div>
        <div className="flex flex-col gap-2">
          {builds.slice(0, 3).map(b => (
            <MiniPipelineDots key={b.id} build={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
