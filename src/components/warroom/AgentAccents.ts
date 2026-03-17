// Agent accent colors and visual config for the War Room scene
export const agentAccents: Record<string, { color: string; hsl: string; name: string }> = {
  'OC-01': { color: '#0EA5E9', hsl: '199 89% 48%', name: 'Architect' },   // blue
  'OC-02': { color: '#8B5CF6', hsl: '262 83% 58%', name: 'Builder' },      // purple
  'OC-03': { color: '#14B8A6', hsl: '173 80% 40%', name: 'Deployer' },     // teal
  'OC-04': { color: '#F97316', hsl: '25 95% 53%', name: 'Debugger' },      // orange
  'OC-05': { color: '#EC4899', hsl: '330 81% 60%', name: 'Scanner' },      // pink
  'OC-06': { color: '#A855F7', hsl: '271 81% 56%', name: 'Stylist' },      // violet
  'OC-07': { color: '#6B7280', hsl: '220 9% 46%', name: 'Migrator' },      // gray
  'OC-08': { color: '#10B981', hsl: '160 84% 39%', name: 'Watcher' },      // green
};

export type VisualState = 'coding' | 'building' | 'deploying' | 'error' | 'idle' | 'offline';

export function getVisualState(status: string, currentState: string): VisualState {
  if (status === 'offline') return 'offline';
  if (status === 'idle') return 'idle';
  if (status === 'error') return 'error';
  if (currentState === 'Deploying') return 'deploying';
  if (currentState === 'Testing' || currentState === 'Planning') return 'building';
  return 'coding';
}
