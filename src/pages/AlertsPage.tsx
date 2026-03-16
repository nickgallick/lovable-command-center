import { alerts, alertRules } from '@/data/mockData';
import { useState } from 'react';
import { Bell, Mail, MessageSquare, CheckCircle, Clock, AlertTriangle, XCircle, Plus } from 'lucide-react';

const severityConfig = {
  critical: { bg: 'bg-red-dim', border: 'border-red/30', text: 'text-red', icon: XCircle },
  warning: { bg: 'bg-yellow-dim', border: 'border-yellow/30', text: 'text-yellow', icon: AlertTriangle },
  info: { bg: 'bg-blue-dim', border: 'border-primary/30', text: 'text-primary', icon: Bell },
};

const channelIcons: Record<string, typeof Bell> = { slack: MessageSquare, email: Mail, app: Bell };

const filters = ['All', 'Critical', 'Warning', 'Info'] as const;

export default function AlertsPage() {
  const [filter, setFilter] = useState<typeof filters[number]>('All');

  const activeAlerts = alerts.filter(a => !a.resolved);
  const filteredHistory = filter === 'All' ? alerts : alerts.filter(a => a.severity === filter.toLowerCase());

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-auto scrollbar-slim">
      <h1 className="font-display text-lg font-bold text-foreground">Alert System</h1>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="label-xs text-red">{activeAlerts.length} ACTIVE ALERT{activeAlerts.length > 1 ? 'S' : ''}</span>
          {activeAlerts.map(alert => {
            const cfg = severityConfig[alert.severity];
            return (
              <div key={alert.id} className={`${cfg.bg} border ${cfg.border} rounded-lg p-4 flex items-start gap-3`}>
                <cfg.icon className={`w-4 h-4 ${cfg.text} shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-mono font-bold ${cfg.text}`}>{alert.type.toUpperCase()}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{alert.createdAt}</span>
                  </div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-green-dim text-green border border-green/20 hover:bg-green/20 transition-colors flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Resolve
                  </button>
                  <button className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Snooze
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alert Rules */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="label-xs text-foreground">ALERT RULES</span>
          <button className="text-[10px] font-mono text-primary hover:text-foreground transition-colors flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add Rule
          </button>
        </div>
        <div className="divide-y divide-border/50">
          {alertRules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between px-4 py-3 hover:bg-accent/30 transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-sm text-foreground">
                  {rule.condition} <span className="font-mono text-primary font-bold">{rule.threshold}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {rule.channels.map(ch => {
                    const Icon = channelIcons[ch];
                    return <Icon key={ch} className="w-3.5 h-3.5 text-muted-foreground" />;
                  })}
                </div>
                <button
                  className={`w-8 h-4 rounded-full transition-colors relative ${rule.enabled ? 'bg-primary' : 'bg-border'}`}
                >
                  <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${rule.enabled ? 'left-4.5' : 'left-0.5'}`} style={{ left: rule.enabled ? '18px' : '2px' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert History */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="label-xs text-foreground">ALERT HISTORY</span>
          <div className="flex gap-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[9px] font-mono px-2 py-0.5 rounded transition-colors ${
                  filter === f ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >{f}</button>
            ))}
          </div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-2 label-xs">TIME</th>
              <th className="text-left px-4 py-2 label-xs">TYPE</th>
              <th className="text-left px-4 py-2 label-xs">MESSAGE</th>
              <th className="text-left px-4 py-2 label-xs">SEVERITY</th>
              <th className="text-left px-4 py-2 label-xs">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map(alert => {
              const cfg = severityConfig[alert.severity];
              return (
                <tr key={alert.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-muted-foreground tabular-nums whitespace-nowrap">{alert.createdAt}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{alert.type}</td>
                  <td className="px-4 py-2.5 text-foreground max-w-xs truncate">{alert.message}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${cfg.bg} ${cfg.text}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      alert.resolved ? 'bg-green-dim text-green' : 'bg-red-dim text-red'
                    }`}>{alert.resolved ? 'RESOLVED' : 'ACTIVE'}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delivery Config */}
      <div className="bg-card border border-border rounded-lg p-4">
        <span className="label-xs mb-3 block">DELIVERY CHANNELS</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <div>
                <div className="text-xs font-medium text-foreground">Slack</div>
                <div className="text-[10px] text-green font-mono">Connected</div>
              </div>
            </div>
            <button className="text-[10px] font-mono px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground transition-colors">Test</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <div>
                <div className="text-xs font-medium text-foreground">Email</div>
                <div className="text-[10px] text-muted-foreground font-mono">nick@perlantir.com</div>
              </div>
            </div>
            <button className="text-[10px] font-mono px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground transition-colors">Test</button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <div>
                <div className="text-xs font-medium text-foreground">In-App</div>
                <div className="text-[10px] text-green font-mono">Always on</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
