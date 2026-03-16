import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, LayoutGrid, GitBranch, Globe, BarChart3,
  Terminal, Bell, Activity, Monitor, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';
import { alerts } from '@/data/mockData';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/agents', label: 'War Room', icon: Users },
  { path: '/projects', label: 'Projects', icon: LayoutGrid },
  { path: '/pipeline', label: 'Pipeline', icon: GitBranch },
  { path: '/deployments', label: 'Deployments', icon: Globe },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/commands', label: 'Commands', icon: Terminal },
  { path: '/alerts', label: 'Alerts', icon: Bell },
  { path: '/performance', label: 'Performance', icon: Activity },
  { path: '/showcase', label: 'Showcase', icon: Monitor },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const unresolvedAlerts = alerts.filter(a => !a.resolved && a.severity === 'critical').length;

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 220 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="h-full border-r border-border bg-sidebar flex flex-col overflow-hidden shrink-0"
    >
      <nav className="flex-1 py-3 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex items-center gap-2.5 px-3 py-2 mx-1.5 rounded-lg text-sm transition-all duration-150
                ${isActive
                  ? 'bg-accent text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate font-medium">{item.label}</span>}
              {item.path === '/alerts' && unresolvedAlerts > 0 && (
                <span className={`${collapsed ? 'absolute top-1 right-1' : 'ml-auto'} w-4 h-4 rounded-full bg-red text-[9px] font-bold text-white flex items-center justify-center`}>
                  {unresolvedAlerts}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border">
        <button className="flex items-center gap-2.5 px-3 py-2 mx-1.5 my-1 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors w-[calc(100%-12px)]">
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          onClick={onToggle}
          className="flex items-center justify-center py-2.5 w-full text-muted-foreground hover:text-foreground transition-colors border-t border-border"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
