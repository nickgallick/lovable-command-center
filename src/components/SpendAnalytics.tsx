import { motion } from 'framer-motion';
import { spendData } from '@/data/mockData';

function GaugeChart({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min((value / max) * 100, 100);
  const angle = (pct / 100) * 180;
  const radius = 60;
  const cx = 70;
  const cy = 70;
  
  const toXY = (deg: number) => ({
    x: cx + radius * Math.cos(((180 + deg) * Math.PI) / 180),
    y: cy + radius * Math.sin(((180 + deg) * Math.PI) / 180),
  });

  const start = toXY(0);
  const end = toXY(angle);
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 80" className="w-48">
        {/* Background arc */}
        <path
          d={`M ${toXY(0).x} ${toXY(0).y} A ${radius} ${radius} 0 0 1 ${toXY(180).x} ${toXY(180).y}`}
          fill="none" stroke="hsl(var(--border))" strokeWidth="6" strokeLinecap="round"
        />
        {/* Value arc */}
        <motion.path
          d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`}
          fill="none"
          stroke={pct > 80 ? 'hsl(var(--rose))' : pct > 60 ? 'hsl(var(--amber))' : 'hsl(var(--cyan))'}
          strokeWidth="6" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </svg>
      <div className="text-center -mt-2">
        <div className="metric-lg">${value.toFixed(2)}</div>
        <div className="label-xs mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function TrendBar({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex flex-col gap-1.5">
      <span className="label-xs">{label}</span>
      <div className="flex items-end gap-1 h-12">
        {data.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-cyan/30 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 100}%` }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

export function SpendAnalytics() {
  return (
    <div className="h-full flex flex-col gap-6 p-4 overflow-auto scrollbar-slim">
      <div className="flex items-center justify-between">
        <h1 className="label-xs text-foreground text-sm">SPEND & USAGE</h1>
        <span className="label-xs">${spendData.month.toFixed(2)} / ${spendData.budget.toFixed(2)} BUDGETED</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-center">
          <GaugeChart value={spendData.month} max={spendData.budget} label="MONTHLY BURN" />
        </div>

        <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
          <span className="label-xs">COST BY MODEL</span>
          {Object.entries(spendData.byModel).map(([model, cost]) => (
            <div key={model} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{model}</span>
              <span className="font-mono text-sm tabular-nums text-foreground">${cost.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs font-medium text-foreground">Total</span>
            <span className="font-mono text-sm tabular-nums text-cyan font-medium">
              ${Object.values(spendData.byModel).reduce((a, b) => a + b, 0).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-4">
          <TrendBar data={spendData.dailyTrend} label="DAILY SPEND (7D)" />
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div>
              <div className="label-xs text-[9px]">TODAY</div>
              <div className="font-mono text-sm tabular-nums text-foreground">${spendData.today.toFixed(2)}</div>
            </div>
            <div>
              <div className="label-xs text-[9px]">THIS WEEK</div>
              <div className="font-mono text-sm tabular-nums text-foreground">${spendData.week.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
