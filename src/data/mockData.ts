export type AgentStatus = 'active' | 'idle' | 'error' | 'offline';
export type BuildStatus = 'pending' | 'active' | 'complete' | 'failed';
export type PipelineStage = 'trigger' | 'parse' | 'skill' | 'execute' | 'build' | 'deploy' | 'health';
export type ProjectStatus = 'queued' | 'in-progress' | 'building' | 'deploying' | 'live' | 'attention';
export type DeployStatus = 'healthy' | 'degraded' | 'down';

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
  buildsCompleted: number;
  successRate: number;
  avgBuildTime: string;
  totalCost: number;
  personality: 'plant' | 'sticky-notes' | 'dual-monitor' | 'minimalist' | 'coffee-addict' | 'figurines';
}

export interface Project {
  id: string;
  name: string;
  type: 'SaaS' | 'Landing' | 'API' | 'PWA';
  status: ProjectStatus;
  agents: string[];
  lastActivity: string;
  url?: string;
  health: number;
}

export interface Build {
  id: string;
  project: string;
  agent: string;
  model: 'Sonnet' | 'Opus' | 'Haiku';
  status: BuildStatus;
  stage: PipelineStage;
  startedAt: string;
  duration: string;
  filesChanged: number;
  result?: string;
}

export interface Deployment {
  name: string;
  url: string;
  status: DeployStatus;
  uptime: number;
  p50: number;
  p95: number;
  lastDeploy: string;
  errorRate: number;
  lighthouse: { perf: number; a11y: number; bestPractices: number; seo: number };
  commitHash: string;
  domain: string;
  sslExpiry: string;
  responseHistory: number[];
}

export interface ActivityEvent {
  id: string;
  agent: string;
  action: string;
  project: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface AlertRule {
  id: string;
  condition: string;
  threshold: string;
  channels: ('slack' | 'email' | 'app')[];
  enabled: boolean;
}

export interface Alert {
  id: string;
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string;
  resolutionTime?: string;
}

export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  humanSchedule: string;
  lastRun: string;
  nextRun: string;
  status: 'active' | 'paused' | 'failed';
}

export const agents: Agent[] = [
  { id: 'OC-01', name: 'Architect', model: 'Opus', status: 'active', project: 'Perlantir.com', currentState: 'Coding', tokensUsed: 142847, tokensLimit: 500000, uptime: '4h 23m', lastAction: 'Modified auth middleware', sparkline: [20, 35, 28, 45, 52, 38, 60, 55, 48, 62, 70, 58], buildsCompleted: 47, successRate: 94, avgBuildTime: '6m 12s', totalCost: 234.50, personality: 'dual-monitor' },
  { id: 'OC-02', name: 'Builder', model: 'Sonnet', status: 'active', project: 'ClientPortal', currentState: 'Testing', tokensUsed: 89234, tokensLimit: 500000, uptime: '2h 11m', lastAction: 'Running test suite', sparkline: [15, 22, 30, 18, 25, 40, 35, 28, 32, 45, 38, 42], buildsCompleted: 63, successRate: 97, avgBuildTime: '4m 45s', totalCost: 156.20, personality: 'plant' },
  { id: 'OC-03', name: 'Deployer', model: 'Sonnet', status: 'idle', project: 'DataPipeline', currentState: 'Idle', tokensUsed: 34521, tokensLimit: 500000, uptime: '6h 45m', lastAction: 'Deployment complete', sparkline: [50, 45, 30, 15, 8, 5, 3, 2, 1, 1, 0, 0], buildsCompleted: 89, successRate: 99, avgBuildTime: '3m 22s', totalCost: 98.40, personality: 'minimalist' },
  { id: 'OC-04', name: 'Debugger', model: 'Opus', status: 'error', project: 'Analytics API', currentState: 'Blocked', tokensUsed: 201344, tokensLimit: 500000, uptime: '1h 02m', lastAction: 'Rate limit exceeded', sparkline: [40, 55, 70, 85, 90, 95, 88, 92, 80, 75, 60, 45], buildsCompleted: 31, successRate: 82, avgBuildTime: '8m 55s', totalCost: 312.80, personality: 'coffee-addict' },
  { id: 'OC-05', name: 'Scanner', model: 'Haiku', status: 'active', project: 'SecurityAudit', currentState: 'Planning', tokensUsed: 12003, tokensLimit: 500000, uptime: '0h 34m', lastAction: 'Scanning dependencies', sparkline: [0, 2, 5, 8, 12, 15, 18, 22, 25, 28, 30, 35], buildsCompleted: 12, successRate: 92, avgBuildTime: '2m 10s', totalCost: 18.90, personality: 'sticky-notes' },
  { id: 'OC-06', name: 'Stylist', model: 'Sonnet', status: 'active', project: 'BrandRefresh', currentState: 'Coding', tokensUsed: 67892, tokensLimit: 500000, uptime: '3h 18m', lastAction: 'Updating design tokens', sparkline: [30, 28, 35, 42, 38, 45, 50, 48, 55, 52, 60, 58], buildsCompleted: 55, successRate: 96, avgBuildTime: '5m 30s', totalCost: 142.10, personality: 'figurines' },
  { id: 'OC-07', name: 'Migrator', model: 'Sonnet', status: 'offline', project: '—', currentState: 'Offline', tokensUsed: 0, tokensLimit: 500000, uptime: '—', lastAction: 'Session ended', sparkline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], buildsCompleted: 22, successRate: 91, avgBuildTime: '7m 15s', totalCost: 67.30, personality: 'minimalist' },
  { id: 'OC-08', name: 'Watcher', model: 'Haiku', status: 'active', project: 'MonitoringSvc', currentState: 'Deploying', tokensUsed: 45678, tokensLimit: 500000, uptime: '5h 02m', lastAction: 'Pushing to Vercel', sparkline: [10, 15, 20, 25, 35, 40, 38, 42, 50, 55, 60, 65], buildsCompleted: 78, successRate: 95, avgBuildTime: '3m 48s', totalCost: 55.60, personality: 'plant' },
];

export const projects: Project[] = [
  { id: 'P-001', name: 'Perlantir.com', type: 'SaaS', status: 'in-progress', agents: ['OC-01'], lastActivity: '12s ago', url: 'perlantir.com', health: 94 },
  { id: 'P-002', name: 'ClientPortal', type: 'SaaS', status: 'building', agents: ['OC-02'], lastActivity: '34s ago', url: 'portal.perlantir.com', health: 91 },
  { id: 'P-003', name: 'DataPipeline', type: 'API', status: 'live', agents: ['OC-03'], lastActivity: '8m ago', url: 'data.perlantir.com', health: 100 },
  { id: 'P-004', name: 'Analytics API', type: 'API', status: 'attention', agents: ['OC-04'], lastActivity: '1m ago', url: 'api.perlantir.com', health: 72 },
  { id: 'P-005', name: 'SecurityAudit', type: 'SaaS', status: 'in-progress', agents: ['OC-05'], lastActivity: '2m ago', health: 88 },
  { id: 'P-006', name: 'BrandRefresh', type: 'Landing', status: 'deploying', agents: ['OC-06'], lastActivity: '4m ago', url: 'brand.perlantir.com', health: 89 },
  { id: 'P-007', name: 'InternalDocs', type: 'PWA', status: 'queued', agents: [], lastActivity: '2h ago', health: 0 },
  { id: 'P-008', name: 'MonitoringSvc', type: 'API', status: 'deploying', agents: ['OC-08'], lastActivity: '3m ago', url: 'monitor.perlantir.com', health: 96 },
  { id: 'P-009', name: 'MarketingSite', type: 'Landing', status: 'queued', agents: [], lastActivity: '1d ago', health: 0 },
  { id: 'P-010', name: 'PaymentGateway', type: 'API', status: 'live', agents: [], lastActivity: '6h ago', url: 'pay.perlantir.com', health: 98 },
];

export const builds: Build[] = [
  { id: 'BLD-1042', project: 'Perlantir.com', agent: 'OC-01', model: 'Opus', status: 'active', stage: 'execute', startedAt: '2 min ago', duration: '2m 14s', filesChanged: 12 },
  { id: 'BLD-1041', project: 'ClientPortal', agent: 'OC-02', model: 'Sonnet', status: 'active', stage: 'build', startedAt: '5 min ago', duration: '5m 02s', filesChanged: 8 },
  { id: 'BLD-1040', project: 'SecurityAudit', agent: 'OC-05', model: 'Haiku', status: 'pending', stage: 'trigger', startedAt: '—', duration: '—', filesChanged: 0 },
  { id: 'BLD-1039', project: 'BrandRefresh', agent: 'OC-06', model: 'Sonnet', status: 'complete', stage: 'health', startedAt: '18 min ago', duration: '7m 33s', filesChanged: 24, result: 'DEPLOYED' },
  { id: 'BLD-1038', project: 'Analytics API', agent: 'OC-04', model: 'Opus', status: 'failed', stage: 'execute', startedAt: '22 min ago', duration: '4m 11s', filesChanged: 3, result: 'FAILED' },
  { id: 'BLD-1037', project: 'MonitoringSvc', agent: 'OC-08', model: 'Haiku', status: 'complete', stage: 'health', startedAt: '45 min ago', duration: '3m 48s', filesChanged: 6, result: 'DEPLOYED' },
  { id: 'BLD-1036', project: 'DataPipeline', agent: 'OC-03', model: 'Sonnet', status: 'complete', stage: 'health', startedAt: '1h ago', duration: '3m 22s', filesChanged: 4, result: 'DEPLOYED' },
  { id: 'BLD-1035', project: 'Perlantir.com', agent: 'OC-01', model: 'Opus', status: 'complete', stage: 'health', startedAt: '2h ago', duration: '6m 45s', filesChanged: 18, result: 'DEPLOYED' },
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

export const deployments: Deployment[] = [
  { name: 'Perlantir.com', url: 'perlantir.com', status: 'healthy', uptime: 99.98, p50: 120, p95: 340, lastDeploy: '2h ago', errorRate: 0.02, lighthouse: { perf: 94, a11y: 100, bestPractices: 96, seo: 97 }, commitHash: 'a3f2c1d', domain: 'perlantir.com', sslExpiry: '2027-03-15', responseHistory: [120, 115, 130, 125, 118, 122, 128, 119, 121, 117, 124, 120] },
  { name: 'ClientPortal', url: 'portal.perlantir.com', status: 'healthy', uptime: 99.95, p50: 85, p95: 210, lastDeploy: '5h ago', errorRate: 0.05, lighthouse: { perf: 91, a11y: 96, bestPractices: 94, seo: 100 }, commitHash: 'b7e4f2a', domain: 'portal.perlantir.com', sslExpiry: '2027-03-15', responseHistory: [85, 88, 82, 90, 87, 84, 86, 89, 83, 85, 88, 86] },
  { name: 'DataPipeline', url: 'data.perlantir.com', status: 'healthy', uptime: 100, p50: 45, p95: 120, lastDeploy: '8m ago', errorRate: 0, lighthouse: { perf: 88, a11y: 92, bestPractices: 90, seo: 95 }, commitHash: 'c9d1e3b', domain: 'data.perlantir.com', sslExpiry: '2027-06-20', responseHistory: [45, 42, 48, 44, 46, 43, 47, 45, 44, 46, 45, 43] },
  { name: 'Analytics API', url: 'api.perlantir.com', status: 'degraded', uptime: 97.2, p50: 450, p95: 1200, lastDeploy: '1d ago', errorRate: 2.8, lighthouse: { perf: 72, a11y: 88, bestPractices: 82, seo: 90 }, commitHash: 'd2f5a8c', domain: 'api.perlantir.com', sslExpiry: '2027-03-15', responseHistory: [350, 420, 380, 550, 620, 450, 480, 510, 445, 470, 500, 460] },
  { name: 'MonitoringSvc', url: 'monitor.perlantir.com', status: 'healthy', uptime: 99.99, p50: 30, p95: 80, lastDeploy: '3m ago', errorRate: 0.01, lighthouse: { perf: 96, a11y: 100, bestPractices: 98, seo: 100 }, commitHash: 'e8c3b1f', domain: 'monitor.perlantir.com', sslExpiry: '2027-09-01', responseHistory: [30, 28, 32, 29, 31, 30, 33, 28, 30, 31, 29, 30] },
  { name: 'BrandRefresh', url: 'brand.perlantir.com', status: 'healthy', uptime: 99.90, p50: 110, p95: 290, lastDeploy: '18m ago', errorRate: 0.1, lighthouse: { perf: 89, a11y: 98, bestPractices: 92, seo: 96 }, commitHash: 'f1a9d4e', domain: 'brand.perlantir.com', sslExpiry: '2027-03-15', responseHistory: [110, 108, 115, 112, 109, 114, 111, 110, 113, 108, 112, 110] },
  { name: 'PaymentGateway', url: 'pay.perlantir.com', status: 'healthy', uptime: 99.99, p50: 55, p95: 140, lastDeploy: '6h ago', errorRate: 0, lighthouse: { perf: 92, a11y: 95, bestPractices: 96, seo: 98 }, commitHash: 'g3b7c2d', domain: 'pay.perlantir.com', sslExpiry: '2027-12-01', responseHistory: [55, 52, 58, 54, 56, 53, 57, 55, 54, 56, 55, 53] },
  { name: 'InternalDocs', url: 'docs.perlantir.com', status: 'healthy', uptime: 99.80, p50: 95, p95: 220, lastDeploy: '2d ago', errorRate: 0.2, lighthouse: { perf: 85, a11y: 100, bestPractices: 88, seo: 94 }, commitHash: 'h5d8e1f', domain: 'docs.perlantir.com', sslExpiry: '2027-03-15', responseHistory: [95, 92, 98, 94, 96, 93, 97, 95, 94, 96, 95, 93] },
];

export const spendData = {
  today: 47.82,
  week: 284.50,
  month: 892.14,
  budget: 1500.00,
  dailyTrend: [32, 41, 38, 55, 47, 52, 48],
  dailyLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  byModel: { Opus: 523.40, Sonnet: 312.80, Haiku: 55.94 },
  byService: { Anthropic: 720.14, Vercel: 122.00, Supabase: 50.00 },
  byAgent: [
    { agent: 'Debugger', cost: 312.80 },
    { agent: 'Architect', cost: 234.50 },
    { agent: 'Stylist', cost: 142.10 },
    { agent: 'Builder', cost: 156.20 },
    { agent: 'Deployer', cost: 98.40 },
    { agent: 'Migrator', cost: 67.30 },
    { agent: 'Watcher', cost: 55.60 },
    { agent: 'Scanner', cost: 18.90 },
  ],
  byProject: [
    { project: 'Analytics API', cost: 312.80 },
    { project: 'Perlantir.com', cost: 234.50 },
    { project: 'ClientPortal', cost: 156.20 },
    { project: 'BrandRefresh', cost: 142.10 },
  ],
  tokenBreakdown: { input: 1240000, output: 680000, sonnetTokens: 980000, opusTokens: 940000 },
  rateLimit: { current: 342, max: 500, peakToday: 467 },
  monthlyHistory: [
    { day: '03/01', anthropic: 28, vercel: 4, supabase: 2 },
    { day: '03/02', anthropic: 35, vercel: 5, supabase: 2 },
    { day: '03/03', anthropic: 22, vercel: 3, supabase: 2 },
    { day: '03/04', anthropic: 45, vercel: 6, supabase: 2 },
    { day: '03/05', anthropic: 38, vercel: 4, supabase: 2 },
    { day: '03/06', anthropic: 52, vercel: 7, supabase: 2 },
    { day: '03/07', anthropic: 41, vercel: 5, supabase: 2 },
    { day: '03/08', anthropic: 48, vercel: 6, supabase: 2 },
    { day: '03/09', anthropic: 33, vercel: 4, supabase: 2 },
    { day: '03/10', anthropic: 55, vercel: 7, supabase: 2 },
    { day: '03/11', anthropic: 42, vercel: 5, supabase: 2 },
    { day: '03/12', anthropic: 47, vercel: 6, supabase: 2 },
    { day: '03/13', anthropic: 39, vercel: 5, supabase: 2 },
    { day: '03/14', anthropic: 50, vercel: 6, supabase: 2 },
    { day: '03/15', anthropic: 44, vercel: 5, supabase: 2 },
    { day: '03/16', anthropic: 36, vercel: 4, supabase: 2 },
  ],
  forecast: { monthly: 1420, quarterly: 4260 },
};

export const alertRules: AlertRule[] = [
  { id: 'AR-1', condition: 'Daily spend exceeds', threshold: '$50', channels: ['slack', 'app'], enabled: true },
  { id: 'AR-2', condition: 'Build duration exceeds', threshold: '10 minutes', channels: ['app'], enabled: true },
  { id: 'AR-3', condition: 'Agent stuck for', threshold: '5 minutes', channels: ['slack', 'email', 'app'], enabled: true },
  { id: 'AR-4', condition: 'Deployment health check fails', threshold: '2 consecutive', channels: ['slack', 'app'], enabled: true },
  { id: 'AR-5', condition: 'Rate limit proximity', threshold: '90%', channels: ['app'], enabled: false },
];

export const alerts: Alert[] = [
  { id: 'ALT-1', type: 'Rate Limit', severity: 'critical', message: 'Anthropic API rate limit exceeded for agent OC-04', createdAt: '1m ago', resolved: false },
  { id: 'ALT-2', type: 'Build Failure', severity: 'warning', message: 'Build BLD-1038 failed at execute stage — Analytics API', createdAt: '22m ago', resolved: false },
  { id: 'ALT-3', type: 'Spend Alert', severity: 'warning', message: 'Daily spend approaching $50 threshold ($47.82)', createdAt: '1h ago', resolved: false },
  { id: 'ALT-4', type: 'Health Check', severity: 'info', message: 'Analytics API response time elevated (p95: 1200ms)', createdAt: '2h ago', resolved: true, resolvedAt: '1h ago', resolutionTime: '1h' },
  { id: 'ALT-5', type: 'Deployment', severity: 'info', message: 'DataPipeline deployment successful — health check passed', createdAt: '8m ago', resolved: true, resolvedAt: '7m ago', resolutionTime: '1m' },
];

export const cronJobs: CronJob[] = [
  { id: 'CJ-1', name: 'Health Check Sweep', schedule: '*/5 * * * *', humanSchedule: 'Every 5 min', lastRun: '2m ago', nextRun: '3m', status: 'active' },
  { id: 'CJ-2', name: 'Spend Aggregation', schedule: '0 * * * *', humanSchedule: 'Hourly', lastRun: '42m ago', nextRun: '18m', status: 'active' },
  { id: 'CJ-3', name: 'Lighthouse Audit', schedule: '0 */6 * * *', humanSchedule: 'Every 6 hours', lastRun: '3h ago', nextRun: '3h', status: 'active' },
  { id: 'CJ-4', name: 'Log Cleanup', schedule: '0 0 * * *', humanSchedule: 'Daily midnight', lastRun: '16h ago', nextRun: '8h', status: 'active' },
  { id: 'CJ-5', name: 'SSL Cert Check', schedule: '0 0 * * 1', humanSchedule: 'Weekly (Mon)', lastRun: '2d ago', nextRun: '5d', status: 'paused' },
];

export const skillUsage = [
  { skill: 'react-component', count: 142, successRate: 96 },
  { skill: 'api-endpoint', count: 98, successRate: 93 },
  { skill: 'database-migration', count: 67, successRate: 88 },
  { skill: 'auth-flow', count: 45, successRate: 91 },
  { skill: 'test-suite', count: 38, successRate: 97 },
  { skill: 'deploy-config', count: 34, successRate: 94 },
];

export const errorCategories = [
  { type: 'Rate Limit', count: 12, trend: 'up' as const },
  { type: 'Type Error', count: 8, trend: 'down' as const },
  { type: 'Build Timeout', count: 5, trend: 'stable' as const },
  { type: 'Deploy Failure', count: 3, trend: 'down' as const },
  { type: 'Auth Error', count: 2, trend: 'stable' as const },
];
