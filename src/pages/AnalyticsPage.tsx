import { spendData } from '@/data/mockData';
import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const timeFilters = ['Today', 'This Week', 'This Month', 'Custom'] as const;

const COLORS = ['hsl(217, 91%, 60%)', 'hsl(189, 95%, 43%)', 'hsl(142, 71%, 45%)'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<typeof timeFilters[number]>('This Month');

  const serviceData = Object.entries(spendData.byService).map(([name, value]) => ({ name, value }));
  const agentData = spendData.byAgent.map(a => ({ ...a }));
  const pctUsed = ((spendData.month / spendData.budget) * 100).toFixed(0);
  const ratePct = ((spendData.rateLimit.current / spendData.rateLimit.max) * 100);

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-foreground">Spend & Usage Analytics</h1>
        <div className="flex items-center gap-2">
          {timeFilters.map(f => (
            <button
              key={f}
              onClick={() => setPeriod(f)}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                period === f ? 'bg-primary/10 text-primary border-primary/30' : 'text-muted-foreground border-border hover:text-foreground'
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Hero Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5 flex items-center justify-between">
          <div>
            <div className="label-xs mb-2">TOTAL SPEND</div>
            <div className="metric-lg text-foreground">${spendData.month.toFixed(2)}</div>
            <div className="text-[11px] font-mono text-green mt-1">↓ 8% vs last period</div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label-xs">BUDGET</span>
            <span className="font-mono text-xs text-muted-foreground">${spendData.month.toFixed(0)} / ${spendData.budget.toFixed(0)}</span>
          </div>
          <div className="w-full h-3 bg-surface-inset rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${Number(pctUsed) > 80 ? 'bg-red' : Number(pctUsed) > 60 ? 'bg-yellow' : 'bg-primary'}`}
              style={{ width: `${pctUsed}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1">{pctUsed}% used</div>
        </div>
      </div>

      {/* Spend Over Time */}
      <div className="bg-card border border-border rounded-lg p-5">
        <span className="label-xs mb-3 block">SPEND OVER TIME (30 DAY)</span>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spendData.monthlyHistory}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 14%, 47%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 14%, 47%)' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: 'hsl(220 30% 10%)', border: '1px solid hsl(217 33% 17%)', borderRadius: '6px', fontSize: '10px', fontFamily: 'JetBrains Mono' }} />
              <Area type="monotone" dataKey="anthropic" stackId="1" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.2} strokeWidth={1.5} />
              <Area type="monotone" dataKey="vercel" stackId="1" stroke="hsl(189, 95%, 43%)" fill="hsl(189, 95%, 43%)" fillOpacity={0.15} strokeWidth={1.5} />
              <Area type="monotone" dataKey="supabase" stackId="1" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.1} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center gap-1.5 text-[10px] font-mono"><span className="w-2 h-2 rounded-full bg-primary" />Anthropic</span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono"><span className="w-2 h-2 rounded-full bg-cyan" />Vercel</span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono"><span className="w-2 h-2 rounded-full bg-green" />Supabase</span>
        </div>
      </div>

      {/* 4-Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* By Service Donut */}
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-2 block">BY SERVICE</span>
          <div className="h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value">
                  {serviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(220 30% 10%)', border: '1px solid hsl(217 33% 17%)', borderRadius: '6px', fontSize: '10px', fontFamily: 'JetBrains Mono' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center font-mono text-sm font-bold text-foreground">${spendData.month.toFixed(0)}</div>
        </div>

        {/* By Agent */}
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-2 block">BY AGENT</span>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="agent" tick={{ fontSize: 9, fontFamily: 'JetBrains Mono', fill: 'hsl(215, 16%, 65%)' }} axisLine={false} tickLine={false} width={60} />
                <Bar dataKey="cost" fill="hsl(217, 91%, 60%)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* By Project */}
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-3 block">BY PROJECT</span>
          <div className="flex flex-col gap-2">
            {spendData.byProject.map((p, i) => (
              <div key={p.project} className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground truncate flex-1">{i + 1}. {p.project}</span>
                <span className="font-mono text-xs text-foreground tabular-nums">${p.cost.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Token Breakdown */}
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-3 block">TOKEN BREAKDOWN</span>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1"><span>Input</span><span>{(spendData.tokenBreakdown.input / 1000).toFixed(0)}k</span></div>
              <div className="w-full h-2 bg-surface-inset rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(spendData.tokenBreakdown.input / (spendData.tokenBreakdown.input + spendData.tokenBreakdown.output)) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1"><span>Output</span><span>{(spendData.tokenBreakdown.output / 1000).toFixed(0)}k</span></div>
              <div className="w-full h-2 bg-surface-inset rounded-full overflow-hidden">
                <div className="h-full bg-cyan rounded-full" style={{ width: `${(spendData.tokenBreakdown.output / (spendData.tokenBreakdown.input + spendData.tokenBreakdown.output)) * 100}%` }} />
              </div>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-[10px] font-mono">
              <span className="text-muted-foreground">Sonnet: {(spendData.tokenBreakdown.sonnetTokens / 1000).toFixed(0)}k</span>
              <span className="text-purple">Opus: {(spendData.tokenBreakdown.opusTokens / 1000).toFixed(0)}k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limit + Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-2 block">RATE LIMIT MONITOR</span>
          <div className="w-full h-3 bg-surface-inset rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all ${ratePct > 90 ? 'bg-red' : ratePct > 80 ? 'bg-yellow' : 'bg-primary'}`}
              style={{ width: `${ratePct}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>{spendData.rateLimit.current} / {spendData.rateLimit.max} req/min</span>
            <span>Peak today: {spendData.rateLimit.peakToday}</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <span className="label-xs mb-2 block">FORECAST</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-muted-foreground mb-1">Projected Monthly</div>
              <div className="metric-md text-foreground">${spendData.forecast.monthly.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground mb-1">Projected Quarterly</div>
              <div className="metric-md text-foreground">${spendData.forecast.quarterly.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
