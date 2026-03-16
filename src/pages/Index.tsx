import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { ModuleSidebar, type ModuleId } from '@/components/ModuleSidebar';
import { BottomTicker } from '@/components/BottomTicker';
import { AgentWarRoom } from '@/components/AgentWarRoom';
import { PipelineVisualizer } from '@/components/PipelineVisualizer';
import { DeploymentGrid } from '@/components/DeploymentGrid';
import { SpendAnalytics } from '@/components/SpendAnalytics';
import { ActivityPanel } from '@/components/ActivityPanel';
import { CommandPalette } from '@/components/CommandPalette';

function PlaceholderModule({ title }: { title: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="label-xs text-sm text-foreground mb-1">{title}</div>
        <div className="text-xs text-muted-foreground">Module under construction</div>
      </div>
    </div>
  );
}

const moduleMap: Record<ModuleId, React.ReactNode> = {
  warroom: <AgentWarRoom />,
  projects: <PlaceholderModule title="PROJECT COMMAND BOARD" />,
  pipeline: <PipelineVisualizer />,
  deployments: <DeploymentGrid />,
  spend: <SpendAnalytics />,
  command: <PlaceholderModule title="COMMAND CENTER" />,
  alerts: <PlaceholderModule title="ALERTS & NOTIFICATIONS" />,
  performance: <PlaceholderModule title="AGENT PERFORMANCE" />,
  history: <PlaceholderModule title="PROJECT HISTORY" />,
  demo: <PlaceholderModule title="TV / SHOWCASE MODE" />,
};

export default function Index() {
  const [activeModule, setActiveModule] = useState<ModuleId>('warroom');
  const [showActivity, setShowActivity] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-background bg-grid scanline overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <ModuleSidebar active={activeModule} onSelect={setActiveModule} />
        <main className="flex-1 overflow-hidden">
          {moduleMap[activeModule]}
        </main>
        {showActivity && <ActivityPanel />}
      </div>
      <BottomTicker />
      <CommandPalette />
    </div>
  );
}
