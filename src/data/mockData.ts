export type AgentStatus = 'active' | 'idle' | 'error' | 'offline';
export type BuildStatus = 'pending' | 'active' | 'complete' | 'failed';
export type PipelineStage = 'trigger' | 'parse' | 'skill' | 'execute' | 'build' | 'deploy' | 'health';

export interface Agent {
  id: string;
  name: string;
  model: 'Sonnet' | 'Opus' | 'Haiku';
  status: AgentStatus;
  project: string;
  currentState: string;
  tokensUsed: number;
  tokensLimit: number;
  uptime: string;
  lastAction: string;
  sparkline: number[];
}

export interface Project {
  id: string;
  name: string;
  status: 'queued' | 'in-progress' | 'building' | 'deploying' | 'live' | 'attention';
  agents: string[];
  lastActivity: string;
  url?: string;
  health: number;
}

export interface Build {
  id: string;
  project: string;
  status: BuildStatus;
  stage: PipelineStage;
  startedAt: string;
  duration: string;
  filesChanged: number;
}

export interface ActivityEvent {
  id: string;
  agent: string;
  action: string;
  project: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export const agents: Agent[] = [
  { id: 'OC-01', name: 'Architect', model: 'Opus', status: 'active', project: 'Perlantir.com', currentState: 'Coding', tokensUsed: 142847, tokensLimit: 500000, uptime: '4h 23m', lastAction: 'Modified auth middleware', sparkline: [20, 35, 28, 45, 52, 38, 60, 55, 48, 62, 70, 58] },
  { id: 'OC-02', name: 'Builder', model: 'Sonnet', status: 'active', project: 'ClientPortal', currentState: 'Testing', tokensUsed: 89234, tokensLimit: 500000, uptime: '2h 11m', lastAction: 'Running test suite', sparkline: [15, 22, 30, 18, 25, 40, 35, 28, 32, 45, 38, 42] },
  { id: 'OC-03', name: 'Deployer', model: 'Sonnet', status: 'idle', project: 'DataPipeline', currentState: 'Idle', tokensUsed: 34521, tokensLimit: 500000, uptime: '6h 45m', lastAction: 'Deployment complete', sparkline: [50, 45, 30, 15, 8, 5, 3, 2, 1, 1, 0, 0] },
  { id: 'OC-04', name: 'Debugger', model: 'Opus', status: 'error', project: 'Analytics API', currentState: 'Blocked', tokensUsed: 201344, tokensLimit: 500000, uptime: '1h 02m', lastAction: 'Rate limit exceeded', sparkline: [40, 55, 70, 85, 90, 95, 88, 92, 80, 75, 60, 45] },
  { id: 'OC-05', name: 'Scanner', model: 'Haiku', status: 'active', project: 'SecurityAudit', currentState: 'Planning', tokensUsed: 12003, tokensLimit: 500000, uptime: '0h 34m', lastAction: 'Scanning dependencies', sparkline: [0, 2, 5, 8, 12, 15, 18, 22, 25, 28, 30, 35] },
  { id: 'OC-06', name: 'Stylist', model: 'Sonnet', status: 'active', project: 'BrandRefresh', currentState: 'Coding', tokensUsed: 67892, tokensLimit: 500000, uptime: '3h 18m', lastAction: 'Updating design tokens', sparkline: [30, 28, 35, 42, 38, 45, 50, 48, 55, 52, 60, 58] },
  { id: 'OC-07', name: 'Migrator', model: 'Sonnet', status: 'offline', project: '—', currentState: 'Offline', tokensUsed: 0, tokensLimit: 500000, uptime: '—', lastAction: 'Session ended', sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'OC-08', name: 'Watcher', model: 'Haiku', status: 'active', project: 'MonitoringSvc', currentState: 'Deploying', tokensUsed: 45678, tokensLimit: 500000, uptime: '5h 02m', lastAction: 'Pushing to Vercel', sparkline: [10, 15, 20, 25, 35, 40, 38, 42, 50, 55, 60, 65] },
];

export const builds: Build[] = [
  { id: 'BLD-1042', project: 'Perlantir.com', status: 'active', stage: 'execute', startedAt: '2 min ago', duration: '2m 14s', filesChanged: 12 },
  { id: 'BLD-1041', project: 'ClientPortal', status: 'active', stage: 'build', startedAt: '5 min ago', duration: '5m 02s', filesChanged: 8 },
  { id: 'BLD-1040', project: 'SecurityAudit', status: 'pending', stage: 'trigger', startedAt: '—', duration: '—', filesChanged: 0 },
  { id: 'BLD-1039', project: 'BrandRefresh', status: 'complete', stage: 'health', startedAt: '18 min ago', duration: '7m 33s', filesChanged: 24 },
  { id: 'BLD-1038', project: 'Analytics API', status: 'failed', stage: 'execute', startedAt: '22 min ago', duration: '4m 11s', filesChanged: 3 },
];

export const activityFeed: ActivityEvent[] = [
  { id: '1', agent: 'OC-01', action: 'Modified auth middleware — added JWT refresh logic', project: 'Perlantir.com', timestamp: '12s ago', type: 'info' },
  { id: '2', agent: 'OC-02', action: 'Test suite passed — 47/47 tests green', project: 'ClientPortal', timestamp: '34s ago', type: 'success' },
  { id: '3', agent: 'OC-04', action: 'Rate limit hit — Anthropic API 429, backing off 30s', project: 'Analytics API', timestamp: '1m ago', type: 'error' },
  { id: '4', agent: 'OC-05', action: 'Initialized dependency scan — 142 packages queued', project: 'SecurityAudit', timestamp: '2m ago', type: 'info' },
  { id: '5', agent: 'OC-08', action: 'Vercel deployment triggered — production branch', project: 'MonitoringSvc', timestamp: '3m ago', type: 'success' },
  { id: '6', agent: 'OC-06', action: 'Design tokens updated — 18 variables changed', project: 'BrandRefresh', timestamp: '4m ago', type: 'info' },
  { id: '7', agent: 'OC-03', action: 'Deployment verified — health check passed', project: 'DataPipeline', timestamp: '8m ago', type: 'success' },
  { id: '8', agent: 'OC-01', action: 'Created 3 new API routes for user management', project: 'Perlantir.com', timestamp: '10m ago', type: 'info' },
  { id: '9', agent: 'OC-04', action: 'Retry attempt 3/5 — switching to cached context', project: 'Analytics API', timestamp: '12m ago', type: 'warning' },
  { id: '10', agent: 'OC-08', action: 'Build complete — 0 errors, 2 warnings', project: 'MonitoringSvc', timestamp: '15m ago', type: 'success' },
];

export const spendData = {
  today: 47.82,
  week: 284.50,
  month: 892.14,
  budget: 1500.00,
  dailyTrend: [32, 41, 38, 55, 47, 52, 48],
  byModel: { Opus: 523.40, Sonnet: 312.80, Haiku: 55.94 },
};

export const deployments = [
  { name: 'Perlantir.com', url: 'perlantir.com', status: 'healthy' as const, uptime: 99.98, p50: 120, p95: 340, lastDeploy: '2h ago', lighthouse: { perf: 94, a11y: 100, seo: 97 } },
  { name: 'ClientPortal', url: 'portal.perlantir.com', status: 'healthy' as const, uptime: 99.95, p50: 85, p95: 210, lastDeploy: '5h ago', lighthouse: { perf: 91, a11y: 96, seo: 100 } },
  { name: 'DataPipeline', url: 'data.perlantir.com', status: 'healthy' as const, uptime: 100, p50: 45, p95: 120, lastDeploy: '8m ago', lighthouse: { perf: 88, a11y: 92, seo: 95 } },
  { name: 'Analytics API', url: 'api.perlantir.com', status: 'degraded' as const, uptime: 97.2, p50: 450, p95: 1200, lastDeploy: '1d ago', lighthouse: { perf: 72, a11y: 88, seo: 90 } },
  { name: 'MonitoringSvc', url: 'monitor.perlantir.com', status: 'healthy' as const, uptime: 99.99, p50: 30, p95: 80, lastDeploy: '3m ago', lighthouse: { perf: 96, a11y: 100, seo: 100 } },
  { name: 'BrandRefresh', url: 'brand.perlantir.com', status: 'healthy' as const, uptime: 99.90, p50: 110, p95: 290, lastDeploy: '18m ago', lighthouse: { perf: 89, a11y: 98, seo: 96 } },
];
