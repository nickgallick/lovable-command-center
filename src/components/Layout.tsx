import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { BottomTicker } from './BottomTicker';
import { CommandPalette } from './CommandPalette';
import { ContextPanel } from './ContextPanel';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contextPanel, setContextPanel] = useState<{ type: string; data: any } | null>(null);

  return (
    <div className="h-screen flex flex-col bg-background bg-grid scanline overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        {contextPanel && (
          <ContextPanel data={contextPanel} onClose={() => setContextPanel(null)} />
        )}
      </div>
      <BottomTicker />
      <CommandPalette />
    </div>
  );
}
