import { Agent } from '@/data/mockData';
import { agentAccents } from './AgentAccents';

interface LoungeSVGProps {
  idleAgents: Agent[];
}

export function LoungeSVG({ idleAgents }: LoungeSVGProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Warm ambient background glow */}
      <defs>
        <radialGradient id="warm-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="200" fill="url(#warm-glow)" />

      {/* Coffee bar counter */}
      <rect x="250" y="30" width="130" height="10" rx="3" fill="hsl(30, 30%, 80%)" className="dark:fill-[hsl(30,15%,22%)]" />
      <rect x="255" y="40" width="5" height="30" rx="1" fill="hsl(30, 25%, 75%)" className="dark:fill-[hsl(30,10%,18%)]" />
      <rect x="370" y="40" width="5" height="30" rx="1" fill="hsl(30, 25%, 75%)" className="dark:fill-[hsl(30,10%,18%)]" />
      {/* Coffee machine */}
      <rect x="290" y="14" width="20" height="16" rx="2" fill="hsl(215, 14%, 47%)" opacity="0.3" />
      <rect x="295" y="10" width="10" height="4" rx="1" fill="hsl(215, 14%, 47%)" opacity="0.2" />
      {/* Cups on counter */}
      <circle cx="340" cy="26" r="4" fill="hsl(214,18%,87%)" opacity="0.4" />
      <circle cx="355" cy="26" r="4" fill="hsl(214,18%,87%)" opacity="0.4" />

      {/* Couch */}
      <rect x="20" y="80" width="120" height="40" rx="8" fill="hsl(214, 18%, 87%)" className="dark:fill-[hsl(215,20%,16%)]" />
      <rect x="15" y="78" width="14" height="44" rx="6" fill="hsl(214, 18%, 84%)" className="dark:fill-[hsl(215,20%,18%)]" />
      <rect x="131" y="78" width="14" height="44" rx="6" fill="hsl(214, 18%, 84%)" className="dark:fill-[hsl(215,20%,18%)]" />
      {/* Couch cushions */}
      <rect x="28" y="84" width="50" height="30" rx="4" fill="hsl(214, 18%, 90%)" className="dark:fill-[hsl(215,20%,20%)]" />
      <rect x="82" y="84" width="50" height="30" rx="4" fill="hsl(214, 18%, 90%)" className="dark:fill-[hsl(215,20%,20%)]" />

      {/* Armchair */}
      <rect x="170" y="90" width="50" height="35" rx="8" fill="hsl(214, 18%, 85%)" className="dark:fill-[hsl(215,20%,17%)]" />
      <rect x="165" y="88" width="12" height="38" rx="5" fill="hsl(214, 18%, 82%)" className="dark:fill-[hsl(215,20%,19%)]" />
      <rect x="213" y="88" width="12" height="38" rx="5" fill="hsl(214, 18%, 82%)" className="dark:fill-[hsl(215,20%,19%)]" />

      {/* Coffee table */}
      <rect x="70" y="135" width="80" height="6" rx="2" fill="hsl(30, 25%, 80%)" className="dark:fill-[hsl(30,12%,20%)]" />

      {/* Hanging plants */}
      <g>
        <line x1="50" y1="0" x2="50" y2="15" stroke="hsl(215,14%,67%)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="18" r="8" fill="#10B981" opacity="0.2">
          <animate attributeName="cy" values="18;19;18" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="47" cy="20" r="5" fill="#059669" opacity="0.15">
          <animate attributeName="cy" values="20;21;20" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>
      <g>
        <line x1="320" y1="0" x2="320" y2="12" stroke="hsl(215,14%,67%)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="320" cy="16" r="6" fill="#10B981" opacity="0.15">
          <animate attributeName="cy" values="16;17;16" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Floor lamp warm glow */}
      <circle cx="240" cy="60" r="30" fill="#F59E0B" opacity="0.03">
        <animate attributeName="opacity" values="0.02;0.04;0.02" dur="4s" repeatCount="indefinite" />
      </circle>
      <rect x="238" y="40" width="4" height="55" rx="1" fill="hsl(215,14%,67%)" opacity="0.2" />
      <ellipse cx="240" cy="38" rx="10" ry="5" fill="#F59E0B" opacity="0.15" />

      {/* Idle agents on the couch/chair */}
      {idleAgents.map((agent, i) => {
        const acc = agentAccents[agent.id];
        const positions = [
          { x: 50, y: 78 },   // couch left
          { x: 100, y: 78 },  // couch right
          { x: 190, y: 85 },  // armchair
        ];
        const pos = positions[i % positions.length];
        return (
          <g key={agent.id} transform={`translate(${pos.x}, ${pos.y})`}>
            {/* Agent character */}
            <circle cx="0" cy="-8" r="7" fill={acc?.color || '#94A3B8'} opacity="0.3" />
            <circle cx="0" cy="-8" r="6" fill={acc?.color || '#94A3B8'} opacity="0.2" />
            {/* Body relaxed */}
            <rect x="-9" y="-1" width="18" height="12" rx="5" fill={acc?.color || '#94A3B8'} opacity="0.2" />
            {/* Closed laptop on lap */}
            <rect x="-10" y="8" width="20" height="2" rx="1" fill="hsl(215,14%,67%)" opacity="0.3" />
            {/* Coffee cup in hand */}
            <circle cx="14" cy="4" r="3" fill="hsl(30,30%,70%)" opacity="0.25" />
            {/* Name tag */}
            <text x="0" y="22" textAnchor="middle" fill={acc?.color || '#94A3B8'} fontSize="6" fontFamily="monospace" fontWeight="bold" opacity="0.5">{agent.name}</text>
            <text x="0" y="29" textAnchor="middle" fill="hsl(215,14%,47%)" fontSize="4.5" fontFamily="monospace" opacity="0.4">ON BREAK</text>
          </g>
        );
      })}

      {/* Empty state if no idle agents */}
      {idleAgents.length === 0 && (
        <text x="130" y="100" textAnchor="middle" fill="hsl(215,14%,67%)" fontSize="8" fontFamily="monospace" opacity="0.3">LOUNGE EMPTY</text>
      )}
    </svg>
  );
}
