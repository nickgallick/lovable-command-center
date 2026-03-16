import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, LayoutGrid, GitBranch, Globe, BarChart3, Terminal, Bell, Activity, Clock, Monitor,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export type ModuleId = 'warroom' | 'projects' | 'pipeline' | 'deployments' | 'spend' | 'command' | 'alerts' | 'performance' | 'history' | 'demo';

const modules: { id: ModuleId; label: string; icon: React.ElementType }[] = [
  { id: 'warroom', label: 'War Room', icon: Users },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'deployments', label: 'Deployments', icon: Globe },
  { id: 'spend', label: 'Analytics', icon: BarChart3 },
  { id: 'command', label: 'Command', icon: Terminal },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'performance', label: 'Agents', icon: Activity },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'demo', label: 'TV Mode', icon: Monitor },
];

interface Props {
  active: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export function ModuleSidebar({ active, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 180 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className="h-full border-r border-border bg-sidebar flex flex-col overflow-hidden"
    >
      <div className="flex-1 py-3 flex flex-col gap-0.5">
        {modules.map((mod) => {
          const isActive = active === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => onSelect(mod.id)}
              className={`relative flex items-center gap-2.5 px-3 py-2 mx-1.5 rounded-md text-sm transition-all duration-150
                ${isActive
                  ? 'bg-accent text-cyan'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-cyan"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <mod.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{mod.label}</span>}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
