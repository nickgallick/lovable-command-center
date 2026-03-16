import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { agents, builds, deployments, activityFeed } from '@/data/mockData';
import { Settings, X } from 'lucide-react';

const panels = ['warroom', 'pipeline', 'deployments', 'feed'] as const;
type Panel = typeof panels[number];

const panelLabels: Record<Panel, string> = {
  warroom: 'AGENT WAR ROOM',
  pipeline: 'BUILD PIPELINE',
  deployments: 'DEPLOYMENT GRID',
  feed: 'LIVE FEED',
};

function WarRoomPanel() {
  const activeAgents = agents.filter(a => a.status !== 'offline');
  return (
    <div className="flex items-center justify-around h-full px-8">
      {activeAgents.slice(0, 4).map(agent => (
        <div key={agent.id} className="flex flex-col items-center gap-4">
          <div className={`w-20 h-20 rounded-full border-3 ${
            agent.status === 'active' ? 'border-green dot-glow-green' : agent.status === 'error' ? 'border-red dot-glow-red' : 'border-muted-foreground'
          } bg-surface-inset flex items-center justify-center`}>
            <span className="font-mono text-xl font-bold text-foreground">{agent.id.split('-')[1]}</span>
          </div>
          <span className="font-display text-lg font-bold text-foreground">{agent.name}</span>
          <span className="text-sm text-muted-foreground">{agent.project}</span>
          <span className={`font-mono text-xs px-3 py-1 rounded-lg ${
            agent.status === 'active' ? 'bg-green-dim text-green' : agent.status === 'error' ? 'bg-red-dim text-red' : 'bg-secondary text-muted-foreground'
          }`}>{agent.currentState.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
}

function DeployPanel() {
  return (
    <div className="grid grid-cols-4 gap-4 h-full p-8 content-center">
      {deployments.slice(0, 8).map(dep => (
        <div key={dep.name} className={`rounded-xl p-4 text-center flex flex-col items-center justify-center gap-2 ${
          dep.status === 'healthy' ? 'bg-green-dim pulse-healthy' : dep.status === 'degraded' ? 'bg-yellow-dim' : 'bg-red-dim'
        }`}>
          <div className={`w-4 h-4 rounded-full ${
            dep.status === 'healthy' ? 'bg-green' : dep.status === 'degraded' ? 'bg-yellow' : 'bg-red'
          }`} />
          <span className="font-display text-sm font-bold text-foreground">{dep.name}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{dep.uptime}% up</span>
        </div>
      ))}
    </div>
  );
}

function FeedPanel() {
  return (
    <div className="flex flex-col gap-3 p-8 h-full overflow-hidden">
      {activityFeed.map(event => (
        <div key={event.id} className="flex items-center gap-4 text-base">
          <div className={`w-2 h-2 rounded-full shrink-0 ${
            event.type === 'success' ? 'bg-green' : event.type === 'error' ? 'bg-red' : event.type === 'warning' ? 'bg-yellow' : 'bg-muted-foreground'
          }`} />
          <span className="font-mono text-muted-foreground">[{event.agent}]</span>
          <span className={`font-mono ${
            event.type === 'success' ? 'text-green' : event.type === 'error' ? 'text-red' : 'text-foreground'
          }`}>{event.action}</span>
          <span className="ml-auto font-mono text-sm text-muted-foreground">{event.timestamp}</span>
        </div>
      ))}
    </div>
  );
}

export default function ShowcasePage() {
  const navigate = useNavigate();
  const [currentPanel, setCurrentPanel] = useState<Panel>('warroom');
  const [showControls, setShowControls] = useState(false);
  const [rotationInterval, setRotationInterval] = useState(20);

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const buildsToday = builds.length;
  const projectsLive = deployments.filter(d => d.status === 'healthy').length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPanel(prev => {
        const idx = panels.indexOf(prev);
        return panels[(idx + 1) % panels.length];
      });
    }, rotationInterval * 1000);
    return () => clearInterval(timer);
  }, [rotationInterval]);

  const panelComponents: Record<Panel, React.ReactNode> = {
    warroom: <WarRoomPanel />,
    pipeline: <FeedPanel />,
    deployments: <DeployPanel />,
    feed: <FeedPanel />,
  };

  return (
    <div
      className="h-screen w-screen bg-background bg-grid flex flex-col overflow-hidden cursor-none"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rotate-45 bg-primary rounded-sm" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-foreground">PERLANTIR MISSION CONTROL</span>
        </div>
        <span className="label-xs text-[11px]">{panelLabels[currentPanel]}</span>
      </div>

      {/* Hero Stats */}
      <div className="flex items-center justify-center gap-16 py-6">
        {[
          { label: 'AGENTS ACTIVE', value: activeAgents, color: 'text-green' },
          { label: 'BUILDS TODAY', value: buildsToday, color: 'text-primary' },
          { label: 'PROJECTS LIVE', value: projectsLive, color: 'text-green' },
          { label: 'UPTIME', value: '99.7%', color: 'text-foreground' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className={`font-display text-5xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="label-xs mt-2 text-[11px]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Rotating Panel */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            {panelComponents[currentPanel]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Ticker */}
      <div className="h-12 flex items-center border-t border-border overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-10 whitespace-nowrap px-8"
        >
          {[...activityFeed, ...activityFeed].map((event, i) => (
            <span key={`${event.id}-${i}`} className="font-mono text-sm text-muted-foreground">
              [{event.agent}] {event.action}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 right-6 bg-card border border-border rounded-xl p-4 shadow-2xl cursor-default flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="label-xs text-foreground">CONTROLS</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Rotate:</span>
              {[10, 20, 30].map(s => (
                <button
                  key={s}
                  onClick={() => setRotationInterval(s)}
                  className={`font-mono text-[10px] px-2 py-1 rounded ${rotationInterval === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                >{s}s</button>
              ))}
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-[10px] font-mono px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-accent transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Exit Showcase
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
